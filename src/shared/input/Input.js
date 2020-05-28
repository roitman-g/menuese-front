import { useState  } from 'react'
import React from 'react'
import './Input.scss'

const Input = ({ value,  onChange, onFocus, onFocusOut }) => {
    
    const [currValue, setCurrValue] = useState(value || '')

    const handleChange = (e) => {
        const {target: {value}} = e
        if (onChange) onChange(value)
        setCurrValue(value)
    } 
    
    return (
        <div className={'input__box'}>
            <label className={'input__label'}></label>
            <input value={currValue} onChange={handleChange} onFocus={onFocus} onFocusOut={onFocusOut} />
        </div>
    )
}

export default Input;