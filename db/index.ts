import { drizzle } from 'drizzle-orm/neon-http'
import { neon } from '@neondatabase/serverless'
import * as schema from './schema'

function createDb() {
  if (!process.env.DATABASE_URL) {
    // During build time, DATABASE_URL might not be available
    // Only warn during build, don't throw - runtime calls will fail naturally
    console.warn('DATABASE_URL not set - database features will not work')
    return null as any
  }

  const sql = neon(process.env.DATABASE_URL)
  return drizzle(sql, { schema })
}

export const db = createDb()

export * from './schema'
