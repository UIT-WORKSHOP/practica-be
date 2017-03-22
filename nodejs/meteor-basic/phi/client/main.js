import '../imports/ui/UITemplate.js';
import '../imports/ui/managerPosts.js';
import '../imports/ui/requireLogin.html';
import '../imports/ui/PostTemplate.js';
import '../client/startup/account-config.js';
Template.registerHelper('formatDate', function (date) {
    return moment(date);
});
