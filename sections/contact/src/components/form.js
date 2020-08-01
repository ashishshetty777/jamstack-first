import React from 'react';
import styles from './form.module.css';

const INITIAL_STATE = {
    name: '',
    email: '',
    subject: '',
    body: '',
    status: 'IDLE'
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'updateFieldValue' :
            return { ...state, [action.field] : action.value}
        case 'updateStatus':
            return {...state, status: action.status}
        
        case 'reset':
        default :
        return INITIAL_STATE
    }
}
const Form = () => {
    const [state, dispatch] = React.useReducer(reducer, INITIAL_STATE);
    const {name, email, subject, body, status} = state;

    const updateFieldValue = field => event => {
        dispatch({
            type: 'updateFieldValue',
            field,
            value: event.target.value
        })
    } 

    const setStatus = (status) => dispatch({type: 'updateStatus', status});

    const handleSubmit = (event) => {
        event.preventDefault();
        setStatus('PENDING')
        fetch('api/contact', {
            method: 'POST',
            body: JSON.stringify(state)
        })
        .then(res => res.json())
        .then(res => {
            console.log(res, 'ooo');
            setStatus('SUCCESS')
        })
        .catch(error => {
            console.error(error);
            setStatus('ERROR')
        })
    }

    if(status === "SUCCESS") {
        return (
            <p className={styles.success}>
                Message Sent!
                <button
                    type='reset'
                    className={`${styles.button} ${styles.centered}`}
                    onClick={()=> dispatch({type: 'reset'})}> Reset </button>
            </p>
        )
    } 

    return (
        <> 
        {
            status === "ERROR"  &&  
            <p className={styles.error}>
                Something went wrong! Please try again.
            </p>
        }
        <form className={`${styles.form} ${status === 'PENDING' && styles.pending}`} onSubmit={handleSubmit}>
            <label className={styles.label}>
                Name
                <input className={styles.input} type='text' name='name' value={name} onChange={updateFieldValue('name')}/ >
            </label>
            <label className={styles.label}>
                Email
                <input className={styles.input} type='email' name='email' value={email} onChange={updateFieldValue('email')}/ >
            </label>
            <label className={styles.label}>
                Subject
                <input className={styles.input} type='text' name='subject' value={subject} onChange={updateFieldValue('subject')}/ >
            </label>
            <label className={styles.label}>
                Body
                <textarea className={styles.input} name='body' value={body} onChange={updateFieldValue('body')}/ >
            </label>
            <button className={styles.button}>Send</button>
        </form>
        </>
    )
}

export default Form;