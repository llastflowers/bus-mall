import { testProductData } from './src/api.js';
import { ProductArray } from './src/ProductArray.js';
import { compare } from './src/utils.js';

const productImages = document.querySelectorAll('img');
const productRadios = document.querySelectorAll('input');
const productName1 = document.getElementById('name1');
const productName2 = document.getElementById('name2');
const productName3 = document.getElementById('name3');
const productDesc1 = document.getElementById('desc1');
const productDesc2 = document.getElementById('desc2');
const productDesc3 = document.getElementById('desc3');
const productArea = document.getElementById('product-selection');
const resultArea = document.getElementById('result-section');
const products = new ProductArray(testProductData);

let productsSelected = [];
let productsShown = [];
let totalRounds = 0;

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
            trackProductsShown(randomProduct.id);
        } else if (i === 1) {
            imageTag.src = randomProduct2.image;
            trackProductsShown(randomProduct2.id);
        } else if (i === 2) {
            imageTag.src = randomProduct3.image;
            trackProductsShown(randomProduct3.id);
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

    productName1.textContent = randomProduct.name;
    productName2.textContent = randomProduct2.name;
    productName3.textContent = randomProduct3.name;
    
    productDesc1.textContent = randomProduct.description;
    productDesc2.textContent = randomProduct2.description;
    productDesc3.textContent = randomProduct3.description;

    randomProduct.shownCount++;
    randomProduct2.shownCount++;
    randomProduct3.shownCount++;

};

function trackProductsShown(productId) {
    let shown = compare(productsShown, productId);
    if (!shown) {
        shown = {
            id: productId,
            shownCount: 1,
        };
        productsShown.push(shown);
    } else {
        shown.shownCount++;
    }
    
    const json = JSON.stringify(productsShown);
    localStorage.setItem('productsShown', json);

}

function trackProductsClicked(productsSelected, productId) {
    let found = products.getProductById(productsSelected, productId);
    if (!found) {
        found = {
            id: productId,
            selected: 1,
        };
        productsSelected.push(found);
    } else {
        found.selected++;
    }

    const json = JSON.stringify(productsSelected);
    localStorage.setItem('productsSelected', json);
}

productRadios.forEach((radioTag) => {
    radioTag.addEventListener('click', (event) => {
        trackProductsClicked(productsSelected, event.target.value);
        initializeNewProductButtons();
        totalRounds++;
        
        if (totalRounds > 24) {
            productArea.classList.add('hidden');
            resultArea.classList.remove('hidden');
            createChart();
        }
    });
});

function mergeArrays(shownArray, selectedArray) {
    const returnMergedArray = [];
    shownArray.forEach(element => {

        const mergedItem = element;
        const selectedObject = products.getProductById(selectedArray, mergedItem.id) || { selected: 0 };
        mergedItem.selected = selectedObject.selected;
        returnMergedArray.push(mergedItem);
    });
    return returnMergedArray;
}

function convertShownData(array) {
    const returnShownData = [];
    array.forEach(element => {
        returnShownData.push(element.shownCount);
    });
    return returnShownData;
}

function convertClickData(array) {
    const returnClickData = [];
    array.forEach(element => {
        returnClickData.push(element.selected);
    });
    return returnClickData;
}

function convertIdArray(array) {
    const returnId = [];
    array.forEach(element => {
        returnId.push(element.id);
    });
    return returnId;
} 

function createChart() {
    const ctx = document.getElementById('chart').getContext('2d');
    const parsedShownArray = JSON.parse(localStorage.productsShown);
    const parsedUserSelectedArray = JSON.parse(localStorage.productsSelected);
    const dataArray = mergeArrays(parsedShownArray, parsedUserSelectedArray);
    const myIds = convertIdArray(dataArray);
    const SELECTED = convertClickData(dataArray);
    const SHOWN = convertShownData(dataArray);
    const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: myIds,
            datasets: [{
                label: 'Products Selected',
                data: SELECTED,
                backgroundColor: 'rgba(112, 81, 112, 0.9)'
            },
            {
                label: 'Products Shown',
                data: SHOWN,
                backgroundColor: 'rgba(112, 81, 112, 0.5)'
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
        }
    });
    return myChart;
}

initializeNewProductButtons();
