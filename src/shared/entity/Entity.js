import React, {useState} from 'react';
import './Entity.scss'
import Row from '../row/Row'
import Button from '../button/Button'

import { useClickedOutside } from '../utils/hooks'
import { useEffect } from 'react'
import Input from '../input/Input'
const {keys} = Object


 export default function Entity({ data, mutate, initialForm, client }) {

     const Restaurant = {
        name: 'Two Sticks',
        description: 'Just some restarurant',
        address: 'Gainsborough'
      }  
      console.log('here is mutate', mutate)

      console.log('here is the initial form ', initialForm)
     
     const [form, setForm] = useState(initialForm || {})

     const updateForm = (form) => () => {
        const _form = mutate({variables: form})
        setForm(_form)
     }

     console.log('here is the form', form)
    //  console.log('here is hte form', keys(form))


     return (
         <div className={'entity'}>
            {keys(form)
                .map(f => (
                        <div key = {f}>{f}:<Row
                                    value = {form[f]} 
                                    submit = {(e) => updateForm({...form, [f]: e.target.value})}
                                />
                        <br/>
                        </div>
                    )
                    )}
            { 
                <Button onClick={updateForm(form)}>
                    Submit 
                </Button>
            }
            
         </div>
     )
 }
