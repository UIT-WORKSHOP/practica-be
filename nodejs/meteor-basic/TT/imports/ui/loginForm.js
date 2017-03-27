import './loginForm.html';
import { Meteor } from 'meteor/meteor';
Template.login.events({
    'submit form': function(event) {
        event.preventDefault();
        var emailVar = event.target.loginEmail.value;
        var passwordVar = event.target.loginPassword.value;
        Meteor.loginWithPassword(emailVar,passwordVar,function(error){
            alert('User or Password not match!');
           if(error) console.log(error) ;
        });
    },
    'click .loginFacebook': function(event) {
        event.preventDefault();
        Meteor.loginWithFacebook({requestPermissions: ['public_profile', 'email']}, function(error){
            if (error) {
                console.log('Error: ', error);
            }
        });

    },
});
Template.login.helpers({
    redirect(){
        Router.go('/');
    }
})