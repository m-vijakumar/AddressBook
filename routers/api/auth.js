const express=require("express");
const router =express.Router();
const bodyparser=require("body-parser");
const key =require("../../setup/connect").TOKEN_KEY;
const userController = require("../../controllers/user")
const tokenHelper = require("../../helpers/sessionVerfiy")


// @type    GET
//@route    /api/admin/auth/register
// @desc    starting router
// @access  PRAVITE

router.get("/auth/verfiy",tokenHelper.sessionVerfiy,(req,res)=>{

    res.json({
        error:false,
        success:true,
        msg:req.session.id
    })
});

// @type    POST
//@route    /api/admin/auth/register
// @desc    starting router
// @access  PUBLIC

router.post("/auth/register",userController.registervalidCredentials,userController.register);

// @type    POST
//@route    /api/admin/auth/login
// @desc    starting router
// @access  PUBLIC
router.post("/auth/login",userController.loginValidCredentials,userController.login);

// @type    DELETE
//@route    /api/admin/auth/logout
// @desc    starting router
// @access  PRAVITE 

router.delete("/logout",tokenHelper.sessionVerfiy, userController.logout )

module.exports =router;