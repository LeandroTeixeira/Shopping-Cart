const cart = document.getElementsByClassName('cart__items')[0];
const price = document.getElementsByClassName('total-price')[0];
const eCarrinho = document.getElementsByClassName('empty-cart')[0];
let totalPrice;

function getId(type, id) {
  return `${type.substring(0, 2)}${id}`;
}

function updatePrice(value) {
  totalPrice += value;
  if (totalPrice < 0) totalPrice = 0;
  price.innerText = totalPrice.toFixed(2);
}

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function createCartItemClickListener(src, tprice) {
  return () => {
    const bId = getId('button', src);
    const sId = getId('cart item', src);
    const button = document.getElementById(bId);
    button.disabled = false;
    const source = document.getElementById(sId);
    cart.removeChild(source);
    updatePrice(-1 * tprice);
  };
  // coloque seu código aqui
}

function createCartItemElement({ sku, name, salePrice, img }) {
  const li = document.createElement('li');
  const text = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  const x = createCustomElement('span', 'x-mark', '');
  x.innerHTML = '&#10006;';
  li.className = 'cart__item';
  li.appendChild(createProductImageElement(img));
  li.appendChild(createCustomElement('span', 'cart-item__text', text));
  li.appendChild(x);
  li.id = getId('cart item', sku);
  cartItemClickListener = createCartItemClickListener(sku, salePrice);
  x.addEventListener('click', cartItemClickListener);
  return li;
}

async function adicionarAoCarrinho(src, target, b) {
  const product = await fetchItem(src);
  return function () {
    const button = document.getElementById(b);
    target.appendChild(createCartItemElement({
      sku: product.id,
      name: product.title,
      salePrice: product.price,
      img: product.thumbnail,
    }));
    updatePrice(product.price);
    button.disabled = true;
  };
}
 async function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  const button = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  button.id = getId('button', sku);
  section.className = 'item';
  button.addEventListener('click', await adicionarAoCarrinho(sku, cart, button.id));
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(button);

  return section;
}

async function setItems(src) {
  fetchProducts('computador').then((prod) => {
    prod.results.forEach(async (e) => {
      src.appendChild(await createProductItemElement({
        sku: e.id, 
        name: e.title, 
        image: e.thumbnail,
      }));
    });
  });
  src.removeChild(src.firstChild);
  totalPrice = 0;
  price.innerText = totalPrice.toFixed(2);
}

function esvaziarCarrinho() {
  while (cart.firstChild) {
    const e = cart.firstChild;
    const x = e.lastChild;
    x.dispatchEvent(new Event('click'));
  }
}

window.onload = () => {
    const item = document.getElementsByClassName('items')[0];
    setItems(item);
    eCarrinho.addEventListener('click', esvaziarCarrinho);
 };
