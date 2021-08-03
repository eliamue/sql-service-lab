import request from 'superagent';
import Breweries from '../models/Breweries.js';

export default class BreweryService {
  static async generateBrewery({ id }){
    const data = await request.get(`https://api.openbrewerydb.org/breweries/${id}`);
    
    const mungedBrewery = data.body;
    const brewery = {
      id: mungedBrewery.id,
      name: mungedBrewery.name,
      type: mungedBrewery.type,
      city: mungedBrewery.city,
      state: mungedBrewery.state,
      website: mungedBrewery.website_url
    };
    const grabBrew = await Breweries.insert(brewery);

    return grabBrew;
  }
}
