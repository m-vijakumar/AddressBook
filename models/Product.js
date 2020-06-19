const mongoose =require("mongoose");
const  Schema = mongoose.Schema;
const productSchema = new Schema({

    title:{
        type: String,
        require:true
    },
    imgsrc:{
        type: String,
        require:true
    },
    description:{
        type: String,
        require:true
    },

    createdOn:{
        type:Date,
        default :Date.now
    }
    
})



const blog = module.exports = mongoose.model("products",productSchema);