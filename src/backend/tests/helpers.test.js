import { roleToModel, modelToRole } from "../helpers/RoleModelMapper";
import "dotenv/config";
import Cliente from "../models/cliente";
import Hotel from "../models/hotel";
import Admin from "../models/admin";

describe("Testa o helper de mapeamento de papeis e models", () => {
    test("Testar mapeamento de papel para model", () => {
        expect(roleToModel("CLIENTE") === Cliente).toBe(true);
        expect(roleToModel("HOTEL") === Hotel).toBe(true);
        expect(roleToModel("ADMIN") === Admin).toBe(true);
    });

    test("Testar mapeamento de model para papel", () => {
        expect(modelToRole(new Cliente) === "CLIENTE").toBe(true);
        expect(modelToRole(new Hotel) === "HOTEL").toBe(true);
        expect(modelToRole(new Admin) === "ADMIN").toBe(true);
    });
})