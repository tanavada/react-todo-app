import {Button, Frame, Page} from '@shopify/polaris';

import TopBarMarkup from "./componnent/TopBar/TopBarMarkup";
import Logo_avada from "./assets/img/logo_avada.svg";
import TodosComponent from "./componnent/Todos/Todos";
import {createContext, useState} from "react";
import ModalAddTask from "./componnent/Modal/Modal";

export const TodosContext = createContext()

function App() {
    const [selectedItems, setSelectedItems] = useState([]);
    const [todos, setTodos] = useState([
        {
            id: 0,
            name: "Learn about React",
            isCompleted: false
        },
        {
            id: 1,
            name: "Meet friend for lunch",
            isCompleted: true
        },
        {
            id: 2,
            name: "Build really cool todo app",
            isCompleted: false
        }
    ]);
    const [active, setActive] = useState(false);

    const handleCloseModal = () => setActive(false);
    const addTodo = (todo) => {
        setTodos([...todos, todo]);
    };
    const value = {
        selectedItems,
        setSelectedItems,
        todos,
        setTodos,
        active,
        setActive,
        handleCloseModal,
        addTodo
    }

    const logo = {
        topBarSource: Logo_avada,
        width: 144,
        height: 30,
        accessibilityLabel: 'Shopify',
    };
    const renderedTopBarMarkup = <TopBarMarkup/>;
    return (
        <TodosContext.Provider value={value}>
            <Frame topBar={renderedTopBarMarkup} logo={logo}>
                <Page title=' Todos'
                      primaryAction={<Button variant='primary' size="large" onClick={() => setActive(true)}>Create
                          todo</Button>}/>
                {todos.length !== 0 ? <TodosComponent/> : <div>no task</div>}
                <ModalAddTask/>
            </Frame>
        </TodosContext.Provider>
    );
}

export default App;