import { hasOwnProperty } from '@/helpers/lang';
import logger from '@/helpers/logger';

export const getResponseErrorInterceptor = errorCallback => (error) => {
  // console.log('1111111111')
  if (process.env.VUE_ENV === 'server') {
    logger.warn(`http error: ${error.message}`);
  } else {
    logger.log(error);
    errorCallback(error.message);
  }

  throw error;
};

export const getResponseSuccessInterceptor = errorCallback => (res) => {
  // console.log('2222222222')
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
  // console.log(33333333, remoteHost);
  if (process.env.NODE_ENV === 'production') {
    return remoteHost;
  }

  return 'http://localhost:9092';
};