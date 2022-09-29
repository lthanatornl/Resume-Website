import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true,
    required: [true, "Please Enter Email"],
  },
  password: {
    type: String,
    required: [true, "Please Enter Password"],
    select: false,
  },

  graduation: [
    {
      place: String,
      degree: String,
      date: Date,
    },
  ],

  projects: [
    {
      url: String,
      title: String,
      image: {
        public_id: String,
        url: String,
      },
      description: String,
      tool: String,
    },
  ],

  about: {
    name: String,
    title: String,
    subtitle: String,
    description: String,
    quote: String,
    avatar: {
      public_id: String,
      url: String,
    },
  },
});

export const User = mongoose.model("User", userSchema);