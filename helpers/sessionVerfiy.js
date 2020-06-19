exports.sessionVerfiy =(req,res,next)=>{

    if(req.session.user){
         next();
    }else{
        return res.json({
            error:true,
            success:false,
            
        })
    }

}