import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import './registerForm.html';

if (Meteor.isClient) {
    Template.register.events({
        'submit .register': function(event) {
            event.preventDefault();
            var emailVar = event.target.registerEmail.value;
            var passwordVar = event.target.registerPassword.value;
            Accounts.createUser({
                email: emailVar,
                password: passwordVar,
            });
            console.log("Form submitted.");
            Router.go('/');
        }
    });
}
Template.register.helpers({
    redirect(){
        Router.go('/');
        console.log('ss');
    }
})