// chileData.ts

export interface ChileData {
    [region: string]: {
        [province: string]: string[];
    };
}

export const chileData: ChileData = {
    // "Región de Arica y Parinacota": {
    //     "Arica": ["Arica", "Camarones"],
    //     "Parinacota": ["Putre", "General Lagos"]
    // },
    // "Región de Tarapacá": {
    //     "Iquique": ["Iquique", "Alto Hospicio"],
    //     "Tamarugal": ["Pozo Almonte", "Pica", "Huara", "Camiña", "Colchane"]
    // },
    // "Región de Antofagasta": {
    //     "Antofagasta": ["Antofagasta", "Mejillones", "Sierra Gorda", "Taltal"],
    //     "El Loa": ["Calama", "Ollagüe", "San Pedro de Atacama"],
    //     "Tocopilla": ["Tocopilla", "María Elena"]
    // },
    "Región de Coquimbo": {
        "Elqui": ["La Serena", "Coquimbo", "Andacollo", "La Higuera", "Paiguano", "Vicuña"],
        "Limarí": ["Ovalle", "Combarbalá", "Monte Patria", "Punitaqui", "Río Hurtado"],
        "Choapa": ["Illapel", "Canela", "Los Vilos", "Salamanca"]
    // },
    // "Región de Valparaíso": {
    //     "Valparaíso": ["Valparaíso", "Viña del Mar", "Concón", "Quintero", "Puchuncaví"],
    //     "San Antonio": ["San Antonio", "Cartagena", "El Tabo", "El Quisco", "Algarrobo"],
    //     "Quillota": ["Quillota", "La Calera", "Hijuelas", "La Cruz", "Nogales"],
    //     "Marga Marga": ["Quilpué", "Villa Alemana", "Limache", "Olmué"],
    //     "Petorca": ["La Ligua", "Cabildo", "Papudo", "Petorca", "Zapallar"],
    //     "San Felipe de Aconcagua": ["San Felipe", "Llaillay", "Putaendo", "Santa María", "Catemu", "Panquehue"],
    //     "Los Andes": ["Los Andes", "San Esteban", "Calle Larga", "Rinconada"]
    }
    // Agrega las demás regiones con sus respectivas provincias y comunas
};
