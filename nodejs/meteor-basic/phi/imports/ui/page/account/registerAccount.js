import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import './registerAccount.html';

Template.registerAccount.onCreated(function () {
    //redirect home page if user logged
    if (Meteor.userId()) {
        FlowRouter.go('/');
    }

    this.error = new ReactiveVar("");
});

Template.registerAccount.helpers({
    error: () => {
        return Template.instance().error.get()
    }
});

Template.registerAccount.events({
    'submit .register-form'(event, instance) {
        event.preventDefault();
        var fullname = event.target.fullname.value;
        var username = event.target.username.value;
        var password = event.target.password.value;
        var repassword = event.target.repassword.value;

        if (password != repassword) {
            instance.error.set("Password don't match");
            return;
        }

        var user = { username: username, password: password, profile: { name: fullname } };

        Accounts.createUser(user, function (err) {
            if (err) {
                instance.error.set(err.reason);
                return;
            }
            FlowRouter.go('/');
        });
    }
});