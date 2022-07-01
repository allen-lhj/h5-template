/**
 * @description: Request result set
 */
export enum ResultEnum {
  SUCCESS = 0,
  ERROR = 1,
  TIMEOUT = 401,
  TYPE = 'success',
  LOGINFAIL = 2002
}

/**
 * @description: request method
 */
export enum RequestEnum {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE'
}

/**
 * @description:  contentTyp
 */
export enum ContentTypeEnum {
  // json
  JSON = 'application/json;charset=UTF-8',
  // form-data qs
  FORM_URLENCODED = 'application/x-www-form-urlencoded;charset=UTF-8',
  // form-data  upload
  FORM_DATA = 'multipart/form-data;charset=UTF-8'
}
export enum VideoEnum {
  RC_CODE_S_OK = 0,
  RC_CODE_E_FAIL = -1, // 一般错误
  RC_CODE_E_NOTFOUND = -5, // 未找到
  RC_CODE_E_BUSY = -7, // 繁忙
  RC_CODE_E_TIMEOUT = -9, // 超时
  RC_CODE_E_DISCONNECTED = -11, // 未连接
  RC_CODE_E_BVCU_NOTFOUND = 20106
}
