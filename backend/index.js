const express = require("express")
const cors = require("cors")
require("dotenv").config()


const {Configuration , OpenAIApi} = require("openai")
const openai = new OpenAIApi(new Configuration({
    apiKey : process.env.api_key
}))
// openai.createChatCompletion({
//     model : "gpt-3.5-turbo",
//     messages : [{role : "user" , content : "act as a shyari writer give me only shayaris"}]
// })
// .then(res=>{
//     console.log(res.data.choices[0].message.content)
// })




const app = express()
app.use(cors())
app.use(express.json())



app.post("/chat" , (req,res)=>{
let {text}  = req.body
console.log(text)

let systemPrompt = "Act as a shyari genrator user provide you keywords as the keyword you will write a shayri"

    try {
        openai.createChatCompletion({
            model : "gpt-3.5-turbo",
            messages : [{role : "system" , content : systemPrompt},
        {role : "user" , content : `the shayri keywork is ${text}`}
        ],
         
            max_tokens : 200,
            
        })
        .then(resp=>{
          let ans =resp.data.choices[0].message.content

           res.send({msg : ans})
        })

        
    } catch (error) {
       console.log(error) 
    }
})


app.listen(process.env.port , ()=>{
    console.log("server is running ")
})