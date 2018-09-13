export interface Question {
  QuestionText: string;
  Id: string;
  IsDeleted: boolean;
}

export interface Answer {
  QuestionId: string;
  AnswerText: string;
  QuestionText: string;
}
