import { getTodos } from '../_actions/todos/getTodos';
import TodosContent from './TodosContent'

export default async function TodoList() {
    const todos = await getTodos();
    return (
        <TodosContent todos={todos} />
    )
}
