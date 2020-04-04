let User, jwToken, toJSON, Email, otpGenerator, resetPasswordSchema, session_details;
// SMS=require('../services/SMS')
jwToken = require('../services/jwToken');
User = require('../models/user');
profession_list = require('../models/profession_list.model');
intrest_list = require('../models/interest_list');

// session_details=require('../models/session.model');
// ticket_details=require('../models/ticket.model');

toJSON = require('utils-error-to-json');
Email = require('../services/Email');
resetPasswordSchema = require('../models/model_validations').resetPasswordSchema;
validation = require('../models/model_validations');
Role = require('../models/role');
uuid = require('uuid').v4;

otpGenerator = require('otp-generator');

module.exports = {

  // socialRegister: function(req, res) {
  //   User.where({
  //     email: req.body.email,
  //     providerName: req.body.providerName
  //   }).fetch().then(function(user_dat) {
  //     if (!user_dat) {
  //       registerUser(req, res, false); //register
  //     } else {
  //       User.where({
  //         email: req.body.email,
  //         providerId: req.body.providerId,
  //         providerName: req.body.providerName          
  //       }).fetch().then(function(validUser) {
  //         if(validUser){
  //           loginUser(req, res, user_dat); //login             
  //         }else{
  //           if (user_dat.get('providerId') == null ){
  //             failureHandlerText(400, 'Email already exists!', res);
  //           }else{
  //             failureHandlerText(400, 'Invalid ProviderId!', res);              
  //           }
  //         }
  //       })["catch"](function(err) {
  //         failureHandler(400, err, res);
  //       });
  //     }
  //   })["catch"](function(err) {
  //     failureHandler(400, err, res);
  //   });
  // },  

  // activate: function(req, res) {
  //   let key = req.query.token; 
  //   User.where({
  //     activationToken: key,
  //     emailConfirmation: 0
  //   }).fetch({require:false}).then(function(user_dat) {
  //     if (!user_dat) {
  //       failureHandlerText(400, 'Activated done already!', res);
  //     } else {
  //       user_dat.save({emailConfirmation: 1, role_id: 2}, { //set role as user
  //         patch: true
  //       }).then(function(updatedUser) {
  //         successHandler(200, 'Your account is activated!', res);          
  //       })["catch"](function(err) {
  //         failureHandler(400, err, res);
  //       });
  //     }
  //   })["catch"](function(err) {
  //     failureHandler(400, err, res);
  //   });
  // },


  //   getAllUsers:function(req,res){

  //      User.where('is_delete','<>',1).query(function(qb){
  //       // qb.whereNot({role_id:4})
  //       if(req.query.search){
  //         qb.where('name','LIKE',req.query.search +'%')
  //       }
  //       // qb.whereNot({is_delete:1})
  //     }).fetchPage({
  //       withRelated: ['role'],
  //       page: parseInt(req.query.page),
  //       pageSize: parseInt(req.query.limit),
  //      }).then(function(users) {
  //       successHandler(200,users,res)
  //     })
  //   },
  //   checkRequestBody:function(req,res,next){
  // res.send(req.body)
  //   },


  //   smsverify: function(req, res) {
  //     User.where({
  //       mobile: req.body.mobile
  //    }).fetch({require:false}).then(function(user) {


  //      if (!user) {
  //        // failureHandler(400, 'Invalid email!', res);
  //        res.status(200).json({
  //          status: "Failed",
  //          statusCode: 400,
  //          message: 'Invalid Mobile Number! ' 
  //        });

  //      } else {


  //         //  SMS.sendSMS(user.get('mobile'),
  //         //  function(err, doc) {
  //         //  });
  //          res.status(200).json({
  //            status: "Success",
  //            statusCode: 200,
  //            message: 'SMS sent!',
  //           //  token: doc
  //          }) 
  //      }      
  //    });
  //  },


  //   verifyToken: function(req, res) {
  //     let key = req.body.token;
  //     User.where({
  //       activationToken: key
  //     }).fetch({require:false}).then(function(user_dat) {

  //       if (!user_dat) {
  //         failureHandlerText(400, 'Invalid Token!', res);
  //       } else {
  //         successHandler(200, 'Valid Token!', res);  
  //       }
  //     })["catch"](function(err) {
  //       failureHandler(400, err, res);
  //     });
  //   },



  //      trainingStatusMail:function(req,res){
  //      session_details.where({
  //    id: req.params.id  }).fetch({require:false}).then(function(result){
  //     if(result){
  //       let sessionDetail=JSON.parse(JSON.stringify(result))
  //       User.where({role_id:1}).query(function(qb){
  //         qb.select("email")
  //       }).fetchAll().then(result=>{
  //         let obj={
  //     mail:[],
  //     book:sessionDetail.book,
  //     chapter:sessionDetail.start_chapter,
  //     content:req.body.content
  //           } 

  //       let ticketObj = {
  //         "created_by": 0,
  //         "session_id":req.params.id,
  //         "status":"Feedback",
  //         "details": req.body.content,
  //         "book":sessionDetail.book,
  //         "chapter": sessionDetail.start_chapter,
  //         "verse":sessionDetail.start_verse,
  //         "assigned_to":46

  //          }
  //           ticket_details.forge(ticketObj).save().then ((session) => {
  //             // successHandler(200, session, res);

  //               //  JSON.parse(JSON.stringify(result)).forEach(element => {
  //       //   obj.mail.push(element.email)
  //       // });
  //             obj.mail[0]=JSON.parse(JSON.stringify(result))[2].email

  //          successHandler(200, "Email hase been sent successfully", res);
  //         })["catch"](function(err) {
  //             console.log(err)
  //             // failureHandler(400, err, res);
  //           });


  //   })

  // }

  //  })["catch"](function(err) {
  //      console.log(err)
  //    failureHandler(204, err, res);
  //  });

  // },
  getProfesionList: function (req, res) {
    profession_list.forge({}).fetchAll().then(function (result) {
      successHandler(200, result, res)
    })["catch"](function (err) {
      failureHandler(400, err, res);
    });
  },

  getInterestList: function (req, res) {
    intrest_list.forge({}).fetchAll().then(function (result) {
      successHandler(200, result, res)
    })["catch"](function (err) {
      failureHandler(400, err, res);
    });
  },

  getRoles: function (req, res) {

    Role.forge({}).fetchAll().then(function (result) {
      successHandler(200, result, res)
    })["catch"](function (err) {
      failureHandler(400, err, res);
    });
  },

  login: function (req, res, next) {
    let type = 'Email'
    const criteria = {}
    if (parseInt(req.body.email)) {
      criteria.phone_number = req.body.email
      type = "Phone Nnumber"
    } else if (req.body.email.indexOf('@') === -1) {
      criteria.u_name = req.body.email
      type = "Name"
    } else {
      criteria.email = req.body.email
      type = "Email"
    }
    User.where(criteria).fetch({ require: false }).then(function (user_data) {
      if (!user_data) {
        let error = new Error(type + ' does not exist!!!');
        failureHandler(400, error, res);
      } else {
        User.comparePassword(req.body.password, user_data, function (err, valid) {
          if (err) {
            let error = new Error('Forbidden');
            failureHandler(403, error, res);
          }
          if (!valid) {
            let error = new Error('Invalid Password');
            failureHandler(400, error, res);
          }
          if (valid) {
            user_data = JSON.parse(JSON.stringify(user_data))
            let obj = {
              user: user_data,
              token: 'JWT ' + jwToken.issue({
                UID: user_data.UID
              })
            }
            successHandler(200, obj, res)
          }
        });
      }
    }).catch(e =>
      failureHandler(400, e, res)
    );
  },

  register: function (req, res) {
    // req.body.profileImage = config.rootUrl+'images/avatar.png';
    registerUser(req, res, true);
  },


  forgotPassword: function (req, res) {
    User.where({ email: req.body.email }).fetch({ require: false }).then(function (user) {
      if (!user) {
        let error = new Error('Email you have enterd is not register!')
        failureHandler(202, error, res)
      } else {
        let OTP = otpGenerator.generate(6, { digits: true, alphabets: false, upperCase: false, specialChars: false })
        user.save({ OTP: OTP }).then(function (updatedUser) {
          setTimeout(() => {
            updatedUser.save({ OTP: null })
          }, 600000);//milli seconds
          let userData = user.toJSON()
          Email.mailOTP(userData, OTP)
          successHandler(200, 'successfully sent OTP to registered Email, It will expire in 10 Minutes', res)
        })["catch"](function (err) {

          failureHandler(400, err, res);
        });
      }
    });
  },


  resetPassword: function (req, res) {
    let passwordFields = {
      new_password: req.body.new_password,
      confirm_password: req.body.confirm_password
    }
    resetPasswordSchema.validate(passwordFields, function (err, value) {
      if (err) {
        if (!toJSON(err).isJoi) {
          err = toJSON(err).message;
        }
        failureHandler(400, err, res);
      } else {
        let key = req.body.OTP;
        User.where({
          OTP: key
        }).fetch({ require: false }).then(function (user_data) {
          if (!user_data) {
            let error = new Error('Invalid OTP!')
            failureHandler(202, error, res)
          } else {
            user_data.save(passwordFields).then(function (user) {
              user.save({ OTP: null })
              successHandler(200, 'Password changed successfully', res);
            })["catch"](function (err) {
              failureHandler(400, err, res);
            });
          }
        })["catch"](function (err) {
          failureHandler(400, err, res);
        });
      }
    });
  },

};


