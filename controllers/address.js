const User = require("../models/User");
const { findOne, findOneAndUpdate } = require("../models/User");


exports.validCredentials = (req,res,next) =>{

    req.assert("postId", "Not Found").notEmpty();

    req.getValidationResult(req,res,next)
    .then((result)=>{
        if(!result.isEmpty()){
            
           console.log( result.array()[0].msg)
            return res.status(400).json({
                error : true,
                message : result.array()[0].msg
            })
        }
        next();
    });
};

exports.validCreateCredentials = (req,res,next) =>{

    req.assert("name", "name Should not be Empty").notEmpty();
    req.assert("phoneno", "phone no Should not be Empty").notEmpty();
    // req.assert("phoneno", "Phone no cannot be empty.").len(10,12);
    req.assert("phoneno", "invalid phone no").isNumeric();
    req.assert("phoneno", "phone no Should not be invaild").len(10,12);

    req.getValidationResult(req,res,next)
    .then((result)=>{
        if(!result.isEmpty()){
            
           console.log( result.array()[0].msg)
            return res.status(400).json({
                error : true,
                message : result.array()[0].msg
            })
        }
        next();
    });
};
exports.create = async(req,res) =>{

    const {name , phoneno , address} = req.body;

    const addressData = {
        name:name,
        phoneno:phoneno,
        address:address
    }

    console.log(addressData)
    await User.findOne({_id:req.session.user.id,"addresses.phoneno":phoneno})
    
    .then(async(r)=>{

        if(r == null){
            console.log(r)
            await User.findOneAndUpdate({_id:req.session.user.id},
                        { $push:{
                            addresses :{ 
                                $each : [ addressData ],
                                "$sort": { name: 1 },
                                collation :{ locale: "en" }
                            },
                        }},
                        { new:true, password:0, __v:0 }).collation({'locale':'en'})
                .then((result)=>{
                    res.json({
                        error:false,
                        msg:"phone number Added",
                    })
                })
                .catch((err)=>{
                    console.log(err)
                    res.json({
                        error:true,
                        msg:"internal Error...!!!"
                    })
                })
        }else{
            console.log(r)
            res.json({
                error:true,
                msg:"phone number Already Exist"
            })
        }
        
    })
    .catch((err)=>{
        res.json({
            error:true,
            msg:"internal Error...!"
        })
    })

};


exports.getAllAddress = async(req,res)=>{

    await User.findOne({_id:req.session.user.id},{password:0,__v:0})
                .then((result)=>{
                    res.json({
                        error:false,
                        data:result
                    })
                }).catch((err)=>{
                    res.json({
                        error:true,
                        msg:"err  :"+err
                    })
                })
}


exports.getAddress = async(req,res)=>{

    console.log(req.body.postId);
    await User .findOne({_id:req.session.user.id, "addresses._id": req.body.postId },{"addresses.$":1})
                .then((result)=>{
                    // console.log(result.addresses[0])
                    if (result) {
                        
                        return res.json({
                            error:false,
                            data:result.addresses[0]
                        })
                    } else {
                        return res.json({
                            error:true,
                            msg:"error...!"
                        })
                    }
                    
                }).catch((err)=>{
                    res.json({
                        error:true,
                        msg:"err  :"+err
                    })
                })
}


exports.updateContact = async(req,res)=>{

    const {name , phoneno , address , postId} = req.body;

    const addressData = {
        _id : req.body.postId,
        name:name,
        phoneno:phoneno,
        address:address
    }

    await User
    // )
    .findOne({
        $and:[{_id:req.session.user.id},
        {"addresses.phoneno":phoneno },
        {"addresses._id" :{"$eq":req.body.postId}}]
     })
    
    .then(async(r)=>{

        
        if(r == null){
            console.log(r)
            
            await User .findOneAndUpdate({_id:req.session.user.id,"addresses._id":req.body.postId},
                            {"addresses.$" :addressData },
                            {new:true,password:0,__v:0})
                        .then((result)=>{
                            console.log(result)
                            return res.json({
                                error:false,
                                data:result
                            })
                        }).catch((err)=>{
                            res.json({
                                error:true,
                                msg:"err  :"+err
                            })
                        })
        }else{
            console.log(r)
            return res.json({
                error:true,
                msg:"phone number Already Exist"
            })
        }
        
    })
    .catch((err)=>{
        console.log(err)
        return res.json({
            error:true,
            msg:"internal Error...!"
        })
    })

};

exports.deleteContact = async(req,res)=>{

    await User.findOneAndUpdate({_id:req.session.user.id,"addresses._id": req.body.postId },
                    { $pull :{addresses :{_id : req.body.postId}} },( err)=>{

            if (err) {
                console.log(err)
                return res.json({
                    error:true,
                    msg:"internal error...!"
                })
            }
            // console.log(result)
            return res.json({
                error:false,
                msg:"post deleted"
            })
        
    })
              
}