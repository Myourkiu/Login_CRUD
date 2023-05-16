import React from 'react'
import InputMask from 'react-input-mask'


const onlyNumbers = (str) => str.replace(/[^0-9]/g,'')

const MaskedInput = ({ value, onChange, placeholder }) => {

  function handleChange(e) {
    onChange({
      ...e,
      target:{
        ...e.target,
        value: onlyNumbers(e.target.value)
      }
    })
  }

  return (<InputMask 
  mask='(99) 99999-9999' 
  value={value} 
  onChange={handleChange}
  placeholder={placeholder}/>)
  
}

export default MaskedInput