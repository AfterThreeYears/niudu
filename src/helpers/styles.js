export const getProperties = () => {
  const div = document.createElement('div');

  return {
    transform: 'transform' in div.style ? 'transform' : '-webkit-transform',
    transition: 'transition' in div.style ? 'transition' : '-webkit-transition',
  };
};
