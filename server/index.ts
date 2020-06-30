import { join } from 'path';
import express from 'express';
import next from 'next';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import fileUpload from 'express-fileupload';


// eslint-disable-next-line @typescript-eslint/no-var-requires
const middlewares = require('./api/index');

mongoose.connect('mongodb://localhost:27017/luxury?authSource=admin',
  {
    user: 'myUserAdmin',
    pass: 'arash688:D',
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

mongoose.connection.on('error', () => {
  console.log('error');
});
mongoose.connection.once('connected', () => {
  console.log('connected');
});

const port = parseInt(process.env.PORT || '80', 10);
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();
  server.use(bodyParser.json({ limit: '50mb' }));
  server.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
  server.use(fileUpload({ extended: true }));
  server.use('/api', middlewares);
  server.use(express.static('statics'));


  server.get('*', (req: any, res) => {
    if (req.url.includes('/sw')) {
      const filePath = join(__dirname, 'static', 'workbox', 'sw.js');
      app.serveStatic(req, res, filePath);
    } else if (req.url.startsWith('static/workbox/')) {
      app.serveStatic(req, res, join(__dirname, req.url));
    } else {
      handle(req, res, req.url);
    }
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