// function loginUser(req, res, socialUser) {
//   if (socialUser == null) {
//     if (req.user.err) {
//       failureHandler(400, req.user.err, res);
//     } else if (req.user.get('emailConfirmation')) {
//       loginSuccessHandler(req, res, req.user);
//     } else {
//       failureHandler(400, "Inactive account", res);
//     }
//   } else {
//     loginSuccessHandler(req, res, socialUser);
//   }
// }

// function loginSuccessHandler(req, res, user_data) {

//   // let user = { id: usr.id, roleType: usr.role_id, name: usr.name, email: usr.email }
//   res.status(200).json({
//     status: "Success",
//     statusCode: 200,
//     user: user_data,
//     token: 'JWT ' + jwToken.issue({
//       id: user_data.UID
//     })
//   });
// }

function registerUser(req, res, sendActivationMail) {
  req.body.role_id = req.body.role_id || 2
  req.body.UID = uuid()

  User.forge(req.body).save().then((user) => {
    user = JSON.parse(JSON.stringify(user))
    let obj = {
      user: user,
      token: 'JWT ' + jwToken.issue({
        UID: user.UID
      })
    }
    successHandler(200, obj, res)
  })["catch"](function (err) {
    failureHandler(400, err, res);
  });
}

function failureHandler(code, data, res) {

  if (!toJSON(data).isJoi) {
    data = toJSON(data).message;
  }
  res.status(code).json({
    status: "Failed",
    statusCode: code,
    message: data
  });
}

function successHandler(code, data, res) {
  res.status(code).json({
    status: "Success",
    statusCode: code,
    result: data
  });
} 