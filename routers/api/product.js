const express=require("express");
const router =express.Router();
const bodyparser=require("body-parser");
const key =require("../../setup/connect").TOKEN_KEY;
const productController = require("../../controllers/product")
const tokenHelper = require("../../helpers/sessionVerfiy")


// @type    POST
//@route    /api/admin/product/create
// @desc    starting router
// @access  PRAVITE 

router.post("/create",tokenHelper.sessionVerfiy,productController.create)

// @type    GET
//@route    /api/admin/product/all-post
// @desc    starting router
// @access  PUBLIC

router.get("/all-posts",productController.getAllPosts)


// @type    POST
//@route    /api/admin/product/post
// @desc    starting router which required post_id
// @access  PUBLIC 

router.post("/post",productController.getPost)


// @type    POST
//@route    /api/admin/product/update
// @desc    starting router
// @access  PRAVITE 

router.post("/update",tokenHelper.sessionVerfiy,productController.updatePost)


// @type    DELETE
//@route    /api/admin/product/DELETE
// @desc    starting router to delete post
// @access  PRAVITE 

router.delete("/delete",tokenHelper.sessionVerfiy,productController.deletePost)

module.exports = router;
