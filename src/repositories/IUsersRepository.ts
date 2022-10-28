import { User, UserProps } from '../entities/User'

export interface IUserRepository {
    createUser(user: User): Promise<void>
    getUserByEmail(email: string): Promise<User | null>
    getUserById(id: string): Promise<User | null>
    getUsersByName(name: string): Promise<Omit<UserProps, 'password'>[]>
    getAllUsers(): Promise<Omit<UserProps, 'password'>[]>
    editUser(id: string, {
       name,
       password,
       accessLevel
    }: Omit<User, 'id' | 'email'>): Promise<void>
    deleteUser(id: string): Promise<void>
}