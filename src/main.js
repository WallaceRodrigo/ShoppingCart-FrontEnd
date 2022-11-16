import { searchCep } from './helpers/cepFunctions';
import { fetchProductsList } from './helpers/fetchFunctions';
import { createProductElement } from './helpers/shopFunctions';
import './style.css';

document.querySelector('.cep-button').addEventListener('click', searchCep);
const productsSection = document.getElementsByClassName('products');

const productList = fetchProductsList('computador');

productList.then((results) => {
  results.map((product) => productsSection[0].appendChild(createProductElement(product)));
});
