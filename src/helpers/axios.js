import { hasOwnProperty } from '@/helpers/lang';
import logger from '@/helpers/logger';

export const getResponseErrorInterceptor = errorCallback => (error) => {
  if (process.env.VUE_ENV === 'server') {
    logger.warn(`http error: ${error.message}`);
  } else {
    logger.log(error);
    errorCallback(error.message);
  }
  // return Promise.resolve(error.response.data);
  throw error;
};

export const getResponseSuccessInterceptor = errorCallback => (res) => {
  if (!res.headers || res.config.skipResponseInterceptor) return res;

  try {
    if (!/^application\/json/.test(res.headers['content-type'].toLowerCase())) {
      throw new Error('数据格式错误，请重试');
    }

    // if (!res.data.success) {
    //   throw new Error(`${res.data.errorCode}:${res.data.errorMSG} - 数据请求失败，请重试`);
    // }

    const data = res.data.data;

    if (data === null) {
      throw new Error('没有找到对应信息，请重试');
    }

    const pager = hasOwnProperty(res.data, 'total') ? {
      pager: {
        total: res.data.total,
        totalPage: res.data.totalPage,
        pageIndex: res.data.offset,
      },
    } : {};

    return { data, ...pager, res };
  } catch (e) {
    if (typeof errorCallback === 'function') {
      errorCallback(e.message);
    }
    throw e;
  }
};

export const getBaseURL = (remoteHost) => {
  if (process.env.NODE_ENV === 'production') {
    return remoteHost;
  }

  return 'http://localhost:9092';
};
