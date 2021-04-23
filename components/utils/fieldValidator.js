const validator = require('validator')

module.exports.validator = (req, res, next) => {

  const data = req.body
  let errors = {};

  // ================ General validator ===================
  if (data.first_name) {
    if (!validator.isLength(data.first_name, { min: 3, max: 20 })) {
      errors.first_name = 'First Name must be between 3 and 20 characters'
    }
    if (!validator.isAlpha(data.first_name)) {
      errors.first_name = 'First Name must contain only latin characters'
    }
  } else { errors.first_name = 'First Name field is required.' }


  if (data.last_name) {
    if (!validator.isLength(data.last_name, { min: 3, max: 20 })) {
      errors.last_name = 'Last Name must be between 3 and 20 characters'
    }
    if (!validator.isAlpha(data.last_name)) {
      errors.last_name = 'Last Name must contain only latin characters'
    }
  } else { errors.last_name = 'Last Name field is required.' }


  if (data.email) {
    if (!validator.isLength(data.email, { min: 5, max: 20 })) {
      errors.email = 'Email must be 10 characters'
    }
    if (!validator.isEmail(data.email)) {
      errors.email = 'Email must be in "xxx@xxx.xx" format'
    }
  } else { errors.email = 'Email field is required.' }


  if (data.passwd) {
    if (!validator.isLength(data.passwd, { min: 6, max: 20 })) {
      errors.passwd = 'Password must be between 6 and 20 characters'
    }
    if (!validator.isAlphanumeric(data.passwd)) {
      errors.passwd = 'Password must contain only latin characters'
    }
  }



  // ================ Validator only for Conference ===================
  if (data.formName === 'conf') {

    if (data.company) {
      if (!validator.isLength(data.company, { min: 3, max: 20 })) {
        errors.company = 'Company name must be between 3 and 20 characters'
      }
      if (!/^([a-z ""-]){3,20}$/i.test(data.company)) {
        errors.company = 'Company name must contain only latin characters'
      }
    } else { errors.company = 'Company name field is required.' }


    if (data.position) {
      if (!validator.isLength(data.position, { min: 3, max: 20 })) {
        errors.position = 'Position in company must be between 3 and 20 characters'
      }
      if (!/^([a-z ""-]){3,20}$/i.test(data.position)) {
        errors.position = 'Position in company must contain only latin characters'
      }
    } else { errors.position = 'Position in company field is required.' }


    if (data.sex) {
      if (!validator.isLength(data.sex, { min: 4, max: 6 })) {
        errors.sex = 'Sex must be between 4 and 6 characters'
      }
      if (!validator.isAlpha(data.sex)) {
        errors.sex = 'Sex must contain only latin characters'
      }
    } else { errors.sex = 'Sex field is required.' }


    if (data.role) {
      if (!validator.isLength(data.role, { min: 7, max: 8 })) {
        errors.role = 'Role be between 7 and 8 characters'
      }
      if (!validator.isAlpha(data.role)) {
        errors.role = 'Role must contain only latin characters'
      }
    } else { errors.role = 'Role field is required.' }


    if (data.country) {
      if (!validator.isLength(data.country, { min: 3, max: 30 })) {
        errors.country = 'Country be between 3 and 30 characters'
      }
      if (!/^([a-z ""-]){3,20}$/i.test(data.country)) {
        errors.country = 'Country must contain only latin characters'
      }
    } else { errors.country = 'Country field is required.' }


    const dateValidator = (nameDay) => {
      if (!validator.isLength(nameDay, { min: 10, max: 10 })) {
        errors.arrivalDate = `${nameDay} date must be 10 characters`
      }
      if (!validator.isISO8601(nameDay)) {
        errors.arrivalDate = `${nameDay} date must be in "YYYY-MM-DD" format`
      }
    }


    if (data.arrivalDate) { dateValidator(data.arrivalDate) }
    else { errors.arrivalDate = 'Arrival date field is required.' }

    if (data.departureDate) { dateValidator(data.departureDate) }
    else { errors.departureDate = 'Departure date field is required.' }

    if (data.birthdate) { dateValidator(data.birthdate) }
    else { errors.birthdate = 'Birthdate date field is required.' }

  }

  // ================ Validator only for admin panel ===================
  if (data.formName === 'adm') {

    if (data.admin_role) {
      if (data.admin_role !== "admin" && data.admin_role !== "super_admin") {
        errors.admin_role = 'Role field must be "admin" or "super_admin"'
      }
    } else { errors.admin_role = 'Role field is required.' }


    if (data.status) {
      if (data.status !== "active" && data.status !== "blocked") {
        errors.status = 'Status field must be "active" or "blocked"'
      }
    } else { errors.status = 'Status field is required.' }

  }




  if (Object.keys(errors).length > 0) {
    console.log("Error User", errors)
    res.status(400).json(errors)
    return
  }

  next()


}