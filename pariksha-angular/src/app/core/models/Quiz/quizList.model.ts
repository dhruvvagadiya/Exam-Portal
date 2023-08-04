import { Category } from "../category/category.model";

export interface QuizList {
    id : number,
    title : string,
    description : string,
    numberOfQuestions : number,
    marksPerQuestion : number,
    category : Category,
    isActive : number
}