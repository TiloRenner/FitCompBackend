import express from 'express'
import cors from 'cors'



const app = express();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.get('/questions',(req,res)=> {

    const questions_package = {
        steps:4,
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
                questionId:101,
                answerType:"slider",
                answers: [
                    {
                        aTextGerman:"Minuten",
                        valueMin: 5,
                        valueMax:  120,
                        valueDefault:30
                    }
                ]
            },
            {
                questionTextGerman:"Wie viele Liegestütze schaffst du an einem Stück?",
                questionType:"skill",
                questionId:102,
                answerType:"slider",
                answers: [
                    {
                        aTextGerman:"Liegestütze",
                        valueMin: 0,
                        valueMax:  50,
                        valueDefault:20
                    }
                ]
            },
            {
                questionTextGerman:"Wie viele Kniebeuge schaffst du an einem Stück?",
                questionType:"skill",
                questionId:103,
                answerType:"slider",
                answers: [
                    {
                        aTextGerman:"Kniebeuge",
                        valueMin: 0,
                        valueMax:  80,
                        valueDefault:35
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

app.post("/getadjustedproduct", (req,res) =>
    {
        console.log(req.body);


            const baseproduct = 
            {
                category : 1,
                exercises: [
                    {
                        name: "Liegestütze",
                        questionId : 102,
                        reps: 50 
                    },
                    {
                        name: "Kniebeuge",
                        questionId : 103,
                        reps: 40

                    }


                ]
            }

            const adjustedExercises = baseproduct.exercises.map((exercise) =>
                {
                    const matchingAnswer = req.body.answers.find((answer) => answer.questionId == exercise.questionId

                    )
                    exercise.reps = Math.floor(matchingAnswer.valueEntered *1.2)
                    return exercise;

                }
            )

            

            const adjustedProduct = 
            {
                category : 1
            }
            adjustedProduct.exercises = adjustedExercises;



            res.status(200).json({
              message: 'Soon with adjusted product',
              adjustedProduct
            });
          
    }
)


app.listen(8080, ()=> {
    console.log('Listening on port 8080')
})


