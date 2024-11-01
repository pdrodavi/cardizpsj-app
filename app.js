const express = require('express');
const path = require('path')
const dotenv = require('dotenv')
const methodOverride = require('method-override')
const passport = require('passport')
const session = require('express-session')
const compression = require('compression');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');

var app=express();
const PORT = process.env.PORT||3000;
//dotenv.config({ path: './config/config.env' })
// Connect to mongodb
// mongoose.connect("mongodb://localhost/todo_list",{
//mongoose.connect(process.env.MONGO_URI,{
  //  useNewUrlParser:true,
  //  useUnifiedTopology: true
//})

// Passport config
//require('./config/passport')(passport)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(compression());
app.use(morgan('dev'));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({ extended: true , limit: '50mb'}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(require("./routes/index"))
app.use('/auth', require('./routes/auth'))
app.use(require("./routes/todo"))

app.use(function(req, res) {
  res.status(404).render('401', {
    message: 'Not Found!'
  });
});


// app.listen(3000, '192.168.101.9');
app.listen(PORT,console.log(`listening at ${PORT}`))
