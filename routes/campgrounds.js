// campgrounds

var express     = require("express");
var router      = express.Router();
var Campground  = require("../models/campgrounds");
var Comment		= require("../models/comment");


// Index show all campgrounds

router.get("/campgrounds" , function( req , res ){
		//get all campgrounds
        console.log(req.user);
		Campground.find({},function( err , allCampgrounds){
			if (err){
				console.log(err);
			} else{
				res.render("campgrounds/index", {campgrounds:allCampgrounds});
			}
		});
});

// create .. Add a new Campground

router.post("/campgrounds",function( req , res ){
	var name = req.body.name;
	var image = req.body.image;
 	var desc = req.body.description;

 	var author ={
 		id:  req.user._id,
 		username: req.user.username
 	}

	var newCampground = { name: name , image: image , description: desc , author: author}
	console.log(req.user);


	Campground.create( newCampground , function( err , newlyCreated){
			if (err){
				console.log(err);
			}else{
				res.redirect("/campgrounds");
			}
	});
});


// ADD A NEW CAMPGROUND

router.get("/campgrounds/new", isLoggedIn , function(req , res){
	res.render("campgrounds/new");
});


router.get("/campgrounds/:id" , function(req , res){
	//find the campground with specified id

	Campground.findById(req.params.id).populate("comments").exec(function( err , foundCampground ){
			if ( err )
			{
				console.log( err );
			}else{
				//console.log(foundCampground);
				res.render("campgrounds/show" , { campground : foundCampground});
			}
	});
	// than show it 
});

//EDIT CAMPGROUND ROUTE

router.get("/campgrounds/:id/edit", checkCampgroundOwnership ,function(req , res){
		

			   Campground.findById(req.params.id , function( err , foundCampground){
			    		res.render("campgrounds/edit" , {campground : foundCampground});
	           });
});

//UPDATE CAMPGROUND ROUTE


router.put("/campgrounds/:id" ,checkCampgroundOwnership ,function(req ,res){
   Campground.findByIdAndUpdate(req.params.id, req.body.campground,function(err , updated ){

   			if (err)
   			{
   				res.redirect("/campgrounds");
   			} else {
   				res.redirect("/campgrounds/"+req.params.id);
   			}
   })
});

// DELETE CAMPGROUND

router.delete("/campgrounds/:id" ,checkCampgroundOwnership, function(req , res) {
	// body...
    Campground.findByIdAndRemove( req.params.id , function(err){
    	 if (err){
    	 	res.redirect("/campgrounds");
    	 } else{
    	 	res.redirect("/campgrounds");
    	 }
    });
});

// MIDDEL WARE
function isLoggedIn(req,res,next) {
	// body...
	if (req.isAuthenticated()){
			return next();
	}
	req.flash("error","Please Login First!");
	res.redirect("/login");
}


function checkCampgroundOwnership(req ,res ,next) {
	// body...
	 if (req.isAuthenticated()) {
		  	
		  	// does user own the campground

			   Campground.findById(req.params.id , function( err , foundCampground){
			     if (err){
				  console.log( err );
				res.redirect("back");
			    }else {

			    	if ( foundCampground.author.id.equals(req.user._id)){
			    		next();
			    	} else{
			    		res.redirect("back");
			    	}
			    }
	           });
		   } else {
		   		res.flash("error" , "Login Fisrt");
		   		res.redirect("back");
      	   }
}

module.exports = router;