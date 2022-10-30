import { Pool } from 'pg'
import { hash } from 'bcrypt'
import { User, UserProps } from '../../entities/User'
import { IUserRepository } from '../IUsersRepository'
import { createDatabaseConnection } from '../../database/connectDatabase'

export class PostgresUsersRepository implements IUserRepository {
   private client: Pool

   constructor () {
      createDatabaseConnection().then(connection => {
         this.client = connection
      }).catch(err => console.error(err))
   }

   async createUser(user: User): Promise<void> {
      const passwordHash = await hash(user.password, 10)
      await this.client.query(
         'INSERT INTO USERS (ID, NAME, EMAIL, PASSWORD, ACCESSLEVEL) VALUES ($1, $2, $3, $4, $5)',
         [user.id, user.name, user.email, passwordHash, user.accessLevel]
      )
   }

   async getUserByEmail(email: string): Promise<User | null> {
      const { rows } = await this.client.query(
         'SELECT * FROM USERS WHERE EMAIL = $1 LIMIT 1',
         [email]
      )

      if (!rows.length)
         return null

      const {id, name, password, accesslevel: accessLevel} = rows[0]

      return new User({name, email, password, accessLevel}, id)
   }

   async getUserById(id: string): Promise<User> {
      const { rows } = await this.client.query(
         'SELECT * FROM USERS WHERE ID = $1 LIMIT 1',
         [id]
      )

      if (!rows.length)
         return null

      const {name, email, password, accesslevel: accessLevel} = rows[0]

      return new User({name, email, password, accessLevel}, id)
   }

   async getUsersByName(name: string): Promise<Omit<UserProps, 'password'>[]> {
      const { rows } = await this.client.query(
         'SELECT * FROM USERS WHERE NAME LIKE $1', [`%${  name  }%`]
      )

      if (!rows.length)
         return []

      const users = rows.map(user => {
         return {
            id: user.id,
            name: user.name,
            email: user.email,
            accessLevel: user.accesslevel
         }
      })

      return users
   }

   async getAllUsers(): Promise<Omit<UserProps, 'password'>[]> {
      const { rows } = await this.client.query('SELECT * FROM USERS')

      if (!rows.length)
         return []

      const allUsers = rows.map(user => {
         return {
            id: user.id,
            name: user.name,
            email: user.email,
            accessLevel: user.accesslevel
         }
      })

      return allUsers
   }

   async editUser(id: string, { 
      name,
      password,
      accessLevel 
   }: Omit<User, 'id' | 'email'>): Promise<void> {
      const user = await this.getUserById(id)

      if (password) {
         const passwordHash = await hash(password, 10)
         password = passwordHash
      }

      await this.client.query('UPDATE USERS SET NAME = $1, PASSWORD = $2, ACCESSLEVEL = $3 WHERE ID = $4', [
         name || user.name,
         password || user.password,
         accessLevel || user.accessLevel,
         id
      ])
   }

   async deleteUser(id: string): Promise<void> {
      await this.client.query('DELETE FROM USERS WHERE ID = $1', [id])
   }
}