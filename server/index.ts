import express from 'express';
import next from 'next';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import session from 'express-session';
import connectMongo from 'connect-mongo';

import AccountController from './api'

mongoose.connect('mongodb://localhost:27017/luxury',
  {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
)
const db = mongoose.connection;
const MongoStore = connectMongo(session);

mongoose.connection.on('error', () => {
  console.log('error');
});
mongoose.connection.once('connected', () => {
  console.log('connected');
});

const port = parseInt(process.env.PORT || '3000', 10)
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = express();
  server.use(bodyParser.json());
  server.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: db })
  }))
  server.use('/api', AccountController)


  server.get('/a', (req, res) => {
    return app.render(req, res, '/a', req.query)
  })

  server.get('/b', (req, res) => {
    return app.render(req, res, '/b', req.query)
  })

  server.get('/posts/:id', (req, res) => {
    return app.render(req, res, '/posts', { id: req.params.id })
  })

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.get('/upload', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
