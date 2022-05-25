const URL_API = `https://q-exercise-api.o64ixruq9hj.us-south.codeengine.appdomain.cloud`;

const getPokemons = async () => {
  const response = await fetch(`${URL_API}/api/rest/pokemon`);
  const data = await response.json();
  return data.items;
};

export default getPokemons;
