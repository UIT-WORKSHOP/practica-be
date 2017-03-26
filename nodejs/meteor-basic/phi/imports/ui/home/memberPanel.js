import './memberPanel.html';
import './postOfUser.html';
import { Template } from 'meteor/templating';
import { Posts } from '../../api/posts/posts.js';
import { Meteor } from 'meteor/meteor';
Template.memberPanel.helpers({
    getdata() {
        var memberPost = [];
        //see more when sign in
        var type = ['Public'];
        if (Meteor.userId()) {
            type = ['Public', 'Private'];
        };

        var users = Meteor.users.find().forEach(function (user) {
            var postCount = Posts.find({ userOwner: { $eq: user._id }, postType: { $in: type } }).count();
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
