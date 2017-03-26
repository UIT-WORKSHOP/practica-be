import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import './PostTemplate.html';
import '../share/requireLogin.html';
import { Posts } from '../../api/posts/posts.js';

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
            Id = "";
            if (this.hasOwnProperty('post') && this.post.hasOwnProperty('_id')) {
                Id = this.post._id;
            } else {
                return Error("data error");
            };
            data.postId = Id;
            Meteor.call('posts.update', data, function (err, result) {
                if (err) {
                    alert(err.message);
                    return;
                }
                FlowRouter.go('/managerposts');
            });
        } else {
            Meteor.call('posts.insert', data, function (err, result) {
                if (err) {
                    alert(err.message);
                    return;
                }
                FlowRouter.go('/managerposts');
            });
        }
    },
    'click #back'(event) {
        FlowRouter.go('/managerposts');
    }
});

