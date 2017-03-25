ServiceConfiguration.configurations.remove({
    service: "facebook"
});

ServiceConfiguration.configurations.insert({
    service: "facebook",
    appId: '1762947390701286',
    secret: '0d2ed964e5b03e397251c4892ab0e9e4'
});
        Accounts.onCreateUser(function (options, user) {

        if (!user.services.facebook) {
            return user;
        }
        user.username = user.services.facebook.name;
        user.emails = [{address: user.services.facebook.email}];

        return user;
        });