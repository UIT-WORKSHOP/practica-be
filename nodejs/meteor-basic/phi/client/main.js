import '../client/startup/account-config.js';
import '../imports/ui/share/UITemplate.js';
import '../imports/ui/home';
import '../imports/ui/managerpost';

Template.registerHelper('formatDate', function (date) {
    return moment(date);
});
