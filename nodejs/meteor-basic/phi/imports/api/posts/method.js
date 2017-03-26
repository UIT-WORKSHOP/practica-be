import SimpleSchema from 'simpl-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { Posts } from './posts.js';

var postsSchema = new SimpleSchema({
    postId: String,
    header: {
        type: String,
        min: 1
    },
    content: {
        type: String,
        min: 1
    },
    thumbnail: {
        type: String,
        regEx: SimpleSchema.RegEx.Url
    },
    postType: String
});

export const insertPost = new ValidatedMethod({
    name: 'posts.insert',
    validate: postsSchema.pick('header', 'content', 'thumbnail', 'postType').validator(),
    run({header, content, thumbnail, postType}) {
        if (!Meteor.userId()) {
            throw new Meteor.Error(401, "Unauthorized");
        };
        Posts.insert({
            userOwner: Meteor.userId(),
            header: header,
            content: content,
            thumbnail: thumbnail,
            postType: postType,
            createdAt: new Date()
        });
    }
});

export const removePost = new ValidatedMethod({
    name: 'posts.remove',
    validate: postsSchema.pick('postId').validator(),
    run({postId}) {
        if (!Meteor.userId()) {
            Meteor.Error(401, 'Unauthorized');
        }
        Posts.remove(postId);
    }
});

export const updatePost = new ValidatedMethod({
    name: 'posts.update',
    validate: postsSchema.validator(),
    run({postId, header, content, thumbnail, postType}) {
        if (!Meteor.userId()) {
            Meteor.Error(401, 'Unauthorized');
        };
        Posts.update(
            { _id: postId },
            {
                $set: {
                    header: header,
                    content: content,
                    thumbnail: thumbnail,
                    postType: postType
                }
            }
        );
    }
});