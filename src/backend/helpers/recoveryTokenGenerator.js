export const recoveryTokenGenerator = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const size = 6;
    let token = "";

    for(let i = 0; i < size; i++) token += characters.charAt(Math.floor(Math.random() * characters.length));

    return token;
}