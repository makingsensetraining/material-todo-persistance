var express = require('express');
var uuid = require('uuid');
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
var app = express();

var Schema = mongoose.Schema;
var TodoSchema = new Schema({
    _id: String,
    text: String,
    done: Boolean
}).pre('save', function (next) {
    if (this._id === undefined) {
        this._id = uuid.v1();
    }
    next();
});
// Mongoose Model definition
var Todo = mongoose.model('todo', TodoSchema);

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
    
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.get('/todos', function(req, res){
    Todo.find({}, function (err, todos) {
        res.json(todos);
    });
});

app.post('/todos/create', function(req, res){
    var newTodo = new Todo(req.body);

    newTodo.save(function(err, todo) {
        if (err) return res.send(400, err);

        Todo.find({}, function (err, todos) {
            res.json(todos);
        });

    });
});

app.put('/todos/:id', function(req, res){
    delete req.body._id;

    Todo.update({_id: req.params.id}, req.body,{upsert: true, runValidators: true }, function (error, todo) {
        if (error) return res.json(400, error);

        Todo.find({}, function (err, todos) {
            res.json(todos);
        });

    });

});

app.delete('/todos/archive', function(req, res){
    Todo.remove({done: true}, function (err, todos) {
        Todo.find({}, function (err, todos) {
            res.json(todos);
        });

    });
});

// Mongoose connection to MongoDB
mongoose.connect('mongodb://makingsense:1qaz2wsx@ds037272.mongolab.com:37272/demo', function (error) {
    if (error)return console.log(error);

    var server = app.listen(process.env.PORT || 3000, function () {
        console.log('Express: listening port: ', server.address().port);
    });

});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', function() {
    mongoose.connection.close(function () {
        process.exit(0);
    });
});