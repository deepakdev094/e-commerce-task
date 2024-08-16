import axios from 'axios';
const BaseUrl = import.meta.env.VITE_API_BASE_URL;

export const getProductsApi = async () => {
    try {
        const products = await axios.get(`${BaseUrl}/product/get`);
        // console.log("products : ", products.data.products)
        return products.data.products;
    } catch (error) {
        console.log(error);
    }
}