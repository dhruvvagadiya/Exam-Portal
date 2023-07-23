export interface User
{
    id: number,
    firstName: string,
    lastName: string,
    email:string,
    userName: string,
    mobile:string,
    gender:number,
    createdAt?:Date,
    updatedAt?:Date,
    profileUrl?:string
}
