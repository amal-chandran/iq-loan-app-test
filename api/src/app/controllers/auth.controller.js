import { Users } from './../models';
import pick from 'lodash/pick';
import AuthService from './../services/auth.service';
import { defineRulesFor } from './../../helpers/access-control.helper';
import { packRules } from '@casl/ability/extra';
export default class AuthController {
  constructor() {
    this.service = new AuthService(Users);
  }

  login = async ({ email, password }) => {
    const { token, user } = await this.service.login(email, password);
    const userAbility = defineRulesFor(user);
    return {
      token,
      user: pick(user, ['id', 'name', 'email', 'role']),
      rules: userAbility,
    };
  };

  register = async (data) => {
    const { token, user } = await this.service.register(data);

    return { token, user: pick(user, ['id', 'name', 'email', 'role']) };
  };

  logout() {
    return 'Successfully Logout';
  }

  whoami() {
    return 'Hello whoami';
  }
}
