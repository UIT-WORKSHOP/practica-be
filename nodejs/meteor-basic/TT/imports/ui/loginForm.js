import './loginForm.html';
import { Meteor } from 'meteor/meteor';
Template.login.events({
    'submit form': function(event) {
        event.preventDefault();
        var UserVar = event.target.loginUser.value;
        var passwordVar = event.target.loginPassword.value;
        Meteor.loginWithPassword(UserVar,passwordVar,function(error){
           if(error) {
               console.log(error) ;
               alert('User or Password not match!');
           }
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