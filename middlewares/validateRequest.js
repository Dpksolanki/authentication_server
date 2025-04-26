
export const validateRequest = (schema) => (req, res, next) => {
    try {
        // Validate the request body against the provided schema
        schema.parse(req.body);
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: 'Validation error',
            errors: error.errors.map((err) => err.message), 
        });
    }
};
  