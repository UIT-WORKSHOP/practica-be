import './articlePage.html';
import {Article} from '../api/db.js';

Template.articlePage.helpers({
    articles(){
        var title=decodeURI(Router.current().params._titleUrl);       
        var data=Article.findOne({ title : { $eq: title } },{ sort: { createdAt: -1 }});
        console.log(data);
        return data;
    },
})