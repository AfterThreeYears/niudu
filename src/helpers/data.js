export function convert2Map(list, uniqueName = 'id') {
  return list.reduce((result, current) => ({
    ...result,
    [current[uniqueName]]: current,
  }), {});
}

export function getId(item) {
  return item.id;
}
