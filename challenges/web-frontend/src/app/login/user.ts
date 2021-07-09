export interface User {
    emailId: string
    password: string
}

export interface Auth {
    authenticated: boolean
    internalUserId: number
    internalUserUUID: string
    privileges: string
    token:string
    type: number
    userId: string
}