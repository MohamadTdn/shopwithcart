const products = [
    {id: 1, name: 'Ps5', price: 350, count: 1, imgSrc: 'images/ps5.jfif'},
    {id: 2, name: 'Iphone 14', price: 950 , count: 1, imgSrc: 'images/iphone14.jfif'},
    {id: 3, name: 'Z Fold 5', price: 450, count: 1, imgSrc: 'images/zfold5.jpg'},
    {id: 4, name: 'Toy', price: 40, count: 1, imgSrc: 'images/toy.webp'},
    {id: 5, name: 'xbox', price: 300, count: 1, imgSrc: 'images/xbox.jfif'},
    {id: 6, name: 'macbook', price: 700, count: 1, imgSrc: 'images/macbook.jpg'},
    {id: 7, name: 'game', price: 35, count: 1, imgSrc: 'images/game.jpg'},
    {id: 8, name: 'dualsense', price: 250, count: 1, imgSrc: 'images/dualsense.jfif'}
];

let cart = [];

const productList = document.querySelector('.products-list');
const cartElement = document.querySelector('.cart');
const totalPrice = document.querySelector('.total-price');
const purchaseBtn = document.querySelector('.purchase-btn');
let productFragment = document.createDocumentFragment();

products.forEach(function(product){
    // render products to dom
    let newProduct = document.createElement('div');
    newProduct.classList.add('product-box');

    let productImg = document.createElement('img');
    productImg.setAttribute('src', ''+product.imgSrc+'');
    productImg.classList.add('product-img');

    let productTitle = document.createElement('h3');
    productTitle.classList.add('product-name');
    productTitle.innerHTML = product.name;

    let productPrice = document.createElement('h4');
    productPrice.classList.add('product-price');
    productPrice.innerHTML = product.price + ' $';

    let addToCartBtn = document.createElement('button');
    addToCartBtn.className = 'add-to-cart-btn btn btn-primary mb-3 ms-3';
    addToCartBtn.innerHTML = '<i class="bi bi-cart-plus"></i>';

    newProduct.append(productImg, productTitle, productPrice, addToCartBtn);
    
    productFragment.append(newProduct);

    // productList.append(newProduct);

    // add to cart functions
    function addToCart() {
        let cartItem = document.createElement('tbody');
        
        let cartItemName = document.createElement('td');
        cartItemName.innerHTML = product.name;
        
        let cartItemPrice = document.createElement('td');
        cartItemPrice.innerHTML = product.price;

        let proccessingProduct = document.createElement('td');

        let productCount = document.createElement('input');
        productCount.setAttribute('type', 'number')
        productCount.setAttribute('value', ''+product.count+'');
        productCount.classList.add('product-number');

        let removeBtn = document.createElement('button');
        removeBtn.innerHTML = 'Remove';
        removeBtn.className = 'remove-btn btn btn-danger';

        proccessingProduct.append(productCount, removeBtn);
        cartItem.append(cartItemName, cartItemPrice, proccessingProduct);
        cartElement.append(cartItem);

        let cartObj = {};

        cartObj.id = product.id;
        cartObj.name = product.name;
        cartObj.price = product.price;
        cartObj.count = product.count;
    
        cart.push(cartObj);

        calculateSum ();
        console.log(cart)

        // remove from cart
        removeBtn.addEventListener('click', function() {
            let deletedIndex = cart.findIndex(function(item){
                return item.name === product.name;
            })
            cart.splice(deletedIndex, 1);
            cartItem.remove(); 
            let sum = 0;
            cart.forEach(function(items){
                sum = Math.abs(sum - items.price * items.count);
            })
            totalPrice.innerHTML = sum;
        })
        
        // calculate total price
        productCount.addEventListener('change', function() {
            cart.forEach(function(item){
                if (item.id === product.id) {
                    item.count = productCount.value;
                }
            })
            calculateSum ();
        })

        function calculateSum () {
            let sum = 0;
            cart.forEach(function(items) {
                sum = sum + (items.count * items.price); 
                totalPrice.innerHTML = sum;
            })
        }

        // make cart empty
        purchaseBtn.addEventListener('click', function() {
            cart = [];
            cartItem.innerHTML = '';
            totalPrice.innerHTML = 0;
        })
    }    
    
    addToCartBtn.addEventListener('click', addToCart);
});
productList.append(productFragment);
