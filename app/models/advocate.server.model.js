'use strict';

/**
 * Module dependencies.
 */
var Q = require('q'),
    _ = require('lodash'),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    crypto = require('crypto'),
    rollbar = require('rollbar'),
    IdentitySchema = require('./identity.server.model.js');

mongoose.Promise = require('q').Promise;

/**
 * A Validation function for local strategy properties
 */
var validateLocalStrategyProperty = function(property) {
  return ((this.provider !== 'local' && !this.updated) || property.length);
};

/**
 * Advocate Schema
 */
var AdvocateSchema = new Schema({
  firstName: {
    type: String,
    trim: true,
    default: '',
    validate: [validateLocalStrategyProperty, 'Please fill in your first name.']
  },
  lastName: {
    type: String,
    trim: true,
    default: '',
    validate: [validateLocalStrategyProperty, 'Please fill in your last name.']
  },
  fullName: {
    type: String,
    trim: true,
    default: ''
  },
  phone: {
    type: String,
    unique: true,
    trim: true,
    default: '',
    validate: [validateLocalStrategyProperty, 'Please fill in your phone number'],
    match: [/[0-9]{7}/, 'Please fill a valid phone number'],
    required: true
  },
  code: {
    type: String,
    unique: true,
    trim: true,
    default: '',
    validate: [validateLocalStrategyProperty, 'Please add an advocate code.'],
    required: true
  },
  email: {
    type: String,
    trim: true,
    default: '',
    validate: [validateLocalStrategyProperty, 'Please add an email address.'],
    required: true
  },
  organization: {
    type: String,
    trim: true,
    default: '',
    validate: [validateLocalStrategyProperty, 'Please add an organization name.'],
    required: true
  },
  contactPhone: {
    type: String,
    trim: true,
    default: '',
    validate: [validateLocalStrategyProperty, 'Please add a contact phone number.'],
    required: true
  },
  updated: {
    type: Date
  },
  created: {
    type: Date,
    default: Date.now
  }
});


/**
 * Can call this to perform additional functions after its populated as userdata
 */
AdvocateSchema.methods.build = function() {

    var built = Q.defer();

    console.log('build', this);

    built.resolve(this);

    return built.promise;
};

/**
 * Hook a pre save method to hash the password, and do user updating things
 * This is pretty nice to have in one spot!
 */
AdvocateSchema.pre('save', function(next) {

  this.fullName = this.firstName + ' ' + this.lastName;

  next();

});

mongoose.model('Advocate', AdvocateSchema);