import './body.html';
import './registerForm.js';
import './loginForm.js';
import './logoutForm.js';
import './addArticlePage.js';
import './articlePage.js';
import './profilePage.js';
import {Article} from '../api/db.js';
import {Meteor} from 'meteor/meteor';
import { Images } from '../api/db.js';

Template.viewArticle.helpers({
        articles(){
            return Article.find({},{ sort : { createAt: -1}});
        },
});
Template.viewArticle.events({
    'click .btn':function(event,template){
        imageId=Article.findOne({_id:this._id}).imageId;
        Images.remove({_id:imageId});
        Article.remove({_id:this._id});
    }
})