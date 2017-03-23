import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

export const Posts = new Mongo.Collection('posts');

Meteor.methods({
    'posts.insert'(object) {
        /*
        object = {
            header,
            content,
            thumbnail,
            postType}
        */
        if (!Meteor.userId()) {
            throw new Meteor.Error(401, "Unauthorized");
        }
        Posts.insert({
            userOwner: Meteor.userId(),
            header: object.header,
            content: object.content,
            thumbnail: object.thumbnail,
            postType: object.postType,
            createdAt: new Date()
        });
    },
    'posts.remove'(postId) {
        if (!Meteor.userId()) {
            Meteor.Error(401, 'Unauthorized');
        }
        Posts.remove(postId);
    },
    'posts.update'(postId, object) {
        if (!Meteor.userId()) {
            Meteor.Error(401, 'Unauthorized');
        }
        Posts.update(
            { _id: postId },
            {
                $set: {
                    header: object.header,
                    content: object.content,
                    thumbnail: object.thumbnail,
                    postType: object.postType
                }
            }
        );
    }
});