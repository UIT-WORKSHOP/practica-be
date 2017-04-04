import './profilePage.html';
import { HTTP } from 'meteor/http';
import { Session } from 'meteor/session';
import { Accounts } from 'meteor/accounts-base';

Template.profile.helpers({
    userProfile() {
        var path = Router.current().route._path;
        if (Meteor.userId()) {
            var userId = Meteor.userId();
                HTTP.get('/api/users/' + userId, {}, function (error, res) {
                    if (error) alert(error);
                    else {
                       var result = {
                            'username': res.data["0"].username,
                            'email': res.data["0"].emails["0"].address,
                            'isDisabled': 'disabled',
                            'isEdited' : false
                        }
                        Session.set('result', result);
                    }
                });
            if (path == '/user/profile') {
                return Session.get('result');
            }
            else if(path == '/user/profile/edit'){
               var result = Session.get('result');
               if(result){
               result.isEdited=true;
               result.isDisabled='';
               return result;
               }
            }
            
        }
    },
    'redirect': function () {
        Router.go('/');
    }
})

Template.profile.events({
    'submit .form': function(event){
        event.preventDefault();
        var id = Meteor.userId();
        var email = event.target.email.value;
        var password = event.target.password.value;
        HTTP.put('/api/users/'+id,{
            data : {
                "userEmail" : email,
                "userPassword" : password
            }
        }, function(error, res){
            if (error) alert(error);
            else if(res.data.error)  alert(res.data.message);
            else  {
                alert(res.data.message);
                Router.go('/');
            }
        })
    }
})




