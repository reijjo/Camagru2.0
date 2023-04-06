# how to start:
mkdir YOUR_FOLDER_NAME
cd YOUR_FOLDER_NAME

# FRONTEND

npx create-react-app client
cd client
npm start

cd src
rm App.css App.test.js logo.svg reportWebVitals setupTests.js

## packages:
npm install axios
npm install --save-dev @testing-library/react @testing-library/jest-dom
npm install --save-dev @testing-library/user-event
npm install --save-dev cypress
npm install react-router-dom

## Files

### index.js
```js
import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(<App />)
```

### App.js
```js
const App = () => (
  <div>
    <p>Hello world</p>
  </div>
)

export default App
```

### package.json
```json
{
  // ...
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject",
    "eslint": "eslint .",
    "cypress:open": "cypress open",
		"test:e2e": "cypress run"
  },
  // ...
}
```

### json-server
make db.json file in the root of your project

#### db.json
{
  "notes": [
    {
      "id": 1,
      "content": "HTML is easy",
      "important": true
    },
    {
      "id": 2,
      "content": "Browser can execute only JavaScript",
      "important": false
    },
    {
      "id": 3,
      "content": "GET and POST are the most important methods of HTTP protocol",
      "important": true
    }
  ]
}

#### json-server package.json
{
  // ...
  "scripts": {
    ...,
    "server": "json-server -p3001 --watch db.json"
  },
}

* in client folder
npm install json-server --save-dev
npm run server <-- in another terminal


### services/notes.js
```
import axios from 'axios'
// const baseUrl = '/api/notes'
const baseUrl = 'http://localhost:3001/api/notes'

let token = null

const setToken = (newToken) => {
	token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async (newObject) => {
	const config = {
		headers: { Authorization: token }
	}

  const response = await axios.post(baseUrl, newObject, config)
	return response.data
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

const noteService = { getAll, create, update, setToken }

export default noteService
```


# BACKEND

mkdir server
cd server
npm init
npm start/npm run dev

## packages:
npm install express
npm install --save-dev nodemon
npm install morgan
npm install cors
npm install mongoose
npm install dotenv
npm install --save-dev jest
npm install --save-dev cross-env
npm install --save-dev supertest
npm install express-async-errors
npm install bcrypt
npm install mongoose-unique-validator
(npm install mongoose@6)
npm install jsonwebtoken
npm install prop-types


## Files

### index.js
```js
const app = require('./app') // varsinainen Express-sovellus
const config = require('./utils/config')
const logger = require('./utils/logger')

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})
```

### app.js (example)
```js
const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const notesRouter = require('./controllers/notes')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connection to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/notes', notesRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
```

### package.json
```json
{
  // ...
  "scripts": {
    "start": "cross-env NODE_ENV=production node index.js",
		"dev": "cross-env NODE_ENV=development nodemon index.js",
    "test": "cross-env NODE_ENV=test jest --verbose --runInBand",
		"start:test": "NODE_ENV=test node index.js",
		"dev:test": "cross-env NODE_ENV=test nodemon index.js"
  },
  // ...
	"jest": {
		"testEnviroment": "node",
		"globalTeardown": "./tests/teardown.js"
	}
}
```

### mongo.js (example of mongo usage)
```js
const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://fullstack:${password}@cluster0.o1opl.mongodb.net/?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

const note = new Note({
  content: 'HTML is Easy',
  important: true,
})

note.save().then(result => {
  console.log('note saved!')
  mongoose.connection.close()
})
```


### .env
MONGODB_URI=mongodb+srv://<USERNAME>:<PASSWORD>@cluster0.o1opl.mongodb.net/<APPNAME>?retryWrites=true&w=majority
PORT=3001

TEST_MONGODB_URI=mongodb+srv://<USERNAME>:<PASSWORD>@cluster0.o1opl.mongodb.net/<TEST_APPNAME>?retryWrites=true&w=majority

### .gitignore
node_modules
.DS_Store
.env


### controllers/note.js
```js
const notesRouter = require('express').Router()
const Note = require('../models/note')

notesRouter.get('/', (request, response) => {
  Note.find({}).then(notes => {
    response.json(notes)
  })
})

notesRouter.get('/:id', (request, response, next) => {
  Note.findById(request.params.id)
    .then(note => {
      if (note) {
        response.json(note)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

notesRouter.post('/', (request, response, next) => {
  const body = request.body

  const note = new Note({
    content: body.content,
    important: body.important || false,
  })

  note.save()
    .then(savedNote => {
      response.json(savedNote)
    })
    .catch(error => next(error))
})

notesRouter.delete('/:id', (request, response, next) => {
  Note.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

notesRouter.put('/:id', (request, response, next) => {
  const body = request.body

  const note = {
    content: body.content,
    important: body.important,
  }

  Note.findByIdAndUpdate(request.params.id, note, { new: true })
    .then(updatedNote => {
      response.json(updatedNote)
    })
    .catch(error => next(error))
})

module.exports = notesRouter
```

