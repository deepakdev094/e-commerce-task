import axios from 'axios';
const BaseUrl = import.meta.env.VITE_API_BASE_URL;

export const createNewCoupon = async (data) => {
    try {
        const response = await axios.get(`${BaseUrl}/admin/discount`);
        return response.data.data;
    } catch (error) {
        console.log(error);
    }
}

export const getCoupons = async (data) => {
    try {
        const response = await axios.get(`${BaseUrl}/admin/discountCodes`);
        return response.data.data;
    } catch (error) {
        console.log(error);
    }
}

export const getStatistics = async (userId) => {
    try {
        const items = await axios.get(`${BaseUrl}/admin/stats`);
        return items.data.data;
    } catch (error) {
        console.log(error);
    }
}
