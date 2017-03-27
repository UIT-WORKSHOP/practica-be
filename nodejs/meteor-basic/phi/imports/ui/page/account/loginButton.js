import './loginButton.html';

import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';

Template.loginButton.helpers({
    profileName() {
        if (Meteor.userId()) {
            var user = Meteor.user().profile.name;
            return user;
        }
    }
});

Template.loginButton.events({
    'click .logout'(event) {
        Accounts.logout(function (err) {
            if (!err) {
                FlowRouter.go('/');
            }
        });
    }
});