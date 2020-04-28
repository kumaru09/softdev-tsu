import React, { Fragment } from 'react'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
    root: {
        margin: '-1rem 0 2rem 0',
        padding: '0 7rem',
        [theme.breakpoints.down('xs')]: {
            padding: '0'
        },
        [theme.breakpoints.down('md')]: {
            padding: '0'
        },
        marginTop: 'auto'
    },
    textField: {
        width: '100%',
        [theme.breakpoints.down('xs')]: {
            width: '100%'
        }
    },
    errorMessage: {
        color: 'red',
        fontSize: '0.9rem',
        marginTop: '0.2rem'
    }
}));


const Information = ({ formProps: { register, errors }, handleInputChange, values }) => {
    const classes = useStyles();
    const { firstName, lastName, idCardNumber, phoneNumber, address } = values

    return (
        <Fragment>
            <div className={classes.root}>
                <Grid container
                    direction="row"
                    justify="center"
                    alignItems="center"
                    spacing={0}
                >
                    <Grid item md={12} xs={12}>
                        <TextField
                            id="firstName"
                            label="Firstname"
                            name="firstName"
                            className={classes.textField}
                            margin="normal"
                            variant="outlined"
                            inputRef={register}
                            error={!!errors.firstName}
                            defaultValue={firstName}
                            onChange={handleInputChange}
                        />
                        {errors.firstName && <p className={classes.errorMessage}>{errors.firstName.message}</p>}
                    </Grid>
                    
                    <Grid item md={12} xs={12}>
                        <TextField
                            id="lastName"
                            label="Lastname"
                            name="lastName"
                            className={classes.textField}
                            margin="normal"
                            variant="outlined"
                            inputRef={register}
                            error={!!errors.lastName}
                            defaultValue={lastName}
                            onChange={handleInputChange}
                        />
                        {errors.lastName && <p className={classes.errorMessage}>{errors.lastName.message}</p>}
                    </Grid>
                </Grid>

                <Grid container
                    direction="row"
                    spacing={0} >
                        <Grid item md={12} xs={12}>
                            <TextField
                                id="idCardNumber"
                                label="Identification card number"
                                name="idCardNumber"
                                className={classes.textField}
                                margin="normal"
                                variant="outlined"
                                inputRef={register}
                                error={!!errors.idCardNumber}
                                defaultValue={idCardNumber}
                                onChange={handleInputChange}
                            />
                            {errors.idCardNumber && <p className={classes.errorMessage}>{errors.idCardNumber.message}</p>}
                        </Grid>

                        <Grid item md={12} xs={12}>
                            <TextField
                                id="phoneNumber"
                                label="Phone number"
                                name="phoneNumber"
                                className={classes.textField}
                                margin="normal"
                                variant="outlined"
                                inputRef={register}
                                error={!!errors.phoneNumber}
                                defaultValue={phoneNumber}
                                onChange={handleInputChange}
                            />
                            {errors.phoneNumber && <p className={classes.errorMessage}>{errors.phoneNumber.message}</p>}
                        </Grid>
                </Grid>
                    <Grid container
                    direction="row"
                    spacing={0} >
                        <Grid item md={12} xs={12}>
                            <TextField
                                id="address"
                                label="Address"
                                name="address"
                                className={classes.textField}
                                margin="normal"
                                variant="outlined"
                                multiline
                                rows={4}
                                inputRef={register}
                                error={!!errors.address}
                                defaultValue={address}
                                onChange={handleInputChange}
                            />
                            {errors.address && <p className={classes.errorMessage}>{errors.address.message}</p>}
                        </Grid>
                </Grid>
            </div>
        </Fragment>
    )
}

export default Information