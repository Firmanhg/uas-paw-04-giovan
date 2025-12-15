const KEY = "compare-properties";

export const getCompare = () => {
  return JSON.parse(localStorage.getItem(KEY)) || [];
};

export const addToCompare = (property) => {
  const list = getCompare();

  if (list.find((p) => p.id === property.id)) return;
  if (list.length >= 2) return;

  localStorage.setItem(KEY, JSON.stringify([...list, property]));
};

export const removeFromCompare = (id) => {
  const updated = getCompare().filter((p) => p.id !== id);
  localStorage.setItem(KEY, JSON.stringify(updated));
};
