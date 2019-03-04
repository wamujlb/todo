import { todosRef } from "../config/firebase";
import TODOS from "../constants/todos";

export const addTodo = (todo: Object) => async dispatch => {
    todosRef.push().set(todo);
};

export const deleteTodo = (id: string) => async dispatch => {
    todosRef.child((id)).remove();
};

export const checkTodo = (id: string, todo: Object) => async dispatch => {
    console.log(todo)
    todosRef.child(id).update({[todo.key]: todo.value});
};

export const fetchTodos = () => async dispatch => {
    todosRef.on("value", snapshot => {
        dispatch({
            type: TODOS.FETCH,
            payload: snapshot.val()
        });
    });
};