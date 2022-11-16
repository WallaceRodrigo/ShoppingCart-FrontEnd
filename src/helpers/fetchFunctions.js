export const fetchProduct = async (id) => {
  if (id === undefined) {
    throw new Error('ID não informado');
  }

  const api = await fetch(`https://api.mercadolibre.com/items/${id}`);
  const result = await api.json().then((data) => data);
  return result;
};

export const fetchProductsList = async (query) => {
  if (query === undefined) {
    throw new Error('Termo de busca não informado');
  }
  const api = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${query}`);
  const result = await api.json().then((data) => data.results);
  return result;
};
