var mongoose    = require("mongoose"),
    express     = require("express"),
    app         = express();
    
// App config
mongoose.connect("mongodb://localhost/masterclassdb");
app.set("view engine", "ejs");
app.use(express.static("public"));

// Model Schema
var ClassSchema = new mongoose.Schema({
    instructor: String,
    course: String,
    id: String,
    default_image: String,
    price: String,
    lessons: [
        {title: String, chapter: Number, description: String}
    ],
    pitch: {
        left_title: String,
        left_description: String,
        center_title: String,
        center_description: String
    },
    intro: {
        title: String,
        description: String,
        image: String
    },
    attributes: {
        lesson_count: String,
        lesson_description: String,
        workbook: String,
        workbook_description: String,
        office_hours: String
    },
    trailers: [String],
    reviews: [
        {   quote: String, 
            image: String, 
            user_name: String, 
            user_bio: String
        }
    ],
    courses: [
        {
            instructor: String,
            course: String,
            default_image: String,
            id: String
        }
    ]
});
var Class = mongoose.model("Class", ClassSchema);

// Landing page redirects to classes page
app.get("/", function(req, res){
    res.redirect("classes");
});

// Index page to show classes
app.get("/classes", function(req, res){
    Class.find({}, function(err, classes){
        if(err){
            console.log(err);
        } else {
            res.render("index", {classes: classes});
        }
    });
})

// Show class page by id
app.get("/classes/:id", function(req, res){
    // Display the class by the unique id for each page (easy to read by users)
    Class.findOne({id: req.params.id}, function(err, foundClass){
        if(err){
            console.log(err);
        } else {
            res.render("show", {instrClass: foundClass, otherClass: Class});
        }
    });
});

// Run server
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server is running");
});