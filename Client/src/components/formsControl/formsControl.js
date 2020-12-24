import React from 'react'
import s from './FormsControl.module.scss'

export const Input = ({ input, meta, ...props }) => {
  return (
    <div className={meta.touched && meta.error ? s.inputError : ' '}>
      <input {...input} {...props} />
      {meta.touched && meta.error && <div>{meta.error}</div>}
    </div>
  )
}

export const Email = ({ input, meta, ...props }) => {
  return (
    <div className={meta.touched && meta.error ? s.inputError : ' '}>
      <input {...input} {...props} />
      {meta.touched && meta.error && <div>{meta.error}</div>}
    </div>
  )
}

export const Radio = ({ input, type, meta, ...props }) => {
  return (
    <label className={meta.touched && meta.error ? s.inputError : ' '}>
      <input {...input} type={type} />
      {meta.touched && meta.error && <div>{meta.error}</div>}
    </label>
  )
}
