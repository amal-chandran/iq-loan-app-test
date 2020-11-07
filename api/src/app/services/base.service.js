import isEmpty from 'lodash/isEmpty';
import assign from 'lodash/assign';

export default class BaseService {
  constructor(model, includes = []) {
    this.model = model;
    this.includes = includes;

    this.getAll = this.getAll.bind(this);
    this.get = this.get.bind(this);
    this.getBySlug = this.getBySlug.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  async getAll(page, perPage) {
    return await this.model.findAll({
      include: this.includes,
      limit: perPage,
      offset: page,
    });
  }

  async get(id) {
    const result = await this.model.findOne({
      where: { id },
      include: this.includes,
    });

    if (isEmpty(result)) throw new Error(`No ${this.model.name} found`);

    return result;
  }

  async getBySlug(slug) {
    const result = await this.model.findOne({
      where: { slug },
      include: this.includes,
    });

    if (isEmpty(result)) throw new Error(`No ${this.model.name} found`);

    return result;
  }

  async create(data) {
    return await this.model.create(data);
  }

  async update(id, data) {
    let result = await this.model.findOne({
      where: { id },
      include: this.includes,
    });

    if (isEmpty(result)) throw new Error(`No ${this.model.name} found`);

    result = assign(result, data);

    return await result.save();
  }

  async delete(id) {
    const result = await this.model.findOne({
      where: { id },
      include: this.includes,
    });

    if (isEmpty(result)) throw new Error(`No ${this.model.name} found`);

    return await result.destroy();
  }
}
