var express     = require("express");
var router      = express.Router();
var Campground  = require("../models/campgrounds");
var Comment     = require("../models/comment");
var passport    = require("passport");
var User        = require("../models/user");



router.get("/" , function( req , res ){
      res.render("landing");
});


//  Authenticate

router.get("/register",function(req,res){
      res.render("register");
});


router.post("/register" , function(req , res){
        req.body.username
        req.body.password

        User.register(new User({username: req.body.username}) , req.body.password , function(err ,user){
                        if ( err ){
                            req.flash("error" , err.message);
                            return res.render("register");
                        }

                        passport.authenticate("local")(req , res , function(){
                            req.flash("success","Welcome to YelpCamp");
                            res.redirect("/campgrounds");
                        });
        });
});

// SHOW LOGIN TEMPLATE

router.get("/login" , function( req , res){
        res.render("login");
});

router.post("/login", passport.authenticate("local",{
        successRedirect: "/campgrounds",
        failureRedirect: "/login"

}) ,function(req ,res) {
});


// LOGOUT OUT

router.get("/logout" ,function( req , res) {
		req.logout();
        req.flash("success" , "Logged you out!");
		res.redirect("/campgrounds");
});


function isLoggedIn(req,res,next) {
	// body...
	if (req.isAuthenticated()){
			return next();
	}
    req.flash("error","Please Login First!");
	res.redirect("/login");
}

module.exports = router;