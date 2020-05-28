import React, { useContext } from 'react'
import Input from '../../input/Input'
import {FormContext} from '../index'
import {useChecker} from './utils'

const Field = ({children, checkers, name, ...props}) => {
    const validate = useChecker(checkers)
    const {useValue, useError, useTouch} = useContext(FormContext)

    const [value, setValue] = useValue(name)
    const [error, setError] = useError(name)
    const [touch, setTouch] = useTouch(name)       

    const handleChange = (v) => {
        validate(v, setError)
        setValue(v)
    }
 
    return (
                <>
                    {children}
                    <Input {...props} 
                        value = {value}
                        onChange = {handleChange}
                        onFocus = {() => setTouch(true)}
                    />
                    {error && touch ? error : ''}
                </>
            )
}

export default Field;
