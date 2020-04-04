let config, env, path;
path = require('path');
env = process.env.NODE_ENV || 'development';
 
config = {
    development: {
      app: {
        name: 'Boogalu'
      },
      port: 6000,
      db: {
        client: 'mysql',
        connection: {
          host: 'localhost',
          port: '3306',
          user: 'root',
          password: 'root',
          database: 'Boogalu'
        }
      },
   
    tokenSecret: 'jsf78(*&*#&#kjsfksdf@#@$jsejfdsjkJDFJDKJFkkjwej44werew',
    sendInBlueKEY:"1srbdXfKj8mLc4wB",
    cloudURL:"http://localhost:3000/",
    mailFrom:'Boogalu <boogaloo.danceapp@gmail.com>',
    links:{
      activation: "http://localhost/auth/activate?token="
    },
    rootUrl: "http://localhost/",
    aws: {
      bucketName: "swiftmotion",
      imageFormats : ['jpg','png','jpeg','gif'],
      thumbnailUrl : "thumbnails/",
      identityPoolId : "us-east-1:cc95937e-5342-4ede-ad78-54d59d969457",
      thumbnailExtension : "-00001.png",
      image: {path: "https://d3ff6gz5yhx1ap.cloudfront.net/", format: '.png'},
      cloudFrontResizedImageUrl: "https://d3ff6gz5yhx1ap.cloudfront.net/"
    }
  },

};

module.exports = config[env];
