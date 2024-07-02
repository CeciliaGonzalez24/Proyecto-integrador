// chileData.ts

export interface ChileData {
    [region: string]: {
        [province: string]: string[];
    };
}

export const chileData: ChileData = {
   
    "Región de Coquimbo": {
        "Elqui": ["La Serena", "Coquimbo", "Andacollo", "La Higuera", "Paiguano", "Vicuña"],
        "Limarí": ["Ovalle", "Combarbalá", "Monte Patria", "Punitaqui", "Río Hurtado"],
        "Choapa": ["Illapel", "Canela", "Los Vilos", "Salamanca"]
    
    }
    // Agrega las demás regiones con sus respectivas provincias y comunas
};
