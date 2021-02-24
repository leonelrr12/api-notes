const mongoose = require('mongoose')

// if(process.argv.length < 3) {
//     console.log('Por favor necesitamos una contraseña: node mongo.js')
//     process.exit(1)
// }


// const password = process.argv[2]
const password = 'nicol1204$'


const url = "mongodb+srv://admin:nicol1204$@cluster0.vxs6e.mongodb.net/fullstack?authSource=admin&replicaSet=atlas-ejq0ik-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true"

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});


const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

// const note = new Note({
//     content: 'CSS3 + React JS + Python',
//     date: new Date(),
//     important: true
// })

// note.save().then(result => {
//     console.log('note saved!', result)
//     mongoose.connection.close()
// })

Note.find({}).then(result => {
    result.forEach(note => {
        console.log(note);
    })
    mongoose.connection.close()
})
