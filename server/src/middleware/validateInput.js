const validateInput = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);
  if (result.success) {
    req.validatedData = result.data;
    next();
  } else {
    res.status(400).json({ errors: result.error.issues });
  }
};

export default validateInput;
