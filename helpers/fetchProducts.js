const fetchProducts = async (u) => {
  if (!u) throw new Error('You must provide an url');
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${u}`;
  return fetch(url)
        .then((obj) => obj.json());
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
