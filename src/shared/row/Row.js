import React, {useState} from 'react'
import Input from '../input/Input'
import Button from '../button/Button'
import {useClickedOutside} from '../utils/hooks'

const Row = ({ value }) => {

    const [isMutable, setIsMutable] = useState(false)
    
    const ref = useClickedOutside(() => setIsMutable(false))

    return isMutable ? (
        <div ref = {ref}>
            <Input value = {value} />
        </div>
    ) : (
        <div onClick = {() => setIsMutable(true)}>{value}</div> 
    )
}

export default Row;