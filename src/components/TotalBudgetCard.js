import { useBudgets } from '../contexts/BudgetContext';
import BudgetCard from './BudgetCard';

export default function TotalBudgetCard() {
    const { expenses, budgets } = useBudgets();
    const amount = expenses.reduce((total, expense) => total + Number(expense.amount), 0);
    const max = budgets.reduce((total, budget) => total + Number(budget.max), 0);
    console.log(amount, max);
    if (!max) return null;

    return <BudgetCard amount={amount} name='Total' gray max={max} hideButtons />
}