// =========================================================================
//      SETUP
// =========================================================================

var express        = require("express"),
    app            = express(),
    bodyParser     = require("body-parser"),
    mongoose       = require("mongoose"),
    flash          = require("connect-flash"),
    passport       = require("passport"),
    LocalStrategy  = require("passport-local"),
    Cat            = require("./models/cat"),
    Comment        = require("./models/comment"),
    User           = require("./models/user"),
    seedDB         = require("./seeds"),
    methodOverride = require("method-override");


app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/purrrfectMatch");
// seedDB();  //seed the DB

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Cats are super amazingly cute",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){  //passing the currentUser into every route
   res.locals.currentUser = req.user;
   res.locals.error = req.flash("error");
   res.locals.success = req.flash("success");
   next();
});


// =========================================================================
//      HOME ROUTES
// =========================================================================

// INDEX - LANDING PAGE
app.get("/", function(req, res){
    res.render("landing");
});

// NAV BAR
app.get("/navbar", function(req, res){
    res.render("navbar");
});

// INDEX - FELINE FRIENDLY VIEW
app.get("/felineView", function(req, res){
    res.render("felineView");
});

// INDEX - HOW IT WORKS PAGE
app.get("/howitworks", function(req, res){
    res.render("howitworks");
});

// INDEX - ABOUT PAGE
app.get("/about", function(req, res){
    res.render("about");
});

// INDEX - CONTACT PAGE
app.get("/contactus", function(req, res){
    res.render("contactus");
});





// =========================================================================
//      CAT ROUTES
// =========================================================================

// INDEX - DISPLAY ALL CATS
app.get("/cats", function(req, res){

    // get all cats from DB
    Cat.find({}, function(err, allCats) {
        if(err){
            console.log("Error in GET request");
            console.log(err);
            req.flash("error", "Error loading cats");
            res.render("cats/index",{cats: allCats});
        } else {
            res.render("cats/index",{cats: allCats});
        }
    });
});

// CREATE - ADD NEW CAT
app.post("/cats", isLoggedIn, function(req, res){
    // get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var gender = req.body.gender;
    var age = req.body.age;
    var hair = req.body.hair;
    var breed = req.body.breed;
    var cost = req.body.cost;
    var description = req.body.description;
    var creator = {
        id: req.user._id,
        username: req.user.username
    };
    var newCat = {
        name: name, 
        image: image,
        gender: gender,
        age: age,
        hair: hair,
        breed: breed,
        cost: cost,
        description: description,
        creator: creator
    };
    //create a new cat and save to DB
    Cat.create(newCat, function(err, newlyCreatedCat){
        if(err){
            console.log("Error inside CREATE route")
            console.log(err);
            req.flash("error", "Error creating cat");
            res.redirect("/cats");
        } else {
            //redirect back to cats page
            req.flash("success", "Cat successfully created");
            res.redirect("/cats");
        }
    });
});

// NEW - DISPLAY FORM TO CREATE NEW CAT
app.get("/cats/new", isLoggedIn, function(req, res){
    res.render("cats/new");
});

// SHOW - DISPLAY INFO ABOUT ONE SPECIFIC CAT
app.get("/cats/:id", function(req, res) {
    Cat.findById(req.params.id).populate("comments").exec(function(err, foundCat) {
        if(err) {
            console.log("Error inside of SHOW route");
            console.log(err);
            req.flash("error", "Error finding cat and/or associated comments");
            res.redirect("/cats");
        } else {
            res.render("cats/show", {cat: foundCat});
        }
    });
});

// EDIT - DISPLAY EDIT FORM FOR ONE CAT
app.get("/cats/:id/edit", checkCatOwnership, function(req, res) {
    Cat.findById(req.params.id, function(err, foundCat){
        res.render("cats/edit", {cat: foundCat});   
    });
});

// UPDATE - UPDATE PARTICULAR CAT, THEN REDIRECT TO THAT CAT
app.put("/cats/:id", checkCatOwnership, function(req, res) {
    //find and update the correct cat, and then redirect to the show page
    Cat.findByIdAndUpdate(req.params.id, req.body.cat, function(err, updatedCat){
        if(err){
            console.log("Error updating cat");
            console.log(err);
            req.flash("error", "Error updating cat");
            res.redirect("/cats");
        } else {
            res.redirect("/cats/" + req.params.id);
        }
    })
});

// DESTROY - DELETE A PARTICULAR CAT, THEN REDIRECT TO INDEX
app.delete("/cats/:id", checkCatOwnership, function(req, res) {
    Cat.findByIdAndRemove(req.params.id, function(err){
        if(err){
            console.log("Error deleting cat");
            console.log(err);
            req.flash("error", "Error deleting cat");
            res.redirect("/cats");
        } else {
            req.flash("success", "Cat successfully removed");
            res.redirect("/cats");
        }
    })
});



