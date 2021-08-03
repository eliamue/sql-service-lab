import Account from '../models/Account.js';
import sendEmail from '../utils/sendEmail.js';
import BreweryService from './BreweryService.js';
import QuoteService from './QuoteService.js';

export default class AccountService {
  static async createAccount(values) {
    const account = await Account.insert(values);
    const quote = await QuoteService.generateQuote();
    const brewery = await BreweryService.generateBrewery({ bid: 8999 });
    const emessage = await sendEmail({
      to: account.email,
      subject: 'Ron Swanson Brewery Recommendation',
      html: `<h1>Hello there, ${account.firstName} ${account.lastName}!</h1>
      <h2>As Ron always says, '${quote[0]}'</h2>
      <h3>Bearing this in mind, today's recommendation is to haul ass over to ${brewery.city}, ${brewery.state}, and visit ${brewery.name} for the nectar of the gods. For more information about ${brewery.name}, you can visit their website at ${brewery.website}.</h3>
      <h3>End of email message.</h3>`,
    });
    console.log(quote);
    return { 
      ...account,
      emessage
    };
  }
}

