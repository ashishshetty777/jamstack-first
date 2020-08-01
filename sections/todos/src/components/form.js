import React, { useState } from 'react';
import axios from 'axios';
import styles from './form.module.css';

const Form = ({reloadTodos}) => {
    const [text, setText] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        if(text.trim() === '') return;

        await axios.post('/api/create-todo', { text });

        setText('');
        reloadTodos();
    }
    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <label className={styles.label}>
                Add a TODO
                <input 
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className={styles.input}
                />
            </label>
            <button className={styles.button}> Save TODO</button>
        </form>
    )
}

export default Form;