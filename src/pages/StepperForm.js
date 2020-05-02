import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Information from './Information'
import Account from './Account'
import { useForm } from "react-hook-form";
import * as yup from "yup";

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
    },
    backButton: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    buttonLayout: {
        marginLeft: '12rem',
        [theme.breakpoints.down('xs')]: {
            marginLeft: '0'
        }
    }
}));

const checkCharacterOnly = /^[A-Za-z]+$/;
const checkNumberOnly = /^[0-9]+$/;

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

function getSteps() {
    return ['Information', 'Address'];
}

export default function StepperForm() {
    const classes = useStyles();
    const [account, setAccount] = useState({ 
        firstName: "", 
        lastName: "", 
        idCardNumber: "",
        phoneNumber: "",
        address: "",
        email: "", 
        password: "", 
        confirmPassword: ""
    })

    const informationForm = useForm({
        validationSchema: informationSchema
    });

    const accountForm = useForm({
        validationSchema: accountSchema
    });

    const [activeStep, setActiveStep] = React.useState(0);
    const steps = getSteps();

    const handleNext = () => {
        setActiveStep(prevActiveStep => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep(prevActiveStep => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    const onSubmit = data => {
        handleNext()
    };

    function getStepContent(stepIndex) {
        switch (stepIndex) {
            case 0:
                return <Information
                            formProps={informationForm}
                            handleInuputChange={handleInuputChange} 
                            account={account}
                        />;
            case 1:
                return <Account 
                            formProps={accountForm} 
                            handleInuputChange={handleInuputChange} 
                            account={account}
                        />;
            default:
                return 'Unknown stepIndex';
        }
    }

    const handleInuputChange = event => {
        const { name , value } = event.target

        setAccount({ ...account, [name]: value })
    }

    return (
        <div className={classes.root}>
            <form onSubmit={activeStep === 0 ? informationForm.handleSubmit(onSubmit) : accountForm.handleSubmit(onSubmit)}>
                <Stepper activeStep={activeStep} alternativeLabel>
                    {steps.map(label => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                <div>
                    {activeStep === steps.length ? (
                        <div className={classes.buttonLayout}>
                            <Typography className={classes.instructions}>All steps completed</Typography>
                            <Button variant="contained" color="primary" onClick={handleReset}>Reset</Button>
                        </div>
                    ) : (
                            <div>
                                <div className={classes.instructions}>{getStepContent(activeStep)}</div>
                                <div className={classes.buttonLayout}>
                                    <Button
                                        disabled={activeStep === 0}
                                        onClick={handleBack}
                                        className={classes.backButton}
                                        variant="outlined"
                                    >
                                        Back
                                    </Button>
                                    <Button variant="contained" color="primary" type="submit">
                                        {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                    </Button>
                                </div>
                            </div>
                        )}
                </div>
            </form>
        </div>
    );
}