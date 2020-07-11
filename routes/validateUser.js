const validator = require('validator')

module.exports = validateUser = (req, res, next) => {
  console.log("req.body", req.body)
  const data = req.body
  let errors = {};

//  data.name = typeof data.name === 'string' && data.name.trim().length === 0 ? '' : data.name;
  
  if(data.Email) {
    if(!validator.isLength(data.Email, {min: 5, max: 20})) {
      errors.Email = 'Email must be 10 characters'
    }
    if(!validator.isEmail(data.Email)) {
      errors.Email = 'Email must be in "xxx@xxx.xx" format'
    }    
  } else {errors.Email = 'Email field is required.'}
  
  if(data.Passwd) {
    if(!validator.isLength(data.Passwd, {min: 6, max: 20})) {
      errors.Passwd = 'Password must be between 6 and 20 characters'
    }
    if(!validator.isAlphanumeric(data.Passwd)) {
      errors.Passwd = 'Password must contain only latin characters'
    }    
  } else {errors.Passwd = 'Password field is required.'}
  
  if(data.Role) {
    if(data.Role !== "admin" && data.Role !== "super_admin") {
      errors.Role = 'Role field must be "admin" or "super_admin"'
    }     
  } else {errors.Role = 'Role field is required.'}
    
  if(data.First_Name) {
    if(!validator.isLength(data.First_Name, {min: 3, max: 20})) {
      errors.First_Name = 'First Name must be between 3 and 20 characters'
    }
    if(!validator.isAlpha(data.First_Name)) {
      errors.First_Name = 'First Name must contain only latin characters'
    }    
  } else {errors.First_Name = 'First Name field is required.'}
  
  if(data.Last_Name) {
    if(!validator.isLength(data.Last_Name, {min: 3, max: 20})) {
      errors.Last_Name = 'Last Name must be between 3 and 20 characters'
    }
    if(!validator.isAlpha(data.Last_Name)) {
      errors.Last_Name = 'Last Name must contain only latin characters'
    }    
  } else {errors.lName = 'Last Name field is required.'}
  
  if(data.Status) {
    if(data.Status !== "active" && data.Status !== "blocked") {
      errors.Status = 'Status field must be "active" or "blocked"'
    }     
  } else {errors.Status = 'Status field is required.'}
    
  if (Object.keys(errors).length > 0){
    console.log("Error User", errors)
    res.status(400).json(errors)
    return
  }
  
  console.log("Data is valid")
  next()
  
}