import { Users } from './../models';
import pick from 'lodash/pick';
import AuthService from './../services/auth.service';
import { defineAbilityFor } from './../../helpers/access-control.helper';
import { packRules } from '@casl/ability/extra';
export default class AuthController {
  constructor() {
    this.service = new AuthService(Users);
  }

  login = async ({ email, password }) => {
    const { token, user } = await this.service.login(email, password);
    const userAbility = defineAbilityFor(user);
    console.log(userAbility);
    return {
      token,
      user: pick(user, ['id', 'name', 'email', 'role']),
      ability: userAbility,
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
