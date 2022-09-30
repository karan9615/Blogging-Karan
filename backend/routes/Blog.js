const express = require("express"); 
const {
    createPost, 
    updateCaption,
    likeAndUnlikePost,
    deletePost,
    commentOnPost,
    deleteComment,
    getPosts, 
    getOnePost
}  = require("../controllers/Blog")
const {isAuthenticated } = require("../middlewares/auth");

const router = express.Router();

router.route("/post/upload").post(isAuthenticated,createPost); //done

router.route("/post/:id")
.get(isAuthenticated,likeAndUnlikePost) //done
.put(isAuthenticated,updateCaption) //done
.delete(isAuthenticated,deletePost); //done

router.route("/posts").get(getPosts); //done

router.route("/post/this/:id").get(getOnePost); //done

router.route("/post/comment/:id") //done
.put(isAuthenticated,commentOnPost) //done
.delete(isAuthenticated,deleteComment);

module.exports = router