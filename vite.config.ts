import react from "@vitejs/plugin-react";
import dotenv from "dotenv";
import { defineConfig } from "vite";

if (process.env.NODE_ENV === "development") {
	dotenv.config();
}

export default defineConfig({
	build: {
		target: "es2022",
	},
	optimizeDeps: {
		esbuildOptions: {
			target: "es2022",
		},
	},
	plugins: [react()],
});
