export interface Question {
    id: number;
    question: string;
    answers: string[];
    correctAnswer: number;
    userSelectedAnswer?: number;
    isCorrectUserAnswer?: boolean;
    
}