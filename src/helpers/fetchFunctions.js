export const fetchProduct = () => {
  // seu código aqui
};

export const fetchProductsList = async (query) => {
  if (query === undefined) {
    throw new Error('Termo de busca não informado');
  }

  const api = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${query}`);
  const result = await api.json().then((data) => data.results);

  return result;
};
