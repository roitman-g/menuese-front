import React from 'react'

const Card = ({image, title, description, children}) => {

    return (
        <div>
            <img alt={title} src={image}></img>
            <h3>{title}</h3>
            <p>{description}</p>
            {children}
        </div>
    )
}

export default Card;