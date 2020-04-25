import React, {useState} from 'react';


 export default function Modal(props) {
     const {submitEntity, entity, fields, setShowModal} = props

     const keys = Object.keys
     
     const initForm = keys(fields).reduce((acc, curr) => ({...acc, [curr]: ''}), {})

     const [form, setForm] = useState(initForm)
     return (
         <div>
            {keys(fields).map(f => <div>{f}:<input {...fields[f]} value={form[f]} onChange = {(e) => setForm({...form, [f]: e.target.value})} /></div>)}
            <button onClick={() => {    
                                submitEntity(form)

                                setForm(initForm)
                            }
                            }>Submit</button>
            <button onClick={()=> setShowModal(false)}>Cancel</button>
         </div>
     )
 }