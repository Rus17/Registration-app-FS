export const required = value => {
   if(value) return undefined
   return "This field is required"
}

export const requiredRadio = value => {
  if(value) return undefined
  return "One of two options is required"
}

export const minInput = value => {
  if (value && value.length < 3) return "This field cannot be less than 3 characters"
  return undefined
}

export const email = value => {    
  if (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    return "Invalid email address"
  }
  return undefined
}

export const alphabetic = value =>
  value && /[^a-zA-Z ]/i.test(value)
    ? 'Alphabetic characters only'
    : undefined