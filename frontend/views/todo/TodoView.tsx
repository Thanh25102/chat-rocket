import {useCallback, useState} from "react";
import {BotEndpoint} from "Frontend/generated/endpoints";

export default function TodoView() {

    const [todos, setTodos] = useState(['Task 1', 'Task 2']);
    const [input, setInput] = useState('');

    const addTodo = useCallback(() => {
        BotEndpoint.chat(input).then(response => {
            setTodos([...todos, response || "call failed"]);
        });
    }, [input]);
    return (
        <div className="flex flex-col h-full items-center justify-center p-l text-center box-border">
            <img style={{width: '200px'}} src="images/empty-plant.png" alt={"image"}/>
            <h2>This place intentionally left empty</h2>
            <p>It’s a place where you can grow your own UI 🤗</p>
        </div>
    );
}
