import './loginForm.html';
import { Meteor } from 'meteor/meteor';
Template.login.events({
    'submit form': function(event) {
        event.preventDefault();
        var emailVar = event.target.loginEmail.value;
        var passwordVar = event.target.loginPassword.value;
        Meteor.loginWithPassword(emailVar,passwordVar,function(error){
           if(error) console.log(error) ;
        });
    },
    'click .loginFacebook': function(e) {
        e.preventDefault();
        Meteor.loginWithFacebook({requestPermissions: ['public_profile', 'email']}, function(err){
            if (err) {
                console.log('Error: ', err);
            }
        });

    },
});
Template.login.helpers({
    redirect(){
        Router.go('/');
        console.log('ss');
    }
})