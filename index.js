import express from 'express'
import cors from 'cors'



const app = express();

app.use(cors())

app.get('/questions',(req,res)=> {

    const questions_package = {
        questions: [
            {
                questionTextGerman:"Wie oft treibst du in der Woche Sport",
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
                answerType:"slider",
                answers: [
                    {
                        aTextGerman:"Minuten",
                        valueMin: 5,
                        valueMax:  180 
                    }
                ]
            }
        ]
    }
    
    res.status(200).json(questions_package)
})


app.get("/categories", (req,res) => {

    console.log("Called Categories")
    const categories = ["Abnehmen","Muskeln aufbauen","Yoga","NochwasKeineAhnung"


    ]

    res.status(200).json(categories)
})


app.listen(8080, ()=> {
    console.log('Listening on port 8080')
})


