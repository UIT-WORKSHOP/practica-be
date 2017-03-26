import './managerPosts.html';
import '../share/requireLogin.html';
import { Posts } from '../../api/posts/posts.js';
import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';

Template.managerPosts.helpers({
    getPosts() {
        userId = Meteor.userId();
        return Posts.find({ userOwner: { $eq: userId } }, { sort: { createdAt: -1 } });
    },
    isPublic() {
        return this.postType == 'Public';
    }
});

Template.managerPosts.events({
    'click .post-delete'(event) {
        object = { postId: this._id };
        Meteor.call('posts.remove', object);
    }
});