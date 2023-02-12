const mongoose = require('mongoose');

const GeoSchema = new mongoose.Schema({
  lat: {
    type: String,
    required: true,
    validate: function (value) {
      const regex = /^-?\d{1,2}\.\d{1,6}$/;
      if (!regex.test(value)) {
        throw new Error('Latitude must be in the following format: -90.000000 to 90.000000');
      }
    }
  },
  lng: {
    type: String,
    required: true,
    validate: function (value) {
      const regex = /^-?\d{1,3}\.\d{1,6}$/;
      if (!regex.test(value)) {
        throw new Error('Longitude must be in the following format: -180.000000 to 180.000000');
      }
    }
  }
})

const AddressSchema = new mongoose.Schema({
  street: {
    type: String,
    required: true,
  },
  suite: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
    validate: function (value) {
      const regex = /^[a-zA-Z\s]+$/;
      if (!regex.test(value)) {
        throw new Error('City must contain only letters or spaces');
      }
    }
  },
  zipcode: {
    type: String,
    required: true,
    validate: function (value) {
      const regex = /^\d{5}-\d{4}$/;
      if (!regex.test(value)) {
        throw new Error('Zip must be in the following format: 12345-1234 (DDDDD-DDDD)');
      }
    }
  },
  geo: GeoSchema
})

const CompanySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  catchPhrase: {
    type: String,
    required: true,
  },
  bs: {
    type: String,
    required: true,
  }
})

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    validate: function (value) {
      const regex = /^[a-zA-Z\s]+$/;
      if (!regex.test(value)) {
        throw new Error('Name must contain only letters or spaces');
      }
    }
  },
  username: {
    type: String,
    required: true,
    validate: function (value) {
      if (value.length <= 3) {
        throw new Error('Username must be at least 4 characters long');
      }
    }
  },
  email: {
    type: String,
    required: true,
    validate: function (value) {
      if (!value.includes('@')) {
        throw new Error('Email must contain @');
      }

      if (!value.includes('.')) {
        throw new Error('Email must contain .');
      }
    }
  },
  address: AddressSchema,
  phone: {
    type: String,
    required: true,
    validate: function (value) {
      const regex = /^\d{1}-\d{3}-\d{3}-\d{4}$/;
      if (!regex.test(value)) {
        throw new Error('Phone must be in the following format: 1-123-456-7890 (D-DDD-DDD-DDDD)');
      }
    }
  },
  website: {
    type: String,
    required: true,
    validate: function (value) {
      if (!value.includes('http://') && !value.includes('https://')) {
        throw new Error('Web must contain http:// or https://');
      }
    }
  },
  company: CompanySchema
})

const User = mongoose.model('User', UserSchema);
module.exports = User;