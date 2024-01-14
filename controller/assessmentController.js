import mongoose from 'mongoose'
import baseProduct from '../models/baseProductModel.js'
import MongooseHelper from '../utils/mongooseHelper.js'

const AssessmentController =
{

    serveAssessmentQuestions: async function (req,res)
    {

        console.log(req.query.category)

        const category = req.query.category

        if(category)
        {
            const matchingProduct = await baseProduct.findOne({category:category})
            console.log("MatchingProduct: ", matchingProduct)

        }



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
                    questionTextGerman:"Wieviel Minuten kannst du pro Tag für das Training aufwenden?",
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

    },

    serveCategories : async function(req,res){

        console.log(req.query.category)
        //console.log("Called Categories",req.session)
        //const categories = [{id:1, nameGerman:"Abnehmen"},{id:2, nameGerman:"Muskeln aufbauen"},{id:3, nameGerman:"Yoga"},{id:4, nameGerman:"Irgendwas noch"}]

        //var id = mongoose.Types.ObjectId.createFromHexString('65a13215c14823e42b435456')
        //var id = mongoose.mongo.BSONPure.ObjectID.fromHexString('6599134cb4ec8708cde1ddda')
        //const product = await baseProduct.findById(id)
        const products = await MongooseHelper.findAllProducts();

        console.log(products)

        if(products)
        {
            var categories = products.map((product)=> {
                console.log(product)
                return {id: product.category,deprecated:"nameGerman verschwindet bald!!!!",nameGerman:product.info[0].name , info:product.info};
            })
        }
        res.status(200).json(categories)
    },
    serveAdjustedProduct: async function (req,res){
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

}

export default AssessmentController;