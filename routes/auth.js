const router = require("express").Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");

//post register
router.post("/register", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const user = new User({
    email: email,
    password: password,
  });
  return user
    .save()
    .then(() => {
      res.redirect("/auth/login");
    })
    .catch((err) => {
      console.log(err);
    });
});

//login
router.post("/login", async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email }).lean();

  if (!user) {
    return res.json({ status: "error", error: "Invalid email/password" });
  }

  const token = jwt.sign(
    {
      id: user._id,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SEC
  );
  return res.json({ status: "ok", data: token }).redirect("/");
});

//get register page
router.get("/register", async (req, res) => {
  res.render("auth/signup", {
    pageTitle: "Sign up",
    path: "/signup",
  });
});

//get login page
router.get("/login", async (req, res) => {
  res.render("auth/login", {
    pageTitle: "Login up",
    path: "/login",
  });
});

module.exports = router;
