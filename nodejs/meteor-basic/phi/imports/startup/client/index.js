import './account-config.js';
import './router';


Template.registerHelper('formatDate', function (date) {
    return moment(date);
});
