import SimpleSchema from 'simpl-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import MessageBox from 'message-box';
import { Posts } from './posts.js';

var postsSchema = new SimpleSchema({
    postId: String,
    header: {
        type: String,
        min: 1,
        optional: false
    },
    content: {
        type: String,
        min: 1,
        optional: false
    },
    thumbnail: {
        type: String,
        regEx: SimpleSchema.RegEx.Url,
        optional: false
    },
    postType: {
        type: String,
        optional: false,
        allowedValues: ['Public', 'Private']
    }
});

const messagebox = new MessageBox({
    initialLanguage: 'vi',
    messages: {
        vi: {
            regEx: '{{label}} không đúng định dạng',
            minString: '{{label}} phải có độ dài lớn hơn  {{min}}',
            required: '{{label}} được yêu cầu',
            notAllowed: '{{label}} phải là Public or Private',
            keyNotInSchema : "{{label}} không được yêu cầu"
        }
    }
});

function Validate(context,object){
    const isvalid = context.validate(object);
    if (isvalid) return null;

    const errors = context.validationErrors();
    return message = messagebox.message(errors[0], {
        language: 'vi',
        context: {
            key: errors[0].name,
            label: errors[0].name,
        }
    });
}

export const insertPost = new ValidatedMethod({
    name: 'posts.insert',
    validate(object) {
        var a = postsSchema.pick('header', 'content', 'thumbnail', 'postType').newContext();
        const message = Validate(a,object);
        if (message == null)
            return;
        throw new Meteor.Error(message);
    },
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
    validate(object) {
        var a = postsSchema.pick('postId').newContext();
        const message = Validate(a, object);
        if (message == null)
            return;
        throw new Meteor.Error(message);
    },
    run({postId}) {
        if (!Meteor.userId()) {
            throw new Meteor.Error(401, 'Unauthorized');
        }
        Posts.remove(postId);
    }
});

export const updatePost = new ValidatedMethod({
    name: 'posts.update',
    validate(object) {
        var a = postsSchema.newContext();
        const message = Validate(a, object);
        if (message == null)
            return;
        throw new Meteor.Error(message);
    },
    run({ postId, header, content, thumbnail, postType }) {
        if (!Meteor.userId()) {
            throw new Meteor.Error(401, 'Unauthorized');
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