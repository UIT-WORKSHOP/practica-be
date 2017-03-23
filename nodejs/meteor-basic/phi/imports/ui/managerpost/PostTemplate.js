import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import './PostTemplate.html';
import { Posts } from '../../api/db-posts.js';
Template.PostTemplate.helpers({
    getdata: function () {
        id = FlowRouter.getParam('id');
        if (id == null) return {};
        post = Posts.findOne({ _id: id });
        if (post == null) return {};

        data = {
            post: post,
            mode: FlowRouter.getQueryParam('mode')
        };
        return data;
    },
    IsPublic(mode) {
        if (mode == 'Public') return true;
        return false;
    },
    IsNotDetailMode(mode) {
        if (mode == 'detail') return false;
        return true;
    },
    IsDisable(mode) {
        if (mode == 'detail') return true;
        return false;
    }
});

Template.PostTemplate.events({
    'click #save'(event, instance) {
        data = {
            header: $('#postName').val(),
            content: $('#content').val(),
            thumbnail: $('#thumbnail').val(),
            postType: $("input[name='posttype']:checked").val(),
        };
        if (this.mode == 'edit') {
            Meteor.call('posts.update', this.post._id, data);
        } else {
            Meteor.call('posts.insert', data);
        }
        FlowRouter.go('/managerposts');
    },
    'click #back'(event) {
        FlowRouter.go('/managerposts');
    }
});

