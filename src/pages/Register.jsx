import { FormInput, SubmitBtn } from '../components';
import { Form, redirect, Link } from 'react-router-dom';

import { customFetch } from '../utils';
import { toast } from 'react-toastify';
export const action = async ({ request }) => {
    const formData = await request.formData();//asynchronous method that retrieves the form data from the request. It returns a FormData object that contains key-value pairs representing the form fields and their values.
    const data = Object.fromEntries(formData);//used to transform the FormData object into a plain JavaScript object. This object will contain the form field names as keys and their corresponding values.
    try {
        const response = await customFetch.post('/auth/local/register', data);//method is an asynchronous function that sends a POST request to the /auth/local/register endpoint with the form data. If the request is successful, the server will attempt to register the user.
        toast.success('account created successfully');
        return redirect('/login');
    } catch (error) {
        const errorMessage =
            error?.response?.data?.error?.message ||
            'please double check your credentials';

        toast.error(errorMessage);
        return null;
    }
};

const Register = () => {
    return (
        <section className='h-screen grid place-items-center'>
            <Form
                method='POST'
                className='card w-96 py-8 px-8 bg-base-100 shadow-lg flex flex-col gap-y-4'
            >
                <h4 className='text-center text-3xl font-bold'>Register</h4>
                <FormInput type='text' label='username' name='username' />
                <FormInput type='email' label='email' name='email' />
                <FormInput type='password' label='password' name='password' />
                <div className='mt-4'>
                    <SubmitBtn text='register' />
                </div>

                <p className='text-center'>
                    Already a member?
                    <Link
                        to='/login'
                        className='ml-2 link link-hover link-primary capitalize'
                    >
                        login
                    </Link>
                </p>
            </Form>
        </section>
    );
};
export default Register;