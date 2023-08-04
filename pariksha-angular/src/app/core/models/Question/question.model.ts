import { QuestionOptions } from "../QuestionOptions/question-options.model";

export interface Question {
    id : number,
    title : string,
    questionOptionsList : QuestionOptions [],
    createdAt? : Date,
}