import './body.html';
import './registerForm.js';
import './loginForm.js';
import './logoutForm.js';
import './addArticlePage.js';
import './articlePage.js';
import {Article} from '../api/db.js';
import {Meteor} from 'meteor/meteor';

Template.viewArticle.helpers({
        articles(){
            return Article.find({});
        },
});