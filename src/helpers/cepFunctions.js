const cartAddress = document.getElementsByClassName('cart__address')[0];

export const getAddress = (cep) => {
  async function firstAPI() {
    const api1 = await fetch(`https://cep.awesomeapi.com.br/json/${cep}`);
    const result = api1.json().then((response) => response);
    return result;
  }
  async function secondAPI() {
    const api2 = await fetch(`https://brasilapi.com.br/api/cep/v2/${cep}`);
    const result = api2.json().then((response) => response);
    return result;
  }

  return Promise.any([firstAPI(), secondAPI()]).catch((error) => {
    console.log(error.message);
  });
};

export const searchCep = (cep) => {
  getAddress(cep).then((response) => {
    if (response === undefined) {
      response = '';
    }

    const { address, district, city, state } = response;
    cartAddress.innerHTML = `${address} - ${district} - ${city} - ${state}`;
    if (cartAddress.innerHTML.includes(undefined)) {
      const { street, neighborhood } = response;
      cartAddress.innerHTML = `${street} - ${neighborhood} - ${city} - ${state}`;
    }

    if (cartAddress.innerHTML.includes(undefined)) {
      cartAddress.innerHTML = 'CEP não encontrado';
    }
  });
};
