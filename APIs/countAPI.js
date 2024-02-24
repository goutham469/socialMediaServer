const exp=require('express')
const countAPI=exp.Router()
let {ObjectId}=require("mongodb")

countAPI.use(exp.json())


countAPI.post('',async (req,res)=>{
    let countCollection=req.app.get("countCollection")
    await countCollection.insertOne({"views":0});
})



countAPI.get('/modifyCount',async (req,res,next)=>{

    let countCollection=req.app.get("countCollection")

    let count = await countCollection.find().toArray()
    count=count[0].views

    console.log(count);
    count+=1

    await countCollection.updateOne({_id:new ObjectId("65d79e5115498d485752735a")},{$set:{views:count}})

    res.send({message:"count value modified",payload:count})
})


module.exports=countAPI;