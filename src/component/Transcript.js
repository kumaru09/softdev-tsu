import React, { Fragment } from 'react'
import { ListItem, ListItemText, Divider, ListItemSecondaryAction, IconButton } from '@material-ui/core'
import CheckIcon from '@material-ui/icons/Check';
import moment from 'moment';
import CloseIcon from '@material-ui/icons/Close';

const Transcripts = props => {
    return (
        <Fragment>
        {console.log(moment(props.transcript.time).format())}
            <ListItem>
                <ListItemText
                    primary={props.transcript.name+" "+props.transcript.surname}
                    secondary={<Fragment>{props.transcript.confirm  ? "เข้าร่วมเรียบร้อย" : ""}{(moment(props.transcript.time).format() === moment(0).format()) || !props.transcript.time ? "รอการแจ้งโอน" : ""}
                    {(moment(props.transcript.time).format() !== moment(0).format()) && !props.transcript.confirm && props.transcript.time ? moment(props.transcript.time).format('L LT') : ""}</Fragment>}
                />
                {!props.transcript.confirm && <ListItemSecondaryAction>
                    <IconButton disabled={!props.transcript.time || (moment(props.transcript.time).format() === moment(0).format())} edge="end" onClick={() => {props.confirmTour(props.transcript.user, true)}}>
                        <CheckIcon />
                    </IconButton>
                    <IconButton disabled={!props.transcript.time || (moment(props.transcript.time).format() === moment(0).format())} edge="end"  onClick={() => {props.confirmTour(props.transcript.user, false)}}>
                        <CloseIcon />
                    </IconButton>
                </ListItemSecondaryAction> }
            </ListItem>
            <Divider variant="fullWidth" />
        </Fragment>
    )
}

export default Transcripts