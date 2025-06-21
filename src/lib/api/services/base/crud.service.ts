import { BaseService } from './base.service';
import { PaginatedResponse, PaginationRequest } from '../../models/common/pagination.types';

export abstract class CrudService<
  TEntity,
  TCreateRequest,
  TUpdateRequest,
  TGetRequest extends PaginationRequest = PaginationRequest
> extends BaseService {
  protected abstract baseEndpoint: string;

  async getAll(params?: TGetRequest): Promise<PaginatedResponse<TEntity>> {
    return this.get<PaginatedResponse<TEntity>>(this.baseEndpoint, params);
  }

  async getById(id: number): Promise<TEntity> {
    return this.get<TEntity>(`${this.baseEndpoint}/${id}`);
  }

  async create(data: TCreateRequest): Promise<TEntity> {
    return this.post<TEntity>(this.baseEndpoint, data);
  }

  async update(id: number, data: TUpdateRequest): Promise<TEntity> {
    return this.put<TEntity>(`${this.baseEndpoint}/${id}`, data);
  }

  async deleteById(id: number): Promise<void> {
  return this.delete<void>(`${this.baseEndpoint}/${id}`);
}

  async bulkDelete(ids: number[]): Promise<void> {
    return this.delete<void>(`${this.baseEndpoint}/bulk-delete`, { data: { ids } });
  }
}