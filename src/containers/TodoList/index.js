// @flow
import _ from "lodash";
import React from "react";
import { connect } from "react-redux";
import compose from 'recompose/compose';
import Card from '@material-ui/core/Card';
import List from '@material-ui/core/List';
import { bindActionCreators } from "redux";
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';

import { deleteTodo, fetchTodos, addTodo, checkTodo } from "../../actions/todos";
import TodoItem from "../../components/Todo/Item";

const styles = theme => ({
    todos: {
        width: '100%',
        maxWidth: 500,
        margin: '50px auto',
    },
    list: {
        backgroundColor: theme.palette.background.paper,
    },
    form: {
        ...theme.mixins.gutters(),
        marginBottom: theme.spacing.unit * 2,
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
    },
    textField: {
        width: '100%',
    }
});

type Props = {
    classes: Object,
    todos: Object | null,
    addTodo: Function,
    checkTodo: Function,
    fetchTodos: Function,
    deleteTodo: Function,
}

type State = {
    formValue: string,
}

class TodoList extends React.PureComponent<Props, State> {

    state = {
        formValue: "",
    };

    async componentDidMount() {
        await this.props.fetchTodos();
    }

    handleInputChange = event => {
        this.setState({ formValue: event.target.value });
    };

    handleFormSubmit = event => {
        const { formValue } = this.state;
        const { addTodo } = this.props;
        event.preventDefault();

        addTodo({ 
            title: formValue, 
            checked: false,
        });

        this.setState({ formValue: "" });
    };

    handleDelete = (id: string): void => {
        const { deleteTodo } = this.props;
        deleteTodo(id);
    };

    handleCheck = (id: string, value: boolean): void => {
        const { checkTodo } = this.props;
        checkTodo(id, {
            value,
            key: 'checked',
        });
    };

    render() {
        const { classes, todos } = this.props;
        const { formValue } = this.state;

        return (
            <div className={classes.todos}>
                <Paper className={classes.form}>
                    <form onSubmit={this.handleFormSubmit}>
                        <TextField
                            id="outlined-name"
                            label="Name"
                            className={classes.textField}
                            value={formValue}
                            onChange={this.handleInputChange}
                            margin="normal"
                            variant="outlined"
                        />
                    </form>
                </Paper>

                {todos && (
                    <Card>
                        <CardContent>
                            <List dense className={classes.list}>
                                {_.map(todos, (value, key) => {
                                    return (
                                        <React.Fragment key={key}>
                                            <TodoItem
                                                id={key}
                                                todo={value}
                                                handleCheck={this.handleCheck}
                                                handleDelete={this.handleDelete}
                                            />
                                            <Divider variant="inset" component="li" />
                                        </React.Fragment>
                                    )
                                })}
                            </List>
                        </CardContent>
                    </Card>
                )}
            </div>
        );
    }
}

const mapStateToProps = ({ todos }) => {
    return {
        todos,
    };
};

export default compose(
    withStyles(styles),
    connect(
        mapStateToProps,
        {
            addTodo,
            deleteTodo,
            fetchTodos,
            checkTodo,
        }
    )
)(TodoList)