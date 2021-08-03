import Account from '../models/Account';
import sendEmail from '../utils/sendEmail';

export default class AccountService {
  static async createAccount(values) {
    const account = await Account.insert(values);
    const emessage = await sendEmail({
      to: account.email,
      subject: 'Sup',
      html: `<h1>Hello there, ${account.firstName} ${account.lastName}!</h1>`,
    });

    return { 
      ...account,
      emessage
    };
  }
}

