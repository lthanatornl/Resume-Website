import express from "express";
import {
  login,
  logout,
  getUser,
  myProfile,
  contact,
  updateUser,
  addGraduation,
  addProject,
  deleteGraduation,
  deleteProject,
} from "../controller/controller.js";
import { isAuthenticated } from "../middlewares/auth.js";
export const Router = express.Router();

Router.route("/login").post(login);

Router.route("/logout").get(logout);

Router.route("/user").get(getUser);

Router.route("/oom").get(isAuthenticated, myProfile);

Router.route("/thanatorn/update").put(isAuthenticated, updateUser);

Router.route("/thanatorn/graduation/add").post(isAuthenticated, addGraduation);
Router.route("/thanatorn/project/add").post(isAuthenticated, addProject);

Router.route("/thanatorn/graduation/:id").delete(isAuthenticated, deleteGraduation);
Router.route("/thanatorn/project/:id").delete(isAuthenticated, deleteProject);

Router.route("/contact").post(contact);