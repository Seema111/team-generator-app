export const validatePlayerInput = (name: string, skill: number) => {
  if (!name || typeof name !== "string" || name.trim() === "") {
    return {
      isValid: false,
      error: "Name is required and must be a non-empty string",
    };
  }
  if (!skill || typeof skill !== "number" || skill < 1 || skill > 5) {
    return {
      isValid: false,
      error: "Skill is required and must be a number between 1 and 5",
    };
  }
  return { isValid: true };
};
