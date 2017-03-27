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
                streams: 'dynamic',
                chunkSize: 'dynamic',
                onUploaded: function (err, fileRef) {
                    template.currentUpload.set(fileRef);
                    console.log(fileRef);
                },
            }, false);

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
        var imageId=Template.instance().currentUpload.get()._id;
        const imageUrl=Images.findOne({_id:imageId}).link();
        if(Article.findOne({title:title})){
            console.log(Article.findOne({title:title}).title);
            alert('Title was used!');
            return;
        }
        else {
            const content = event.target.content.value;
            let athor = "";
            if (Meteor.userId()) {
                try {

                    console.log(Meteor.user().emails["0"].address);
                    athor = Meteor.user().emails["0"].address;
                }
                catch (ex) {
                    athor = Meteor.user().services.facebook.email;
                }
            }
            else {
                console.log('no email');
                athor = "Guess";
            }
            Article.insert({
                title,
                content,
                imageUrl,
                athor,
                createAt: new Date(),
            })
            Router.go('/');
        }
    }
    

});