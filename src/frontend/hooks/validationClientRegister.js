export const validationClientRegister = (nome, email, celular, cpf, senha, setErrorMessage) => {

  if (!nome || !email || !celular || !cpf || !senha) {
    setErrorMessage('Todos os campos devem ser preenchidos.');
    return false;
  }
  if (nome.length >= 30) {
    setErrorMessage('Nome de usuário muito grande.');
    return false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    setErrorMessage('E-mail inválido.');
    return false;
  }

  if (celular.length < 10 || celular.length > 15) {
    setErrorMessage('Celular deve ter entre 10 e 15 dígitos.');
    return false;
  }

  const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
  if (!cpfRegex.test(cpf)) {
    setErrorMessage('CPF inválido. Use o formato XXX.XXX.XXX-XX.');
    return false;
  }

  if (senha.length < 6) {
    setErrorMessage('A senha deve ter pelo menos 6 caracteres.');
    return false;
  }

  setErrorMessage('');
  return true;
};
