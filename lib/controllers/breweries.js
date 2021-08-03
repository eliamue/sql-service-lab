import { Router } from 'express';
// import Breweries from '../models/Breweries.js';
import BreweryService from '../services/BreweryService.js';

export default Router()
  .post('/', async (req, res, next) => {
    try {
      const brewery = await BreweryService.generateBrewery(req.body);

      res.send(brewery);
    } catch(err) {
      next(err);
    }
  });

