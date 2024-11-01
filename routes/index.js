const router = require('express').Router()
const Todo_model=require('../models/todo');
const apiAdapter = require('./apiAdapter')

//const BASE_URL = 'http://localhost:8080/tithe-management/v1'
const BASE_URL = 'https://apicardizpsj.pdro.com.br/tithe-management/v1'
const api = apiAdapter(BASE_URL)

router.get('/login',(req, res) => {
    res.render('login')
  })

router.get('/' ,(req, res) => {
  res.render('home')
})

router.get("/dizimistas", async(req,res)=>{
  res.render('dizimistas-home')
})

router.get("/dizimistas/buscar", async(req,res)=>{
  res.render('buscar-dizimista')
})

router.get("/relatorios", async(req,res)=>{
  res.render('relatorios-home')
})

router.get("/relatorios/customizados", async(req,res)=>{
  res.render('relatorios-customizados')
})

router.get("/relatorio/customizado", async(req,res)=>{
  const resp = await api.get('/entries/period?interval=' + req.query.datePeriod);
  let entradas = resp.data;
    let totalSoma = 0;
    entradas.forEach(function (item) {
      totalSoma = totalSoma + item.valorPgto;
      item.valorPgto = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.valorPgto);      
    });
    totalSoma = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalSoma); 
    res.render('resultado-relatorio-customizado', {todo:resp.data, valorTotal: totalSoma, period: req.query.datePeriod})
})

router.get("/relatorio/dizimista", async(req,res)=>{
  res.render('relatorio-dizimista')
})

router.get("/relatorio/dizimista/buscar", async(req,res)=>{
  const respDiz = await api.get('/tithers/' + req.query.codDiz + '?searchBy=code');
  api.get('/entries/' + req.query.codDiz + '?searchBy=code').then(resp => {
    let entradas = resp.data;
    let totalSoma = 0;
    entradas.forEach(function (item) {
      totalSoma = totalSoma + item.valorPgto;
      item.valorPgto = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.valorPgto);      
    });
    totalSoma = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalSoma); 
    res.render('resultado-relatorio-dizimista', {todo:resp.data,userinfo:respDiz.data, valorTotal: totalSoma})
  })
})

router.get("/dizimista", async(req,res)=>{

  api.get('/tithers/' + req.query.codDiz + '?searchBy=code').then(resp => {
    res.render('dizimista', {todo:resp.data,userinfo:''})
  })

})

router.get("/dizimistas/lista", async(req,res)=>{
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