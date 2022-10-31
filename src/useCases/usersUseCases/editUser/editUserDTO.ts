import { AccessLevel } from '../../../entities/User'

export interface IEditUserDTO {
    name?: string
    password?: string
    accessLevel?: AccessLevel
}