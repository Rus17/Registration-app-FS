const validator = require('validator')

module.exports = validateParticipant = (req, res, next) => {
  console.log("req.body", req.body)
  const data = req.body
  let errors = {};

//  data.name = typeof data.name === 'string' && data.name.trim().length === 0 ? '' : data.name;
  
  
  if(data.fName) {
    if(!validator.isLength(data.fName, {min: 3, max: 20})) {
      errors.fName = 'First Name must be between 3 and 20 characters'
    }
    if(!validator.isAlpha(data.fName)) {
      errors.fName = 'First Name must contain only latin characters'
    }    
  } else {errors.fName = 'First Name field is required.'}
  
  if(data.lName) {
    if(!validator.isLength(data.lName, {min: 3, max: 20})) {
      errors.lName = 'Last Name must be between 3 and 20 characters'
    }
    if(!validator.isAlpha(data.lName)) {
      errors.lName = 'Last Name must contain only latin characters'
    }    
  } else {errors.lName = 'Last Name field is required.'}
  
  if(data.company) {
    if(!validator.isLength(data.company, {min: 3, max: 20})) {
      errors.company = 'Company name must be between 3 and 20 characters'
    }
    if(!validator.isAlpha(data.company)) {
      errors.company = 'Company name must contain only latin characters'
    }    
  } else {errors.company = 'Company name field is required.'}
  
  if(data.position) {
    if(!validator.isLength(data.position, {min: 3, max: 20})) {
      errors.position = 'Position in company must be between 3 and 20 characters'
    }
    if(!validator.isAlpha(data.position)) {
      errors.position = 'Position in company must contain only latin characters'
    }    
  } else {errors.position = 'Position in company field is required.'}
  
  if(data.sex) {
    if(!validator.isLength(data.sex, {min: 4, max: 6})) {
      errors.sex = 'Sex must be between 4 and 6 characters'
    }
    if(!validator.isAlpha(data.sex)) {
      errors.sex = 'Sex must contain only latin characters'
    }    
  } else {errors.sex = 'Sex field is required.'}
  
  if(data.role) {
    if(!validator.isLength(data.role, {min: 7, max: 8})) {
      errors.role = 'Role be between 7 and 8 characters'
    }
    if(!validator.isAlpha(data.role)) {
      errors.role = 'Role must contain only latin characters'
    }    
  } else {errors.role = 'Role field is required.'}
  
  if(data.country) {
    if(!validator.isLength(data.country, {min: 3, max: 30})) {
      errors.country = 'Country be between 3 and 30 characters'
    }
    if(!validator.isAlpha(data.role)) {
      errors.country = 'Country must contain only latin characters'
    }    
  } else {errors.country = 'Country field is required.'}
  
  if(data.arrivalDate) {
    if(!validator.isLength(data.arrivalDate, {min: 10, max: 10})) {
      errors.arrivalDate = 'Arrival date must be 10 characters'
    }
    if(!validator.isISO8601(data.arrivalDate)) {
      errors.arrivalDate = 'Arrival date must be in "YYYY-MM-DD" format'
    }    
  } else {errors.arrivalDate = 'Arrival date field is required.'}
  
  if(data.departureDate) {
    if(!validator.isLength(data.departureDate, {min: 10, max: 10})) {
      errors.departureDate = 'Departure date must be 10 characters'
    }
    if(!validator.isISO8601(data.departureDate)) {
      errors.departureDate = 'Departure date must be in "YYYY-MM-DD" format'
    }    
  } else {errors.departureDate = 'Departure date field is required.'}
    
  if(data.birthdate) {
    if(!validator.isLength(data.birthdate, {min: 10, max: 10})) {
      errors.birthdate = 'Birthdate must be 10 characters'
    }
    if(!validator.isISO8601(data.birthdate)) {
      errors.birthdate = 'Birthdate must be in "YYYY-MM-DD" format'
    }    
  } else {errors.birthdate = 'Birthdate field is required.'}
  
  if(data.email) {
    if(!validator.isLength(data.email, {min: 5, max: 20})) {
      errors.email = 'Email must be 10 characters'
    }
    if(!validator.isEmail(data.email)) {
      errors.email = 'Email must be in "xxx@xxx.xx" format'
    }    
  } else {errors.email = 'Email field is required.'}

  
  if (Object.keys(errors).length > 0){
    console.log("Error Participant", errors)
    res.status(400).json(errors)
    return
  }
  
  console.log("Data is valid")
//  res.status(200).send("Data is valid")
  next()
  
}