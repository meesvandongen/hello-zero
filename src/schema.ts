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
		a: string(),
		b: string(),
		c: string(),
		d: string(),
		e: string(),
		f: string(),
	})
	.primaryKey("id");

const appUser = table("app_user")
	.columns({
		id: string(),
		a: string(),
		b: string(),
		c: string(),
		d: string(),
		e: string(),
		f: string(),
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
	a_organizations: many({
		destField: ["a"],
		destSchema: organization,
		sourceField: ["a"],
	}),
	b_organizations: many({
		destField: ["b"],
		destSchema: organization,
		sourceField: ["b"],
	}),
	c_organizations: many({
		destField: ["c"],
		destSchema: organization,
		sourceField: ["c"],
	}),
	d_organizations: many({
		destField: ["d"],
		destSchema: organization,
		sourceField: ["d"],
	}),
	e_organizations: many({
		destField: ["e"],
		destSchema: organization,
		sourceField: ["e"],
	}),
	f_organizations: many({
		destField: ["f"],
		destSchema: organization,
		sourceField: ["f"],
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
		a_users: many({
			destField: ["a"],
			destSchema: appUser,
			sourceField: ["a"],
		}),
		b_users: many({
			destField: ["b"],
			destSchema: appUser,
			sourceField: ["b"],
		}),
		c_users: many({
			destField: ["c"],
			destSchema: appUser,
			sourceField: ["c"],
		}),
		d_users: many({
			destField: ["d"],
			destSchema: appUser,
			sourceField: ["d"],
		}),
		e_users: many({
			destField: ["e"],
			destSchema: appUser,
			sourceField: ["e"],
		}),
		f_users: many({
			destField: ["f"],
			destSchema: appUser,
			sourceField: ["f"],
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
			eb.exists("a_users", (uq) => uq.where("id", authData.sub)),
			eb.exists("b_users", (uq) => uq.where("id", authData.sub)),
			eb.exists("c_users", (uq) => uq.where("id", authData.sub)),
			eb.exists("d_users", (uq) => uq.where("id", authData.sub)),
			eb.exists("e_users", (uq) => uq.where("id", authData.sub)),
			eb.exists("f_users", (uq) => uq.where("id", authData.sub)),
			eb.exists("parent", (pq) =>
				pq.where((eb) =>
					eb.or(
						eb.exists("a_users", (uq) => uq.where("id", authData.sub)),
						eb.exists("b_users", (uq) => uq.where("id", authData.sub)),
						eb.exists("c_users", (uq) => uq.where("id", authData.sub)),
						eb.exists("d_users", (uq) => uq.where("id", authData.sub)),
						eb.exists("e_users", (uq) => uq.where("id", authData.sub)),
						eb.exists("f_users", (uq) => uq.where("id", authData.sub)),
						eb.exists("parent", (pq) =>
							pq.where((eb) =>
								eb.or(
									eb.exists("a_users", (uq) => uq.where("id", authData.sub)),
									eb.exists("b_users", (uq) => uq.where("id", authData.sub)),
									eb.exists("c_users", (uq) => uq.where("id", authData.sub)),
									eb.exists("d_users", (uq) => uq.where("id", authData.sub)),
									eb.exists("e_users", (uq) => uq.where("id", authData.sub)),
									eb.exists("f_users", (uq) => uq.where("id", authData.sub)),
								),
							),
						),
					),
				),
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
				delete: [canReadOrganization],
				insert: [canReadOrganization],
				update: {
					preMutation: [canReadOrganization],
				},
			},
		},
		app_user: {
			row: {
				select: [canReadUser],
				delete: [canReadUser],
				insert: [canReadUser],
				update: {
					preMutation: [canReadUser],
				},
			},
		},
		user_organization: {
			row: {
				select: [canReadUserOrganization],
				update: {
					preMutation: [canReadUserOrganization],
				},
				delete: [canReadUserOrganization],
				insert: [canReadUserOrganization],
			},
		},
	};
});
