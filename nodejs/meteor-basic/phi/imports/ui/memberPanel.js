import './memberPanel.html';
import './postOfUser.html';
import { Template } from 'meteor/templating';
import { Posts } from '../api/db.js';
import { Meteor } from 'meteor/meteor';
Template.memberPanel.helpers({
    getdata() {
        var memberPost = [];
        var users = Meteor.users.find().forEach(function (user) {
            var postCount = Posts.find({ userOwner: { $eq: user._id }, postType: { $eq: 'Public' } }).count();
            var name = '';
            if (user.hasOwnProperty('username'))
                name = user.username;
            else
                name = user.profile.name;

            memberPost.push({ user: name, postCount: postCount });

        });
        return memberPost.sort((a, b) => { return b.postCount - a.postCount; });
    }
});
