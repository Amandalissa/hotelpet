export const handlePress = (option, token, router) => {
  if (option === 'Meu perfil') {
    router.push({
      pathname: "/Clientes/ClientProfile"
    });
  }

  if (option === 'Meus pets') {
    router.push({
      pathname: "/Animais/AnimalsList"
    });
  }

  if (option === 'Suporte') {
    router.push({
      pathname: "/Clientes/Suporte"
    });
  }

}

