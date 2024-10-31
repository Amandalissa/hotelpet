import Hotel from "../models/hotel.js";
import { modelToRole } from "./RoleModelMapper.js";

export const accessTokenContentGenerator = (model) => {
    return {
        id: model.id,
        name: model instanceof Hotel ? model.razao_social : model.nome,
        role: modelToRole(model)
    };
}