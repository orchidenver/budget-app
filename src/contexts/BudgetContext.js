import { createContext, useContext, useState } from "react";
import { v4 as uuidV4 } from 'uuid';
import { useData } from "../hooks/useData";
import { toast } from 'react-toastify';
import { useAuth } from "./AuthContext";
import { db } from '../utils/firebase';
import { addDoc, collection, doc, deleteDoc, query, where, getDocs } from 'firebase/firestore';
import { fetchData } from "../utils/fetchData";

const initialContext = {
    budgets: [],
    expenses: [],
    error: null,
    loading: false,
    getBudgetExpenses: () => { },
    addExpense: () => { },
    addBudget: () => { },
    deleteBudget: () => { },
    deleteExpense: () => { },
    calcDate: () => { }
}

const BudgetsContext = createContext(initialContext);

export const UNCATEGORIZED_BUDGET_ID = 'Uncategorized';

export function useBudgets() {
    return useContext(BudgetsContext);
}

export function BudgetsProvider({ children }) {
    const { currentUser } = useAuth();
    const [budgets, setBudgets] = useData('budgets');
    const [expenses, setExpenses] = useData('expenses');
    const [isError, setIsError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    function getBudgetExpenses(budgetId) {
        return expenses.filter(expense => expense.budgetId === budgetId);
    }

    function calcDate(data) {
        const monthsArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

        return data.map(expense => {
            const month = new Date(expense.date.seconds * 1000).getUTCMonth();
            const year = new Date(expense.date.seconds * 1000).getFullYear();

            return {
                year,
                month: monthsArray[month]
            }
        });
    }

    async function addExpense({ description, amount, budgetId }) {
        setIsLoading(true);

        try {

            if (!description || !amount || !budgetId) {
                setIsError(true);
                setIsLoading(false);
                return toast.error('Fill all the required fields');
            }

            await addDoc(collection(db, 'expenses'), {
                id: uuidV4(),
                amount,
                description,
                budgetId,
                date: new Date(),
                userId: currentUser?.uid
            });

            setIsError(null);
            setIsLoading(false);

            fetchData('expenses', setExpenses);

        } catch (error) {
            setIsError(true);
            setIsLoading(false);
            toast.error('Fill all the required fields');
        }
    }

    async function addBudget({ name, max }) {
        setIsLoading(true);

        try {

            if (!name || !max) {
                setIsError(true);
                setIsLoading(false);
                return toast.error('Fill all the required fields');
            }

            await addDoc(collection(db, 'budgets'), {
                id: uuidV4(),
                max,
                name,
                userId: currentUser?.uid
            });

            setIsError(null);
            setIsLoading(false);

            fetchData('budgets', setBudgets);

        } catch (error) {
            setIsError(true);
            setIsLoading(false);
            toast.error('Fill all the required fields');
        }
    }

    async function deleteBudget({ id }) {
        try {
            const budgetToDeleteQuery = query(collection(db, 'budgets'), where('id', '==', id), where('userId', '==', currentUser?.uid));
            const budgetToDeleteData = await getDocs(budgetToDeleteQuery);
            const budgetToDelete = doc(db, 'budgets', budgetToDeleteData.docs[0].id);
            await deleteDoc(budgetToDelete);
            fetchData('budgets', setBudgets);
        } catch (error) {
            alert(error);
        }
    }

    async function deleteExpense({ id }) {
        try {
            const expenseToDeleteQuery = query(collection(db, 'expenses'), where('id', '==', id), where('userId', '==', currentUser?.uid));
            const expenseToDeleteData = await getDocs(expenseToDeleteQuery);
            const expenseToDelete = doc(db, 'expenses', expenseToDeleteData.docs[0].id);
            await deleteDoc(expenseToDelete);
            fetchData('expenses', setExpenses);
        } catch (error) {
            alert(error);
        }
        try {
            const res = await deleteDoc(doc(db, 'expenses', id));
            console.log(res);
        } catch (error) {
            // BUG
            // FirebaseError: Missing or insufficient permissions. POPS UP
            console.log(error);
        }
        // setExpenses(prevState => prevState.filter(item => item.id !== id));
    }

    const values = {
        budgets,
        expenses,
        error: isError,
        loading: isLoading,
        getBudgetExpenses,
        addExpense,
        addBudget,
        deleteBudget,
        deleteExpense,
        calcDate
    }

    return (
        <BudgetsContext.Provider value={values}>
            {children}
        </BudgetsContext.Provider>
    )
}