import React from 'react'
import './Button.scss'       

const Button = (props) => {

    return <button {...props} onClick = {!props.disabled ? props.onClick : undefined} className='button'></button>
}

export default Button;          