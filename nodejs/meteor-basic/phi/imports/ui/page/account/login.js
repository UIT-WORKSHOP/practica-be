import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var'
import './login.html'


Template.login.onCreated(function () {
    //redirect home page if user logged
    if (Meteor.userId()) {
        FlowRouter.go('/');
    }

    this.error = new ReactiveVar("");
});

Template.login.helpers({
    error: () => {
        return Template.instance().error.get()
    }
});

Template.login.events({
    'submit .login-form'(event, instance) {
        event.preventDefault();
        var username = event.target.username.value;
        var password = event.target.password.value;

        Meteor.loginWithPassword(username, password, function (err) {
            if (err) {
                instance.error.set(err.message);
                return;
            };
            FlowRouter.go('/');
        });
    },
    'click .btn-facebook'(event) {
        event.preventDefault();
        Meteor.loginWithFacebook(function (err) {
            if (err) {
                instance.error.set(err.message);
                return;
            };
            FlowRouter.go('/managerposts');
        });
    }
});