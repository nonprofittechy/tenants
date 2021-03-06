'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
  escapeRegExp = require('lodash.escaperegexp'),
  Q = require('q'),
  errorHandler = require('../errors.server.controller'),
  mongoose = require('mongoose'),
  passport = require('passport'),
  rollbar = require('rollbar'),
  User = mongoose.model('User'),
  Identity = mongoose.model('Identity'),
  Tenant = mongoose.model('Tenant'),
  Advocate = mongoose.model('Advocate');

mongoose.Promise = require('q').Promise;

/**
 *  Validating an advocate code.
 *    Takes in an advocate code and
 *    Returns a promise
 *
 */
var validateCode = exports.validateCode = function(code) {

  var validated = Q.defer();

  // Advocate codes are case insensitive!
  Advocate.findOne({ code: { $regex: new RegExp('^' + escapeRegExp(code) + '$', 'i') } })
    .then(function (advocate) {

      // if(!advocate) {
      //   validated.reject(new Error("Invalid Access Code."));
      // } else {
      //   validated.resolve(advocate);
      // }

      // We're not gonna be opinionated here, I guess
      validated.resolve(advocate);

    })
    .catch(function (err) {
      console.log('error?', err);
      validated.reject(err);
    });

  return validated.promise;
};

exports.validateNewUser = function(req, res) {

  validateCode(req.query.code)
    .then(function (advocate) {

      if(advocate) {

        res.json({
          advocate: advocate._id,
          advocateRole: 'linked',
          referral: {                                   // this is just for display purposes
            email: advocate.email,
            contactPhone: advocate.contactPhone,
            contactPhoneExt: advocate.contactPhoneExt,
            organization: advocate.organization,
            name: advocate.fullName,
            code: advocate.code
          }
        });
      } else {
        res.json({ advocate: null, referral: null });
      }



    })
    .catch(function (err) {
      console.log(err);
      rollbar.handleError("Invalid Access Code", { code: req.query.code, error: err }, req);
      res.status(400).send({ message: errorHandler.getErrorMessage(err) });
    });

};

exports.validateExistingUser = function(req, res) {

  // TODO

};
