import { Accounts } from 'meteor/accounts-base';

Accounts.validateNewUser(function (user) {
    if (user.profile.name.length <= 0) {
        throw new Meteor.Error(403,"Invalid user input");
    }
    return true;
});