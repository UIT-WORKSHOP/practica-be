FlowRouter.route('/account/login', {
    name: 'Userlogin',
    action(params) {
        BlazeLayout.render('UITemplate', { main: 'login' });
    }
});

FlowRouter.route('/account/register', {
    name: 'RegisterAccount',
    action(params) {
        BlazeLayout.render('UITemplate', { main: 'registerAccount' });
    }
});