const mongoose =require("mongoose");
const bcrypt = require('bcryptjs');


const  Schema = mongoose.Schema;
const userSchema = new Schema({

    email:{
        type: String,
        require:true
    },
    password:{
        type: String,
        require:true
    },
    date:{
        type:Date,
        default :Date.now
    }
    
})

userSchema.pre('save', function(next){
    var user = this;
    const saltRounds = 12;

    if (!user.isModified('password')) {
        console.log("password not modified")
        return next();
    }
    bcrypt.hash(user.password, saltRounds, function(err, hash) {
        console.log("password  modified")
        if (err) {
            return next(err);
        }
        user.password = hash;
        next();
    });
});

userSchema.statics.checkIfUserExists = async(email)=>{

    return await User
      .findOne({email:email})
      .then((result)=>{
        //   console.log(result)
          return result;
      })
      .catch(()=>{
          throw err;
      })
  };
  userSchema.statics.checkIfUserExistsWithId = async(userId)=>{
  
    return await User
      .findOne({_id:userId})
      .then((result)=>{
        //   console.log(result)
          return result;
      })
      .catch(()=>{
          throw err;
      })
  };
  
userSchema.statics.comparePassword = (input_password,current_password)=>{

    return bcrypt.compare(input_password,current_password)
 }
const User = module.exports  = mongoose.model("users",userSchema);