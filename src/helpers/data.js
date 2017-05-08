import logger from '@/helpers/logger';

export function mergeEntities(entities, key, list, uniqueName = 'id') {
  if (typeof entities[key] === 'undefined') {
    logger.error(`initialState should have entities.${key}`);
  }

  return {
    ...entities,
    [key]: list.reduce((result, element) => {
      if (typeof element[uniqueName] === 'undefined') {
        logger.error(`mergeEntities ${key} ${JSON.stringify(element)} do not have ${uniqueName}`);
      }
      return {
        ...result,
        [element[uniqueName]]: element,
      };
    }, {}),
  };
}

export function mergeIds(ids, list, uniqueName = 'id') {
  return [...ids, ...list.map(ele => ele[uniqueName])];
}

export function convert2Map(list, uniqueName = 'id') {
  return list.reduce((result, current) => ({
    ...result,
    [current[uniqueName]]: current,
  }), {});
}

export function getId(item) {
  return item.id;
}
