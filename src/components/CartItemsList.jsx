//responsible for rendering a list of items in the shopping cart
import { useSelector } from 'react-redux';
import CartItem from './CartItem';
const CartItemsList = () => {
    // useSelector hook is used to select the cartItems from the Redux store's state.
    //useSelector takes a selector function as an argument. This function is applied to the Redux store's state, and it returns the part of the state that the component needs.
    //In this case, the selector function accesses the cartItems array from the cartState slice of the Redux store's state.
    const cartItems = useSelector((state) => state.cartState.cartItems);

    return (
        <div>
            {/*It uses the map function to iterate over the cartItems array obtained from the Redux store.*/}
            {cartItems.map((item) => {
                return <CartItem key={item.cartID} cartItem={item} />;
            })}
        </div>
    );
};
export default CartItemsList;


//In summary, CartItemsList is a React component that uses Redux's useSelector hook to retrieve the list of cart items from the Redux store's state. It then iterates over these items, rendering a CartItem component for each item in the list. This component facilitates the display of the shopping cart items in the UI.