
import { Container,Typography,Stack } from '@mui/material'
import './App.css'
import { Start } from './Start'
import { useQuestionsStore } from './store/questions'
import { Inicio } from './Inicio'

function App() {
 const questions = useQuestionsStore(state => state.questions)
 

  return (
  
      <main>
        <Container maxWidth='sm'>
            <Stack direction='row' gap={2} alignItems='center' justifyContent='center'>
          <Typography variant='h2' component='h1'>
              TRIVIA BATTLE 2024 HANDOUT
          </Typography>
            </Stack>

          {questions.length === 0 && <Start />}
          {questions.length > 0 && <Inicio />}
      </Container>
      </main>
 
  )
}

export default App
