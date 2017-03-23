import './postPanel.html';
import './post.js';
import { Template } from 'meteor/templating';
import { Posts } from '../api/db.js';

Template.postPanel.helpers({
    getPosts() {
        return Posts.find({ postType: { $eq: 'Public' } });
    }
});