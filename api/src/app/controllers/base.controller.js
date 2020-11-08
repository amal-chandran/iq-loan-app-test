import { isNil } from 'lodash';
import {
  toPaginatedResponse,
  toPickerResponse,
} from './../../helpers/response.helper';
export default class BaseController {
  constructor(service) {
    this.service = service;
  }

  index = async ({ page, perPage }, req) => {
    const response = await this.service.getAll(req, page, perPage);
    return toPaginatedResponse(response, page, perPage);
  };

  picker = async ({ page, perPage, picker }, req) => {
    const response = await this.service.getAll(req, page, perPage);
    return toPickerResponse(response, picker, page, perPage);
  };

  show = async ({ id }, { ability }) => {
    return await this.service.get(id, ability);
  };

  showBySlug = async ({ slug }, { ability }) => {
    return await this.service.getBySlug(slug, ability);
  };

  store = async (data, req) => {
    return await this.service.create(this.getParams(data, req));
  };

  update = async ({ id, ...data }, req) => {
    return await this.service.update(
      id,
      this.getParams(data, req),
      req.ability
    );
  };

  destroy = async ({ id }, { ability }) => {
    await this.service.delete(id, ability);
    return { id, message: 'Successfully deleted' };
  };

  getParams = (data) => data;
}
