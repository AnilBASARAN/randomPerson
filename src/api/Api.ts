export interface User {
cell: string
dob:{date:Date,age:number}
email: string
gender:string
id: {name:string,value:string}
location: {street:{number:number,name:string},city:string,state:string,country:string,postcode:number}
name:{title:string,first:string,last:string} 
phone: string
picture: {large:string,medium:string,thumbnail:string}
}

export interface UserDetail {
  user: User
}

export interface UserList {
  results?: User[]
  users: User[]
}

export interface UserLog {
  IPAddress?: string
  boolData?: Record<string, boolean>
  creDate: string
  dataMap?: Record<string, any>
  id: string
  message?: string
  ownerId: string
  stringData?: Record<string, string>
  targetId?: string
}

export enum UserState {
  UserStateDraft = 'draft',
  UserStateActive = 'active',
}
