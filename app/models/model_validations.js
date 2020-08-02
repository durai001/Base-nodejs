let Joi, changePasswordSchema, resetPasswordSchema,userValidationSchema, socialUserValidationSchema, categoryValidationSchema;
Joi = require('joi');


categoryValidationSchema = Joi.object().keys({
  U_name: Joi.string().required().label('Category Name'),
}).options({
  abortEarly: false,
  allowUnknown: true
});

socialUserValidationSchema = Joi.object().keys({
  U_name: Joi.string().required().label('User Name'),
  providerId: Joi.string().required().label('Provider Id'),
  providerName: Joi.string().required().valid('Twitter','Google', 'Facebook', 'Instagram').label('Provider Name'),
}).options({
  abortEarly: false,
  allowUnknown: true
});


userValidationSchema = Joi.object().keys({
  U_name: Joi.string().required().label('U_name'),
  email: Joi.string().email().required().label('Email'),
  gender: Joi.string().valid('Male', 'Female').label('Gender'),
  location: Joi.string().label('Location'),
  role_id: Joi.number().label('Role'),
  
  // mobile: Joi.number().min(8).required().label('Phone'),
  website: Joi.string().regex(/^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/).options({
    language: {
      string: {
        regex: {
          base: 'Invalid Website'
        }
      },
      label: 'Website'
    }
  }),
  password: Joi.string().regex(/^(?=.*?[A-Za-z])(?=.*?[0-9])(?=.*?[^\w\s])(?!.*\s).{8,}$/).required().options({
    language: {
      string: {
        regex: {
          base: 'must be 8 characters with 1 number, 1 special character, no spaces'
        }
      },
      label: 'Password'
    }
  }),
  confirm_password: Joi.any().valid(Joi.ref('password')).required().options({
    language: {
      any: {
        allowOnly: 'should match with New password'
      },
      label: 'Password Confirmation'
    }
  })
}).options({
  abortEarly: false,
  allowUnknown: true
});

loginValidationSchema = Joi.object().keys({
  email: Joi.string().email().required().label('Email'),
  password: Joi.string().required().label('Password'),
}).options({
  abortEarly: false,
  allowUnknown: true
});

resetPasswordSchema = Joi.object().keys({
  new_password: Joi.string().regex(/^(?=.*?[A-Za-z])(?=.*?[0-9])(?=.*?[^\w\s])(?!.*\s).{8,}$/).required().options({
    language: {
      string: {
        regex: {
          base: 'must be 8 characters with 1 number, 1 special character, no spaces'
        }
      },
      label: 'New password'
    }
  }),
  confirm_password: Joi.any().valid(Joi.ref('new_password')).required().options({
    language: {
      any: {
        allowOnly: 'should match with New password'
      },
      label: 'Password Confirmation'
    }
  })
}).options({
  abortEarly: false,
  allowUnknown: true
});

changePasswordSchema = Joi.object().keys({
  old_password: Joi.string().required(),
  new_password: Joi.string().regex(/^(?=.*?[A-Za-z])(?=.*?[0-9])(?=.*?[^\w\s])(?!.*\s).{8,}$/).required().options({
    language: {
      string: {
        regex: {
          base: 'must be 8 characters with 1 number, 1 special character, no spaces'
        }
      },
      label: 'New password'
    }
  }),
  confirm_password: Joi.any().valid(Joi.ref('new_password')).required().options({
    language: {
      any: {
        allowOnly: 'should match with New password'
      },
      label: 'Password Confirmation'
    }
  })
}).options({
  abortEarly: false,
  allowUnknown: true
});


module.exports = {
  userValidationSchema: userValidationSchema,
  changePasswordSchema: changePasswordSchema,
  resetPasswordSchema: resetPasswordSchema,
  socialUserValidationSchema: socialUserValidationSchema,
  categoryValidationSchema: categoryValidationSchema,
  loginValidationSchema: loginValidationSchema
};