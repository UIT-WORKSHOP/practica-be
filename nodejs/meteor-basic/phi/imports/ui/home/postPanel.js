import './postPanel.html';
import '../share/post.js';
import { Template } from 'meteor/templating';
import { Posts } from '../../api/db-posts.js';

Template.postPanel.helpers({
    getPosts() {
        return Posts.find({ postType: { $eq: 'Public' } });
    }
});