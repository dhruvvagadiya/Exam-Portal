import { Question } from "../Question/question.model";
import { User } from "../User/user.model";
import { Category } from "../category/category.model";

export interface Quiz {
    id : number,
    title : string,
    description : string,
    isActive : number,
    marksPerQuestion : number,
    createdAt? : Date,
    updatedAt? : Date,
    category : Category,
    questions : Question [],
    createdBy : User
}