import { useState } from "react";
import ExpensesFilter from "./ExpensesFilter";
import ExpensesList from "./ExpensesList";
import ExpensesChart from "./ExpensesChart";
import Card from "../UI/Card";
import './Expenses.css';

function Expenses(props) {

    let [filteredYear, setFilteredYear] = useState('2020');

    const filterChangeHandler = (selectedYear) => {
        // console.log(selectedYear);
        setFilteredYear(selectedYear);
    }

    const filteredExpenses = props.expenses.filter(expenses => {
        return expenses.date.getFullYear().toString() === filteredYear;
    });

    return (
        <li>
            <Card className="expenses">
                <ExpensesFilter
                    selected={filteredYear}
                    onFilterChange={filterChangeHandler}
                />
                <ExpensesChart expenses={filteredExpenses}/>
                <ExpensesList expenses = {filteredExpenses}/>
            </Card>
        </li>
    )
}

export default Expenses;