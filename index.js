const express = require('express')
const cors = require('cors')
const app = express()

notes = [
    {
      "id": 1,
      "content": "HTML is easy",
      "date": "2019-05-30T17:30:31.098Z",
      "important": true
    },
    {
      "id": 2,
      "content": "Browser can execute only JavaScript",
      "date": "2019-05-30T18:39:34.091Z",
      "important": false
    },
    {
      "id": 3,
      "content": "GET and POST are the most important methods of HTTP protocol V8",
      "date": "2019-05-30T19:20:14.298Z",
      "important": true
    },
    {
      "content": "CSS3 + React JS + Python",
      "date": "2021-02-17T17:41:45.095Z",
      "important": false,
      "id": 4
    },
    {
      "content": "Ok ahora Angular + C#",
      "date": "2021-02-17T17:48:05.009Z",
      "important": true,
      "id": 5
    },
    {
      "content": "Este es una nueva Nota",
      "date": "2021-02-18T01:39:39.006Z",
      "important": false,
      "id": 6
    }
  ]

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send("Hello World !!! =>")
})

const generateId = () => {
    return notes.length > 0
        ? Math.max(...notes.map(p => p.id)) + 1
        : 1
}

app.get('/api/notes', (req, res) => {
    res.json(notes)
})


app.get('/api/notes/:id', (req, res) => {
    const id = Number(req.params.id)
    const note = notes.filter(p => p.id === id)
    res.json(note)
})

app.post('/api/notes', (req, res) => {
    const body = req.body

    const note = {
        content: body.content,
        important: body.importan || false,
        date: new Date().toISOString(),    
        id: generateId()   
    }

    notes = notes.concat(note)
    res.json(note)
})


app.put('/api/notes/:id', (req, res) => {
    const id = Number(req.params.id)
    const note = req.body

    notes = notes.map(n => n.id === id ? note : n)

    res.json(note)
})


app.delete('/api/notes/:id', (req, res) => {
    const id = Number(req.params.id)

    notes = notes.filter(n => n.id !== id)
    res.status(200).end()
})


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server conecting on port ${PORT}`);
})