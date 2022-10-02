const express = require("express")
const {
    register,
    login,
    logout,
    updatePassword, 
    updateProfile,
    deleteMyProfile,
    myProfile,
    getUserProfile,
    forgotPassword,
    resetPassword,
    getMyPosts,
    getUserPosts,
    getAllUsers,
    googleAuth
} = require("../controllers/User")

const {isAuthenticated} = require("../middlewares/auth")
const router = express.Router(); 


router.route("/authgoogle").post(googleAuth);

router.route("/register").post(register); //done

router.route("/login").post(login); //done

router.route("/logout").get(logout); //done

router.route("/update/password").put(isAuthenticated,updatePassword) //done

router.route("/update/profile").put(isAuthenticated,updateProfile) //done

router.route("/delete/me").delete(isAuthenticated,deleteMyProfile) //done but problem in comments

router.route("/me").get(isAuthenticated,myProfile) //done

router.route("/my/posts").get(isAuthenticated,getMyPosts) //done

router.route("/userposts/:id").get(isAuthenticated,getUserPosts) //done

router.route("/user/:id").get(isAuthenticated,getUserProfile) //done

router.route("/users").get(isAuthenticated,getAllUsers)

router.route("/forgot/password").post(forgotPassword) // done

router.route("/password/reset/:token").put(resetPassword)

module.exports = router

