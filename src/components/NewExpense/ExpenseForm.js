import { useState } from 'react';
import './ExpenseForm.css';

function ExpenseForm (props) {

    let [enteredTitle, setEnteredTitle] = useState('');
    let [enteredAmount, setEnteredAmount] = useState('');
    let [enteredDate, setEnteredDate] = useState('');

    const titleChangeHandler= (e) =>{
        setEnteredTitle(e.target.value);
    }
    const amountChangeHandler= (e) =>{
        setEnteredAmount(e.target.value);
    }
    const dateChangeHandler= (e) =>{
        setEnteredDate(e.target.value);
    }

    const submitHandler = (e) =>{
        e.preventDefault(); // prevents the default behaviour of refreshing the page on submiting the form //

        const expenseData = {
            title: enteredTitle,
            amount: +enteredAmount,
            date: new Date(enteredDate),
        };

        props.onSaveExpenseData(expenseData);
        setEnteredTitle('');
        setEnteredAmount('');
        setEnteredDate('');
        // we use two way binding to change state and then store that state back into the compoments value, so that we can clear the input box without losing the data //
        
        closeExpenseHandler();// can set to if expenseData != null
    };

    let [val, setVal] = useState(0);
    const openExpenseHandler = ()=>{
        setVal(1);
    }
    const closeExpenseHandler = ()=>{
        setVal(0);
    }

    if(val === 0) {
       return <button type='submit' onClick={openExpenseHandler}>Add Expense</button>
    }
    else if(val === 1) {
    return (
        <form onSubmit={submitHandler}>
            <div className='new-expense__controls'>
                <div className='new-expense__control'>
                    <label>Title</label>
                    <input type='text' 
                    value={enteredTitle}
                    onChange={titleChangeHandler} />
                </div>
                <div className='new-expense__control'>
                    <label>Amount</label>
                    <input type='number' min='0.01' step='0.01' 
                    value={enteredAmount}
                    onChange={amountChangeHandler} />
                </div>
                <div className='new-expense__control'>
                    <label>Date</label>
                    <input type='date' min='2019-01-01' max='2022-12-31'
                    value={enteredDate} 
                    onChange={dateChangeHandler} />
                </div>
            </div>
            <div className='new-expense__actions'>
                <button type='button' onClick={closeExpenseHandler}>Cancel</button>
                <button type='submit'>Add Expense</button>
            </div>
        </form>
    );
}
}

export default ExpenseForm;


// single state code // :: important to know //

// useState({
//     enteredTitle: '',
//     enteredAmount: '',
//     enteredDate: '',
// });
// const titleChangeHandler = (event) => {
//     setUserInput((prevState)=>{
//         return( {...prevState, enteredTitle: event.target.value });// using ...prevState is important as it preserves the input we already had and prevetns from overwriting //
//     })
// } 
// using a function here is as if we use normal approach it might be possible that the state it uses as reference is not the latest one , thus using a function ensures that we use the correct previous state to copy data //