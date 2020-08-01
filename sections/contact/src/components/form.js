import React from 'react';
import styles from './form.module.css';

const INITIAL_STATE = {
    name: '',
    email: '',
    subject: '',
    body: ''
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'updateFieldValue' :
            return { ...state, [action.field] : action.value}

        default :
        return INITIAL_STATE
    }
}
const Form = () => {
    const [state, dispatch] = React.useReducer(reducer, INITIAL_STATE);

    const updateFieldValue = field => event => {
        dispatch({
            type: 'updateFieldValue',
            field,
            value: event.target.value
        })
    } 

    const {name, email, subject, body} = state;
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(state)
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
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
    )
}

export default Form;