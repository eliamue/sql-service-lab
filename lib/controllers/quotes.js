import { Router } from 'express';
// import Quotes from '../models/Quotes.js';
import QuoteService from '../services/QuoteService.js';

export default Router()
  .post('/', async (req, res, next) => {
    try {
      const quote = await QuoteService.generateQuote(req.body);

      res.send(quote);
    } catch (err) {
      next(err);
    }
  });
