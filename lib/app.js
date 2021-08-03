import express from 'express';
import notFoundMiddleware from './middleware/not-found.js';
import errorMiddleware from './middleware/error.js';
import accountsController from '../lib/controllers/account.js';
import quotesController from '../lib/controllers/quotes.js';
import breweryController from '../lib/controllers/brewery.js';

const app = express();


app.use(express.json());
app.use('/api/v1/accounts', accountsController);
app.use('/api/v1/quotes', quotesController);
app.use('/api/v1/brewery', breweryController);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
