// export const findById = (id, products) => {
//     let matchingProduct;
//     products.forEach = (product => {

//         if (product.id === id) {
//             matchingProduct = product;
//         }
//     });

//     return matchingProduct;

// };

export const compare = (products, id) => {
    for (let i = 0; i < products.length; i++) {
        const product = products[i];
        if (product.id === id) {
            return product;
        }
    }
};