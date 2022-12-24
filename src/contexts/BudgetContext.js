import { createContext, useContext, useState } from "react";
import { v4 as uuidV4 } from 'uuid';
import useLocalStorage from "../hooks/useLocalStorage";

const initialContext = {
    budgets: [],
    expenses: [],
    getBudgetExpenses: () => { },
    addExpense: () => { },
    addBudget: () => { },
    deleteBudget: () => { },
    deleteExpense: () => { },
}

const BudgetsContext = createContext(initialContext);

export const UNCATEGORIZED_BUDGET_ID = 'Uncategorized';

export function useBudgets() {
    return useContext(BudgetsContext);
}

export function BudgetsProvider({ children }) {
    const [budgets, setBudgets] = useLocalStorage('budgets', []);
    const [expenses, setExpenses] = useLocalStorage('expenses', []);

    function getBudgetExpenses(budgetId) {
        return expenses.filter(expense => expense.budgetId === budgetId);
    }

    function addExpense({ description, amount, budgetId }) {
        setExpenses(prevState => {
            return [...prevState, {
                id: uuidV4(),
                description,
                amount,
                budgetId
            }];
        });
    }

    function addBudget({ name, max }) {
        setBudgets(prevState => {
            if (prevState.find(budget => budget.name === name)) return prevState;

            return [...prevState, {
                id: uuidV4(),
                name,
                max
            }];
        });
    }

    function deleteBudget({ id }) {
        setBudgets(prevState => prevState.filter(item => item.id !== id));
    }

    function deleteExpense({ id }) {
        setExpenses(prevState => prevState.filter(item => item.id !== id));
    }

    const values = {
        budgets,
        expenses,
        getBudgetExpenses,
        addExpense,
        addBudget,
        deleteBudget,
        deleteExpense
    }

    return (
        <BudgetsContext.Provider value={values}>
            {children}
        </BudgetsContext.Provider>
    )
}