import {createContext, useState} from 'react'



export const useForm = (initialForm) => {
    const _useValues = useState(initialForm)
    const _useErrors = useState(initialForm)
    const _useTouches = useState(initialForm)

    const useFormApi = ([getter, setter]) => (field ) => [
        field ? getter[field] : getter,
        field ? (value) => setter({...getter, [field]: value}) : setter
    ]

    return {
        useValue: useFormApi(_useValues),
        useError: useFormApi(_useErrors),
        useTouch: useFormApi(_useTouches)
    }
}

export const FormContext = createContext({})