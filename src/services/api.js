const URL_API = `https://q-exercise-api.o64ixruq9hj.us-south.codeengine.appdomain.cloud`;

const getPokemons = async ({ limit, offset }) => {
  const url = new URL(`${URL_API}/api/rest/pokemon`);
  if (limit) {
    url.searchParams.append('limit', limit);
  }
  if (offset) {
    url.searchParams.append('offset', offset);
  }

  const response = await fetch(url.href);
  const data = await response.json();

  return data;
};

export default getPokemons;
