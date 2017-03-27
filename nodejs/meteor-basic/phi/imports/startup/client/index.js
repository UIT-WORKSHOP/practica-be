import './router';

/*
Load home page and layout
*/
import '../../ui/layout/UITemplate.js';
import '../../ui/page/home';
import '../../ui/page/managerpost';
import '../../ui/page/account';

Template.registerHelper('formatDate', function (date) {
    return moment(date);
});

Template.registerHelper('isNullOrEmpty', function (object) {
    if (object == null || object == '')
        return true;
    else return false;
});