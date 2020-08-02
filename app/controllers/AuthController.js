let User, jwToken, toJSON, Email, otpGenerator, resetPasswordSchema, session_details;
// SMS=require('../services/SMS')
jwToken = require('../services/jwToken');
User = require('../models/user');
 
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

  socialLogin: function (req, res) {
    let criteria = {}
    if (parseInt(req.body.phone_number)) {
      criteria.phone_number = req.body.phone_number
    }
    if (req.body.email) {
      criteria.email = req.body.email
      if (req.body.providerId && req.body.providerName) {
        User.where(criteria).fetch({ require: false }).then(function (user_data) {
          if (!user_data) {
            if (req.body.U_name) {
              registerUser(req, res, false); //register
            } else {
              let error = new Error('U_name is Mandatory');
              failureHandler(400, error, res);
            }
          } else {
            if (user_data) {
              console.log(user_data.get('providerName'))
              if (user_data.get('providerName') !== req.body.providerName || user_data.get('providerId') !== req.body.providerId) {
                let error = new Error('ProviderName and ProviderId is not match for this user!');
                failureHandler(400, error, res);
              } else {
                loginUser(req, res, user_data); //login             
              }
            } else {
              let error = new Error('Invalid ProviderId!');
              failureHandler(400, error, res);
            }
          }
        })["catch"](function (err) {
          failureHandler(400, err, res);
        });
      } else {
        let error = new Error('Provider ID and Provider name is rquired');
        failureHandler(400, error, res);
      }
    } else {
      let error = new Error('Email ID is required');
      failureHandler(400, error, res);
    }

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
            loginUser(req, res, user_data); //login             

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


function loginUser(req, res, user_data) {
  if (user_data == null) {
    if (req.user.err) {
      failureHandler(400, req.user.err, res);
    } else {
      successHandler(200, req.user, res);
    }
  } else {
    loginUserResponse(req, user_data, res)
  }
}


function loginUserResponse(req, user_data, res) {
  if (user_data) {
    let obj = {
      user: user_data,
      token: 'JWT ' + jwToken.issue({
        UID: user_data.get('UID')
      })
    }
    successHandler(200, obj, res)
  }
}


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