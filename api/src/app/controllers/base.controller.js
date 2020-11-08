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

  show = async ({ id }) => {
    return await this.service.get(id);
  };

  showBySlug = async ({ slug }) => {
    return await this.service.getBySlug(slug);
  };

  store = async (data, req) => {
    return await this.service.create(this.getParams(data, req));
  };

  update = async ({ id, ...data }, req) => {
    return await this.service.update(id, this.getParams(data, req));
  };

  destroy = async ({ id }) => {
    await this.service.delete(id);
    return { id, message: 'Successfully deleted' };
  };

  getParams = (data) => data;
}
