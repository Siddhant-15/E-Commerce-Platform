//form for collecting shipping information during the checkout process.
import { Form, redirect } from 'react-router-dom';
import FormInput from './FormInput';
import SubmitBtn from './SubmitBtn';
import { customFetch, formatPrice } from '../utils';
import { toast } from 'react-toastify';
import { clearCart } from '../features/cart/cartSlice';

//used as a handler for form submission.
//The function takes the Redux store as its argument.
export const action =
    (store) =>
        async ({ request }) => {
            //it extracts form data using the request.formData() method.
            const formData = await request.formData();

            //It extracts the name and address fields from the form data.
            const { name, address } = Object.fromEntries(formData);
            //It retrieves the user data from the Redux store's state.
            const user = store.getState().userState.user;
            //It retrieves cart-related data such as cartItems, orderTotal, and numItemsInCart from the Redux store's state.
            const { cartItems, orderTotal, numItemsInCart } =
                store.getState().cartState;

            //It constructs an info object containing the collected form data and cart-related information.
            const info = {
                name,
                address,
                chargeTotal: orderTotal,
                orderTotal: formatPrice(orderTotal),
                cartItems,
                numItemsInCart,
            };
            try {
                // it sends a POST request to the /orders endpoint with the info object as the request payload.
                const response = await customFetch.post(
                    '/orders',
                    { data: info },
                    {
                        //The request includes an authorization header with the user's token.
                        headers: {
                            Authorization: `Bearer ${user.token}`,
                        },
                    }
                );
                store.dispatch(clearCart());
                toast.success('order placed successfully');
                return redirect('/orders');
            }
            catch (error) {
                console.log(error);
                //The optional chaining operator (?.) is used to handle cases where intermediate properties might be null or undefined, preventing errors from being thrown if any property along the chain is missing.
                //errorMessage attempts to extract an error message from the error object
                const errorMessage =
                    error?.response?.data?.error?.message ||
                    'there was an error placing your order';
                toast.error(errorMessage);
                if (error?.response?.status === 401 || 403) return redirect('/login');

                return null;
            }
        };
const CheckoutForm = () => {
    return (
        <Form method='POST' className='flex flex-col gap-y-4'>
            <h4 className='font-medium text-xl'>Shipping Information</h4>
            <FormInput label='first name' name='name' type='text' />
            <FormInput label='address' name='address' type='text' />
            <div className='mt-4'>
                <SubmitBtn text='Place Your Order' />
            </div>
        </Form>
    );
};
export default CheckoutForm;

//In summary, CheckoutForm is a React component that represents a form for collecting shipping information during the checkout process. It handles form submission by sending a POST request to the server, processing the response, and providing feedback to the user through toast notifications.