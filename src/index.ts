import 'reflect-metadata';
import { createConnection } from 'typeorm';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';

import routes from './routes';

createConnection()
  .then(() => {
    const app = express();

    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(helmet());
    app.use(cors());

    app.use('/', routes);

    app.listen(3333, () => {
      console.log('Server started on port 3333!');
    });
  })
  .catch((error) => console.log(error));
