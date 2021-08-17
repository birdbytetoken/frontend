export default function validateForm(fieldName, value, val2) {
    const errors = {
        error: false
    }

    const nullableFields = { referrerId: true }
    if (nullableFields[fieldName]) {
        return errors
    }

    // create custom checks
    const passwordError = fieldName === 'password' && value.length < 5
    const cpasswordError = fieldName === 'cpassword' && value != val2

    if (!value?.toString().trim()) {
        errors[fieldName] = 'is required!!'
        errors.error = true
        return errors
    } else {    
        if (fieldName === 'email') {
            if (!/\S+@\S+\.\S+/.test(value)) {
                errors.email = 'is invalid'
            } else if (!value.includes('@gmail.com') && !value.includes('@yahoo.com') && !value.includes('@outlook.com') && !value.includes('@hotmail.com')) {
                errors.email = 'must be gmail, yahoo, outlook or hotmail account'
            } else {}
            return errors
        }

        if (passwordError) {
            errors.password = 'can not be less than 5 characters'
            errors.error = true
            return errors
        }

        if (cpasswordError) {
            errors.cpassword = 'passwords mismatch'
            errors.error = true
            return errors
        }

        errors[fieldName] = ''
    }

    return errors
}
