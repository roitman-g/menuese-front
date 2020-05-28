import React from 'react'
import './Modal.scss'
import {useClickedOutside} from '../utils/hooks'

const Modal = ({ showModal, hideModal, children }) => {

    const ref = useClickedOutside(hideModal)

    return showModal && (
        <div className = "modal">
            <div ref = {ref} className = "modal__wrapper">
               {children}
            </div>
        </div>
    ) 
}

export default Modal;
