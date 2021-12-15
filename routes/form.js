const router = require("express").Router();
const Form = require("../models/Form");
const { verifyTokenAndAdmin } = require("../middleware/verifyToken");
const jwt = require("jsonwebtoken");

//Post Form
router.post("/form", async (req, res) => {
  const name = req.body.name;
  const course = req.body.course;
  const phoneNumber = req.body.phoneNumber;
  const form = new Form({
    name: name,
    course: course,
    phoneNumber: phoneNumber,
  });
  form
    .save()
    .then(() => {
      console.log("posted");
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/", async (req, res) => {
  res.render("form", {
    pageTitle: "Form",
    path: "/",
  });
});

router.get("/forms", verifyTokenAndAdmin, async (req, res) => {
  try {
    const AllForms = await Form.find();
    res.status(200).render("allForm", {
      forms: AllForms,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
