export const validateFields = (clientProfile, setErrors) => {
  const newErrors = { nome: '', celular: '', email: '', cpf: '', senha: '' };
  let isValid = true;

  if (!clientProfile.nome) {
    newErrors.nome = 'Nome é obrigatório.';
    isValid = false;
  }

  if (clientProfile.nome.length >= 30) {
    newErrors.nome = 'Nome de usuário muito grande.';
    isValid = false;
  }

  if (!clientProfile.celular) {
    newErrors.celular = 'Celular é obrigatório.';
    isValid = false;
  }

  if (clientProfile.celular.length < 10 || clientProfile.celular.length > 15) {
    newErrors.celular = 'Celular deve ter entre 10 e 15 dígitos.';
    return false;
  }

  const emailRegex = /\S+@\S+\.\S+/;
  if (!clientProfile.email || !emailRegex.test(clientProfile.email)) {
    newErrors.email = 'Email inválido.';
    isValid = false;
  }

  if (!clientProfile.cpf) {
    newErrors.cpf = 'CPF é obrigatório.';
    isValid = false;
  }

  if (clientProfile.cpf.length != 11) {
    newErrors.cpf = 'O CPF deve ter 11 digitios.';
    isValid = false;
  }

  if (!clientProfile.senha) {
    newErrors.senha = 'Senha é obrigatória.';
    isValid = false;
  }

  setErrors(newErrors);
  return isValid;
};
