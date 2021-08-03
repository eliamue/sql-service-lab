import { Router } from 'express';
import Breweries from '../models/Breweries.js';
import BreweryService from '../services/BreweryService.js';

export default Router()
  .post('/', async (req, res, next) => {
    try {
      const brewery = await BreweryService.generateBrewery(req.body);

      res.send(brewery);
    } catch(err) {
      next(err);
    }
  })
  
  .get('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const brewery = await Breweries.getById(id);

      res.send(brewery);
    } catch(err) {
      next(err);
    }
  })
  
  .get('/', async (req, res, next) => {
    try {
      const breweries = await Breweries.getAll();

      res.send(breweries);
    } catch(err) {
      next(err);
    }
  })

  .put('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const { bid, name, city, state, website } = req.body;
      const updatedBrewery = await Breweries.update(id, { bid, name, city, state, website });

      res.send(updatedBrewery);
    } catch(err) {
      next(err);
    }
  });

