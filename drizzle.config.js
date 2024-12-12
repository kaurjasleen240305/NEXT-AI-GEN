
/** @type { import("drizzle-kit").Config } */

export default {
    schema : "./configs/schema.js",
    dialect:"postgresql",
    dbCredentials:{
        url:'postgresql://neondb_owner:B2cuRtweE1JH@ep-super-math-a5xgcppi.us-east-2.aws.neon.tech/next-ai-gen?sslmode=require'
    }
}