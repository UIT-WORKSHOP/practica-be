import { Meteor } from 'meteor/meteor';

FlowRouter.route('/', {
    name: 'homepage',
    action() {
        BlazeLayout.render('UITemplate', {main: 'homepage'});
    }
})

FlowRouter.route('/managerposts', {
    name: 'managerposts',
    action() {
        BlazeLayout.render('UITemplate', { main: 'managerPosts' });
    }
});

FlowRouter.route('/createpost', {
    name: 'createpost',
    action() {
        BlazeLayout.render('UITemplate', { main: 'PostTemplate' });
    }
});

