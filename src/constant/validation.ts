type PhoneDeviceName = 'phone' | 'mobile' | 'fax';

// PATTERN
export const EMAIL_PATTERN = '^\\w+([\\.+-]?\\w+)*@\\w+([\\.+-]?\\w+)*(\\.\\w+)+$';
export const PHONE_PATTERN = '^(\\+1)?\\d{10}$';

// ERROR MSG
export const EMAIL_ERROR_MSG = 'Please input a valid email';
export const PHONE_ERROR_MSG = (deviceName: PhoneDeviceName) => `The ${deviceName} number must be 10 digits!`;

export const DEFAULT_EMAIL_SCHEMA = {
    type: 'string',
    title: 'Email',
    placeholder: 'Email',
    pattern: EMAIL_PATTERN,
    errorMessage: EMAIL_ERROR_MSG,
};

export const DEFAULT_PHONE_SCHEMA = (deviceName: PhoneDeviceName) => ({
    type: 'string',
    placeholder: 'E.g. 2131234567',
    title: `${deviceName[0].toUpperCase() + deviceName.substring(1)} Number`,
    pattern: PHONE_PATTERN,
    widget: 'PhoneNumberField',
    errorMessage: 'Please input +1 (US country code - optional) and 10 digits!',
});
