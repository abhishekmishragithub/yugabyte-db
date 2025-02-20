// tslint:disable
/**
 * Yugabyte Cloud
 * YugabyteDB as a Service
 *
 * The version of the OpenAPI document: v1
 * Contact: support@yugabyte.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { useQuery, useInfiniteQuery, useMutation, UseQueryOptions, UseInfiniteQueryOptions, UseMutationOptions } from 'react-query';
import Axios from '../runtime';
import type { AxiosInstance } from 'axios';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import type {
  ApiError,
  InternalClusterNodesResponse,
} from '../models';

export interface GetInternalClusterNodesForQuery {
  accountId: string;
  projectId: string;
  clusterId: string;
  region?: string;
}

/**
 * Get internal nodes for a cluster
 * Get internal nodes for a cluster
 */

export const getInternalClusterNodesAxiosRequest = (
  requestParameters: GetInternalClusterNodesForQuery,
  customAxiosInstance?: AxiosInstance
) => {
  return Axios<InternalClusterNodesResponse>(
    {
      url: '/private/accounts/{accountId}/projects/{projectId}/clusters/{clusterId}/nodes'.replace(`{${'accountId'}}`, encodeURIComponent(String(requestParameters.accountId))).replace(`{${'projectId'}}`, encodeURIComponent(String(requestParameters.projectId))).replace(`{${'clusterId'}}`, encodeURIComponent(String(requestParameters.clusterId))),
      method: 'GET',
      params: {
        region: requestParameters['region'],
      }
    },
    customAxiosInstance
  );
};

export const getInternalClusterNodesQueryKey = (
  requestParametersQuery: GetInternalClusterNodesForQuery,
  pageParam = -1,
  version = 1,
) => [
  `/v${version}/private/accounts/{accountId}/projects/{projectId}/clusters/{clusterId}/nodes`,
  pageParam,
  ...(requestParametersQuery ? [requestParametersQuery] : [])
];


export const useGetInternalClusterNodesInfiniteQuery = <T = InternalClusterNodesResponse, Error = ApiError>(
  params: GetInternalClusterNodesForQuery,
  options?: {
    query?: UseInfiniteQueryOptions<InternalClusterNodesResponse, Error, T>;
    customAxiosInstance?: AxiosInstance;
  },
  pageParam = -1,
  version = 1,
) => {
  const queryKey = getInternalClusterNodesQueryKey(params, pageParam, version);
  const { query: queryOptions, customAxiosInstance } = options ?? {};

  const query = useInfiniteQuery<InternalClusterNodesResponse, Error, T>(
    queryKey,
    () => getInternalClusterNodesAxiosRequest(params, customAxiosInstance),
    queryOptions
  );

  return {
    queryKey,
    ...query
  };
};

export const useGetInternalClusterNodesQuery = <T = InternalClusterNodesResponse, Error = ApiError>(
  params: GetInternalClusterNodesForQuery,
  options?: {
    query?: UseQueryOptions<InternalClusterNodesResponse, Error, T>;
    customAxiosInstance?: AxiosInstance;
  },
  version = 1,
) => {
  const queryKey = getInternalClusterNodesQueryKey(params,  version);
  const { query: queryOptions, customAxiosInstance } = options ?? {};

  const query = useQuery<InternalClusterNodesResponse, Error, T>(
    queryKey,
    () => getInternalClusterNodesAxiosRequest(params, customAxiosInstance),
    queryOptions
  );

  return {
    queryKey,
    ...query
  };
};






