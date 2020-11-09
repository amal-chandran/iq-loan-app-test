import isEmpty from 'lodash/isEmpty';

export default class AuthService {
  constructor(model) {
    this.model = model.unscoped();
  }

  login = async (email, password) => {
    const result = await this.model.findOne({
      where: {
        email,
      },
    });

    if (isEmpty(result)) throw new Error('Invalid Credentials');

    const isCorrectPassword = await result.comparePassword(password);

    if (!isCorrectPassword) throw new Error('Invalid Credentials');

    const token = await result.generateJWToken();

    return { token, user: result };
  };

  register = async (data) => {
    const result = await this.model.findOne({
      where: {
        email: data.email,
      },
    });

    if (!isEmpty(result)) throw new Error('Email is already registered');

    const newUser = new this.model(data);

    await newUser.setPassword(data.password);

    await newUser.save();

    const token = await newUser.generateJWToken();

    return { token, user: newUser };
  };

  whoami = async (data) => {};
}