### models/note.js (example of mongo)
```js
const mongoose = require('mongoose')
const uniqueValidator = require('mongoose')

const noteSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
    minlength: 5
  },
  important: Boolean,
})

userSchema.plugin(uniqueValidator)

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Note', noteSchema)
```

### tests/reverse.test.js
```js
const reverse = require('../utils/for_testing').reverse

test('reverse of a', () => {
  const result = reverse('a')

  expect(result).toBe('a')
})

test('reverse of react', () => {
  const result = reverse('react')

  expect(result).toBe('tcaer')
})

test('reverse of saippuakauppias', () => {
  const result = reverse('saippuakauppias')

  expect(result).toBe('saippuakauppias')
})
```

### tests/note_api.test.js
```js
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('notes are returned as json', async () => {
  await api
    .get('/api/notes')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

afterAll(async () => {
  await mongoose.connection.close()
})
```

### tests/teardown.js
```js
module.exports = () => {
	process.exit(0)
}
```

### utils/middleware.js
```js
const logger = require('./logger')

const requestLogger = (req, res, next) => {
	logger.info('Method:', req.method)
	logger.info('Path: ', req.path)
	logger.info('Body: ', req.body)
	logger.info('---')
	next()
}

// (morgan is a nice logger too)

const unknownEndpoint = (req, res) => {
	res.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, req, res ,next) => {
	logger.error(error.message)

	if (error.name === 'CastError') {
		return res.status(400).send({ error: 'malformatted id' })
	}
	else if (error.name === 'ValidationError') {
		return res.status(400).json({ error: error.message })
	}
	else if (error.name === 'JsonWebTokenError') {
		return res.status(400).json({ error: 'token missing or invalid' })
	}
	else if (error.name === 'TokenExpiredError') {
		return res.status(401).json({ error: 'token expired' })
	}
	next(error)
}

module.exports = {
	requestLogger, unknownEndpoint, errorHandler
}
```



### utils/logger.js
```js
const info = (...params) => {
  console.log(...params)
}

const error = (...params) => {
  console.error(...params)
}

module.exports = {
  info, error
}

// if the console.logs disturbs tests:
// const info = (...params) => {
//   if (process.env.NODE_ENV !== 'test') {
//     console.log(...params)
//   }
// }

// const error = (...params) => {
//   if (process.env.NODE_ENV !== 'test') {
//     console.error(...params)
//   }
// }

// module.exports = {
//   info, error
// }
```

### utils/config.js
```js
require('dotenv').config()

let PORT = process.env.PORT
let MONGODB_URI = process.env.NODE_ENV === 'test'
	? process.env.TEST_MONGODB_URI
	: process.env.MONGO_URI

module.exports = {
  MONGODB_URI,
  PORT
}
```

### utils/for_testing.js
```js
const reverse = (string) => {
  return string
    .split('')
    .reverse()
    .join('')
}

const average = (array) => {
  const reducer = (sum, item) => {
    return sum + item
  }

  return array.reduce(reducer, 0) / array.length
}

module.exports = {
  reverse,
  average,
}
```



## FLY.IO and RENDER deploy

* FLY.IO package.json
{
  // ...
  "scripts": {
    "start": "node index.js",
		"dev": "nodemon index.js",
    "test": "echo \"Error: no test specified\" && exit 1",
		"build:ui": "rm -rf build && cd ../client && npm run build && cp -r build ../server",
    "deploy": "fly deploy",
    "deploy:full": "npm run build:ui && npm run deploy",
    "logs:prod": "fly logs"
  },
  // ...
}

* RENDER package.json
{
  // ...
  "scripts": {
    "start": "node index.js",
		"dev": "nodemon index.js",
    "test": "echo \"Error: no test specified\" && exit 1",
		"build:ui": "rm -rf build && cd ../client && npm run build && cp -r build ../server",
    "deploy:full": "npm run build:ui && (cd ../ && git add . && git commit -m uibuild && git push)"
  },
  // ...
}

### after build? package.json
{
  "dependencies": {
    // ...
  },
  "scripts": {
    // ...
  },
  "proxy": "http://localhost:3001"
}

# structure
project/
|-- client/
|		|-- src/
|		|		|-- components/
|		|		|		|-- Header.js
|		|		|		|-- etc...
|		|		|-- services/
|		|		|		|-- axiosstuff.js
|		|		|		|-- etc...
|		|		|-- tests/
|		|		|		|-- JEST.test.js
|		|		|-- App.js
|		|		|-- index.js
|		|		|-- index.css
|		|		|-- .gitignore etcetc
|-- server/
|		|-- controllers/
|		|		|-- api/calls.js
|		|-- models/
|		|		|-- mongoDBschema1.js
|		|		|-- mongoDBschema2.js
|		|-- requests/
|		|		|-- restfulapistuff.rest
|		|-- tests/
|		|		|-- backendJEST.test.js
|		|-- utils/
|		|		|-- config.js
|		|		|-- middleware.js
|		|		|-- etcetc
|		|-- .env
|		|-- app.js
|		|-- index.js
|		|-- .gitignore etc etc
|		/
/
