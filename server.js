var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public/dist/public'));

var fileUpload = require('express-fileupload');
app.use(fileUpload());

var path = require('path');

var bcrypt = require('bcrypt-as-promised');

var bodyParser = require('body-parser');
app.use(bodyParser.json())


var session = require('express-session');
app.use(session({
    secret: 'keyboardkitteh',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}));

var keyPublishable = process.env.pk_live_45xUwb7UMKxH8QBIuj9jXrxH;
var keySecret = process.env.sk_live_67DXx0uaskHmgn89QvzuMA3d;
var stripe = require("stripe")(keySecret);

var filePluginLib = require('mongoose-file');
var filePlugin = filePluginLib.filePlugin;
var make_upload_to_model = filePluginLib.make_upload_to_model;
var uploads_base = path.join(__dirname, "uploads");
var uploads = path.join(uploads_base, "u");


var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/artweb_db');
var artSchema = new mongoose.Schema({
    title: {
        type: String
    },
    image: {
        type: Object
    },
    dateCreated: {
        type: String
    },
    size: {
        type: String
    },
    description: {
        type: String
    },
    sold: {
        type: Boolean
    }
}, { timestamps: true })
mongoose.model('Art', artSchema)
var Art = mongoose.model('Art');
//var connectBusboy = require('connect-busboy');
// app.use(connectBusboy())
// const fileUpload = require('fileupload');
// console.log(fileUpload);

app.get('/arts', function(req, res){
    Art.find({}, function(err, arts){
        if (err){
            console.log("EXPRESS > server.js > get: /arts > Error finding art: ", err)
            var status = {
                status: false,
                payload: err
            }
            res.json(status)
        } else {
            var status = {
                status: true,
                payload: arts
            }
            res.json(status)
        }
    })
})

app.post('/arts', function (req, res) {
    
    console.log("Here is req.body", req.body)
    Art.create(
        { 
            title: req.body.title, 
            image: req.body.image, 
            description: req.body.description, 
            dateCreated: req.body.dateCreated, 
            size: req.body.size, 
            sold: false
        }, function (err, art) {
            console.log("SERVER > /arts > req.body", req.body);
            if (err) {
                console.log("Error while creating: ", err);
                //if err comes back, create status obj, pass into res.json
                var status = {
                    status: false,
                    payload: err
                }
                console.log("DID NOT create artt", status);
                //if err comes back, create status obj, pass into res.json
                res.json(status);
            } else {
            //if result comes back, create status obj, pass into res.json
                var status = {
                    status: true,
                    payload: art
                }
                console.log("Successfully created art", status);
                //res.json goes to data.service
                res.json(status);
            }
        }
    )
})

app.get('/arts/:id', function (req, res) {
    Art.findOne({ _id: req.params.id }, function (err, art) {
        if (err) {
            console.log("Error while getting one art: ", err)
            var status = {
                status: false,
                payload: err
            }
            res.json(status)
        } else {
            console.log("Successfully obtained one art: ", art);
            var status = {
                status: true,
                payload: art
            }
            res.json(status)
        }
    })
})

var opts = { runValidators: true, context: 'query' }

app.put('/arts/:id/edit', function (req, res) {
    console.log("HERE IS STUFF FOR UPDATING THINGS: ", req.body)
    Art.findOneAndUpdate({ _id: req.params.id }, 
        { 
            title: req.body.title, 
            image: req.body.image, 
            description: req.body.description, 
            dateCreated: req.body.dateCreated, 
            size: req.body.size, 
            sold: req.body.sold
        }, 
        opts, function (err, result) {
        if (err) {
            console.log("error while updating: ", err);
            //if err comes back, create status obj, pass into res.json
            var status = {
                status: false,
                payload: err
            }
            //res.json goes to data.service
            res.json(status)
        } else {
            //if result comes back, create status obj, pass into res.json
            var status = {
                status: true,
                payload: result
            }
            //res.json goes to data.service
            res.json(status)
        }
    })
})

app.delete('/arts/:id', function (req, res) {
    Art.findOneAndRemove({ _id: req.params.id }, function (err, result) {
        if(err){
            console.log("Error deleting art, ", err)
            var status = {
                status: false,
                payload: err
            }
            res.json(status)
        }
        else {
        console.log("Successfully deleted, " );
        var status = {
            status: true,
            payload: result
        }
        res.json(status);
        }
    })
})

var usersSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
        minlength: 2
    },
    last_name: {
        type: String,
        required: true,
        minlength: 2
    },
    email: {
        type: String,
        required: true,
        minlength: 7
    },
    password: {
        type: String,
        required: true,
        minlength: 5
    }
}, { timestamps: true })

mongoose.model('User', usersSchema);
var User = mongoose.model('User')


app.post('/register', function (req, res) {
    console.log('HERE IS THE REG FORM: ', req.body);
    var h_pw = bcrypt.hash(req.body.password, 10)
        .then( h_pw => {
            console.log("this is hashed pw:", h_pw)
            var user = new User({ first_name: req.body.first_name, last_name: req.body.last_name, email: req.body.email, password: h_pw });
            console.log("HERE IS OUR USER: ", user)
            user.save(function (err, result) {
                if (err) {
                    console.log("error while posting registration", err);
                    req.session.logged_in = false;
                    console.log("REG ERR: Here is req.session.logged_in", req.session.logged_in)
                    var status = {
                        status: false,
                        payload: err
                    }
                    res.json(status);
                } else {
                    console.log("Successfully registered: ", result);
                    //THE PROBLEM IS HERE. USER._ID IS NOT MATCHING THE _ID OF ABOVE
                    console.log("AQUI", result._id);
                    req.session._id = result._id;
                    // console.log("HERE IS USER ID:", req.session._id)
                    req.session.logged_in = true;
                    // console.log("REGISTER: Here is req.session.logged_in", req.session.logged_in)
                    var status = {
                        status: true,
                        payload: result
                    }
                    console.log(status);
                    res.json(status);
                }

            })
        })
        .catch(error => {
            console.log(error)
        });
})

app.post('/charged', function(req, res){
    let amount = 500;

    stripe.customers.create({
      email: req.body.email,
      card: req.body.id
    })
    .then(customer =>
      stripe.charges.create({
        amount,
        description: "Sample Charge",
        currency: "usd",
        customer: customer.id
      }))
    .then(charge => res.send(charge))
    .catch(err => {
      console.log("Error:", err);
      res.status(500).send({error: "Purchase Failed"});
    });
})

app.get('/logged', function (req, res) {
    console.log("@@@@@@@@@ /logged")
    console.log("@@@@@@@@@ /logged req.session._id", req.session._id)
    if(req.session._id){

    
        User.find({ _id: req.session._id }, function (err, result) {
            console.log("@@@@@@@@@ User.find() ")    
            console.log("@@@@@@@@@ User.find() err", err)    
            console.log("@@@@@@@@@ User.find() result", result)    
            if (err) {
                console.log('error while loading l_page', err)
                req.session.logged_in = false;
                console.log("/LOGGED GET ERR: Here is req.session.logged_in", req.session.logged_in)
                var status = {
                    status: false,
                    payload: err
                }
                res.json(status)
            } else {
                console.log("log in stuff", result)
                req.session.logged_in = true;
                console.log("/LOGGED GET: Here is req.session.logged_in", req.session.logged_in)
                console.log(result[0].first_name)
                var status = {
                    status: true,
                    payload: result
                }
                res.json(status)
            }
        })
    } else {
        res.json("session did not exist")
        
    }
    
})

app.post('/logged', function (req, res) {
    console.log("HERE IS THE LOG-IN FORM: ", req.body)
    User.find({ email: req.body.email }, function (err, result) {
        if (err) {
            console.log('finding user in log in post: ', err)
            req.session.logged_in = false;
            var status = {
                status: false,
                payload: err
            }
            res.json(status)
        } else {
            console.log("log in stuff", result)
            if (result[0]) {
                var h_pw = result[0].password
                req.session.logged_in = false;
                console.log("here is the password now: ", h_pw)
                console.log("here is logged_in status: ", req.session.logged_in)
                if (!req.session.logged_in) {
                    bcrypt.compare(req.body.password, h_pw)
                        .then(result => {
                            User.find({ email: req.body.email }, function (err, user) {
                                if (err) {
                                    console.log("Something went wrong with log in");
                                    req.session.logged_in = false;
                                    console.log("/LOGGED POST ERR: Here is req.session.logged_in", req.session.logged_in)
                                    var status = {
                                        status: false,
                                        payload: err
                                    }
                                    res.json(status);
                                } else {
                                    console.log("Here is our user that is logging in: ", user)
                                    req.session._id = user[0]._id;
                                    req.session.name = user[0].first_name;
                                    req.session.logged_in = true;
                                    console.log(req.session._id, req.session.name)
                                    console.log("/LOGGED POST: Here is req.session.logged_in", req.session.logged_in)
                                    var status = {
                                        status: true,
                                        payload: user
                                    }
                                    
                                    res.json(status);
                                }
                            })

                        })
                    
                        .catch(error => {
                            console.log("Error while getting pw: ", error)
                        })
                    }
                }
                else{
                    var status = {
                        status: false,
                        error: "Cannot be blank"
                    }
                    res.json(status)
                }
            }
        
    })
});

