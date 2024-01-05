import {Modal, TextField} from '@shopify/polaris';
import {useContext, useState} from "react";
import {TodosContext} from "../../App";

function ModalAddTask() {
    const [taskName, setTaskName] = useState('');
    const {addTodo, handleCloseModal, active} = useContext(TodosContext)

    const handleInputChange = (value) => {
        setTaskName(value);
    };

    const handleCreateTask = () => {
        if (!!taskName) {
            const newTask = {
                id: Math.floor(Math.random() * 1000),
                name: taskName,
                isCompleted: false,
            };
            addTodo(newTask);
            handleCloseModal();
            setTaskName('');
        }
    };
    return (
        <Modal
            open={active}
            onClose={() => {
                handleCloseModal();
            }}
            title="Create a new todo"
            primaryAction={{
                content: 'Create',
                onAction: handleCreateTask,
            }}
            secondaryActions={[
                {
                    content: 'Cancel',
                    onAction: handleCloseModal,
                },
            ]}
        >
            <Modal.Section>
                <TextField
                    autoComplete="off"
                    value={taskName}
                    onChange={handleInputChange}
                />
            </Modal.Section>
        </Modal>
    );
}

export default ModalAddTask