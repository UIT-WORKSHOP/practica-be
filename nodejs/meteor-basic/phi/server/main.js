import { Meteor } from 'meteor/meteor';
import { Posts} from '../imports/api/db-posts.js';

Meteor.startup(() => {
  // code to run on server at startup
    if (Posts.findOne()) { }
});
