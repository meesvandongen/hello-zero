import { Zero } from "@rocicorp/zero";
import { ZeroProvider } from "@rocicorp/zero/react";
import { SignJWT } from "jose";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { schema } from "./schema.ts";

const jwt = await new SignJWT({ sub: "2" })
	.setProtectedHeader({ alg: "HS256" })
	.setExpirationTime("30days")
	.sign(new TextEncoder().encode("secretkey"));

const z = new Zero({
	userID: "2",
	auth: jwt,
	server: import.meta.env.VITE_PUBLIC_SERVER,
	schema,
	// This is often easier to develop with if you're frequently changing
	// the schema. Switch to 'idb' for local-persistence.
	kvStore: "mem",
});

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<ZeroProvider zero={z}>
			<App />
		</ZeroProvider>
	</StrictMode>,
);
