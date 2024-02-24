const exp=require('express')

const usersAPI = exp.Router()

usersAPI.post('/createUser',async (req,res)=>{
    console.log(req.body)

    const usersCollection = req.app.get("usersCollection")

    await usersCollection.insertOne(req.body)
    
    res.send({message:"new user created"})
})

usersAPI.get('/getUsers',async (req,res)=>{
    

    const usersCollection = req.app.get("usersCollection");

    let data;

    if(req.query.name)
    {
        data = await usersCollection.find({ "registrationDetails.0.name":req.query.name}).toArray();
    }
    else
    {
        data = await usersCollection.find().toArray();
    }

    res.send({message:"users data fetched",payload:data})

})



module.exports = usersAPI;
