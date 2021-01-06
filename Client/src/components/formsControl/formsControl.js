import React from 'react'
import s from './FormsControl.module.scss'

export const Input = ({ input, meta, ...props }) => {
  return (
    <div className={meta.touched && meta.error ? s.inputError : ' '}>
      <input {...input} {...props} />
      <div className={meta.touched && meta.error ? s.visible : s.hidden}>{meta.error}</div>
    </div>
  )
}

export const InputDate = ({ input, meta, ...props }) => {
  return (
    <div className={meta.touched && meta.error ? s.inputErrorDate : ' '}>
      <input {...input} {...props} />
      <div className={meta.touched && meta.error ? s.visible : s.hidden}>{meta.error}</div>
    </div>
  )
}

// export const InputRadio = ({ input, meta, ...props }) => {
//   return (
//     <div className={meta.touched && meta.error ? s.inputErrorDate : ' '}>
//       <input {...input} {...props} />
//       <div className={meta.touched && meta.error ? s.visible : s.hidden}>{meta.error}</div>
//     </div>
//   )
// }

export const Email = ({ input, meta, ...props }) => {
  return (
    <div className={meta.touched && meta.error ? s.inputError : ' '}>
      <input {...input} {...props} />
      <div className={meta.touched && meta.error ? s.visible : s.hidden}>{meta.error}</div>
    </div>
  )
}

export const Radio = ({ input, type, meta, label, ...props }) => {
  // console.log("meta", meta)
  // console.log("props", props)
  return (
    <span className={meta.touched && meta.error ? s.inputErrorRadio : ' '}>
      <input {...input} type={type} />{' '}
      {label}{'  '}
      <span className={meta.touched && meta.error ? s.visible : s.hidden}>{meta.error}</span>
    </span>
  )
}



// import React from 'react'
// import s from './FormsControl.module.scss'

// export const Input = ({ input, meta, ...props }) => {
//   return (
//     <div className={meta.touched && meta.error ? s.inputError : ' '}>
//       <input {...input} {...props} />
//       {meta.touched && meta.error && <div>{meta.error}</div>}
//     </div>
//   )
// }

// export const Email = ({ input, meta, ...props }) => {
//   return (
//     <div className={meta.touched && meta.error ? s.inputError : ' '}>
//       <input {...input} {...props} />
//       {meta.touched && meta.error && <div>{meta.error}</div>}
//     </div>
//   )
// }

// export const Radio = ({ input, type, meta, ...props }) => {
//   return (
//     <label className={meta.touched && meta.error ? s.inputError : ' '}>
//       <input {...input} type={type} />
//       {meta.touched && meta.error && <div>{meta.error}</div>}
//     </label>
//   )
// }
