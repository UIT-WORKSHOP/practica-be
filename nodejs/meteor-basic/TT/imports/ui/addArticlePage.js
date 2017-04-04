import './addArticlePage.html';
import { Article } from '../api/db.js';
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Images } from '../api/db.js';

Template.addArticlePage.onCreated(function () {
  this.currentUpload = new ReactiveVar(false);
});

Template.addArticlePage.events({
    'change #fileInput': function (e, template) {
        if (e.currentTarget.files && e.currentTarget.files[0]) {
            var upload = Images.insert({
                file: e.currentTarget.files[0],
            }, false);
            upload.on('uploaded', function(error,fileRef){
                if(error) {
                    console.log(error);
                }
                else {
                    template.currentUpload.set(fileRef);
                    console.log(fileRef);
                }
            })
            upload.on('end', function (error, fileObj) {
                if (error) {
                    alert('Error during upload: ' + error);
                } else {
                    alert('File "' + fileObj.name + '" successfully uploaded');
                }

            });

            upload.start();
        }
    },
    'submit .addArticle': function(event){
        event.preventDefault();
        const title=event.target.title.value;
        var titleUrl=encodeURI(title);
        var imageId=Template.instance().currentUpload.get()._id;
        const imageUrl=Images.findOne({_id:imageId}).link();
        if(Article.findOne({title:title})){
            console.log(Article.findOne({title:title}).title);
            alert('Title was used!');
            return;
        }
        else {
            const content = event.target.content.value;
            let author = "";
            if (Meteor.userId()) {
                console.log(Meteor.user().emails['0'].address);
                author = Meteor.user().emails['0'].address;
            }
            else {
                console.log('no email');
                author = "Guess";
            }
            Article.insert({
                title,
                content,
                imageUrl,
                imageId,
                author,
                titleUrl,
                createAt: new Date(),
            })
            Router.go('/articles');
        }
    }
    

});