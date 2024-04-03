import axios from 'axios';
//a popular JavaScript library used for making HTTP requests from the browser. It simplifies the process of sending asynchronous HTTP requests to REST endpoints and handling responses.

const productionURL = 'https://strapi-store-server.onrender.com/api';
//The /api path suggests that this is the base endpoint for accessing the server's API resources.

export const customFetch = axios.create({
    baseURL: productionURL,
});
//Here, an Axios instance named customFetch is created using axios.create(). This instance is configured with the base URL defined earlier (productionURL). By creating a custom Axios instance, you can set default configurations for all requests made using this instance.

export const formatPrice = (price) => {
    const dollarsAmount = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format((price / 100).toFixed(2));
    return dollarsAmount;
};
//This function, named formatPrice, takes a price as input and returns a formatted currency string. It uses the Intl.NumberFormat constructor to format the price into a currency string with US dollar ($) currency symbol. The price is divided by 100 to convert it into dollars and then fixed to two decimal places using toFixed(2).

export const generateAmountOptions = (number) => {
    return Array.from({ length: number }, (_, index) => {
        const amount = index + 1;
        return (
            <option key={amount} value={amount}>
                {amount}
            </option>
        );
    });
};