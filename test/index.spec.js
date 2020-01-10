'use strict';

// dependencies
const path = require('path');
const faker = require('faker');
const mongoose = require('mongoose');
const expect = require('chai').expect;
const Schema = mongoose.Schema;
const MongooseErrors = require(path.join(__dirname, '..', 'index'));


describe('Mongoose Errors', function () {
    describe('Mongoose Validate Error', () => {
        let Model;
        before(function () {
            const ModelSchema = new Schema({
                anyField: String,
                requiredField: {
                    type: String,
                    required: [true, 'requiredField is required'],
                    validate: {
                        validator: function(v) {
                          return /\d{3}-\d{3}-\d{4}/.test(v);
                        },
                        message: props => `${props.value} is not a valid phone number!`
                    },
                }
            });
            ModelSchema.plugin(MongooseErrors);
            Model = mongoose.model(`Model+${faker.random.number()}`, ModelSchema);
        });


        it('should normalize mongoose validation error', function (done) {
            const test = { anyField: faker.random.words(), requiredField: 'mama' };
            Model
                .create(test)
                .catch(error => {
                    expect(error.statusCode).to.equal(400);
                    done();
                });
        });
    });

    describe('Mongoose Cast Error', () => {
        let Model;
        before(function () {
            const ModelSchema = new Schema({
                anyField: String
            });
            ModelSchema.plugin(MongooseErrors);
            Model = mongoose.model(`Model+${faker.random.number()}`, ModelSchema);
        });

        it('should normalize mongoose cast error', function (done) {
            // const testUser = { name: faker.random.words() };
            Model
                .findById(faker.random.uuid())
                .catch(error => {
                    expect(error.statusCode).to.equal(404);
                    done();
                });
        });
    });

    describe('Mongoose Duplicate Error', () => {
        let Model;
        const anyField = faker.random.words();
        before(function () {
            const ModelSchema = new Schema({
                anyField: {
                    type: String,
                    unique: true
                }
            });
            ModelSchema.plugin(MongooseErrors);
            Model = mongoose.model(`Model+${faker.random.number()}`, ModelSchema);
        });


        before(function (done) {
            const test = { anyField };
            Model
                .create(test)
                .then(() => {
                    done();
                });
        });

        it('should normalize mongoose duplicate error', function (done) {
            const test = { anyField };
            Model
                .create(test)
                .catch(error => {
                    expect(error.statusCode).to.equal(409);
                    done();
                });
        });
    });
});
