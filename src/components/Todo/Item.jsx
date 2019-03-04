// @flow
import React from "react";
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';

type Props = {
    id: string,
    todo: Object,
    handleCheck: Function,
    handleDelete: Function,
}

class TodoItem extends React.Component<Props> {
    render() {
        const { id, todo, handleDelete, handleCheck } = this.props;

        return (
            <ListItem>
                <Checkbox
                    checked={todo.checked}
                    tabIndex={-1}
                    onChange={() => handleCheck(id, !todo.checked)}
                />
                <ListItemText primary={todo.title} />
                <ListItemSecondaryAction>
                    <IconButton aria-label="Comments" onClick={() => handleDelete(id)}>
                        <DeleteOutlinedIcon />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        );
    }
}

export default TodoItem;