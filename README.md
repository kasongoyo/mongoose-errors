# mongoose-errors
 
Simple mongoose plugin to normalize mongoose errors using [http-errors](https://www.npmjs.com/package/http-errors). This plugin intercept mongoose errors to make them http-errors i.e errors
with status code property

## Prerequisites
 - [Nodejs 7.6.0 or greater](https://nodejs.org)
 - [Mongoose 4 or greater](https://mongoosejs.com/)

## Installing
```bash
npm i --save mongoose-errors
```

## Usage
    
Simple example
```bash
const MongooseErrors = require('mongoose-errors')
const ModelSchema = new Schema({
    requiredField: {
        type: String,
        required: true
    }
});

ModelSchema.plugin(MongooseErrors);

Model = mongoose.model('ModelName', ModelSchema);

Model
    .create(test)
    .catch(error => {
        console.log(error.statusCode);
        // print 400 which is http bad request error code
        done();
    });
           
```

## Testing
* Clone this repository

* Install all development dependencies
```sh
$ npm install
```
* Then run test
```sh
$ npm test
```

## Built With
- [npm](https://www.npmjs.com/) - Used as the project core technology and build tool

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/kasongoyo/mongoose-errors/tags). 

## Authors

* **Isaac Kasongoyo** - *Initial work* 

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
