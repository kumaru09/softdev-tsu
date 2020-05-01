import React from 'react'
import { Grid, Typography, Container, Button } from '@material-ui/core'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'

const TranscriptPage = () => {
    return (
        <Container maxWidth="md">
        <Typography variant="h4" gutterBottom>{"แจ้งโอนเงิน"}</Typography>
        <form>
        <Grid container >
        <Grid item>
            <Button
            variant="contained"
            color="default"
            startIcon={<CloudUploadIcon />}
            >
            Upload
            </Button>
        </Grid>
        </Grid>
        </form>
        </Container>
    )
}

export default TranscriptPage