import React, { Fragment } from 'react'
import { ListItem, ListItemText, ListItemSecondaryAction, IconButton, Divider } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'

const Favorite = props => {
    return (
        <Fragment>
           <ListItem>
               <ListItemText
                primary={props.name.name}
                />
                <ListItemSecondaryAction>
                    <IconButton edge="end" onClick={() => props.deleteFavorite(props.name.tour)}>
                        <DeleteIcon />
                    </IconButton>
                </ListItemSecondaryAction>
           </ListItem>
           <Divider variant="fullWidth" />
        </Fragment>
    )
}

export default Favorite