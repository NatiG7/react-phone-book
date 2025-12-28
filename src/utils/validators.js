// Regex for Email: Standard pattern
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Regex for Phone: International friendly (US, UK, IL)
// Allows +, (), -, space, and 7-15 digits
const PHONE_REGEX = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]{7,15}$/;

/**
 * Validates if a string is a proper email.
 * @param {string} email 
 * @returns {boolean}
 */
export const isValidEmail = (email) => {
    if (!email) return false;
    return EMAIL_REGEX.test(email);
};

/**
 * Validates if a string is a valid international phone number.
 * @param {string} phone 
 * @returns {boolean}
 */
export const isValidPhone = (phone) => {
    if (!phone) return false;
    return PHONE_REGEX.test(phone);
};

/**
 * Validates if a name is valid (at least 2 chars).
 * @param {string} name 
 * @returns {boolean}
 */
export const isValidName = (name) => {
    return name && name.trim().length >= 2;
};