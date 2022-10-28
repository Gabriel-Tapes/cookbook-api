import { User, UserProps } from '../../entities/User'
import { IUserRepository } from '../IUsersRepository'

export class InMemoryUsersRepository implements IUserRepository {
   private users: User[] = [] 
    
   async createUser(user: User): Promise<void> {
      this.users.push(user)
   }
   async getUserByEmail(email: string): Promise<User | null> {
      const user = this.users.find(user => user.email == email)
      if (!user)
         return null

      return user
   }
   async getUserById(id: string): Promise<User | null> {
      const user = this.users.find(user => user.id == id)
      if (!user)
         return null

      return user
   }
   async getUsersByName(name: string): Promise<Omit<UserProps, 'password'>[]> {
      const users = this.users.filter(user => user.name.indexOf(name) > -1)

      return users
   }
   async getAllUsers(): Promise<Omit<UserProps, 'password'>[]> {
      return this.users
   }
   async editUser(id: string, { name, password, accessLevel }: Omit<User, 'id' | 'email'>): Promise<void> {
      const indexUser = this.users.findIndex(user => user.id == id)

      const user = this.users[indexUser]

      const editedUser = new User({
         name: name || user.name,
         email: user.email,
         password: password || user.password,
         accessLevel: accessLevel || user.accessLevel
        
      }, id)

      this.users[indexUser] = editedUser
   }
   async deleteUser(id: string): Promise<void> {
      this.users = this.users.filter(user => user.id != id)
   }
}