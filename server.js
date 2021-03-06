// Node.js Dependencies
const http           = require("http");
const path           = require("path");
var express          = require("express");
var handlebars       = require("express3-handlebars");
var mongoose         = require("mongoose");
var connectmongo     = require("connect-mongo");
var express_session  = require("express-session");
var method_override  = require("method-override");
var passport         = require("passport");
var passport_twitter = require("passport-twitter");
var socket           = require("socket.io");
var app        		 = express();


//Router
var router = {
    index: require("./routes/index"),
    message: require("./routes/message")
};

//Body Parser for req.body
var parser = {
    body: require("body-parser"),
    cookie: require("cookie-parser")
};

 // Database Connection
 var db = mongoose.connection;
 mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://127.0.0.1/cogs121');
 db.on('error', console.error.bind(console, 'Mongo DB Connection Error:'));
 db.once('open', function(callback) {
     console.log("Database connected successfully.");
 });

// Middleware
app.set("port", process.env.PORT || 3000);
app.engine("handlebars", handlebars());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");
app.use(express.static(path.join(__dirname, "public")));
app.use(parser.body.urlencoded({ extended: false }));
app.use(parser.body.json());

// Routes
app.get("/", router.index.view);
app.post("/message", router.message.send);

// Start Server
http.createServer(app).listen(app.get("port"), function() {
    console.log("Express server listening on port " + app.get("port"));
});
