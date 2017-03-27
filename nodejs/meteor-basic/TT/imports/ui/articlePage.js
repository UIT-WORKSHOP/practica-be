import './articlePage.html';
import {Article} from '../api/db.js';

Template.articlePage.helpers({
    articles(){
        var title=Router.current().params._title;       
        var data=Article.findOne({title:title});
        console.log(data);
        return data;
    },
})