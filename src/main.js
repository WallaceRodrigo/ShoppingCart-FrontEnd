import { searchCep } from './helpers/cepFunctions';
import { fetchProductsList, fetchProduct } from './helpers/fetchFunctions';
import { createProductElement, createCartProductElement } from './helpers/shopFunctions';
import { saveCartID } from './helpers/cartFunctions';
import './style.css';

document.querySelector('.cep-button').addEventListener('click', searchCep);
const productsSection = document.getElementsByClassName('products')[0];
const loading = document.getElementsByClassName('loading')[0];
const cartSection = document.getElementsByClassName('cart__products')[0];

const addProductCart = (id) => {
  fetchProduct(id).then((results) => {
    const cartProductElement = createCartProductElement(results);
    cartSection.appendChild(cartProductElement);
  });
  return saveCartID(id);
};

const createProductList = (query) => {
  const productList = fetchProductsList(query);
  loading.innerHTML = 'carregando...';

  productList.then((results) => {
    results.map((product) => {
      const productElement = createProductElement(product);
      productsSection.appendChild(productElement);
      return productElement.lastChild
        .addEventListener('click', () => {
          addProductCart(productElement.firstChild.innerHTML);
        });
    });

    loading.remove();

    if (results.length < 1) {
      loading.innerHTML = 'Algum erro ocorreu, recarregue a página e tente novamente';
      throw new Error(loading.innerHTML);
    }
  });
  return productList;
};

createProductList('computador');
