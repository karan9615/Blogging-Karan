const User = require("../models/User");
const Blog = require("../models/Blog");
const { sendEmail } = require("../middlewares/sendEmail");
const crypto = require("crypto");

// const { OAuth2Client } = require("google-auth-library");
// const client = new OAuth2Client(process.env.CLIENT_ID);

// exports.googleAuth = async (req, res) => {
//   try {
//     const { token } = req.body;
//     const ticket = await client.verifyIdToken({
//       idToken: token,
//       audience: process.env.CLIENT_ID,
//     });
//     const { name, email } = ticket.getPayload();
//     let user = await User.findOne({ email });
//     if (user) {
//       return res.status(400).json({
//         success: false,
//         message: "User already exists",
//       });
//     }
//     //   const user = await User.upsert({
//     //     where: { email: email },
//     //     update: { name },
//     //     create: { name, email },
//     //   });
//     user = await User.create({
//       name,
//       email,
//     });

//     const temp_token = await user.generateToken();

//     const options = {
//       expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
//       httpOnly: true,
//     };

//     res.status(201).cookie("token",temp_token, options).json({
//       success: true,
//       user,
//       temp_token,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    user = await User.create({
      name,
      email,
      password,
    });

    const token = await user.generateToken();

    const options = {
      expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };

    res.status(201).cookie("token", token, options).json({
      success: true,
      user,
      token,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email })
      .select("+password")
      .populate("posts");
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User does not exist",
      });
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Incorrect Password",
      });
    }

    const token = await user.generateToken();

    const options = {
      expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };

    res.status(200).cookie("token", token, options).json({
      success: true,
      user,
      token,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.logout = async (req, res) => {
  try {
    res
      .status(200)
      .cookie("token", null, { expires: new Date(Date.now()), httpOnly: true })
      .json({
        success: true,
        message: "Logged Out",
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updatePassword = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("+password");

    const { oldpassword, newpassword } = req.body;

    if (!oldpassword || !newpassword) {
      return res.status(400).json({
        success: false,
        message: "Please provide old and new passwords",
      });
    }

    const isMatch = await user.matchPassword(oldpassword);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Incorrect Old password",
      });
    }

    user.password = newpassword;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password Updated",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    const { name, email } = req.body;

    if (name) {
      user.name = name;
    }
    if (email) {
      user.email = email;
    }

    await user.save();

    res.status(200).json({
      success: true,
      message: "Profile updated",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteMyProfile = async (req, res) => {
  try {
    const temp_user = await User.findById(req.user._id);
    const user_blog = temp_user.posts;
    const userId = temp_user._id;
    await temp_user.remove();
    // res.cookie("token",null,{
    //     expires: new Date(Data.now()),
    //     httpOnly :true
    // });
    res.clearCookie("token");

    for (let i = 0; i < user_blog.length; i++) {
      const temp = await Blog.findById(user_blog[i]);
      await temp.remove();
    }

    const allBlogs = await Blog.find();
    for (let i = 0; i < allBlogs.length; i++) {
      const temp = await Blog.findById(allBlogs[i]._id);
      // const temp = allBlogs[i];
      for (let j = 0; j < temp.comments.length; j++) {
        if (temp.comments[j].user.toString() === userId.toString()) {
          console.log("found the user: ", temp.comments[j].user);
          temp.comments.splice(j, 1);
        }
      }
      await temp.save();
    }

    for (let i = 0; i < allBlogs.length; i++) {
      const temp = await Blog.findById(allBlogs[i]._id);
      // const temp = allBlogs[i];
      for (let j = 0; j < temp.likes.length; j++) {
        if (temp.likes[j].toString() === userId.toString()) {
          temp.likes.splice(j, 1);
        }
      }
      await temp.save();
    }

    res.status(200).json({
      success: true,
      message: "Profile deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.myProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("posts");
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate("posts");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({
      name: { $regex: req.query.name, $options: "i" },
    });

    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const resetPasswordToken = user.getResetPasswordToken();

    await user.save();

    const resetUrl = `${req.protocol}://${req.get(
      "host"
    )}/password/reset/${resetPasswordToken}`;

    const message = `Reset your password by clicking on the link below: \n\n ${resetUrl}`;

    try {
      await sendEmail({
        email: user.email,
        subject: "Reset Password",
        message: message,
      });
      res.status(200).json({
        success: true,
        message: `email sent to ${user.email}`,
      });
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save();
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Token is invalid or has expired",
      });
    }

    user.password = req.body.password;

    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password Updated",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getMyPosts = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const userBlogs = [];
    for (let i = 0; i < user.posts.length; i++) {
      const blog = await Blog.findById(user.posts[i]).populate(
        "likes comments.user owner"
      );
      userBlogs.push(blog);
    }
    res.status(200).json({
      success: true,
      userBlogs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getUserPosts = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const userBlogs = [];
    for (let i = 0; i < user.posts.length; i++) {
      const post = await Blog.findById(user.posts[i]).populate(
        "likes comments.user owner"
      );
      userBlogs.push(post);
    }
    res.status(200).json({
      success: true,
      userBlogs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
