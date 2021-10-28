# README

This is a readme

## Add this back if you decide to use proxy

```
generator prisma_client {
provider = "prisma-client-js"
binaryTargets = ["native"]
// previewFeatures = ["dataProxy"]
}

"prisma:generate": "source .env && PRISMA_CLIENT_ENGINE_TYPE='dataproxy' prisma generate",
"prisma:migrate": "source .env && DATABASE_URL=\"$MIGRATE_DATABASE_URL\" prisma migrate deploy"
```
