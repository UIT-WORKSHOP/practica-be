import './managerPosts.html';
import { Posts } from '../../api/db-posts.js';
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
        Meteor.call('posts.remove', this._id);
    }
});