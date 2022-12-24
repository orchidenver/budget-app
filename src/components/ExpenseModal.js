import { Form, Modal, Button } from 'react-bootstrap';
import { useRef } from 'react';
import { useBudgets, UNCATEGORIZED_BUDGET_ID } from '../contexts/BudgetContext';

export default function ExpenseModal({ show, handleClose, defaultBudgetId }) {
    const descRef = useRef();
    const amountRef = useRef();
    const budgetIdRef = useRef();
    const { addExpense, budgets } = useBudgets();

    function onSubmitHandler(e) {
        e.preventDefault();

        addExpense({
            description: descRef.current.value,
            amount: parseFloat(amountRef.current.value),
            budgetId: budgetIdRef.current.value,
        });

        handleClose();
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Form onSubmit={onSubmitHandler}>
                <Modal.Header closeButton>
                    <Modal.Title>New Expense</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className='mb-3' controlId='description'>
                        <Form.Label>Description</Form.Label>
                        <Form.Control ref={descRef} type='text' required />
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='amount'>
                        <Form.Label>Amount</Form.Label>
                        <Form.Control
                            ref={amountRef}
                            type='number'
                            required
                            min={0}
                            step={0.01}
                        />
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='budgetId'>
                        <Form.Label>Budget</Form.Label>
                        <Form.Select
                            defaultValue={defaultBudgetId}
                            ref={budgetIdRef}
                        >
                            <option id={UNCATEGORIZED_BUDGET_ID}>Uncategorized</option>
                            {budgets.map(budget => (
                                <option key={budget.id} value={budget.id}>
                                    {budget.name}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    <div className='d-flex justify-content-end'>
                        <Button variant='primary' type='submit'>
                            Add
                        </Button>
                    </div>
                </Modal.Body>
            </Form>
        </Modal>
    )
}