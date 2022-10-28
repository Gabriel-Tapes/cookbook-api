import { v4 as uuidv4 } from 'uuid'

export type AccessLevel = 'user' | 'admin'

export interface UserProps {
    readonly id: string
    name: string
    email: string
    password: string
    accessLevel: AccessLevel
}

export class User {
   private props: UserProps

   get id () {
      return this.props.id
   }

   set name (name: string) {
      if (!name)
         throw new Error('User name error, cannot set a empty name for user')
      this.props.name = name
   }

   get name () {
      return this.props.name
   }

   set email (email: string) {
      if (!email)
         throw new Error('User email error, cannot set a empty email for user')
      this.props.email = email
   }

   get email () {
      return this.props.email
   }

   set password (password: string) {
      if (!password)
         throw new Error('User password error, cannot set a empty password for user')
      this.props.password = password
   }

   get password () {
      return this.props.password
   }

   set accessLevel (accessLevel: AccessLevel) {
      this.props.accessLevel = accessLevel
   }

   get accessLevel () {
      return this.props.accessLevel
   }

   constructor({
      name,
      email,
      password,
      accessLevel        
   }: Omit<UserProps, 'id'>, id?: string) {

      if (!(name && email && password))
         throw new Error('User props error, cannot create a user with name, email or password empty')

      this.props = {
         id: id || uuidv4(),
         name,
         email,
         password,
         accessLevel: accessLevel,
      }
   }
}