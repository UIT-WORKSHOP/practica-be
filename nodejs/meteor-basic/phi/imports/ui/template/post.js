import './post.html';
import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';

Template.post1.helpers({
    getUserName() {
        var user = Meteor.users.findOne({ _id: { $eq: this.userOwner } });
        if (user.hasOwnProperty('username')) return user.username;
        return user.profile.name;
    }
});