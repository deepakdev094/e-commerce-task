import axios from 'axios';
const BaseUrl = import.meta.env.VITE_API_BASE_URL;

export const addToCartApi = async (data) => {
    try {
        await axios.post(
            `${BaseUrl}/cart/add`,
            data,
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        )
        return true;
    } catch (error) {
        console.log(error);
    }
}


export const getCartApi = async (userId) => {
    try {
        const items = await axios.get(`${BaseUrl}/cart/get`);
        return items.data.data;
    } catch (error) {
        console.log(error);
    }
}


export const makeCheckout = async (data) => {
    try {
        await axios.post(
            `${BaseUrl}/checkout`,
            data,
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        )
        return true;
    } catch (error) {
        console.log(error);
    }
}