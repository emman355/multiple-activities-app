import { getTodos } from '../actions/todos/getTodos';
import TodosContent from './TodosContent'

export default async function TodoList() {
    const todos = await getTodos();
    return (
        <TodosContent todos={todos} />
    )
}
