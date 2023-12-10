import axios from 'axios';
import config from '../../../../config/config';
import { RequestOptions, ResponseData } from './apiClient.dto';

const defaultAxiosInstanceOptions = {
  baseURL: config().node.rustServiceUrl,
};

async function axiosRequest<RequestData, RequestParams, ResponseObject>({
  url,
  method,
  data = null,
  params = {},
}: RequestOptions<RequestData, RequestParams>): Promise<
  ResponseData<ResponseObject>
> {
  const apiClient = axios.create(defaultAxiosInstanceOptions);

  const config = {
    url,
    method,
    data,
    params,
  };

  try {
    const response = await apiClient.request(config);

    return response?.data
      ? { response: response.data, error: null }
      : { response: null, error: null };
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      return {
        response: null,
        error: {
          data: error.response.data,
          status: error.response.status,
        },
      };
    }
    if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      return {
        response: null,
        error: {
          data: error.request,
          status: undefined,
        },
      };
    }
    return {
      response: null,
      error: {
        data: error,
        status: undefined,
      },
    };
  }
}

export default axiosRequest;
