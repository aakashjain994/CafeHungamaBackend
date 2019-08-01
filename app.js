const express = require("express"),
  mongoose = require("mongoose"),
  bodyParser = require("body-parser"),
  methodOverride = require("method-override"),
  cors = require("cors");
  jwt = require('jsonwebtoken');

db = mongoose.connect(
  //"mongodb+srv://Manvi_Tyagi:abcd@cluster0-lwpy4.mongodb.net/test?retryWrites=true&w=majority",
  'mongodb://localhost/EVENTS',
  { useNewUrlParser: true },
  err => {
    if (err) console.log(err);
    else console.log("mongo atlas connected");
  }
);


//mongoose.connect('mongodb://localhost/EVENTS' ,{useNewUrlParser: true})

const app = express();

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

//  Connect all our routes to our application
const routes = require("./routes/index");
require("./auth/auth");

// view engine setup
app.set("view engine", "ejs");
app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));

//We plugin our jwt strategy as a middleware so only verified users can access this route
// const secureRoute = require('./routes/secure-route');
//app.use('/user', passport.authenticate('jwt', { session : false }), secureRoute );

app.use(cors());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use("/",verifyToken,routes);

function verifyToken(req, res, next) {
  // Get auth header value
  const bearerHeader = req.headers['authorization'];
  // Check if bearer is undefined
  if(typeof bearerHeader !== 'undefined') {
    // Split at the space
    const bearer = bearerHeader.split(' ');
    // Get token from array
    const bearerToken = bearer[1];
    // Set the token
    req.token = bearerToken;
    // Next middleware
    jwt.verify(req.token,'top_secret',(err,authData)=>{
      if(err){
        res.sendStatus(403);
      }
        else{
          req.user = authData.user;
        }
    })
    next();
  } else {
    // Forbidden
    res.sendStatus(403);
  }
}
const port = process.env.PORT || 5000;
app.listen(port, err => {
  if (err) console.log(err);
  else console.log("App listening on port " + port);
});
