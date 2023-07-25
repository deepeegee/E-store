var products = [
  {
    index: 1,
    id: 'p1',
    name: 'Samsung TV',
    price: 500000
  },
  {
    index: 2,
    id: 'p2',
    name: 'Pixel 4a',
    price: 250000
  },
  {
    index: 3,
    id: 'p3',
    name: 'PS 5',
    price: 300000
  },
  {
    index: 4,
    id: 'p4',
    name: 'MacBook Air',
    price: 800000
  },
  {
    index: 5,
    id: 'p5',
    name: 'Apple Watch',
    price: 95000
  },
  {
    index: 6,
    id: 'p6',
    name: 'Air Pod',
    price: 75000
  },
  {
    index: 7,
    id: 'p7',
    name: 'Air tag',
    price: 35000
  },
  {
    index: 8,
    id: 'p8',
    name: 'Powerbank',
    price: 55000
  }
];

var cartItems = [];

var productContainer = document.getElementById('product-container');

products.forEach(function(product) {
  var productCard = document.createElement('div');
  productCard.className = 'product-card';
  productCard.id = product.id;

  var productImage = document.createElement('img');
  productImage.src = 'product' + product.index + '.png';
  productImage.alt = 'Product ' + product.index;
  productCard.appendChild(productImage);

  var productTitle = document.createElement('h3');
  productTitle.textContent = product.name;
  productCard.appendChild(productTitle);

  var productPrice = document.createElement('p');
  productPrice.textContent = 'Price: $' + (product.price / 100).toFixed(2);
  productCard.appendChild(productPrice);

  var addToCartButton = document.createElement('a');
  addToCartButton.href = '#';
  addToCartButton.className = 'btn-cart';
  addToCartButton.textContent = 'ADD TO CART';
  addToCartButton.onclick = function() {
    addToCart(product.name, product.price);
    return false;
  };
  productCard.appendChild(addToCartButton);

  productContainer.appendChild(productCard);
});

function showPopup() {
  if (cartItems.length > 0) {
    var popup = document.getElementById('popup');
    popup.style.display = 'flex';
  }
}

function closePopup() {
  var popup = document.getElementById('popup');
  popup.style.display = 'none';
}

function continueShopping() {
  closePopup();
  // Implement the functionality for continuing shopping
  // This could involve navigating to another page or performing any desired actions
}

function checkout() {
  var checkoutUrl = 'checkout.html'; // Replace with the actual checkout page URL
  window.open(checkoutUrl, '_blank', 'width=600,height=400');
}

function addToCart(itemName, itemPrice) {
  var table = document.getElementById('cart-table');
  var newRow = table.insertRow();

  var snCell = newRow.insertCell();
  var itemCell = newRow.insertCell();
  var priceCell = newRow.insertCell();
  var quantityCell = newRow.insertCell();
  var removeCell = newRow.insertCell();

  var serialNumber = table.rows.length - 1;

  snCell.innerHTML = serialNumber;
  itemCell.innerHTML = itemName;
  priceCell.innerHTML = itemPrice;

  var leftButton = document.createElement('button');
  leftButton.innerHTML = '-';
  leftButton.onclick = function() {
    updateQuantity(quantityDisplay, -1);
  };

  var quantityDisplay = document.createElement('span');
  quantityDisplay.innerHTML = 1;

  var rightButton = document.createElement('button');
  rightButton.innerHTML = '+';
  rightButton.onclick = function() {
    updateQuantity(quantityDisplay, 1);
  };

  quantityCell.appendChild(leftButton);
  quantityCell.appendChild(quantityDisplay);
  quantityCell.appendChild(rightButton);

  var removeButton = document.createElement('button');
  removeButton.innerHTML = 'Remove';
  removeButton.onclick = function() {
    removeFromCart(newRow, itemPrice);
  };
  removeCell.appendChild(removeButton);

  updateTotal(itemPrice);

  cartItems.push({
    name: itemName,
    price: itemPrice
  });

  event.preventDefault();
}


function updateQuantity(quantityDisplay, amount) {
  var currentQuantity = parseInt(quantityDisplay.innerHTML);
  var newQuantity = currentQuantity + amount;

  if (newQuantity >= 1) {
    quantityDisplay.innerHTML = newQuantity;
  }
}

function removeFromCart(row, itemPrice) {
  var quantity = parseInt(row.cells[3].getElementsByTagName('span')[0].innerHTML);
  var price = itemPrice * quantity;

  updateTotal(-price);

  row.remove();

  var index = Array.from(table.rows).indexOf(row) - 1;
  cartItems.splice(index, 1);
}

function updateTotal(amount) {
  var totalElement = document.getElementById('total-amount');
  var currentTotal = parseFloat(totalElement.innerHTML);

  var newTotal = currentTotal + amount;
  totalElement.innerHTML = newTotal.toFixed(2);
}

window.addEventListener('DOMContentLoaded', function() {
  var storedCartItems = localStorage.getItem('cartItems');
  if (storedCartItems) {
    cartItems = JSON.parse(storedCartItems);

    var table = document.getElementById('cart-table');

    cartItems.forEach(function(item) {
      var newRow = table.insertRow();

      var snCell = newRow.insertCell();
      var itemCell = newRow.insertCell();
      var priceCell = newRow.insertCell();
      var quantityCell = newRow.insertCell();
      var removeCell = newRow.insertCell();

      var serialNumber = table.rows.length - 1;

      snCell.innerHTML = serialNumber;
      itemCell.innerHTML = item.name;
      priceCell.innerHTML = item.price;

      var quantityDisplay = document.createElement('span');
      quantityDisplay.innerHTML = 1;
      quantityCell.appendChild(quantityDisplay);

      var removeButton = document.createElement('button');
      removeButton.innerHTML = 'Remove';
      removeButton.onclick = function() {
        removeFromCart(newRow, item.price);
      };
      removeCell.appendChild(removeButton);

      updateTotal(item.price);
    });
  }
});
