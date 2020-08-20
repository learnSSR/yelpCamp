var mongoose   = require("mongoose");
var Campground = require("./models/campgrounds");
var Comment	   = require("./models/comment");

var data = [
  				{
  					name : "Mussorie",
  					image : "https://images.pexels.com/photos/2108709/pexels-photo-2108709.jpeg?auto=compress&cs=tinysrgb&h=350",
  					description : " Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non culpa qui officia deserunt mollit anim id est laborum. "
  				}  ,
  				{
  					name : "Mussorie",
  					image : "https://images.pexels.com/photos/2108709/pexels-photo-2108709.jpeg?auto=compress&cs=tinysrgb&h=350",
  					description : "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodoconsequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  				}     ,
  				{
  					name : "Mussorie",
  					image : "https://images.pexels.com/photos/2108709/pexels-photo-2108709.jpeg?auto=compress&cs=tinysrgb&h=350",
  					description : "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  				}                 
];

  function seedDB(){

  	Campground.remove({} ,function(err , campground){
   // 				if (err)
   // 				{
   // 					console.log("err");
   // 				}else{
   // 					console.log("remove campground!!");

   // 					data.forEach(function(seed){
   // 						Campground.create(seed,function(err , campground){
   // 							if (err) {
   // 								console.log(err);
   // 							} else {
   // 								console.log("added a campground");

   // 								// create a comments
   // 								Comment.create( 
   // 								{
   // 									text: "This place is great but i wish there should be internet",
   // 									author : "Homer"
   // 								}, function(err, comment){
   // 									if (err)
   // 									{
   // 										console.log(err);
   // 									} else {
   // 										campground.comments.push(comment);
   // 										campground.save();
   // 										console.log("comments created");
   // 									}
   // 								});
   // 							}
   // 				    });
   // 				   });
   					
   // 				}	
    });
 }

 module.exports = seedDB;
   