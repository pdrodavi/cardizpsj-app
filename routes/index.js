const router = require('express').Router()
const Todo_model=require('../models/todo');
const apiAdapter = require('./apiAdapter')

const BASE_URL = 'http://localhost:8080/tithe-management/v1'
const api = apiAdapter(BASE_URL)

router.get('/login',(req, res) => {
    res.render('login')
  })

router.get('/' ,(req, res) => {
  res.render('home')
})

router.get("/dizimistas", async(req,res)=>{
    api.get('/tithers').then(resp => {
      res.render('dizimistas', {todo:resp.data,userinfo:''})
    })
    
})

// /dizimistas/carnes/

router.get("/dizimistas/carnes/:id", async(req,res)=>{
  api.get('/carnets/' + req.params.id + '?searchBy=code').then(resp => {
    let namefull = resp.data.name;
    let bytes = resp.data.bytes;
    let contentType = resp.data.contentType;
    const myBuffer = Buffer.from(bytes, 'base64');
    res.setHeader('Content-Disposition', 'attachment; filename=' + namefull);
    res.type(contentType);
    res.send(myBuffer)
  })
  
})

router.get("/dizimistas/:id/carnes/pagamento", async(req,res)=>{
  api.get('/tithers/' + req.params.id + '?searchBy=code').then(resp => {
    res.render('carne-pagamento', {todo:resp.data,userinfo:''})
  })
})

router.post("/dizimistas/carnes/pagamento", async (req,res)=>{
  let nomeDiz = req.body.nomeDiz;
  let codDiz = req.body.codDiz;
  let valDiz = req.body.valDiz;
  api.post('/entries', { codDizimista: parseInt(codDiz), valorPgto: parseFloat(valDiz) }).then(resp => {
    res.redirect('/');
  })
  
})

module.exports=router;