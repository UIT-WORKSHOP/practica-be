import { Template } from 'meteor/templating';
import { Posts } from '../api/db.js';
import { Meteor } from 'meteor/meteor';
import './PostTemplate.html';

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
            userOwner: Meteor.userId(),
            header: $('#postName').val(),
            content: $('#content').val(),
            thumbnail: $('#thumbnail').val(),
            postType: $("input[name='posttype']:checked").val(),
            createdAt: new Date()
        };
        if (this.mode == 'edit') {
            Posts.update(this.post._id,
                {
                    header: data.header,
                    thumbnail: data.thumbnail,
                    content: data.content,
                    postType: $("input[name='posttype']:checked").val(),
                    userOwner: data.userOwner,
                    createdAt: this.post.createdAt
                }
            );
        } else {
            Posts.insert(data);
        }
        FlowRouter.go('/managerposts');
    },
    'click #back'(event) {
        FlowRouter.go('/managerposts');
    }
});

