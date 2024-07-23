import { create } from "zustand";
import { type Question } from "../types";
import { persist } from "zustand/middleware";
import confetti from 'canvas-confetti'


interface State {
    questions: Question[]
    currentQuestion: number
    fetchQuestions: (limit: number) => Promise<void>
    selectAnswer:(questionId: number, answerIndex: number) => void
    nextQuestion: () => void
    previousQuestion: () => void
    reset: () => void
}


const shuffleAnswers = (questions: Question[]): Question[] => {
    return questions.map(item => {
        const answers = [...item.answers];
        const correctAnswer = item.correctAnswer;

        // Mezclar las respuestas
        for (let i = answers.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [answers[i], answers[j]] = [answers[j], answers[i]];
        }

        // Encontrar el nuevo índice de la respuesta correcta
        const newCorrectAnswer = answers.indexOf(item.answers[correctAnswer]);

        // Retornar el nuevo objeto con las respuestas mezcladas y el nuevo índice de la respuesta correcta
        return {
            ...item,
            answers: answers,
            correctAnswer: newCorrectAnswer,
        };
    });
};

export const useQuestionsStore = create<State>()(persist((set, get) => {
    return {

        questions: [],
        currentQuestion: 0, // posicion del la questions.

        fetchQuestions: async (limit: number) => {
            const res = await fetch('./data.json')
            
            const json = await res.json()
           
            let questions = json.sort(()=> Math.random() - 0.5).slice(0,limit)
            questions = shuffleAnswers(questions) 

            set({questions})
        },

        selectAnswer: (questionId: number, answerIndex: number) =>{
            const { questions } = get()

            const newQuestions = structuredClone(questions)
            const questionIndex = newQuestions.findIndex(x => x.id === questionId)
            const questionInfo = newQuestions[questionIndex]
            
            const isCorrectUserAnswer = questionInfo.correctAnswer === answerIndex
            if(isCorrectUserAnswer) confetti()
            newQuestions[questionIndex] = {
                ...questionInfo,
                isCorrectUserAnswer,
                userSelectedAnswer: answerIndex
            }

            set({questions: newQuestions})
        },

        nextQuestion: () => {
            const { currentQuestion, questions} = get()
            const nextQuestions = currentQuestion + 1

            if(nextQuestions < questions.length) {
                set({currentQuestion: nextQuestions})
            }

        },
        previousQuestion: () => {
            const { currentQuestion} = get()
            const previousQuestions = currentQuestion - 1

            if(previousQuestions >= 0) {
                set({currentQuestion: previousQuestions})
            }

        },

        reset: () => {
            set({currentQuestion: 0, questions: []})
        }
    }
},{
    name: 'questions',
}))