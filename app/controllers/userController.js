let User = require('../models/user');
 
let _ = require("lodash")
// changePasswordSchema = require('../models/model_validations').changePasswordSchema;
toJSON = require('utils-error-to-json');
// // Email = require('../services/Email');
// pick = require('lodash/pick');
// otpGenerator = require('otp-generator');
// let config = require('../../config/config');

// // map = require ('lodash/map');
// // each = require ('lodash/each');

module.exports = {

  my_profile: function (req, res) {
    if (req.user) {
      res.status(200).json({
        status: "Success",
        statusCode: 200,
        user: req.user
      });
    }
  },

  update_my_profile: function (req, res) {
    if (!_.isEmpty(req.body)) {
      // if(req.body.profession_list){
      //   updateProfession(req.body.profession_list)
      //   delete req.body.profession_list
      // }
      //  if(req.body.interested_list){
      //   updateInterested(req.body.interested_list)
      //   delete req.body.interested_list
      // } 
      req.user.save(req.body, {
        patch: true
      }).then(function (user) {
        if (user) {
          successHandler(200, user, res)
        } else {
          let error = new Error('User Not Found !!!');
          failureHandler(202, error, res);
        }
      })["catch"](function (err) {
        failureHandler(202, err, res);
      });


    } else {
      let error = new Error('Please Enter value');
      failureHandler(202, error, res);
    }
  },

  deleteUser: function (req, res) {
    req.user.destroy()
      .then((result) => {
        successHandler(200, "Account Deleted Permanently", res)
      }).catch(e => {
        failureHandler(202, e, res);
      })
  },

  changePassword: function (req, res) {
    validation.changePasswordSchema.validate(req.body, function (err, value) {
      if (err) {
        res.json(err);
      } else {
        let user_data = req.user
        if (req.user) {
          User.comparePassword(req.body.old_password, user_data, function (err, valid) {
            if (err) {
              failureHandler(202, err, res);
            }
            if (!valid) {
              let error = new Error('Invalid Old Password');
              failureHandler(400, error, res);
            }
            if (valid) {
              user_data.save(req.body).then(function (user) {
                successHandler(200, 'Password changed successfully', res);
              })["catch"](function (err) {
                console.log(err)
                failureHandler(400, err, res);
              });
            }
          });
        }

      }
    });
  },

  //     User.where({
  //       id: req.params.id
  //     }).fetch().then(function(delete_user) {
  //       if(delete_user){
  //         delete_user.destroy().then(function() {

  //         successHandler(200, 'User Successfully Deleted', res);
  //       })["catch"](function(errOne) {
  //         if (!toJSON(errOne).isJoi) {
  //           errOne = toJSON(err).message;
  //             }
  //         res.status(400).json({
  //         message: errOne
  //         });
  //         });
  //       }else{
  //         res.status(400).json({
  //           message: "No User found"
  //         });
  //       }

  //     })["catch"](function(errTwo) {
  //       res.status(400).json({
  //       message: errTwo

  //       });
  //     });
  //   },


  get_all_users: function (req, res) {
    let search = req.query.search || ""
    let page = req.query.page || 1
    let limit = req.query.limit || 200

    User.forge({ is_delete: 0 }).query(qb => {
      qb.where('UID', '<>', req.user.get('UID'))
      if (search) {
        qb.where('U_name', 'LIKE', `%${search}%`).orWhere('email', 'LIKE', `%${search}%`)
      }
    })
      .fetchPage({
        page: parseInt(page),
        pageSize: parseInt(limit),
        withRelated: ['role']
      })
      .then(function (users) {
        if (users) {
          users_list = users.toJSON()
          let obj = { users_list, pagination: users.pagination }
          successHandler(200, obj, res)
        } else {
          successHandler(200, users, res)
        }

      }).catch(e => {
        failureHandler(412, e, res);
      })
  },


  userDeatails: function (req, res) {
    console.log(req.query.user_id)
    User.forge({ UID: req.query.user_id })
      .orderBy('created_at', 'ASEC')
      .fetch({ require: false, withRelated: ['role'] })
      .then(function (user) {
        if (!user) {
          failureHandler(402, new Error("User does not exists"), res)
        } else {
          successHandler(200, user, res)
        }
      })["catch"](function (err) {
        failureHandler(400, err, res);
      });

  },
  //   updateProfileImg:function(req,res){

  // if(req.files.profile_img.file){
  //   let img=req.files.profile_img.file

  //  let profile={

  //   profile_img:req.files.profile_img.file
  // }

  //     User.where({id:req.query.user_id})
  //     .save(profile,{method: 'update', patch: true}).then(function(result) {


  //       if(result){
  //         User.forge({
  //           id:req.query.user_id
  //         }).fetch().then(function(result) {
  //         res.status(200).json({
  //           status: "Success Profile image changed",
  //           statusCode: 200,
  //           data: result
  //         });
  //       })["catch"](function(err) {
  //         failureHandler(400, err, res);
  //       });
  //       }else{
  //         failureHandler(400, 'No User Found!!!', res);
  //       }

  //     })
  //   }else{
  //     res.status(200).json({

  //       statusCode: 200,
  //       Message:"Please Choose Image"
  //     });
  //   }
  //   },


  // updateUser:function(req,res){

  // User.where({id:parseInt(req.params.id)})
  // .save(req.body,{method: 'update', patch: true,require:false}).then(function(result) {
  //    res.status(200).json({
  //     status: "Success",
  //     statusCode: 200,
  //     data: result
  //   }); 

  // })["catch"](function(err) {
  //   if (!toJSON(err).isJoi) {
  //     err = toJSON(err).message;
  //   }
  //    console.log(err,"eeeeee")
  //   if(err==="EmptyResponse"){
  //     res.status(200).json({
  //       status: "Success",
  //       statusCode: 200,
  //       data: {message:"Success"}
  //     }); 
  //   }else{
  //     failureHandler(400, err, res);
  //   }
  // });

  // User.where({ id: req.params.id }).fetch().then(user=>{
  //   console.log(user)
  //   if(user){
  //     user.save(req.body,{method: 'update', patch: true,require:false}).then(function(result) {
  //       res.status(200).json({
  //        status: "Success",
  //        statusCode: 200,
  //        data: result
  //      }); 

  //     })["catch"](function(err) {
  //      if (!toJSON(err).isJoi) {
  //        err = toJSON(err).message;
  //      }
  //       console.log(err,"eeeeee")

  //      failureHandler(400, err, res);
  //     });

  //   }
  // })

  // },



  //   index: function(req, res) {
  //     let filterName = req.query.filterName||''
  //     let pageNo = req.query.pageNumber || 1;
  //     let itemsPerPage = req.query.itemsPerPage ||10;

  //     let active ={}
  //     if(req.query.activeUser){
  //       if(req.query.activeUser==1){
  //         active={'active':1}
  //       }else{
  //         active={'active': !1}
  //       } 
  //     } 
  //     User
  //     .where('name','LIKE',filterName+'%')
  //     .where(active)
  //     .where({role_id:2}).orderBy('created_at', 'DESC')


  //     .fetchPage({
  //       page:pageNo,
  //       pageSize:itemsPerPage,
  //       withRelated: ['role']
  //     })

  //     .then(function(users) {

  //       if(users.length != 0){
  //         res.status(200).json({
  //           status: "Success",
  //           statusCode: 200,
  //           current_page:pageNo,
  //           total_page:users.pagination.pageCount,
  //           total_count:users.pagination.rowCount,
  //           users: users
  //         })
  //       }else{
  //         failureHandler(400, 'No User Found!!!', res);
  //       }
  //     })["catch"](function(err) {
  //       failureHandler(400, err, res);
  //     })
  //   },

  //   changePassword: function(req, res) {


  //     changePasswordSchema.validate(req.body, function(err, value) {

  //       if (err) {
  //         res.json(err);

  //       } else {

  //         User.comparePassword(req.body.old_password, req.user, function(err, valid) {

  //           if (err) {
  //             failureHandler(403, 'Forbidden', res);

  //           }
  //           if (!valid) {
  //             failureHandler(400, 'Invalid Old Password', res);

  //           }
  //           if (valid) {

  //             req.user.save(req.body).then(function(user) {
  //               successHandler(200, 'Password changed successfully', res);
  //             })["catch"](function(err) {
  //               failureHandler(400, err, res);
  //             });
  //           }
  //         });
  //       }
  //     });
  //   }

}; 

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
    message: data
  });
}
