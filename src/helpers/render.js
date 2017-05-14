export function getWidgetIdsByFrameInfo(data, start = 0, limit) {
  data = data || [];
  return data.slice(start, limit || data.length + 1).reduce((result, current) => [
    ...result,
    ...current.components,
  ], []);
}
