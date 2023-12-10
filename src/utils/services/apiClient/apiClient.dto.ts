export enum RequestMethods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export interface RequestOptions<RequestData, RequestParams> {
  url: string;
  method: RequestMethods;
  data?: RequestData;
  params?: RequestParams | object;
}

export interface ResponseError {
  data: any;
  status: number | unknown;
}

export interface ResponseData<ResponseObject> {
  response: ResponseObject;
  error: ResponseError;
}
