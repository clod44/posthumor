import * as yup from 'yup';

export const validateData = async (data, schema, options = {
    stripUnknown: true,
    abortEarly: false,
}) => {
    try {
        const validatedData = await schema.validate(data, options);
        return validatedData;
    } catch (error) {
        console.error('Validation failed:', error);
        if (error.inner) {
            error.inner.forEach((err) => {
                const expectedValue = err.path ? schema.fields[err.path]._type : 'N/A';
                console.log(`Expected: ${expectedValue} | Got: ${err.value} - Error: ${err.message}`);
            });
        }
        throw error;
    }
};
