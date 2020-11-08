import isEmpty from 'lodash/isEmpty';
import assign from 'lodash/assign';
import sQuery from 'sequelice-query';

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

  async getAll(req, page, perPage) {
    const {
      include,
      queryFilter: where,
      querySort: order,
    } = await sQuery.generate({
      req,
      model: this.model,
      configs: {
        include: this.includes,
      },
    });

    return await this.model.paginate({
      include,
      paginate: perPage,
      page,
      where,
      order,
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
    const { id } = await this.model.create(data);

    let result = await this.model.findOne({
      where: { id },
      include: this.includes,
    });

    return result;
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
