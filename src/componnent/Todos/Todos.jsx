import {Badge, Button, ButtonGroup, Card, ResourceItem, ResourceList, Text,} from '@shopify/polaris';
import {useContext} from 'react';
import ModalAddTask from "../Modal/Modal";
import {TodosContext} from "../../App";

function TodosComponent() {
    const {
        selectedItems,
        setSelectedItems,
        todos,
        setTodos,
    } = useContext(TodosContext)


    const completeTodo = (id) => {
        const updatedTodos = todos.map(todo => {
            if (todo.id === id) {
                return {...todo, isCompleted: true};
            }
            return todo;
        });
        setTodos(updatedTodos);
    };

    const removeTodo = () => {
        const updatedTodos = todos.filter(todo => !selectedItems.includes(todo.id));
        setTodos(updatedTodos);
        setSelectedItems([]);
    };

    const completeAllTodos = () => {
        const updatedTodos = todos.map((todo) => {
            if (selectedItems.includes(todo.id)) {
                return {...todo, isCompleted: true};
            }
            return todo;
        });
        setTodos(updatedTodos);
        setSelectedItems([]);
    };
    const bulkActions = [
        {
            content: 'Complete',
            onAction: () => {
                selectedItems.forEach(id => completeAllTodos(id));
                setSelectedItems([]);
            },
        },
        {
            content: 'Delete',
            onAction: () => removeTodo(),
        },
    ];

    return (
        <Card>
            <ResourceList
                resourceName={{
                    singular: 'task',
                    plural: 'tasks',
                }}
                items={todos}
                renderItem={renderItem}
                selectedItems={selectedItems}
                onSelectionChange={setSelectedItems}
                bulkActions={bulkActions}
            />
        </Card>
    );


    function renderItem(item) {
        const {id, name, isCompleted} = item;
        return (
            <>
                <ResourceItem id={id} accessibilityLabel={`View details for ${name}`}>
                    <div className='flex'>
                        <Text variant="bodyMd" fontWeight="bold" as="h3">
                            {name}
                        </Text>
                        <div className='flex flex-gap-col-10'>
                            {isCompleted ? <Badge tone="success">Done</Badge> : <Badge>Pending</Badge>}
                            <ButtonGroup>
                                {!isCompleted && (
                                    <Button onClick={() => completeTodo(id)}>Complete</Button>
                                )}
                                <Button variant="secondary" onClick={() => removeTodo()}>Delete</Button>
                            </ButtonGroup>
                        </div>
                    </div>
                </ResourceItem>
                <ModalAddTask/>
            </>
        );
    }
}

export default TodosComponent;