//React Component, which represents an item in a shopping cart.
import { formatPrice, generateAmountOptions } from '../utils';
import { removeItem, editItem } from '../features/cart/cartSlice';
//removeItem and editItem are action creators
import { useDispatch } from 'react-redux';
//useDispatch is a React hook imported from 'react-redux' that allows us to dispatch actions.


//This is a functional component named CartItem. It receives a single prop cartItem, which represents the item data to be displayed in the cart.
const CartItem = ({ cartItem }) => {

    // useDispatch() hook is called to get the dispatch function from the Redux store.
    const dispatch = useDispatch();

    //removeItemFromTheCart: Dispatches a removeItem action with the cartID of the current item.
    const removeItemFromTheCart = () => {
        dispatch(removeItem({ cartID }));
    };

    //handleAmount: Dispatches an editItem action with the cartID and the updated amount based on the value selected in the dropdown.
    //This function is triggered when the value of the amount of the item in the shopping cart changes.
    const handleAmount = (e) => {

        //It dispatches an action to update the item in the cart with the new amount.
        dispatch(editItem({ cartID, amount: parseInt(e.target.value) }));
        //The new amount selected by the user. e.target.value retrieves the value selected in the dropdown, but since it's a string, parseInt is used to convert it into an integer.
    };

    //Destructuring 'cartItem' prop
    const { cartID, title, price, image, amount, company, productColor } =
        cartItem;

    return (

        //This article element represents the container for each cart item. It has some CSS classes for styling purposes.
        <article
            key={cartID}
            className='mb-12 flex flex-col gap-y-4 sm:flex-row flex-wrap border-b border-base-300 pb-6 last:border-b-0'
        >

            {/*Displays the image of the product with the specified dimensions and styling.*/}
            {/* IMAGE */}
            <img
                src={image}
                alt={title}
                className='h-24 w-24 rounded-lg sm:h-32 sm:w-32 object-cover'
            />

            {/*Displays information about the product such as title, company, and product color.*/}
            {/* INFO */}
            <div className='sm:ml-16 sm:w-48'>
                {/* TITLE */}
                <h3 className='capitalize font-medium'>{title}</h3>
                {/* COMPANY */}
                <h4 className='mt-2 capitalize text-sm text-neutral-content'>
                    {company}
                </h4>
                {/* COLOR */}
                <p className='mt-4 text-sm capitalize flex items-center gap-x-2'>
                    color :
                    <span
                        className='badge badge-sm'
                        style={{ backgroundColor: productColor }}
                    ></span>
                </p>
            </div>

            {/*Allows the user to adjust the amount of the product and remove it from the cart.*/}
            <div className='sm:ml-12'>
                {/* AMOUNT */}
                <div className='form-control max-w-xs'>
                    <label htmlFor='amount' className='label p-0'>
                        <span className='label-text'>Amount</span>
                    </label>
                    <select
                        name='amount'
                        id='amount'
                        className='mt-2 select select-base select-bordered select-xs'
                        value={amount}
                        onChange={handleAmount}
                    >
                        {generateAmountOptions(amount + 5)}
                    </select>
                </div>
                {/* REMOVE */}
                <button
                    className='mt-2 link link-primary link-hover text-sm'
                    onClick={removeItemFromTheCart}
                >
                    remove
                </button>
            </div>


            {/*Displays the price of the product.*/}
            {/* PRICE */}
            <p className='font-medium sm:ml-auto'>{formatPrice(price)}</p>
        </article>
    );
};
export default CartItem;



//Overall, this component renders a representation of a single item in a shopping cart, including its image, title, company, product color, amount, and price. It also provides functionality to adjust the amount or remove the item from the cart.