import React, {useRef, useState, useEffect} from 'react'

export const useSetState = () => {
  const [set, setSet] = useState(new Set())

  const addItem = (item) => setSet(new Set([...set, item]))
  const removeItem = (item) => setSet(new Set([...set].filter(x => x === item)))
  const isEmpty = set.length === 0 

  return {
      addItem,
      removeItem,
      isEmpty,
      set
  }
}

export const useClickedOutside = (onClickedOutside) => {

    const ref = useRef(null);
    
    useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event) {
          if (ref.current && !ref.current.contains(event.target)) {
            onClickedOutside()
          } 
        }
        
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        
        return () => {
          // Unbind the event listener on clean up
          document.removeEventListener("mousedown", handleClickOutside);
        };

      }, [ref, onClickedOutside]);

    return ref
}