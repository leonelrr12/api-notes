const express = require('express')
const cors = require('cors')
const Note = require('./models/note')

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static('build'))


const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}


app.get('/api/notes', (req, res) => {
      Note.find({}).then(notes => {
        res.json(notes)
    })
})


app.get('/api/notes/:id', (req, res) => {
    const id = req.params.id
    Note.findById(id).then(note => {
        res.json(note)
    })
})


app.post('/api/notes', (request, response, next) => {
    const body = request.body

    const note = new Note({
        content: body.content,
        important: body.importan || false,
        date: new Date()
    })

    note.save()
      .then(savedNote => savedNote.toJSON())
      .then(saveAndFormatteNote => {
        response.json(saveAndFormatteNote)
      })
      .catch(error =>
        // next(error)
        errorHandler(error, request, response, next)
      )
})


app.put('/api/notes/:id', (req, res) => {
  const id = req.params.id
  
  const important = req.body.important
  Note.findByIdAndUpdate(id, {important: important}).then(note => {
    res.json(note)
  })
})


// app.put('/api/notes/:id', async (req, res) => {
  // note = await Note.findByIdAndUpdate(id, {important: important})
  // console.log(note);
  // res.json(note)    
// })


app.delete('/api/notes/:id', (req, res) => {
    const id = req.params.id

    Notes.findByIdAndDelete(id).then(result => {
      console.log(result);
    })

    res.status(204).end()
})


const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server conecting on port ${PORT}`);
})