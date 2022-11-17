import { searchCep } from './helpers/cepFunctions';
import { fetchProductsList, fetchProduct } from './helpers/fetchFunctions';
import { createProductElement, createCartProductElement } from './helpers/shopFunctions';
import { saveCartID, getSavedCartIDs } from './helpers/cartFunctions';
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
};

const getLocal = () => {
  const savedIDs = getSavedCartIDs();
  savedIDs.map((id) => addProductCart(id));
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
          const button = productElement.firstChild.innerHTML;
          addProductCart(button);
          return saveCartID(button);
        });
    });

    loading.remove();

    if (results.length < 1) {
      loading.innerHTML = 'Algum erro ocorreu, recarregue a página e tente novamente';
      throw new Error(loading.innerHTML);
    }
  });

  getLocal();

  return productList;
};

createProductList('computador');
