import express from 'express'
import cors from 'cors'



const app = express();

app.use(cors())

app.get('/questions',(req,res)=> {

    const questions_package = {
        steps:2,
        questions: [
            {
                questionTextGerman:"Wie oft treibst du in der Woche Sport",
                questionType:"skill",
                questionId:100,
                answerType:"fixed",
                answers: [
                    {
                        aTextGerman:"Niemals",
                        value: 1  
                    },
                    {
                        aTextGerman:"1 mal in der Woche",
                        value: 10  
                    },
                    {
                        aTextGerman:"2-4 mal in der Woche",
                        value: 50  
                    },
                    {
                        aTextGerman:"20 mal in der Woche",
                        value: 100  
                    }

                ]
            },
            {
                questionTextGerman:"Wieviel Zeit kannst du pro Tag für das Training aufwenden?",
                questionType:"skill",
                questionID:101,
                answerType:"slider",
                answers: [
                    {
                        aTextGerman:"Minuten",
                        valueMin: 5,
                        valueMax:  180,
                        valueDefault:30
                    }
                ]
            }
        ],
        results:[
            {test:0}

        ]
    }
    
    res.status(200).json(questions_package)
})


app.get("/categories", (req,res) => {

    console.log("Called Categories")
    const categories = [{id:1, nameGerman:"Abnehmen"},{id:2, nameGerman:"Muskeln aufbauen"},{id:3, nameGerman:"Yoga"},{id:4, nameGerman:"Irgendwas noch"}


    ]

    res.status(200).json(categories)
})


app.listen(8080, ()=> {
    console.log('Listening on port 8080')
})


