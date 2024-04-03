//This code defines a React component called SubmitBtn, which represents a submit button typically used in forms.
import { useNavigation } from "react-router-dom";
//This is a custom hook provided by React Router DOM for navigation within the application.

//functional component that accepts a prop text.
const SubmitBtn = ({ text }) => {
    const navigation = useNavigation();
    //the useNavigation hook is called to get access to navigation functionality.
    const isSubmitting = navigation.state === 'submitting';
    //If the state is 'submitting'(formMethod), the button is considered to be in a submitting state, and isSubmitting is set to true. Otherwise, it's false.
    return (
        <button type='submit' className='btn btn-primary btn-block'
            disabled={isSubmitting}>
            {/*Disables the button if isSubmitting is true, preventing multiple submissions while the form is being submitted. */}
            {isSubmitting ? (
                <>
                    <span className='loading loading-spinner'></span>
                    sending...
                </>
            ) : (
                text || 'submit'
            )}
        </button>
    );
};

export default SubmitBtn
