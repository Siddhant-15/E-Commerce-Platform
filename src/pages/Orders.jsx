//responsible for displaying a list of orders
import { redirect, useLoaderData } from 'react-router-dom';
import { toast } from 'react-toastify';
import { customFetch } from '../utils';
import { OrdersList, ComplexPaginationContainer, SectionTitle } from '../components';


//loader that is likely used for pre-fetching data before rendering the component.
export const loader =
    (store) =>
        async ({ request }) => {
            const user = store.getState().userState.user;//obtaining the user information
            //user information is stored in the Redux state under the userState slice.


            if (!user) {
                toast.warn('You must be logged in to view orders');
                return redirect('/login');
            }

            // extract and parse query parameters from the URL of an incoming request.
            const params = Object.fromEntries([
                //request.url contains the URL of the incoming request.
                //new URL(request.url) creates a new URL object from the URL string, providing a convenient way to parse and work with the URL components.
                //searchParams is a property of the URL object that returns a URLSearchParams object representing the query parameters of the URL.
                //The entries() method of the URLSearchParams object returns an iterator that yields key-value pairs for each parameter in the query string.
                //The spread operator (...) is used to spread the key-value pairs obtained from entries() into a new array.
                ...new URL(request.url).searchParams.entries(),
            ]);
            try {
                //sends a GET request to the '/orders' endpoint using the customFetch.get() function. This function is likely a custom wrapper around the native fetch API, used for making HTTP requests.
                const response = await customFetch.get('/orders', {
                    params,//query parameters for the request.
                    headers: {//it sets the 'Authorization' header with a bearer token obtained from the user object. This token is commonly used for authentication purposes, allowing access to protected resources on the server.
                        Authorization: `Bearer ${user.token}`,
                    },
                });

                return { orders: response.data.data, meta: response.data.meta };
            } catch (error) {
                console.log(error);
                const errorMessage =
                    error?.response?.data?.error?.message ||
                    'there was an error accessing your orders';

                toast.error(errorMessage);
                if (error?.response?.status === 401 || 403) return redirect('/login');

                return null;
            }
        };


const Orders = () => {
    const { meta } = useLoaderData();
    if (meta.pagination.total < 1) {
        return <SectionTitle text='Please make an order' />;
    }
    return (
        <>
            <SectionTitle text='Your Orders' />
            <OrdersList />
            <ComplexPaginationContainer />
        </>
    );
};

export default Orders;