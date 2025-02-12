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

	const [orgId, setOrgId] = useState<string>("org1");

	return (
		<>
			<h1>Users</h1>
			<pre>{JSON.stringify(users, null, 2)}</pre>

			<h1>Users Organizations</h1>
			<pre>{JSON.stringify(usersOrganizations, null, 2)}</pre>

			<h1>User</h1>
			<pre>{JSON.stringify(user, null, 2)}</pre>

			<h1>User Organizations</h1>
			<pre>{JSON.stringify(userOrganizations, null, 2)}</pre>

			<h1>Organizations</h1>
			<pre>{JSON.stringify(organizations, null, 2)}</pre>

			<button
				type="button"
				onClick={() => {
					z.mutate.user_organization.delete({
						user_id: "1",
						organization_id: "org1",
					});
				}}
			>
				Delete user organization
			</button>
			<input
				type="text"
				value={orgId}
				onChange={(e) => setOrgId(e.target.value)}
			/>

			<button
				type="button"
				onClick={() => {
					z.mutate.user_organization.upsert({
						user_id: "1",
						organization_id: orgId,
					});
				}}
			>
				Add user organization
			</button>
			<button
				type="button"
				onClick={async () => {
					await z.mutate.app_user.upsert({
						id: "1",
					});
					await z.mutate.app_user.upsert({
						id: "2",
					});
					await z.mutate.user_organization.upsert({
						user_id: "2",
						organization_id: "org1",
					});
				}}
			>
				insert users
			</button>
		</>
	);
}

export default App;
