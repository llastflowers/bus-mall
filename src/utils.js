const blankStats = [];
export const storedStats = 'stats';

export const getById = (id, products) => {
    let matchingProduct;
    products.forEach = (product => {

        if (product.id === id) {
            matchingProduct = product;
        }
    });

    return matchingProduct;

};

export const increaseSelectedProductById = (id, stats) => {
    let foundAMatch = false;
    stats.forEach(userSelections => {
        if (userSelections.id === id) {
            userSelections.quantity++;
            foundAMatch = true;
        }
    });

    if (foundAMatch) {
        return;
    } else {
        const newProductSelected = {
            id: id,
            quantity: 1,
        };

        stats.push(newProductSelected);
    }
};

const startBlankStats = () => {
    const serializedStats = JSON.stringify(blankStats);

    localStorage.setProduct('stats', serializedStats);
};

export const getStats = () => JSON.parse(localStorage.getProduct(storedStats));

const setStats = (storedStats) => {

    const serializedNewStats = JSON.stringify(storedStats);
    localStorage.setProduct(storedStats, serializedNewStats);
};

