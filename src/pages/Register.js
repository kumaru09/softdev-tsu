import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Information from './Information';
import Account from './Account';
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { Container, Button } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    logo: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '0.5rem',
        color: '#745c97',
        fontWeight: 'bold',
        letterSpacing: '0.5rem'
    },
    border: {
        border: '0.15rem solid #2832c2',
        borderRadius: '2px',
        padding: '2%',
        width: '25rem',
        textAlign: 'center'
    },
    topLayout: {
        margin: '4rem 0',
        [theme.breakpoints.down('xs')]: {
            margin: '1rem 0'
        }
    },
    paperLayout: {
        padding: '2rem',
        [theme.breakpoints.up('md')]: {
            width: '35em'
        },
        marginTop: '-1rem',
        margin: 'auto',
        border: '1px solid #ebedf0',
        borderRadius: '4px',
        [theme.breakpoints.down('xs')]: {
            marginTop: '3rem'
        }
    },
}));

const checkCharacterOnly = /[A-Za-z]+$/;
const checkNumberOnly = /[0-9]+$/;

const informationSchema = yup.object().shape({
    firstName: yup
        .string()
        .required('This field is required.')
        .matches(checkCharacterOnly, 'Please enter only characters.')
        .min(3, 'Please enter at least 3 characters.'),

    lastName: yup
        .string()
        .required('This field is required.')
        .matches(checkCharacterOnly, 'Please enter only characters.')
        .min(3, 'Please enter at least 3 characters.'),

    idCardNumber: yup
        .string()
        .required('This field is required.')
        .matches(checkNumberOnly, 'Please enter only number.')
        .min(13, 'Please enter number 13 digits.')
        .max(13, 'Please enter number 13 digits.'),
    
    phoneNumber: yup
        .string()
        .required('This field is required.')
        .matches(checkNumberOnly, 'Please enter only number.')
        .min(10, 'Please enter number 10 digits.')
        .max(10, 'Please enter number 10 digits.'),

    address: yup
        .string()
        .required('This field is required.')
});

const accountSchema = yup.object().shape({
    email: yup
        .string()
        .email('Invalid email.')
        .required('This field is required.'),
    password: yup
        .string()
        .required('This field is required.')
        .min(3, 'Please Enter less then 3 letters'),
    confirmPassword: yup
        .string()
        .required('This field is required.')
        .min(3, 'This field at least 3 characters.')
        .oneOf([yup.ref('password'), null], "Password not match."),
});

const Register = () => {
    const classes = useStyles();
    const [ accounts, setAccounts ] = useState({
        step: 1,
        firstName: "", 
        lastName: "", 
        idCardNumber: "",
        phoneNumber: "",
        address: "",
        email: "", 
        password: "", 
        confirmPassword: ""
    })
    
    const handleNext = () => {
        setAccounts({ ...accounts, step: accounts.step + 1 });
    };

    const handleBack = () => {
        setAccounts({ ...accounts, step: accounts.step - 1 });
    };

    const handleInputChange = event => {
        const { name, value } = event.target

        setAccounts({ ...accounts, [name]: value })
    }

    const informationForm = useForm({
        validationSchema: informationSchema
    });

    const accountForm = useForm({
        validationSchema: accountSchema
    });

    const getstepContent = (steps) => {
        switch (steps) {
            case 1: return (
                <Information
                    formProps={informationForm}
                    handleInputChange={handleInputChange}
                    values={accounts}
                />
            )
            case 2: return (
                <Account
                    formProps={accountForm}
                    values={accounts}
                />
            )
            default: return ''
        }
    }

    const onSubmit = data => {
        console.log(data)
        handleNext()
    }

    return (
        <Container maxWidth="md">
         <form onSubmit={accounts.step === 1 ? informationForm.handleSubmit(onSubmit) : accountForm.handleSubmit(onSubmit)}>
                {getstepContent(accounts.step)}
            <Button
                disabled={accounts.step === 1}
                onClick={handleBack}
                variant="outlined"
            >
                Back
            </Button>
            <Button variant="contained" color="primary" type="submit">
                {accounts.step === 2 ? 'Finish' : 'Next'}
            </Button>
        </form>
        </Container>
    )
}

export default Register