app.get('/logout', function (req, res) {
    req.session.logged_in = false;
    console.log("/LOGOUT POST: Here is logged_in status: ", req.session.logged_in)
    var status = {
        status: "logged out"
    }
    res.json(status)
})

var showSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 3
    },
    creator: {
        type: String,
        required: true,
        minlength: 5
    },
    location: {
        type: String,
        required: true,
        minlength: 5
    },
    showDate: {
        type: String,
        required: true,
        minlength: 5
    }, 
    image: {
        type: Object
    },
    link: {
        type: String
    }
}, { timestamps: true })

mongoose.model('Show', showSchema);
var Show = mongoose.model('Show')

app.get('/shows', function(req, res){
    console.log("EXPRESSS > server.js > shows");
    Show.find({}, function(err, shows){
        if (err){
            console.log("EXPRESS > server.js > get: /shows > Error finding shows: ", err)
            var status = {
                status: false,
                payload: err
            }
            res.json(status)
        } else {
            var status = {
                status: true,
                payload: shows
            }
            res.json(status)
        }
    })
})

app.post('/shows', function (req, res) {
    console.log("Here is req.body", req.body)
    Show.create(
        { 
            title: req.body.title, 
            image: req.body.image, 
            link: req.body.link,
            creator: req.body.creator, 
            location: req.body.location, 
            showDate: req.body.showDate
        }, function (err, show) {
            if (err) {
                console.log("Error while creating: ", err);
                //if err comes back, create status obj, pass into res.json
                var status = {
                    status: false,
                    payload: err
                }
                console.log("DID NOT create show", status);
                //if err comes back, create status obj, pass into res.json
                res.json(status);
            } else {
            //if result comes back, create status obj, pass into res.json
                var status = {
                    status: true,
                    payload: show
                }
                console.log("Successfully created show", status);
                //res.json goes to data.service
                res.json(status);
            }
        }
    )
})

app.get('/shows/:id', function (req, res) {
    Show.findOne({ _id: req.params.id }, function (err, show) {
        if (err) {
            console.log("Error while getting one show: ", err)
            var status = {
                status: false,
                payload: err
            }
            res.json(status)
        } else {
            console.log("Successfully obtained one show: ", show);
            var status = {
                status: true,
                payload: show
            }
            res.json(status)
        }
    })
})

var opts = { runValidators: true, context: 'query' }

app.put('/shows/:id/edit', function (req, res) {
    console.log("HERE IS STUFF FOR UPDATING THINGS: ", req.body)
    Show.findOneAndUpdate({ _id: req.params.id }, 
        { 
            title: req.body.title, 
            image: req.body.image, 
            link: req.body.link,
            creator: req.body.creator, 
            location: req.body.location, 
            showDate: req.body.showDate
        }, 
        opts, function (err, show) {
        if (err) {
            console.log("error while updating: ", err);
            //if err comes back, create status obj, pass into res.json
            var status = {
                status: false,
                payload: err
            }
            //res.json goes to data.service
            res.json(status)
        } else {
            //if result comes back, create status obj, pass into res.json
            var status = {
                status: true,
                payload: show
            }
            //res.json goes to data.service
            res.json(status)
        }
    })
})

app.delete('/shows/:id', function (req, res) {
    Show.findOneAndRemove({ _id: req.params.id }, function (err, result) {
        if(err){
            console.log("Error deleting art, ", err)
            var status = {
                status: false,
                payload: err
            }
            res.json(status)
        }
        else {
        console.log("Successfully deleted, ", result);
        var status = {
            status: true,
            payload: result
        }
        res.json(status);
        }
    })
})

app.all("*", (req, res, next) => {
    res.sendFile(path.resolve("./public/dist/public/index.html"))
})

app.listen(8000, function () {
    console.log("Listening on 8thou");
})