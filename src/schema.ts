// These data structures define your client-side schema.
// They must be equal to or a subset of the server-side schema.
// Note the "relationships" field, which defines first-class
// relationships between tables.
// See https://github.com/rocicorp/mono/blob/main/apps/zbugs/src/domain/schema.ts
// for more complex examples, including many-to-many.

import {
	type ExpressionBuilder,
	type Row,
	createSchema,
	definePermissions,
	relationships,
	string,
	table,
} from "@rocicorp/zero";

const organization = table("organization")
	.columns({
		id: string(),
		parent_id: string(),
	})
	.primaryKey("id");

const appUser = table("app_user")
	.columns({
		id: string(),
	})
	.primaryKey("id");

const userOrganization = table("user_organization")
	.columns({
		user_id: string(),
		organization_id: string(),
	})
	.primaryKey("user_id", "organization_id");

const userRelationships = relationships(appUser, ({ many }) => ({
	organizations: many(
		{
			destField: ["user_id"],
			destSchema: userOrganization,
			sourceField: ["id"],
		},
		{
			destField: ["id"],
			destSchema: organization,
			sourceField: ["organization_id"],
		},
	),
	user_organizations: many({
		destField: ["user_id"],
		destSchema: userOrganization,
		sourceField: ["id"],
	}),
}));

const organizationRelationships = relationships(
	organization,
	({ many, one }) => ({
		users: many(
			{
				destField: ["organization_id"],
				destSchema: userOrganization,
				sourceField: ["id"],
			},
			{
				destField: ["id"],
				destSchema: appUser,
				sourceField: ["user_id"],
			},
		),
		organization_users: many({
			destField: ["organization_id"],
			destSchema: userOrganization,
			sourceField: ["id"],
		}),
		parent: one({
			destField: ["id"],
			destSchema: organization,
			sourceField: ["parent_id"],
		}),
		children: many({
			destField: ["parent_id"],
			destSchema: organization,
			sourceField: ["id"],
		}),
	}),
);

const userOrganizationRelationships = relationships(
	userOrganization,
	({ one }) => ({
		user: one({
			destField: ["id"],
			destSchema: appUser,
			sourceField: ["user_id"],
		}),
		organization: one({
			destField: ["id"],
			destSchema: organization,
			sourceField: ["organization_id"],
		}),
	}),
);

export const schema = createSchema(1, {
	tables: [appUser, organization, userOrganization],
	relationships: [
		userRelationships,
		organizationRelationships,
		userOrganizationRelationships,
	],
});

export type Schema = typeof schema;
export type User = Row<typeof schema.tables.app_user>;
export type Organization = Row<typeof schema.tables.organization>;

// The contents of your decoded JWT.
type AuthData = {
	sub: string;
};

export const permissions = definePermissions<AuthData, Schema>(schema, () => {
	const canReadOrganization = (
		authData: AuthData,
		eb: ExpressionBuilder<Schema, "organization">,
	) =>
		eb.or(
			eb.exists("users", (uq) => uq.where("id", authData.sub)),
			eb.exists("parent", (pq) =>
				pq.whereExists("users", (uq) => uq.where("id", authData.sub)),
			),
		);

	const canReadUser = (
		authData: AuthData,
		eb: ExpressionBuilder<Schema, "app_user">,
	) =>
		eb.exists("organizations", (oq) =>
			oq.where((eb) =>
				eb.or(
					eb.exists("users", (uq) => uq.where("id", authData.sub)),
					eb.exists("parent", (pq) =>
						pq.whereExists("users", (uq) => uq.where("id", authData.sub)),
					),
				),
			),
		);

	const canReadUserOrganization = (
		authData: AuthData,
		eb: ExpressionBuilder<Schema, "user_organization">,
	) =>
		eb.exists("organization", (oq) =>
			oq.where((eb) =>
				eb.or(
					eb.exists("users", (uq) => uq.where("id", authData.sub)),
					eb.exists("parent", (pq) =>
						pq.whereExists("users", (uq) => uq.where("id", authData.sub)),
					),
				),
			),
		);

	return {
		organization: {
			row: {
				select: [canReadOrganization],
			},
		},
		app_user: {
			row: {
				select: [canReadUser],
			},
		},
		user_organization: {
			row: {
				select: [canReadUserOrganization],
			},
		},
	};
});
