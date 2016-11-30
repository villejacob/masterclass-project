var mongoose    = require("mongoose"),
    express     = require("express"),
    app         = express();
    
// App config
// mongoose.connect("mongodb://localhost/masterclassdb");
mongoose.connect("mongodb://test_user:test_password@ds117348.mlab.com:17348/masterclassdb");
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

// Add to database
// Class.create({
//     instructor : "Kevin Spacey",
//     course: "Acting",
//     id : "kevin-spacey-teaches-acting",
//     courses : [ 
//         { 
//             instructor : "Hans Zimmer",
//             course : "Film Scoring", 
//             default_image : "https://d30b401hznjia8.cloudfront.net/images/377/original/1479457191-HZ_Banner_V2_A.jpg?1479457191",
//             id : "hans-zimmer-teaches-film-scoring" 
//         }, 
//         { 
//             instructor : "Aaron Sorkin",
//             course : "Screenwriting", 
//             default_image : "https://d30b401hznjia8.cloudfront.net/images/286/original/1466552319-AS-banner-V1_B.jpg?1466552319", 
//             id : "aaron-sorkin-teaches-screenwriting" 
//         }, 
//         {
//             instructor : "Reba McEntire",
//             course : "Country Music",
//             default_image : "https://d30b401hznjia8.cloudfront.net/images/301/original/1476291858-1476225436-RM-banner_V2_D.jpg?1476291858",
//             id : "reba-mcentire-teaches-country-music" 
            
//         } 
//     ],
//     reviews : [ 
//         {
//             quote : "In addition to being able to go at your own pace, refer to included reading materials, MasterClass delves into the specificity of the accomplished actor’s toolbox.",
//             image : "https://d30b401hznjia8.cloudfront.net/course_reviews/3045/original/1464221977-logo-backstage.png?1464221977",
//             user_name : "Briana Rodriguez", "user_bio" : "wrote in her article for Backstage Magazine"
//         }, 
//         {
//             quote : "Kevin Spacey is enlightening me on ways to go beyond my perspective of performing monologues and acting itself. I find his coaching remarkable.",
//             image : "https://d30b401hznjia8.cloudfront.net/course_reviews/3046/original/1464222192-KS-Spenser.jpg?1464222192",
//             user_name : "Spenser Long",
//             user_bio : "is an aspiring actor and lifelong learner who lives in North Haven, CT. He is a student in Kevin Spacey’s MasterClass."
//         } 
//     ],
//     trailers : [ 
//         "https://d30b401hznjia8.cloudfront.net/images/199/original/1460066392-PR-KS-class_hero.jpg?1460066392", 
//         "kevin-spacey-trailer-video.com/2", 
//         "kevin-spacey-trailer-video.com/3" 
//     ],
//     attributes : {
//         lesson_count : "28 VIDEO LESSONS",
//         lesson_description : "Learn Kevin's methods to stand out in the casting room, perfect a monologue, master impressions, and more.",
//         workbook : "47-PAGE WORKBOOK",
//         workbook_description : "A 47 page downloadable workbook accompanies the class with lesson recaps and supplemental materials.",
//         office_hours : "Upload videos to get feedback from the class. Kevin will also critique select student work." 
//     }, 
//     pitch : {
//         left_title : "5 HOURS", 
//         left_description : "Kevin teaches you his unique approach to the craft of acting in over 5 hours of lessons. Learn directly from Kevin in his first ever online class.", 
//         center_title : "100% EXCLUSIVE", 
//         center_description : "For the first time ever, get acting tips and guidance from two-time Academy Award winner Kevin Spacey. Only available through MasterClass." 
//     }, 
//     lessons : [
//         {
//             chapter : 1,
//             title : "INTRODUCTION",
//             description : "Meet Kevin-your new acting teacher. In this lesson, Kevin shares why he's excited to teach you the craft of acting, and what he hopes you will take away from his MaterClass." 
            
//         }, 
//         { 
//             chapter : 2, 
//             title : "CHOOSING A MONOLOGUE", 
//             description : "Your choice of monologue can define your success. Through Kevin's insightful critique, learn how to choose a monologue wisely." 
            
//         }, 
//         { 
//             chapter : 3, 
//             title : "CHOOSING A MONOLOGUE (CONT'D)", 
//             description : "A monologue is more than just words. Your performance can connect you to the audience, and make your character memorable. Kevin's unique exercise in this lesson shows you why you have to be willing to let it hurt." 
//         }, 
//         {
//             chapter : 4, 
//             title : "WORKING WITH TEXT: CARVING OUT WORDS", 
//             description : "How you choose to carve out words not only affects their meaning, but also their impact. Kevin uses Shakespeare's Othello to teach you the proper use of emphasis." 
//         },
//         { 
//             chapter : 5, 
//             title : "WORKING WITH TEXT: GROUNDING A MONOLOGUE", 
//             description : "Make it real. Learn how a task as mundane as packing a suitcase can breathe entirely new life into a scene." 
//         },
//         { 
//             chapter : 6, 
//             title : "ATTACK IT A DIFFERENT WAY", 
//             description : "There's a difference between knowing the words and knowing how to say them. After this lesson, you'll know the difference." 
//         }, 
//         { 
//             chapter : 7, 
//             title : "GIVE THEM 50%", 
//             description : "Treat this as an exercise in a restaurant. Kevin teaches you how to hold it in and pull the audience to you." 
//         } 
//     ], 
//     price : "$90", 
//     intro : { 
//         title : "Meet Your New Teacher", 
//         description : "Kevin Spacey asks you to engage in the craft of acting in his first ever online class as he teaches you the approach that has won him two Academy Awards. The star of The Usual Suspects, American Beauty and House of Cards teaches the practical techniques that have made him a stage and screen legend. Start your class today.", 
//         image : "https://d30b401hznjia8.cloudfront.net/images/227/original/1460066570-PR-KS-class_portrait-ap.jpg?1460066570" 
//     }, 
//     default_image : "https://d30b401hznjia8.cloudfront.net/images/230/original/1460066572-PR-ks-banner-v2.jpg?1460066572" 
// }, function(err, cat){
//     if(err){
//         console.log(err);
//     } else {
//         console.log(cat);
//     }
// });

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

// Default redirect with invalid url
app.get("*", function(req, res){
    res.redirect("/classes");
});

// Run server
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server is running");
});