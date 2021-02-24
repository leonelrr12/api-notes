const mongoose = require('mongoose')
require('dotenv').config()

const url = process.env.MONGODB_URI
console.log('MONGODB URI', url);

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})
.then(result => {
    console.log("Connected to MondoDB")
})
.catch(err => {
    console.log("Error connecting to MongoDB: ", err.message);
})

const noteSchema = new mongoose.Schema({
    content: {
        type: String,
        minlength: 5,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    important: Boolean
})
    
noteSchema.set('toJSON', {
    transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    }
})

mongoose.set('returnOriginal', false);

module.exports = mongoose.model('Note', noteSchema)
      