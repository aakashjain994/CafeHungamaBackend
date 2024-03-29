const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");

const router = express.Router();

//When the user sends a post request to this route, passport authenticates the user based on the
//middleware created previously
router.post(
  "/signup",
  passport.authenticate("signup", { session: false }),
  async (req, res, next) => {
    // console.log("hello user signing up");
    // check("username").isEmail(), check("password").isLength({ min: 5 });
    res.json({
      message: "Signup successful",
      user: req.user
    });
  }
);

router.post("/login", async (req, res, next) => {
  passport.authenticate("login", async (err, user, info) => {
    try {
      if (err || !user) {
        if (err) return res.send(err);
        else return res.send("Wrong email or password");
        // const error = new Error('An Error occured')
        // return next(error);
      }
      req.login(user, { session: false }, async error => {
        if (error) return res.send(error);
        //We don't want to store the sensitive information such as the
        //user password in the token so we pick only the email and id
        const body = { _id: user._id, email: user.email };
        //Sign the JWT token and populate the payload with the user email and id
        const token = jwt.sign({ user: body }, "top_secret");
        //Send back the token to the user
        return res.json({ token,body });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
});

module.exports = router;
