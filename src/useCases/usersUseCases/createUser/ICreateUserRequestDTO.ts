import { AccessLevel } from '../../../entities/User'

export interface ICreateUserRequestDTO {
  name: string
  email: string
  password: string
  accessLevel: AccessLevel
}
