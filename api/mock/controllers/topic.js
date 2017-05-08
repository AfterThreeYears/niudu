const topicDb = require('../data/topic');
const {
  sendSuccess,
  sendResult,
  sendNotFound,
  getPagination,
  getWhere,
  getId,
  isValid,
} = require('../helpers/controller');

const getTopicAll = async (ctx) => {
  const pagination = getPagination(ctx.query);
  const where = getWhere(ctx.query, {
    name({ name }) {
      return {
        $like: `%${name}%`,
      };
    },
  });

  sendSuccess(ctx, await topicDb.queryPagination(pagination, where));
};

const getTopicOne = async (ctx) => {
  const id = getId(ctx.params);

  if (!isValid(id)) {
    return sendNotFound(ctx);
  }

  const [result] = await topicDb.querySingle(id);

  sendResult(ctx, result, value => value.toJSON());
};

const deleteTopicOne = async (ctx) => {
  const id = getId(ctx.params);

  if (!isValid(id)) {
    return sendNotFound(ctx);
  }

  await topicDb.deleteSingle(id);

  sendSuccess(ctx);
};

const postTopic = async (ctx) => {
  const result = await topicDb.addSingle(ctx.request.body);
  sendSuccess(ctx, result.toJSON());
};

const putTopic = async (ctx) => {
  const id = getId(ctx.params);
  if (!isValid(id)) {
    return sendNotFound(ctx);
  }

  await topicDb.updateSingle(ctx.request.body);

  const [result] = await topicDb.querySingle(id);

  sendResult(ctx, result, value => value.toJSON());
};

module.exports = {
  getTopicAll,
  getTopicOne,
  deleteTopicOne,
  postTopic,
  putTopic,
};
