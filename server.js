const exp=require('express')
const app=exp()
const cors=require('cors')
const usersAPI = require('./APIs/usersAPI')
const countAPI = require('./APIs/countAPI')
const mclient = require('mongodb').MongoClient

require('dotenv').config()
const PORT = process.env.PORT

const DBurl=process.env.DATA_BASE_URL;

 mclient.connect(DBurl)
 .then((client)=>{
    let dataBase=client.db("social_media_platform")

    let usersCollection=dataBase.collection("users")
    let countCollection=dataBase.collection("count")

    app.set("usersCollection",usersCollection)
    app.set("countCollection",countCollection)
 }).catch(err=>{console.log("error at connecting to the database")})


app.use(exp.json())
app.use(cors())

app.use('/users',usersAPI)
app.use('/count',countAPI)



app.get('',(req,res)=>{ 
    res.send({message:"this server is maintained for [A SOCIAL MEDIA PLATFORM ,maintained by $ UPPUNURI GOUTHAM REDDY $ ].Don't use this API unnecessarily"})
})
app.get('/help',(req,res)=>{
    res.send({message:"services available by this API are :",payload:['1.inserting user data by POST request to mongoDB','2. getting specific user data by user name','3. sending email notification for 2 step verification','4. sending OTP for FORGOT password case','5. updating views of the website']})
})





app.listen(PORT,()=>console.log("server running on port 4000..."))