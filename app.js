import { testProductData } from './src/api.js';
import { ProductArray } from './src/productArray.js';
import { findById } from './src/utils.js';
import store from './src/storage.js';

const productImages = document.querySelectorAll('img');
const productRadios = document.querySelectorAll('input');
const productName1 = document.getElementById('name1');
const productName2 = document.getElementById('name2');
const productName3 = document.getElementById('name3');
const productDesc1 = document.getElementById('desc1');
const productDesc2 = document.getElementById('desc2');
const productDesc3 = document.getElementById('desc3');
const productsList = new ProductArray(testProductData);
const confirmButton = document.getElementById('confirm-button');

let totalRounds = 0;

const initializeNewProductButtons = () => {
    
    const randomProduct = productsList.getRandomProduct();
    let randomProduct2 = productsList.getRandomProduct();
    let randomProduct3 = productsList.getRandomProduct();
    
    while (randomProduct.id === randomProduct2.id) {
        randomProduct2 = productsList.getRandomProduct();
    }
    
    while (randomProduct.id === randomProduct3.id || randomProduct2.id === randomProduct3.id) {
        randomProduct3 = productsList.getRandomProduct();
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
            radioTag.value = randomProduct.id;
        } else if (i === 1) {
            radioTag.value = randomProduct2.id;
        } else if (i === 2) {
            radioTag.value = randomProduct3.id;
        }
    });

    randomProduct.shownCount++;
    randomProduct2.shownCount++;
    randomProduct3.shownCount++;

    productName1.textContent = randomProduct.name;
    productName2.textContent = randomProduct2.name;
    productName3.textContent = randomProduct3.name;
    
    productDesc1.textContent = randomProduct.description;
    productDesc2.textContent = randomProduct2.description;
    productDesc3.textContent = randomProduct3.description;
    
};

confirmButton.addEventListener('click', () => {
    event.preventDefault();
    const radioChoice = document.querySelector('input:checked').value;
    let userSelectedProduct = productsList.getProductById(radioChoice);
    userSelectedProduct.clickedCount++;
    initializeNewProductButtons();
    totalRounds++;
    
    //if statement "if total rounds >24 redirect, display results"
    
});

initializeNewProductButtons();