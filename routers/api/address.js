const express=require("express");
const router =express.Router();
const bodyparser=require("body-parser");
const key =require("../../setup/connect").TOKEN_KEY;
const addressController = require("../../controllers/address")
const tokenHelper = require("../../helpers/sessionVerfiy")



// @type    POST
//@route    /api/admin/product/create
// @desc    starting router
// @access  PRAVITE 

router.post("/add",tokenHelper.sessionVerfiy,addressController.validCreateCredentials,addressController.create)

// @type    GET
//@route    /api/admin/product/all-post
// @desc    starting router
// @access  PUBLIC

router.get("/all-address",tokenHelper.sessionVerfiy,addressController.getAllAddress)


// @type    POST
//@route    /api/admin/product/post
// @desc    starting router which required post_id
// @access  PUBLIC 

router.post("/get/address",addressController.getAddress)


// @type    POST
//@route    /api/admin/product/update
// @desc    starting router
// @access  PRAVITE 

router.post("/edit",tokenHelper.sessionVerfiy,addressController.validCreateCredentials , addressController.updateContact)


// @type    DELETE
//@route    /api/admin/product/DELETE
// @desc    starting router to delete post
// @access  PRAVITE 

router.delete("/delete",tokenHelper.sessionVerfiy,addressController.deleteContact)

module.exports = router;
