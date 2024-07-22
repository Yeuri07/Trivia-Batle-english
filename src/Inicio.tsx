import { Card, Typography,List,ListItem,ListItemButton,ListItemText, Stack, IconButton } from "@mui/material"
import { useQuestionsStore } from "./store/questions"
import { type Question as QuestionType } from "./types"
import { ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material"
import { Footer } from "./Footer"


const getBackgroundColor = (info: QuestionType, index: number) =>{
    const { userSelectedAnswer, correctAnswer} = info

    if(userSelectedAnswer == null) return 'transparent'

    if(index !== correctAnswer && index !== userSelectedAnswer) return 'transparent'
    
    if(index === correctAnswer) return 'green'
    if(index === userSelectedAnswer) return 'red' 

    return 'transparent'
}

const Question = ({info }: { info: QuestionType}) =>{
    const selectAnswer = useQuestionsStore(state => state.selectAnswer)

    const createHandleClick = (answerIndex: number) => () => {
        selectAnswer(info.id, answerIndex)
    }


    return (
        <Card variant='outlined' sx={{bgcolor: '#222', p: 4, textAlign: 'left', marginTop: 4}}>
            <Typography variant='h5'>
                {info.question}
            </Typography>

            <List sx={{bgcolor: '#333', marginTop: 3}} disablePadding>
                {info.answers.map((answer, index) =>(
                    <ListItem  key={index} disablePadding divider>
                        <ListItemButton
                        disabled={info.userSelectedAnswer != null}
                        onClick={createHandleClick(index)}
                        onTouchStart={createHandleClick(index)}
                        sx={{backgroundColor: getBackgroundColor(info, index)}}>
                            <ListItemText primary={answer} sx={{textAlign:'center'}}/>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Card>
    )
}

export const Inicio = () =>{
    const questions = useQuestionsStore(state => state.questions)
    const currentQuestion = useQuestionsStore(state => state.currentQuestion)
    const nextQuestion = useQuestionsStore(state => state.nextQuestion)
    const previousQuestion = useQuestionsStore(state => state.previousQuestion)
 
    const questionInfo = questions[currentQuestion]

 return(
    <>
        <Stack direction='row' gap={2} alignItems='center' justifyContent='center'>
            <IconButton onClick={previousQuestion} disabled={currentQuestion === 0}>
                <ArrowBackIosNew />
            </IconButton>

            { currentQuestion + 1} / {questions.length}

            <IconButton onClick={nextQuestion} disabled={currentQuestion >= questions.length -1}>
                <ArrowForwardIos />
            </IconButton>
        </Stack>
        <Question info={questionInfo}/>
        <Footer />
    </>
 )

}