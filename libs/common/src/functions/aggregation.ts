import { PaginatedQuery } from '../types/paginated-query';
import { PaginatedResult } from '../types/response';
import { Result } from '../types/result';

export async function resolveAggregation<T>(
  promise: any,
): Promise<Result<PaginatedResult<T>, Error>> {
  try {
    const response = await promise;
    return Result.ok(
      response[0] ||
        ({
          data: [],
          pageNumber: 0,
          pageSize: 10,
          total: 0,
        } as PaginatedResult<T>),
    );
  } catch (error) {
    return Result.fail(error);
  }
}

export function genericFieldPaginator(request: PaginatedQuery, getId = true) {
  return [
    ...(getId
      ? [
          {
            $set: {
              id: '$_id',
            },
          },
        ]
      : []),

    {
      $facet: {
        total: [
          {
            $count: 'id',
          },
        ],
        data: [
          {
            $skip: request.getCursorSkip(),
          },
          {
            $limit: request.getCursorLimit(),
          },

          {
            $unset: ['_id', '__v'],
          },
        ],
      },
    },

    {
      $unwind: {
        path: '$total',
      },
    },

    {
      $project: {
        data: 1,
        total: '$total.id',
        pageSize: { $literal: request.getPageSize() },
        pageNumber: { $literal: request.getPageNumber() },
        totalPages: {
          $ceil: {
            $divide: ['$total.id', request.getCursorLimit()],
          },
        },
      },
    },
  ];
}
