import Hotel from "./hotel.js";
import Acomodacao from "./acomodacao.js";
import Avaliacao from "./avaliacao.js";
import Admin from "./admin.js";
import Cliente from "./cliente.js";
import RefreshToken from "./refresh_token.js";
import TokenRecuperacao from "./token_recuperacao.js";
import RefreshTokenHotel from "./refresh_token_hotel.js";
import RefreshTokenCliente from "./refresh_token_cliente.js";
import RefreshTokenAdmin from "./refresh_token_admin.js";
import Cachorro from "./cachorro.js";
import Animal from "./animal.js";
import HotelAprovacao from "./hotel_aprovacao.js";
import Endereco from "./endereco.js";
import Gato from "./gato.js";
import Solicitacao from "./solicitacao.js";
import Notificacao from "./notificacao.js";
import Reserva from "./reserva.js";


Hotel.hasOne(TokenRecuperacao, {
    foreignKey: "hotel_id",
    sourceKey: "id",
    as: "token_recuperacao"
});

Hotel.belongsTo(RefreshTokenHotel, {
    foreignKey: "refresh_token_id",
    targetKey: "refresh_token_id",
    as: "refresh_token",
    onDelete: "SET NULL"
});

Admin.hasOne(TokenRecuperacao, {
    foreignKey: "admin_id",
    sourceKey: "id",
    as: "token_recuperacao"
});

Admin.belongsTo(RefreshTokenAdmin, {
    foreignKey: "refresh_token_id",
    targetKey: "refresh_token_id",
    as: "refresh_token",
    onDelete: "SET NULL"
});

Cachorro.belongsTo(Animal, {
    foreignKey: "animal_id",
    targetKey: "id",
    as: "animal"
});

Cliente.hasOne(TokenRecuperacao, {
    foreignKey: "cliente_id",
    sourceKey: "id",
    as: "token_recuperacao"
});

Cliente.belongsTo(RefreshTokenCliente, {
    foreignKey: "refresh_token_id",
    targetKey: "refresh_token_id",
    as: "refresh_token",
    onDelete: "SET NULL"
});

Gato.belongsTo(Animal, {
    foreignKey: "animal_id",
    targetKey: "id",
    as: "animal",
    onDelete: "CASCADE"
});

Notificacao.belongsTo(Hotel, {
    foreignKey: "hotel_id",
    targetKey: "id",
    as: "hotel",
    onDelete: "CASCADE"
});

Notificacao.belongsTo(Cliente, {
    foreignKey: "cliente_id",
    targetKey: "id",
    as: "cliente",
    onDelete: "CASCADE"
});

Notificacao.belongsTo(Admin, {
    foreignKey: "admin_id",
    targetKey: "id",
    as: "admin",
    onDelete: "CASCADE"
});

RefreshTokenAdmin.belongsTo(RefreshToken, {
    foreignKey: "refresh_token_id",
    targetKey: "id",
    as: "refresh_token",
    onDelete: "CASCADE"
});

RefreshTokenCliente.belongsTo(RefreshToken, {
    foreignKey: "refresh_token_id",
    targetKey: "id",
    as: "refresh_token",
    onDelete: "CASCADE"
});

RefreshTokenHotel.belongsTo(RefreshToken, {
    foreignKey: "refresh_token_id",
    targetKey: "id",
    as: "refresh_token",
    onDelete: "CASCADE"
});

TokenRecuperacao.belongsTo(Hotel, {
    foreignKey: "hotel_id",
    targetKey: "id",
    as: "hotel",
    onDelete: "CASCADE"
});

TokenRecuperacao.belongsTo(Cliente, {
    foreignKey: "cliente_id",
    targetKey: "id",
    as: "cliente",
    onDelete: "CASCADE"
});

TokenRecuperacao.belongsTo(Admin, {
    foreignKey: "admin_id",
    targetKey: "id",
    as: "admin",
    onDelete: "CASCADE"
});