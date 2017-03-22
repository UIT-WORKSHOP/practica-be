import { Posts } from '../../imports/api/db.js';
//FlowRouter.route('/posts/delete/:id', {
//    name: 'homepage',
//    action(params) {
//        console.log(params);
//        Posts.remove(params);
//    }
//})


FlowRouter.route('/post/edit/:id', {
    name: 'editPost',
    action(params) {
        BlazeLayout.render('UITemplate', { main: 'PostTemplate' });
    }
})

FlowRouter.route('/post/detail/:id', {
    name: 'detailPost',
    action(params) {
        BlazeLayout.render('UITemplate', { main: 'PostTemplate' });
    }
})
