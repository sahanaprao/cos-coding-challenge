export interface User {
    emailId: string
    password: string
}

export interface Login {
    authenticated: boolean
    internalUserId: number
    internalUserUUID: string
    privileges: string
    token:string
    type: number
    userId: string
}