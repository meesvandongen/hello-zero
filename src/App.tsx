import { useQuery, useZero } from "@rocicorp/zero/react";
import { useState } from "react";
import type { Schema } from "./schema";

function App() {
	const z = useZero<Schema>();
	const [users] = useQuery(z.query.app_user);
	const [user] = useQuery(z.query.app_user.where("id", "1").one());
	const [userOrganizations] = useQuery(
		z.query.organization.whereExists("users", (q) => q.where("id", "1")),
	);
	const [usersOrganizations] = useQuery(z.query.user_organization);
	const [organizations] = useQuery(z.query.organization);

	const q = (id: string) =>
		z.query.organization.where((eb) =>
			eb.or(
				eb.exists("a_users", (uq) => uq.where("id", id)),
				eb.exists("b_users", (uq) => uq.where("id", id)),
				eb.exists("c_users", (uq) => uq.where("id", id)),
				eb.exists("d_users", (uq) => uq.where("id", id)),
				eb.exists("e_users", (uq) => uq.where("id", id)),
				eb.exists("f_users", (uq) => uq.where("id", id)),
				eb.exists("parent", (oq) =>
					oq.where((eb) =>
						eb.or(
							eb.exists("a_users", (uq) => uq.where("id", id)),
							eb.exists("b_users", (uq) => uq.where("id", id)),
							eb.exists("c_users", (uq) => uq.where("id", id)),
							eb.exists("d_users", (uq) => uq.where("id", id)),
							eb.exists("e_users", (uq) => uq.where("id", id)),
							eb.exists("f_users", (uq) => uq.where("id", id)),
							eb.exists("parent", (oq) =>
								oq.where((eb) =>
									eb.or(
										eb.exists("a_users", (uq) => uq.where("id", id)),
										eb.exists("b_users", (uq) => uq.where("id", id)),
										eb.exists("c_users", (uq) => uq.where("id", id)),
										eb.exists("d_users", (uq) => uq.where("id", id)),
										eb.exists("e_users", (uq) => uq.where("id", id)),
										eb.exists("f_users", (uq) => uq.where("id", id)),
										eb.exists("parent", (oq) =>
											oq.where((eb) =>
												eb.or(
													eb.exists("a_users", (uq) => uq.where("id", id)),
													eb.exists("b_users", (uq) => uq.where("id", id)),
													eb.exists("c_users", (uq) => uq.where("id", id)),
													eb.exists("d_users", (uq) => uq.where("id", id)),
													eb.exists("e_users", (uq) => uq.where("id", id)),
													eb.exists("f_users", (uq) => uq.where("id", id)),
												),
											),
										),
									),
								),
							),
						),
					),
				),
			),
		);

	const [complexOrganizations1] = useQuery(q("1"));
	const [complexOrganizations2] = useQuery(q("2"));
	const [complexOrganizations3] = useQuery(q("3"));
	const [complexOrganizations4] = useQuery(q("4"));
	const [complexOrganizations5] = useQuery(q("5"));
	const [complexOrganizations6] = useQuery(q("6"));

	const [orgId, setOrgId] = useState<string>("org1");

	return (
		<>
			<h1>All Users</h1>
			<pre>{JSON.stringify(users, null, 2)}</pre>

			<h1>All Organizations</h1>
			<pre>{JSON.stringify(organizations, null, 2)}</pre>

			<h1>Complex Organizations</h1>
			<pre>{JSON.stringify(complexOrganizations1, null, 2)}</pre>

			<h1>User</h1>
			<pre>{JSON.stringify(user, null, 2)}</pre>

			<h1>User Organizations</h1>
			<pre>{JSON.stringify(userOrganizations, null, 2)}</pre>
		</>
	);
}

export default App;
