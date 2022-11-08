const addToCartButtonElement = document.querySelector(
  '#product-details button'
);
const badgeElement = document.querySelector('.nav-items .badge');

async function addToCart(event) {
  const productId = addToCartButtonElement.dataset.productid;
  const csrfToken = addToCartButtonElement.dataset.csrf;

  let response;
  try {
    // needs server in path if not on same server
    response = await fetch('/cart/items', {
      method: 'POST',
      body: JSON.stringify({
        productId: productId,
        _csrf: csrfToken,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    alert('Something went wrong - could not add product to cart');
    return;
  }

  if (!response.ok) {
    alert('Something went wrong - could not add product to cart');
    return;
  }

  const responseData = await response.json();
  badgeElement.textContent = responseData.newTotalItems;
}

addToCartButtonElement.addEventListener('click', addToCart);
