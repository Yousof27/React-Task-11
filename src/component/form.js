import { useState } from 'react'
import './form.css'

export default function Form() {
    const [data, setData] = useState({
        name: '',
        phone: '',
        age: '',
        salary: '',
        employee: false,
        send: false,
    });
    const [message, setMessage] = useState('');
    let messageContent = message.split('-').map((m, i) => (<span key={i}>{m}<br /></span>));

    function handleChange(e) {
        let check = e.target.name;
        let enteredData = e.target.value;
        if (check === 'name') setData({ ...data, name: enteredData });
        else if (check === 'number') setData({ ...data, phone: enteredData });
        else if (check === 'age') setData({ ...data, age: enteredData });
        else if (check === 'checkbox') setData({ ...data, employee: e.target.checked })
        else if (check === 'select') setData({ ...data, salary: enteredData });
    }

    function handleSubmit(e) {
        e.preventDefault();
        let nameLock, phoneLock, ageLock, salaryLock;
        let text = 'invalid data :(-';

        if (data.name.trim() === '') {
            nameLock = false;
            text += 'no name entered !-';
        } else nameLock = true;

        if (![10, 11, 12].includes(data.phone.length)) {
            phoneLock = false;
            text += 'invalid phone number !-';
        } else phoneLock = true;

        if (data.age < 18 || data.age > 100) {
            ageLock = false;
            text += 'invalid age !-';
        } else ageLock = true;

        if (data.salary === '') {
            salaryLock = false;
            text += 'no salary selected !-';
        } else salaryLock = true;

        if (nameLock && phoneLock && ageLock && salaryLock) {
            setMessage('Submitted Successfully :)');
        } else {
            console.table({ 'Name': nameLock, 'Phone': phoneLock, 'Age': ageLock, 'Salary': salaryLock })
            setMessage(text);
        }
        setData({ ...data, send: true });
    }

    return (
        <form onClick={() => setData({ ...data, send: false })} onSubmit={e => handleSubmit(e)} className={`${data.send}`}>
            <input onChange={e => handleChange(e)} name='name' placeholder='Name:' value={data.name} />
            <input onChange={e => handleChange(e)} name='number' type='number' placeholder='Phone Number:' value={data.phone} />
            <input onChange={e => handleChange(e)} name='age' type='number' placeholder='Age:' value={data.age} />
            <div className='employee'>
                <input onChange={e => handleChange(e)} name='checkbox' type='checkbox' checked={data.employee} />
                <label>Are You Employee?</label>
            </div>
            <select onChange={e => handleChange(e)} name='select' value={data.salary}>
                <option value="" hidden>Salary</option>
                <option value="5000$">5000$</option>
                <option value="4000$">4000$</option>
                <option value="3000$">3000$</option>
                <option value="2000$">2000$</option>
            </select>
            <input type="submit" value="Submit" />
            <h2 className='finalMessage'>{messageContent}</h2>
        </form>
    )
};




