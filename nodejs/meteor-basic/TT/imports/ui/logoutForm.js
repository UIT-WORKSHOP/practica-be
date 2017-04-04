import './logoutForm.html';

Template.dashboard.events({
    'click .logout': function(event){
        event.preventDefault();
        Meteor.logout();
    }
});

Template.dashboard.helpers({
    'userInfo' : function(){
        if(Meteor.userId()) {
           return Meteor.users.findOne({_id : Meteor.userId()});
        }
        else alert('error');
    }
})