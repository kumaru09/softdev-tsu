import React, { Fragment } from 'react'
import { ListItem, ListItemText, Divider, ListItemSecondaryAction, IconButton } from '@material-ui/core'
import CheckIcon from '@material-ui/icons/Check';
import moment from 'moment';
import DeleteIcon from '@material-ui/icons/Delete'

const Transcripts = props => {
    return (
        <Fragment>
            <ListItem>
                <ListItemText
                    primary={props.transcript.name}
                    secondary={moment(props.transcript.time).format('L LT')}
                />
                <ListItemSecondaryAction>
                    {!props.transcript.confirm ? <IconButton edge="end" onClick={() => props.deleteTranscript(props.transcript.tour)}>
                        <DeleteIcon />
                    </IconButton> : "" }
                    {props.transcript.confirm ? <CheckIcon /> : ""}
                </ListItemSecondaryAction>
            </ListItem>
            <Divider variant="fullWidth" />
        </Fragment>
    )
}

export default Transcripts