const Blog = require("../models/Blog");
const User = require("../models/User");

exports.getPosts = async (req,res) => {
    try {
        const data = await Blog.find().populate("owner likes comments.user"); 
        res.status(200).json(
            {
                success: true,
                data
            }
        )
    } catch (error) {
        res.status(500).json({
            success: false, 
            message: error.message
        })
    }
}

exports.getOnePost = async (req,res) => {
    try {
        const data = await Blog.findById(req.params.id).populate("owner likes comments.user"); 
        res.status(200).json(
            {
                success: true,
                data
            }
        )
    } catch (error) {
        res.status(500).json({
            success: false, 
            message: error.message
        })
    }
}

exports.createPost = async (req,res) => {
    try {
        const newBlogData = {
            caption : req.body.caption, 
            content: req.body.content,
            owner: req.user._id
        } ; 

        const blog = await Blog.create(newBlogData); 
        const user = await User.findById(req.user._id);

        user.posts.unshift(blog._id);

        await user.save(); 
        
        res.status(201).json({
            success: true, 
            message: "Blog Created"
        })

    } catch (error) {
        res.status(500).json({
            success: false, 
            message: error.message
        })
    }
};

exports.deletePost = async (req,res) => {
    try {
        const blog = await Blog.findById(req.params.id); 

        if(!blog){
            return res.status(404).json({
                success: false, 
                message: "Blog not found"
            })
        }

        if(blog.owner.toString()!==req.user._id.toString()){
            return res.status(401).json({
                success: false, 
                message: "Unauthorized"
            })
        }

        await blog.remove();

        const user = await User.findById(req.user._id);

        const index = user.posts.indexOf(req.params.id); 
        user.posts.splice(index,1); 

        await user.save(); 

        res.status(200).json({
            success: true, 
            message: "Blog Deleted"
        })

    } catch (error) {
        res.status(500).json({
            success: false, 
            message: error.message
        })
    }
}; 

exports.likeAndUnlikePost = async (req,res) => {
    try {
        const blog = await Blog.findById(req.params.id); 
        if(!blog){
            return res.status(404).json({
                success: false, 
                message: "Blog Not Found",
            }); 
        }
        if(blog.likes.includes(req.user._id)){
            const index = blog.likes.indexOf(req.user._id); 
            blog.likes.splice(index,1);
            await blog.save();
            return res.status(200).json({
                success: true, 
                blog: blog,
                message: "Blog Unliked"
            })
        }else{
            blog.likes.push(req.user._id); 
            await blog.save();
            return res.status(200).json({
                success: true, 
                blog: blog,
                message: "Blog Liked"
            }) 
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

exports.updateCaption = async (req,res) => {
    try {
        const blog = await Blog.findById(req.params.id); 
        if(!blog){
            return res.status(404).json({
                success: false, 
                message: "Blog not found"
            })
        }
        
        if(blog.owner.toString()!==req.user._id.toString()){
            return res.status(401).json({
                success: false, 
                message: "Unauthorized"
            })
        }

        blog.caption = req.body.caption; 
        await blog.save(); 

        res.status(200).json({
            success: true,
            message: "Blog Updated"
        })


    } catch (error) {
        res.status(500).json({
            success: false, 
            message: error.message
        })
    }
}

exports.commentOnPost = async (req,res) => {
    try {
        const blog = await Blog.findById(req.params.id); 
        if(!blog){
            return res.status(404).json({
                success: false, 
                message: "Blog not found"
            })
        }

        let commentIndex = -1; 

        blog.comments.forEach((item,index) => {
            if(item.user.toString() === req.user._id.toString()){
                commentIndex = index;
            }
        })

        if(commentIndex !== -1){
            blog.comments[commentIndex].comment = req.body.comment;
            await blog.save(); 
            return res.status(200).json({
                success: true, 
                blog: blog,
                message: "Comment Updated"
            });
        }
        else{
            blog.comments.push({user: req.user._id,comment: req.body.comment}); 
            await blog.save(); 
            res.status(200).json({
                success: true,
                blog: blog,
                message: "Commend Added"
            })
    
        }
        
    } catch (error) {
        res.status(500).json({
            success: false, 
            message: error.message
        })
    }
}

exports.deleteComment = async (req,res) => {
    try {
        console.log("req.body.commentId",req.body)
        const blog = await Blog.findById(req.params.id); 

        if(!blog){
            return res.status(404).json({
                success: false, 
                message: "Blog not found"
            })
        }

        if(blog.owner.toString() === req.user._id.toString()){
            if(req.body.commentId === undefined){
                return res.status(400).json({
                    success: false, 
                    message: "Comment Id is required"
                })
            }

        blog.comments.forEach((item,index)=>{
            if(item._id.toString() === req.body.commentId.toString()){
              blog.comments.splice(index,1)
            }
        })
        
        await blog.save();

        return res.status(200).json({
            success: true, 
            message: "Selected comment deleted successfully"
        });
    }
    else{
        blog.comments.forEach((item,index)=>{
            if(item.user.toString() === req.user._id.toString()){
                blog.comments.splice(index,1)
            }
        })
        await blog.save();

        return res.status(200).json({
            success: true, 
            message: "Comment has deleted successfully"
        });

    }

    } catch (error) {
        res.status(500).json({
            success: false, 
            message: error.message
        })
    }
}