exports.getSignup = (req, res) => {
  res.render("../views/signup.ejs", {});
};

exports.postSignup = (req, res) => {
  res.send("signup");
};

exports.getSignin = (req, res) => {
  res.render("../views/login.ejs", {});
};

exports.postSignin = (req, res) => {
  res.send("signin");
};
