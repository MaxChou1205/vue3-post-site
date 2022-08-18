export interface NewUser {
  username: string
  password: string
}

export interface IUser extends NewUser {
  id: string
}