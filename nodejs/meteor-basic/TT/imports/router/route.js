Router.configure({
  // the default layout
  layoutTemplate: 'mainNav'
});
 
Router.route('/', function () {
  this.render('firstPage');
  this.render('checkCurrentUser',{to: 'checkCurrentUser'});
  this.render('addArticle',{to: 'addArticle'});
});
 
 
Router.route('/login', function () {
  this.render('login');
  
});

Router.route('/register', function () {
  this.render('register');
  this.render('checkCurrentUser',{to: 'checkCurrentUser'});
  this.render('addArticle',{to: 'addArticle'});
});

Router.route('/addarticle', function () {
  this.render('checkCurrentUser',{to: 'checkCurrentUser'});
  this.render('addArticlePage');
})

Router.route('/article/:_titleUrl', function () {
  this.render('articlePage');
  this.render('checkCurrentUser',{to: 'checkCurrentUser'});
  this.render('addArticle',{to: 'addArticle'});
})

Router.route('/articles', function () {
  this.render('viewArticle');
  this.render('addArticle',{to: 'addArticle'});
  this.render('checkCurrentUser',{to: 'checkCurrentUser'});
})

Router.route('/user/profile', function() {
  this.render('profile');
  this.render('addArticle',{to: 'addArticle'});
  this.render('checkCurrentUser',{to: 'checkCurrentUser'});
})

Router.route('/user/profile/edit', function() {
  this.render('profile');
  this.render('addArticle',{to: 'addArticle'});
  this.render('checkCurrentUser',{to: 'checkCurrentUser'});
})