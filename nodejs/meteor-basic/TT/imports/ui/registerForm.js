import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import './registerForm.html';
import { HTTP } from 'meteor/http';

Template.register.events({
    'submit .register': function (event) {
        event.preventDefault();
        var emailVar = event.target.registerEmail.value;
        var usernameVar = event.target.registerUsername.value;
        var passwordVar = event.target.registerPassword.value;
        HTTP.post('/api/users',{
            data:{
            'userEmail': emailVar,
            'userName': usernameVar,
            'userPassword': passwordVar,
        }}, function (error,res) {
            console.log(res);
            if (error) alert(error)
            else if(res.data.error)  alert(res.data.message)
            else  {
                alert(res.data.message);
                Router.go('/');
            }
        })
    }
});

Template.register.helpers({
    redirect(){
        Router.go('/');
    }
})