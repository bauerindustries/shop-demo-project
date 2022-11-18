const addToCartButtonElements = document.querySelectorAll(
  '.add-to-cart-button'
);
const badgeElements = document.querySelectorAll('.nav-items .badge');

async function addToCart(event) {
  const productId = event.target.dataset.productid;
  const csrfToken = event.target.dataset.csrf;

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
  for (const badgeElement of badgeElements) {
    badgeElement.textContent = responseData.newTotalItems;
  }
}

for (const addToCartButtonElement of addToCartButtonElements) {
  addToCartButtonElement.addEventListener('click', addToCart);
}
