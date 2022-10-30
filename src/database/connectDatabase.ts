import 'dotenv/config'
import { Pool } from 'pg'

export const createDatabaseConnection = async () => {
   const client = new Pool({
      host: process.env.PGHOST,
      user: process.env.PGUSER,
      password: process.env.PGPASSWORD,
      database: process.env.PGDATABASE,
      port: parseInt(process.env.PGPORT!)
   })

   await client.connect()

   return client
}
