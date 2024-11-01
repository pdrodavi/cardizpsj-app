const mongoose=require('mongoose');
const Devschema=new mongoose.Schema({
    firstname:{
        type:String,
        required:false,
    },
    lastname:{
        type:String,
        required: false,
          },
    username_:{
        type:String,
        required: false,
         },      
    email:{
        type:String,
        required: false,
    },
    city:{
        type:String,
        required: false,
    },
    state:{
        type:String,
        required: false,
    },
    zipcode:{
        type:String,
        required: false,
    },
    education:{
        type:String,
        required: false,
    },
    edustate:{
        type:String,
        required: false,
    },
    edunivel:{
        type:String,
        required: false,
    },
    edustart:{
        type:String,
        required: false,
    },
    eduend:{
        type:String,
        required: false,
    },
    academy:{
        type:String,
        required: false,
    },
    course:{
        type:String,
        required: false,
    },
    acting:{
        type:String,
        required: false,
    },
    primarylang:{
        type:String,
        required: false,
    },
    secondarylang:{
        type:String,
        required: false,
    }
});

module.exports=new mongoose.model("Dev", Devschema);