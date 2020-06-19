const User = require("../models/User");
const key =require("../setup/connect").TOKEN_KEY;
exports.ss =(req,res)=>{

    return res.send(req.session.user)
}

exports.registervalidCredentials = (req,res,next) =>{

    req.assert("email", "Email cannot be empty.").notEmpty();
    req.assert("email", "invalied Email").isEmail();
    req.assert("password", "Password cannot be empty").notEmpty();
    req.assert("password", "Password must be greater then 6 characters").len(6,20);

    req.getValidationResult(req,res,next)
    .then((result)=>{
        if(!result.isEmpty()){
            // result.useFirstErrorOnly();.array({useFirstErrorOnly:true});
           console.log( result.array()[0].msg)
            return res.status(400).json({
                error : true,
                msg : result.array()[0].msg
            })
        }
        next();
    });
};
exports.loginValidCredentials = (req,res,next) =>{

    req.assert("email", "Email cannot be empty.").notEmpty();
    req.assert("email", "invalied Email").isEmail();
    req.assert("password", "Password cannot be empty").notEmpty();
    req.assert("password", "Invailed Email Or password").len(6,20);

    req.getValidationResult(req,res,next)
    .then((result)=>{
        if(!result.isEmpty()){
            // result.useFirstErrorOnly();.array({useFirstErrorOnly:true});
           console.log( result.array()[0].msg)
            return res.status(400).json({
                error : true,
                msg : result.array()[0].msg
            })
        }
        next();
    });
};

exports.register = async(req,res) =>{

    const email = req.body.email;
    const password = req.body.password;
     
   await User.find({}).countDocuments()
        .then(async(r)=>{

            // if (r < 1) {
            
              await User.checkIfUserExists(email)
                .then(async(result)=>{
                    console.log(result+"&&"+result)
                    if(result && result._id){
                        console.log(result+"&&"+result._id)
                        return res.status(400).json({
                            error: true,
                            msg: "USER_ALREADY_EXISTS"
                        });
                    }

                    let userobj ={email : email ,password:password }
                    let user = new User(userobj);
                    user.save()

                        .then(()=>{

                                const userData = {
                                    id : user.id,
                                    email : user.email,
                                }  
                                try {
                                    req.session.user = userData ;
                                    return res.json({
                                        error:false,
                                        success:true
                                        })
                                } catch (error) {
                                    return res.json({
                                        error:true,
                                        msg:"internal Error...!"
                                    })
                                }   

                        })
                        .catch(e=>{
                            console.log(e);
                            return res.json({
                                error:true,
                                msg:"internal Error...!"
                            })
                        })

                })
                .catch((err)=>{
                    return res.status(500).json({
                        error: true,
                        msg: err.message
                    });
                });

            // } else {
            //     console.log(r)
            //     return res.json({
            //         error:true,
            //         msg:"Sorry Your Not Allowed To Register"
            //     }) 
            // }
    
        })
        .catch((err)=>{
            return res.status(500).json({
                error: true,
                msg: err.message
            });
        });

};


exports.login= (req,res)=>{

    const email = req.body.email;
    const password =req.body.password;

    User.checkIfUserExists(email)
        .then(async(result)=>{
            // console.log(result)
            if( !result || !result._id){
                
                return res.json({
                    error: true,
                     msg: "USER_DOESN'T_FOUND"
                });
            }
                    const userData = {
                        id : result.id,
                        email : result.username,
                    }
            User.comparePassword(password,result.password)
                  .then((isMatch)=>{

                    if(isMatch){
                        const payload ={
                            id:result.id,
                            email :result.email,
                        };

                        try {
                            req.session.user = payload ;
                            return res.json({ 
                                error:false,
                                success:true})
                        } catch (error) {
                            return res.json({
                                error:true,
                                msg:"internal Error...!"
                            })
                        }  

                      }else{

                        return res.status(401).json({
                            error:true,
                            msg:"invalid Email or Password"
                        })
                      }

                    })
                    .catch((err)=>{
                        return res.json({
                            error: true,
                            msg:err
                        });
                    })
        })

};

exports.logout =(req,res)=>{
    try {
        req.session.destroy();
        return res.json({
            error:false,
            msg:""
        })
    } catch (error) {

        return res.json({
            error:true,
            msg:error
        })
    }
    

}