import './addArticlePage.html';
import { Article } from '../api/db.js';
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

Template.addArticlePage.events({
    'submit .addArticle': function(event){
        event.preventDefault();
        const title=event.target.title.value;
        const content=event.target.content.value;
        const imgSrc=event.target.imgSrc.value;
        let athor="";
        if(Meteor.userId()) {
            try{
           
                console.log(Meteor.user().emails["0"].address);
                athor=Meteor.user().emails["0"].address;
            }
            catch(ex) {
                athor=Meteor.user().services.facebook.email;
            }
        }
        else {
            console.log('no email');
            athor="Guess";
        }
        Article.insert({
            title,
            content,
            imgSrc,
            athor,
            createAt: new Date(),
        })
        Router.go('/');
    }
    

});