const fetchItem = async (u) => {
  if (!u) throw new Error('You must provide an url');
  const url = `https://api.mercadolibre.com/items/${u}`;
  return fetch(url)
        .then((obj) => obj.json());
  // seu código aqui
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
