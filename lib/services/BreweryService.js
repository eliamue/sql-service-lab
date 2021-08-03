import request from 'superagent';
import Breweries from '../models/Breweries.js';

export default class BreweryService {
  static async generateBrewery({ bid }){
    const data = await request.get(`https://api.openbrewerydb.org/breweries/${bid}`);
    const mungedBrewery = data.body;
    const brewery = {
      bid: mungedBrewery.id,
      name: mungedBrewery.name,
      city: mungedBrewery.city,
      state: mungedBrewery.state,
      website: mungedBrewery.website_url
    };
    const grabBrew = await Breweries.insert(brewery);

    return grabBrew;
  }
}
