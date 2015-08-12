var mongoose = require('mongoose');
// Notice the `mongodb` protocol; Mongo is basically a kind of server,
// which handles database requests and sends responses. It's async!
mongoose.connect('mongodb://localhost/wikistack');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongodb connection error:'));

var statuses = ['open','closed'];

var pageSchema = new mongoose.Schema({
  title:     {type: String, required: true},
  urlTitle:  {type: String, required: true},
  content:   {type: String, required: true},
  status:   {type: String, enum: statuses},
  date:     {type: Date, default: Date.now},
  author:   {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
});

pageSchema.virtual('route').get(function (){
  return '/wiki/' + this.urlTitle;
})

var userSchema = new mongoose.Schema({
  name:  {type: String, required: true},
  email:  {type: String, required: true, unique: true}
});

var Page = mongoose.model('Page', pageSchema);
var User = mongoose.model('User', userSchema);

var makeURL = function(title) {
  //use regex to replace spaces and weird characters
  var regex = /[^\w]/g
  return title.replace(regex, '_')
}

var findOrCreateUser = function(reqBody) {
  console.log('looking for author')
  User.findOne({email: reqBody.email}).then(function(user) {
    if (!user) {
      user = new User({name: reqBody.name,
          email: reqBody.email})
      user.save();
    }
    console.log(user._id);
    return user._id;  
  })
};


var makePage = function(authorId, reqBody){
  var title = reqBody.title;
  var content = reqBody.title;
  var tagArr = reqBody.tags.split(',');
  return new Page({title: title, content: content, urlTitle: makeURL(title), tags: tagArr, author: authorId})
};


module.exports = {
  Page: Page,
  User: User,
  makeURL: makeURL,
  makePage: makePage,
  findOrCreateUser: findOrCreateUser

};