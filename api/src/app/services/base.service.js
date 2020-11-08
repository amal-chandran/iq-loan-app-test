import isEmpty from 'lodash/isEmpty';
import assign from 'lodash/assign';
import sQuery from 'sequelice-query';
import {
  transformValue,
  transformKey,
} from './../../helpers/transform-query.helper';
import { Op } from 'sequelize';
import { toSequelizeQuery } from './../../helpers/access-control.helper';
import { ForbiddenError, subject } from '@casl/ability';
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
        optFilter: { transformValue, transformKey },
      },
    });

    const accessControlQuery = toSequelizeQuery(
      req.ability,
      this.model.model_name,
      'list'
    );

    console.log(accessControlQuery);

    return await this.model.paginate({
      include,
      paginate: perPage,
      page,
      where: { [Op.and]: [accessControlQuery, where] },
      order,
    });
  }

  async get(id, ability) {
    const result = await this.model.findOne({
      // where: { [Op.and]: [id, accessControlQuery] },
      where: { id },
      include: this.includes,
    });

    if (isEmpty(result)) throw new Error(`No ${this.model.name} found`);

    ForbiddenError.from(ability).throwUnlessCan(
      'show',
      subject(this.model.model_name, result)
    );

    return result;
  }

  async getBySlug(slug, ability) {
    const result = await this.model.findOne({
      where: { slug },
      include: this.includes,
    });

    if (isEmpty(result)) throw new Error(`No ${this.model.name} found`);

    ForbiddenError.from(ability).throwUnlessCan(
      'show',
      subject(this.model.model_name, result)
    );

    return result;
  }

  async create(data) {
    ForbiddenError.from(ability).throwUnlessCan(
      'create',
      subject(this.model.model_name, data)
    );

    const { id } = await this.model.create(data);

    let result = await this.model.findOne({
      where: { id },
      include: this.includes,
    });

    return result;
  }

  async update(id, data, ability) {
    let result = await this.model.findOne({
      where: { id },
      include: this.includes,
    });

    if (isEmpty(result)) throw new Error(`No ${this.model.name} found`);

    ForbiddenError.from(ability).throwUnlessCan(
      'edit',
      subject(this.model.model_name, result)
    );

    result = assign(result, data);

    return await result.save();
  }

  async delete(id) {
    const result = await this.model.findOne({
      where: { id },
      include: this.includes,
    });

    if (isEmpty(result)) throw new Error(`No ${this.model.name} found`);

    ForbiddenError.from(ability).throwUnlessCan(
      'delete',
      subject(this.model.model_name, result)
    );

    return await result.destroy();
  }
}
