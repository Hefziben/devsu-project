export const addYearsToDate = (dateString: string, yearsToAdd = 1): string => {
  const currentDate = new Date(dateString);
  currentDate.setFullYear(currentDate.getFullYear() + yearsToAdd);
  return currentDate.toISOString().split('T')[0];
};

export const getCurrentDate = (): string => {
  return new Date().toISOString().split('T')[0];
};