// =========================================================================
//      COMMENT ROUTES
// =========================================================================

// NEW - DISPLAY FORM TO CREATE NEW COMMENT
app.get("/cats/:id/comments/new", isLoggedIn, function(req, res) {
    Cat.findById(req.params.id, function(err, foundCat){
        if(err){
            console.log("Error inside comment NEW route.")
            console.log(err);
            req.flash("error", "Unable to find cat.");
            res.redirect("/cats");
        } else {
            res.render("comments/new", {cat: foundCat});
        }
    });
});

// CREATE - ADD NEW COMMENT
app.post("/cats/:id/comments", isLoggedIn, function(req, res){
    //lookup cat using ID
    Cat.findById(req.params.id, function(err, foundCat){
        if(err){
            console.log("Error finding cat");
            console.log(err);
            req.flash("error", "Error finding cat");
            res.redirect("/cats");
        } else {
            //create new comment
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log("Error creating comment");
                    console.log(err);
                    req.flash("error", "Error creating comment");
                    res.redirect("/cats/" + foundCat._id);
                } else {
                    //add username and id to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    //save comment
                    comment.save();
                    //connect new comment to cat
                    foundCat.comments.push(comment);
                    foundCat.save();
                    //redirect to cats show page
                    res.redirect("/cats/" + foundCat._id);
                }
            })

        }
    });
});

// EDIT - DISPLAY EDIT FORM FOR ONE COMMENT
app.get("/cats/:id/comments/:comment_id/edit", checkCommentOwnership, function(req, res){
    Comment.findById(req.params.comment_id, function(err, foundComment){
        if(err){
            console.log("Error finding comment");
            console.log(err);
            req.flash("error", "Error finding comment");
            res.redirect("back");
        } else {
            res.render("comments/edit", {cat_id: req.params.id, comment: foundComment});
        }
    });
});

// UPDATE - UPDATE PARTICULAR COMMENT, THEN REDIRECT TO THAT CAT
app.put("/cats/:id/comments/:comment_id", checkCommentOwnership, function(req, res) {
    //find and update the correct comment, and then redirect to the show page
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if(err){
            console.log("Error updating comment");
            console.log(err);
            req.flash("error", "Error updating comment");
            res.redirect("back");
        } else {
            res.redirect("/cats/" + req.params.id);
        }
    });
});

// DESTROY - DELETE A PARTICULAR COMMENT, THEN REDIRECT TO THAT CAT
app.delete("/cats/:id/comments/:comment_id", checkCommentOwnership, function(req, res) {
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            console.log("Error deleting comment");
            console.log(err);
            req.flash("error", "Error deleting comment");
            res.redirect("back");
        } else {
            res.redirect("/cats/" + req.params.id);
        }
    });
});







// =========================================================================
//      AUTH ROUTES
// =========================================================================

// REGISTER PAGE
app.get("/register", function(req, res){
    res.render("register");
});

// REGISTER POST
app.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log("Error in REGISTER route");
            console.log(err);
            req.flash("error", err.message)
            return res.redirect("/register");
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome to purrrfect Match " + user.username);
            res.redirect("/cats"); 
        });
    });
});

// LOGIN PAGE
app.get("/login", function(req, res){
    res.render("login");
});

// LOGIN POST
app.post("/login", passport.authenticate("local", 
    {
        successRedirect:"/cats",
        failureRedirect:"/login"
    }), function(req, res){
});

// LOGOUT ROUTE
app.get("/logout", function(req, res){
    req.logout();
    req.flash("success", "You have successfully logged out");
    res.redirect("/cats");
});






// =========================================================================
//      MIDDLEWARE
// =========================================================================


function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need to be logged in to do that!");
    res.redirect("/login");
}

function checkCatOwnership(req, res, next) {
    if(req.isAuthenticated()){   //is the user logged in?
        Cat.findById(req.params.id, function(err, foundCat){
            if(err){
                console.log("Errr finding cat for ownership check");
                console.log(err);
                req.flash("error", "Error finding cat");
                res.redirect("/cats");
            } else {
                if(foundCat.creator.id.equals(req.user._id)){   //does the user own the cat? the first is an objectid() so you can't === compare, have to use .equals(string)
                    next();
                } else {
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "You need to be logged in to do that!");
        res.redirect("/login");
    }
}

function checkCommentOwnership(req, res, next){
    if(req.isAuthenticated()){   //is the user logged in?
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err){
                console.log("Errr finding comment for ownership check");
                console.log(err);
                req.flash("error", "Error finding comment");
                res.redirect("back");
            } else {
                if(foundComment.author.id.equals(req.user._id)){
                    next();
                } else {
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "You need to be logged in to do that!");
        res.redirect("/login");
    }
}


// =========================================================================
//      START SERVER
// =========================================================================

app.listen(3000, function(){
    console.log("The purrrfectMatch server has started!");
});