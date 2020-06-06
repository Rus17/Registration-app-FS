import React from 'react'
import './formsControl.css'

export const Input = ({input, meta, ...props}) => {   
  return (
    <div className={meta.touched && meta.error ? "inputError" : ' '}>
      <input {...input} {...props} />
      {meta.touched && meta.error && <div>{meta.error}</div>}
    </div>
  )
}

export const Email = ({input, meta, ...props}) => {   
  return (
    <div className={meta.touched && meta.error ? "inputError" : ' '}>
      <input {...input} {...props} />
      {meta.touched && meta.error && <div>{meta.error}</div>}
    </div>
  )
}