const cartItemUpdateFormElements = document.querySelectorAll(
  '.cart-item-management-form'
);

const cartTotalPriceElement = document.getElementById('cart-total-price');
const cartBadgeElements = document.querySelectorAll('.nav-items .badge');

async function updateCartItem(event) {
  event.preventDefault();

  const form = event.target;
  const productId = form.lastElementChild.dataset.productid;
  const quantity = form.firstElementChild.value;
  const csrfToken = form.lastElementChild.dataset. csrf;

  let response;
  try {
    // needs server in path if not on same server
    response = await fetch('/cart/items', {
      method: 'PATCH',
      body: JSON.stringify({
        productId: productId,
        quantity: quantity,
        _csrf: csrfToken,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    alert('Something went wrong - could not update cart');
    return;
  }

  if (!response.ok) {
    alert('Something went wrong - could not update cart');
    return;
  }

  const responseData = await response.json();

  if (responseData.updatedCartData.updatedItemPrice === 0) {
    // remove list item if item is 0
    event.target.parentElement.parentElement.remove();
  }

  
  const cartItemTotalPriceElement =
    form.parentElement.querySelector('.cart-item-price');

  cartItemTotalPriceElement.textContent =
    responseData.updatedCartData.updatedItemPrice.toFixed(2);

  cartTotalPriceElement.textContent =
    responseData.updatedCartData.newTotalPrice.toFixed(2);

  for (const badgeElement of cartBadgeElements) {
    badgeElement.textContent = responseData.updatedCartData.newTotalQuantity;
  }
}

for (const formElement of cartItemUpdateFormElements) {
  formElement.addEventListener('submit', updateCartItem);
}
