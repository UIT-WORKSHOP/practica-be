

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
