import { searchCep } from './helpers/cepFunctions';
import { fetchProductsList, fetchProduct } from './helpers/fetchFunctions';
import { createProductElement } from './helpers/shopFunctions';
import './style.css';

document.querySelector('.cep-button').addEventListener('click', searchCep);
const productsSection = document.getElementsByClassName('products')[0];
const loading = document.getElementsByClassName('loading')[0];

const createProductList = (query) => {
  const productList = fetchProductsList(query);
  loading.innerHTML = 'carregando...';

  productList.then((results) => {
    results.map((product) => {
      productsSection
        .appendChild(createProductElement(product));
      loading.remove();
      return '';
    });

    if (results.length < 1) {
      loading.innerHTML = 'Algum erro ocorreu, recarregue a página e tente novamente';
      throw new Error(loading.innerHTML);
    }
  });
  return productList;
};

createProductList('computador');
