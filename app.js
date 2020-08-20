var express                 = require("express"),
    app                     = express(),
    bodyParser              = require("body-parser"),
    mongoose                = require("mongoose"),
    User  			        = require("./models/user"),
    flash 					= require("connect-flash"),
    Campground 		        = require("./models/campgrounds"),
    Comment			        = require("./models/comment"),
    passport    			= require("passport"),
    session 				= require("express-session"),
    methodOverride          = require("method-override"),
    LocalStrategy			= require("passport-local"),
    passportLocalMongoose   = require("passport-local-mongoose"),
    seedDB			        = require("./seeds")

// ROUTES

var commentRoutes			= require("./routes/comments"),
	campgroundRoutes		= require("./routes/campgrounds"),
	indexRoutes				= require("./routes/index")

//seedDB();



mongoose.connect("mongodb://localhost/Yelp_camp6", {useNewUrlParser: true, useUnifiedTopology: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");
app.use(express.static( __dirname + "/public"))
app.use(methodOverride("_method"));
//app.use(session());
app.use(flash());

// Campground.create(
// 	{
// 		name : " Salmon Creek" , 
// 	    image : "https://images.pexels.com/photos/2108709/pexels-photo-2108709.jpeg?auto=compress&cs=tinysrgb&h=350",
//      description : "No water and no toilet very hard to live"
// 	}, function( err , campground){
// 				if (err){
// 					console.log(err);
// 				}else{
// 					console.log("NEWLY CREATED CAMPGROUND");
// 					console.log(campground);
// 				}
// 	});
 // var campgrounds =[
 //     	{name : " Salmon Creek" , image : "https://images.pexels.com/photos/2108709/pexels-photo-2108709.jpeg?auto=compress&cs=tinysrgb&h=350"},
 //     	{name : " Granite Hill" , image : "https://images.pexels.com/photos/2398220/pexels-photo-2398220.jpeg?auto=compress&cs=tinysrgb&h=350"},
 //     	{name : " Mountain Goat's Hill" , image : "https://images.pexels.com/photos/1539225/pexels-photo-1539225.jpeg?auto=compress&cs=tinysrgb&h=350"},
 //        {name : " Salmon Creek" , image : "https://images.pexels.com/photos/2108709/pexels-photo-2108709.jpeg?auto=compress&cs=tinysrgb&h=350"},
 //     	{name : " Granite Hill" , image : "https://images.pexels.com/photos/2398220/pexels-photo-2398220.jpeg?auto=compress&cs=tinysrgb&h=350"},
 //     	{name : " Mountain Goat's Hill" , image : "https://images.pexels.com/photos/1539225/pexels-photo-1539225.jpeg?auto=compress&cs=tinysrgb&h=350"}
 //        ];
// PASSPORT CONFIGURATION

app.use( require("express-session")({
        secret:"Rusty is the best and the cutest dog in the world",
        resave: false,
        saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use( function( req , res , next) {
	// body...
    res.locals.currUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use(indexRoutes);
app.use(commentRoutes);
app.use(campgroundRoutes);


app.listen(3000, function(){
  console.log("Server is running");
});