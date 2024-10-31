export const validateFields = (animalProfile, setErrors) => {
  const newErrors = { nome: '', tamanho: '', sexo: '', temperamento: '', raca: '' };
  let isValid = true;

  if (!animalProfile.nome) {
    newErrors.nome = 'Nome é obrigatório.';
    isValid = false;
  }

  if (!animalProfile.tamanho) {
    newErrors.tamanho = 'Tamanho é obrigatório.';
    isValid = false;
  }

  if (!animalProfile.temperamento) {
    newErrors.temperamento = 'Temperamento é obrigatório.';
    isValid = false;
  }

  if (!animalProfile.raca) {
    newErrors.raca = 'Raça é obrigatória.';
    isValid = false;
  }

  setErrors(newErrors);
  return isValid;
};