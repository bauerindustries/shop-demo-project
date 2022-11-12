const badgeElements = document.querySelectorAll('.nav-items .badge');

alert('wiping order total badges!');

for (const badgeElement of badgeElements) {
  badgeElement.textContent = 0;
}
