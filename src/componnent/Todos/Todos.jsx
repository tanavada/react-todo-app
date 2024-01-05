import {Badge, Button, ButtonGroup, Card, InlineStack, Page, ResourceItem, ResourceList, Text} from '@shopify/polaris';
import {useContext} from 'react';
import {TodosContext} from '../../App';

function TodosComponent() {
    const {
        selectedItems,
        setSelectedItems,
        todos,
        setTodos,
    } = useContext(TodosContext);

    const completeTodo = (id) => {
        const updatedTodos = todos.map((todo) => {
            if (todo.id === id) {
                return {...todo, isCompleted: true};
            }
            return todo;
        });
        setTodos(updatedTodos);
    };

    const removeAllTodo = () => {
        const updatedTodos = todos.filter((todo) => !selectedItems.includes(todo.id));
        setTodos(updatedTodos);
        setSelectedItems([]);
    };
    const removeTodo = index => {
        const newTodos = [...todos];
        newTodos.splice(index, 1);
        setTodos(newTodos);
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
                completeAllTodos();
                setSelectedItems([]);
            },
        },
        {
            content: 'Delete',
            onAction: () => removeAllTodo(),
        },
    ];

    return (
        <Page>
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
        </Page>
    )
        ;

    function renderItem(item) {
        const {id, name, isCompleted} = item;
        return (
            <ResourceItem key={id} id={id} accessibilityLabel={`View details for ${name}`}>
                <InlineStack align='space-between' blockAlign='center'>
                    <Text variant='bodyMd' fontWeight='bold' as='h3'>
                        {name}
                    </Text>
                    <InlineStack wrap={false} gap='100' blockAlign='center'>
                        {isCompleted ? <Badge tone='success'>Done</Badge> : <Badge>Pending</Badge>}
                        <ButtonGroup>
                            {!isCompleted && <Button variant='primary' onClick={() => completeTodo(id)}>Complete</Button>}
                            <Button variant='secondary' onClick={() => removeTodo()}>
                                Delete
                            </Button>
                        </ButtonGroup>
                    </InlineStack>
                </InlineStack>
            </ResourceItem>
        );
    }
}

export default TodosComponent;
