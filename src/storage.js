const PRODUCT_KEY = 'PRODUCTS';

const store = {
    storage: window.localStorage,

save(key, product) {
    const json = JSON.stringify(product);
    store.storage.setProduct(key, json);
},

get(key) {
    const json = store.storage.getProduct(key);
    const product = 
}
}