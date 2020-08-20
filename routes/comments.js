// COMMENTS
var express     = require("express");
var router      = express.Router();
var Campground  = require("../models/campgrounds");
var Comment		= require("../models/comment");


router.get("/campgrounds/:id/comments/new",isLoggedIn ,function( req ,res){

	Campground.findById( req.params.id , function(err , campground){
			if (err)
			{
				console.log(err);
			}else{
				res.render("comments/new",{campground:campground});
			}
	});
});


router.post("/campgrounds/:id/comments" , function(req ,res ){
		//lookup for campground
		//create 
		//push
		//save
		//redirect

		Campground.findById( req.params.id , function(err , Campground){
			if (err){
				console.log(err);
			    res.redirect("/campgrounds");
				} else {

					//var comment = { author : req.user.username , text:req.body.text};

				    Comment.create(req.body.comment , function(err , comment){
				    	if (err)
				    	{
				    		console.log(err);
				    	} else {

				    		comment.author.id = req.user._id;
				   	        comment.author.username = req.user.username;

				   	        comment.save();

				    		Campground.comments.push(comment);
				    		Campground.save();
				    		console.log(comment); 
				    		req.flash("success","Successfully Added Comment");
				    		res.redirect('/campgrounds/' + Campground._id);
				    	}
				    });
				}
		})
});

router.get("/campgrounds/:id/comments/:comment_id/edit",checkCommentOwnership,function ( req, res) {
	// body...
	Comment.findById(req.params.comment_id, function ( err , foundComment) {
		// body...
		if (err){
			res.redirect("back");
		} else {
			res.render("comments/edit",{campground_id : req.params.id, comment: foundComment});
		}
	});
});


// 

router.put("/campgrounds/:id/comments/:comment_id",checkCommentOwnership ,function( req , res){
  Comment.findByIdAndUpdate( req.params.comment_id, req.body.comment, function (err , updateComment) {
  	// body...
  	if ( err ){
  		res.redirect("back");
  	} else {
  		res.redirect("/campgrounds/"+req.params.id);
  	}
  });
});



// delete


 router.delete("/campgrounds/:id/comments/:comment_id" ,checkCommentOwnership ,function (req , res) {
 	// body...
 	Comment.findByIdAndRemove(req.params.comment_id, function(err) {
 		// body...
 		if (err){
 			res.redirect("back");
 		} else {
 			req.flash("success", "successfully deleteted comment");
 			res.redirect("back");
 		}
 	});
 });


// middelware ...

function isLoggedIn(req,res,next) {
	// body...
	if (req.isAuthenticated()){
			return next();
	}
	req.flash("error","Please Login First!");
	res.redirect("/login");
}

function checkCommentOwnership(req ,res ,next) {
	// body...
	 if (req.isAuthenticated()) {
		  	
		  	// does user own the campground

			   Comment.findById(req.params.comment_id , function( err , foundComment){
			     if (err){
				  console.log( err );
				res.redirect("back");
			    }else {

			    	if ( foundComment.author.id.equals(req.user._id)){
			    		next();
			    	} else{
			    		res.redirect("back");
			    	}
			    }
	           });
		   } else {
		   		res.redirect("back");
      	   }
}

module.exports = router;