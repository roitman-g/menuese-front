import React from 'react'   
import Button from '../button/Button'
import Field from './_field/Field'
import {FormContext, useForm} from './index'
const {values} = Object

const Form = ({ children, initialForm, mutate }) => {
    const { useValue, useError, useTouch } = useForm(initialForm)
    
    const form = useValue()[0]
    const errors = useError()[0]
    
    const handleSubmit = () => {
        mutate({variables: form})
    }

    const submitButtonDisabled = values(errors).reduce((acc, curr) => acc && !curr, true)       

    return (
        <FormContext.Provider value = {{
            useValue,
            useError,
            useTouch
        }}>
             <form className={'form'} onSubmit={handleSubmit}> 
                {children}
                <Button type={'submit'} disabled = {submitButtonDisabled}>Submit</Button>
            </form>         
        </FormContext.Provider>
    )   
} 

Form.Field = Field;

export default Form;