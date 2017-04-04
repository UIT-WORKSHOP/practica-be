import { Accounts } from 'meteor/accounts-base'

Router.route('api/users',{where: 'server'})
    .get(function(){
        var response = Meteor.users.find().fetch();
        this.response.setHeader('Content-Type','application/json');
        this.response.end(JSON.stringify(response));
    })

    .post(function(){
        var response;
        if(this.request.body.userName===undefined || this.request.body.userPassword===undefined || this.request.body.userEmail===undefined) {
            response = {
                "error" : true,
                "message" : "invalid data"
            };
        } else {
            var checkUserName=Accounts.findUserByUsername(this.request.body.userName);
            var checkEmail=Accounts.findUserByEmail(this.request.body.userEmail);
            if(!checkEmail&&!checkUserName){
                Accounts.createUser({
                    username : this.request.body.userName,
                    password : this.request.body.userPassword,
                    email : this.request.body.userEmail,
                });
                    response = {
                            "error" : false,
                            "message" : "User added"
                        };
            }
            else response = {
                            "error" : true,
                            "message" : "User Exist"
                        };
        }
        this.response.setHeader('Content-Type','application/json');
        this.response.end(JSON.stringify(response));
    });

Router.route('api/users/:id',{where: 'server'})
    .get(function(){
        var response;
        if(this.params.id !== undefined) {
            var data = Meteor.users.find({_id : this.params.id}).fetch();
            if(data.length > 0) {
                response = data
            } else {
                response = {
                    "error" : true,
                    "message" : "User not found."
                }
            }
        }
        this.response.setHeader('Content-Type','application/json');
        this.response.end(JSON.stringify(response));
    })

    .put(function(){
        var response;
        if(this.params.id !== undefined) {
            var data = Meteor.users.find({_id : this.params.id}).fetch();
            if(Meteor.users.find({"emails.address": this.request.body.userEmail}, {limit: 1}).count()>0) {
                response = {
                    "error" : true,
                    "message" : "Email Exist."
                }
            }
            else if(data.length > 0) {
                if(Meteor.users.update({_id : data[0]._id},{$set : {"emails.0.address" : this.request.body.userEmail}}) === 1) {
                    Accounts.setPassword(data[0]._id,this.request.body.userPassword);
                    response = {
                        "error" : false,
                        "message" : "User information updated."
                    }
                } else {
                    response = {
                        "error" : true,
                        "message" : "User information not updated."
                    }
                }
            } else {
                response = {
                    "error" : true,
                    "message" : "User not found."
                }
            }
        }
        this.response.setHeader('Content-Type','application/json');
        this.response.end(JSON.stringify(response));
    })

    .delete(function(){
        var response;
        if(this.params.id !== undefined) {
            var data = User.find({_id : this.params.id}).fetch();
            if(data.length >  0) {
                if(Meteor.users.remove(data[0]._id) === 1) {
                    response = {
                        "error" : false,
                        "message" : "User deleted."
                    }
                } else {
                    response = {
                        "error" : true,
                        "message" : "User not deleted."
                    }
                }
            } else {
                response = {
                    "error" : true,
                    "message" : "User not found."
                }
            }
        }
        this.response.setHeader('Content-Type','application/json');
        this.response.end(JSON.stringify(response));
    });
  
