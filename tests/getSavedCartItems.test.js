const localStorageSimulator = require('../mocks/localStorageSimulator');
const getSavedCartItems = require('../helpers/getSavedCartItems');

localStorageSimulator('getItem');

describe('4 - Teste a função getSavedCartItems', () => {
  it('Teste se, ao executar saveCartItems com o argumento <ol><li>Item</li></ol>, o método localStorage.setItem é chamado;;', () => {
      const argument = "<ol><li>Item</li></ol>";
      getSavedCartItems();
      expect(localStorage.getItem).toHaveBeenCalled();
    //    fail('Teste vazio');
  });

  it('Teste se, ao executar saveCartItems com o argumento <ol><li>Item</li></ol>, o método localStorage.setItem é chamado;;', () => {
    const argument = "<ol><li>Item</li></ol>";
    getSavedCartItems();
    expect(localStorage.getItem).toHaveBeenCalledWith('cartItems');
    //    fail('Teste vazio');
  });
});
