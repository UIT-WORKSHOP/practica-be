import './postPanel.html';
import '../../template/post.js';
import { Template } from 'meteor/templating';
import { Posts } from '../../../api/posts/posts.js';

Template.postPanel.helpers({
    getPosts() {
        if (Meteor.userId()) {
            return Posts.find();
        }else
            return Posts.find({ postType: { $eq: 'Public' } });
    }
});