export const encodeStorage = (selectedIndex, x) => `${selectedIndex}_${x}`;

export const decodeStorage = (storageValue) => {
  if (!storageValue) return { selectedIndex: null, x: null };
  const [selectedIndex, x] = storageValue.split('_').map(Number);
  return {
    selectedIndex,
    x,
  };
};
