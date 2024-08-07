import { config } from "dotenv"
import { defineConfig } from 'drizzle-kit'

config({ path: ".env.local" })

export default defineConfig({
    dialect: 'pg',
    schema: "./db/schema.ts",
    driver: 'pg',
    dbCredentials: {
        connectionString: process.env.DATABASE_URL!,
    },
    verbose: true,
    strict: true
})