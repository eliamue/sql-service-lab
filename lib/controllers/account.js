import Router from 'express';
import AccountService from '../services/AccountService';

export default Router()
  .post('/', async (req, res, next) => {
    try {
      const data = await AccountService.createAccount(req.body);

      res.send(data);
    } catch (err){
      next(err);
    }
  });
