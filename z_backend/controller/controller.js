import { User } from "../model/model.js";
import jwt from "jsonwebtoken";
import { sendMail } from "../middlewares/sendMail.js";
import cloudinary from "cloudinary";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email, password });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

    res
      .status(200)
      .cookie("token", token, {
        expires: new Date(Date.now() + 600000),
        httpOnly: true,
      })
      .json({
        success: true,
        message: "LogIn Successfully",
      });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const logout = async (req, res) => {
  try {
    res
      .status(200)
      .cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
      })
      .json({
        success: true,
        message: "LogOut Successfully",
      });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await User.findOne().select("-password -email");

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const myProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const contact = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const userMessage = `Hello, My email is ${email} from ${name}. My message is ${message}.`;

    await sendMail(userMessage);

    return res.status(200).json({
      success: true,
      message: "Message Sent",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    const { name, email, password, about } = req.body;

    if (name) {
      user.name = name;
    }

    if (email) {
      user.email = email;
    }
    if (password) {
      user.password = password;
    }

    if (about) {
      if (about.name) {
        user.about.name = about.name;
      }
      if (about.title) {
        user.about.title = about.title;
      }
      if (about.subtitle) {
        user.about.subtitle = about.subtitle;
      }

      if (about.description) {
        user.about.description = about.description;
      }
      if (about.quote) {
        user.about.quote = about.quote;
      }

      if (about.avatar) {
        await cloudinary.v2.uploader.destroy(user.about.avatar.public_id);

        const Cloud = await cloudinary.v2.uploader.upload(about.avatar, {
          folder: "resume",
        });

        user.about.avatar = {
          public_id: Cloud.public_id,
          url: Cloud.secure_url,
        };
      }
    }

    await user.save();

    res.status(200).json({
      success: true,
      message: "Update Successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const addGraduation = async (req, res) => {
  try {
    const { place, degree, date } = req.body;

    const user = await User.findById(req.user._id);

    user.graduation.unshift({
      place,
      degree,
      date,
    });

    await user.save();

    res.status(200).json({
      success: true,
      message: "Graduation Added",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const addProject = async (req, res) => {
  try {
    const { url, title, image, description, tool } = req.body;

    const user = await User.findById(req.user._id);

    const Cloud = await cloudinary.v2.uploader.upload(image, {
      folder: "resume",
    });
    user.projects.unshift({
      url,
      title,
      description,
      tool,
      image: {
        public_id: Cloud.public_id,
        url: Cloud.secure_url,
      },
    });

    await user.save();

    res.status(200).json({
      success: true,
      message: "Projects Added",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteGraduation = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(req.user._id);

    user.graduation = user.graduation.filter((item) => item._id != id);

    await user.save();

    res.status(200).json({
      success: true,
      message: "Graduation Deleted",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};


export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(req.user._id);

    const project = user.projects.find((item) => item._id == id);

    await cloudinary.v2.uploader.destroy(project.image.public_id);

    user.projects = user.projects.filter((item) => item._id != id);

    await user.save();

    res.status(200).json({
      success: true,
      message: "Projects Deleted ",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};