import { testProductData } from './src/api.js';
import { ProductArray } from './src/productArray.js';

const productImages = document.querySelectorAll('img');
const productRadios = document.querySelectorAll('input');
// const productName = document.getElementById('name');
const products = new ProductArray(testProductData);

const initializeNewProductButtons = () => {
    
    const randomProduct = products.getRandomProduct();
    let randomProduct2 = products.getRandomProduct();
    let randomProduct3 = products.getRandomProduct();

    while (randomProduct.id === randomProduct2.id) {
        randomProduct2 = products.getRandomProduct();
    }

    while (randomProduct.id === randomProduct3.id || randomProduct2.id === randomProduct3.id) {
        randomProduct3 = products.getRandomProduct();
    }

    productImages.forEach((imageTag, i) => {
        if (i === 0) {
            imageTag.src = randomProduct.image;
        } else if (i === 1) {
            imageTag.src = randomProduct2.image;
        } else if (i === 2) {
            imageTag.src = randomProduct3.image;
        }
    });
    
    productRadios.forEach((radioTag, i) => {
        if (i === 0) {
            radioTag.src = randomProduct.id;
        } else if (i === 1) {
            radioTag.src = randomProduct2.id;
        } else if (i === 2) {
            radioTag.src = randomProduct3.id;
        }
    });
};

const confirmButton = document.getElementById('confirm-button');

confirmButton.addEventListener('click', initializeNewProductButtons);

initializeNewProductButtons();