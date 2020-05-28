
import React, {useEffect, useRef, useState} from 'react'




export const useOutsideAlerter = (ref, setClickedOutside) => {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
        console.log('here is ref current', ref.current)
        if (ref.current && !ref.current.contains(event.target)) {
          setClickedOutside(true)
        } 
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        console.log('unbinding')
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
}



