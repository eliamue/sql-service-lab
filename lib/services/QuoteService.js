import request from 'superagent';
// import Quotes from '../models/Quotes.js';

export default class QuoteService {

  static async generateQuote() {
    const data = await request.get('http://ron-swanson-quotes.herokuapp.com/v2/quotes');
    const quote = Object.assign({}, data.body); 
    //     const grabQuote = await Quotes.insert(quote);
    return quote;
  }
  
}
