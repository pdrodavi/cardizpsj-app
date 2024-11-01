const router=require('express').Router()
const Todo_model=require('../models/todo')
const Dev_model=require('../models/dev')
const { ensureAuth, ensureGuest } = require('../middleware/auth')

router.post('/add/todo',(req,res)=>{
    const {todo}=req.body;
    //const {email_}=req.user.email;
    const {username}=req.user.username;
    const newTodo=new Todo_model({todo,username_:req.user.username,done:"0"})
    if(todo==""){
        res.redirect('/')
    }
    newTodo.save()
    .then(()=>{
        console.log("done")
        res.redirect('/')
    })
    .catch(err=>console.log(err))

})
.get("/delete/todo/:_id",(req,res)=>{
    const {_id}=req.params;
    Todo_model.deleteOne({_id})
    .then(()=>{
        console.log("deleted")
        res.redirect('/')
    })
    .catch((err)=>console.log(err));
})

.get("/update/todo/:_id",(req,res)=>{
    const {_id}=req.params;
    const info=Todo_model.find();
    console.log(info)
    Todo_model.updateOne({_id}, { done:"1"})
    .then(()=>{
        console.log("deleted")
        res.redirect('/')
    })
    .catch((err)=>console.log(err));
});

router.get('/push', ensureAuth, async(req,res) => {
    const user=await Todo_model.find({username_:req.user.username});
    res.render('push',{todo:user,userinfo:req.user})
})

router.post('/add/cv',(req,res)=>{
    const {firstname, lastname, username, email, city, state, zipcode} = req.body;
    
    const newDev=new Dev_model({firstname, lastname, username_:username, email, city, state, zipcode})
    
    if(req.body==""){
        res.redirect('/')
    }
    newDev.save()
    .then(()=>{
        console.log("done")
        res.redirect('/')
    })
    .catch(err=>console.log(err))

})

module.exports=router;