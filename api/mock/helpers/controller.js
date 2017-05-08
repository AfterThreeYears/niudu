function sendError(data, errorCode = 'SUCCESS', errorMessage) {
  return {
    success: errorCode === 'SUCCESS',
    errorCode: '',
    errorMSG: errorMessage,
    data,
  };
}

function sendSuccess(ctx, body, errorMessage) {
  ctx.body = sendError(body, 'SUCCESS', errorMessage);
  return ctx;
}

function sendFailure(ctx, body, errorMessage) {
  ctx.body = sendError(body, 'FAILURE', errorMessage);
  return ctx;
}

function sendNotFound(ctx) {
  ctx.status = 404;
  sendFailure(ctx, { message: '找不到该页面' });
  return ctx;
}

function sendResult(ctx, value, valueFn = r => r, errorMessage) {
  let condition = value;

  if (typeof value !== 'boolean') {
    condition = typeof condition !== 'undefined';
  }

  if (condition) {
    return sendSuccess(ctx, valueFn(value), errorMessage);
  }

  return sendNotFound(ctx);
}

const defaultLimit = 20;

function getPagination({ offset, limit }) {
  offset = parseInt(offset, 10);
  limit = parseInt(limit, 10);

  if (typeof offset === 'undefined' || isNaN(offset)) {
    offset = 0;
  }

  if (typeof limit === 'undefined' || isNaN(limit)) {
    limit = defaultLimit;
  }

  return {
    offset,
    limit,
  };
}

function getWhere(query, where) {
  return Object.keys(where).reduce((r, key) => {
    if (query[key]) {
      return Object.assign({}, r, {
        [key]: where[key](query),
      });
    }

    return r;
  }, {});
}

function getId({ id }) {
  id = parseInt(id, 10);

  if (isNaN(id) || id < 0) {
    return undefined;
  }

  return id;
}

function isValid(value) {
  return typeof value !== 'undefined';
}

module.exports = {
  sendNotFound,
  sendSuccess,
  sendFailure,
  sendResult,
  getPagination,
  getId,
  isValid,
  getWhere,
};
