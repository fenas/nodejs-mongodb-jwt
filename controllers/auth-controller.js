const User = require("../models/users");
const jwt = require("jsonwebtoken");
const maxAge = 3 * 24 * 60 * 60;

const createToken = (id) => {
  return jwt.sign({ id }, "some secret", { expiresIn: maxAge });
};

exports.getSignup = (req, res) => {
  res.render("../views/signup.ejs", {});
};

exports.postSignup = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.create({
      email: email,
      password: password,
    });

    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 3 });
    res.status(201).json({ user: user._id });
  } catch (error) {
    let errorHandler = handleErrors(error);
    console.log(errorHandler);
    res.status(400).json({ errorHandler });
  }
};

const handleErrors = (err) => {
  console.log(err);
  let error = { email: "", password: "" };

  if (err.code === 11000) {
    error.email = "email already taken";
    return error;
  }
  Object.values(err.errors).forEach(({ properties }) => {
    error[properties.path] = properties.message;
  });
  return error;
};

exports.getSignin = (req, res) => {
  res.render("../views/login.ejs", {});
};

exports.postSignin = (req, res) => {
  res.send("signin");
};
