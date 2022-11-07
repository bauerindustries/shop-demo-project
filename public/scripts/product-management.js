const deleteButtonElements = document.querySelectorAll(
  '.delete-product-button'
);

async function deleteProduct(event) {
  const buttonElement = event.target;
  const productId = buttonElement.dataset.productid;
  const csrfToken = buttonElement.dataset.csrf;

  // needs server in path if not on same server
  const response = await fetch('/admin/products/' + productId + '?_csrf=' + csrfToken, {
    method: 'DELETE'
  });

  if (!response.ok) {
    alert('Something went wrong - could not delete product');
    return;
  }

  buttonElement.parentElement.parentElement.parentElement.parentElement.remove();
}

for (const buttonElement of deleteButtonElements) {
  buttonElement.addEventListener('click', deleteProduct);
}
