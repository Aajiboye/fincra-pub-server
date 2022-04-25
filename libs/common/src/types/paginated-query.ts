import { ForbiddenException, HttpException, HttpStatus } from '@nestjs/common';
import { SearchQueryDTO } from '../dto/search.dto';

export class PaginatedQuery {
  #_query = '';

  #_pageNumber = 1;

  #_pageSize = 10;

  #_orgCode = '';

  constructor(query = '') {
    this.setQuery(query);
  }

  public getQuery() {
    return this.#_query;
  }

  public getPageNumber() {
    return this.#_pageNumber;
  }

  public getPageSize() {
    return this.#_pageSize;
  }

  public getCursorSkip() {
    return (this.getPageNumber() - 1) * this.getPageSize();
  }

  public getCursorLimit() {
    return this.getPageSize();
  }

  public get isEmptyQuery() {
    return this.#_query === '';
  }

  public setQuery(query = '') {
    if (typeof query !== 'string') {
      throw new HttpException(
        `Invalid search query provided.`,
        HttpStatus.BAD_REQUEST,
      );
    }

    this.#_query = query;

    return this;
  }

  public setPageNumber(page: number | string = 1) {
    if (typeof page === 'string') {
      page = Number(page);
    }

    if (page < 1) {
      throw new HttpException(
        `Invalid Page Number passed for query pagination.`,
        HttpStatus.BAD_REQUEST,
      );
    }

    this.#_pageNumber = page;

    return this;
  }

  public setPageSize(size: number | string = 10) {
    if (typeof size === 'string') {
      size = Number(size);
    }

    if (size < 1) {
      throw new HttpException(
        `Invalid Page size passed for query pagination.`,
        HttpStatus.BAD_REQUEST,
      );
    }

    this.#_pageSize = size;

    return this;
  }

  public setOrgCode(shortCode = '') {
    if (typeof shortCode !== 'string') {
      throw new HttpException(
        `Invalid organization shortCode `,
        HttpStatus.BAD_REQUEST,
      );
    }

    this.#_orgCode = shortCode;

    return this;
  }

  public getOrgCode() {
    if (!this.#_orgCode) {
      throw new ForbiddenException('Organization code is required for query');
    }

    return this.#_orgCode;
  }

  static from(raw: SearchQueryDTO): PaginatedQuery {
    return new PaginatedQuery(raw.search)
      .setPageNumber(raw.pageNumber)
      .setPageSize(raw.pageSize)
      .setOrgCode(raw.orgCode);
  }
}
