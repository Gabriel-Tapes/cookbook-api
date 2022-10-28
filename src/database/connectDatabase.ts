import { config } from 'dotenv'
import { Pool } from 'pg'

config({
   path: process.env.NODE_ENV == 'test' ? '../../.env.test' : '../../.env'
})

export const createDatabaseConnection = async () => {
   const client = new Pool({
      host: process.env.PGHOST,
      user: process.env.PGUSER,
      password: process.env.PGPASSWORD,
      database: process.env.PGDATABASE,
      port: parseInt(process.env.PGPORT)
   })

   await client.connect()

   return client
}
