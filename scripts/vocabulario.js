// EL VOCABULARIO DE LA BIBLIOTECA (29-09-2026).
//
// Santiago: "separemos por categoría en la lista de palabras repetidas. Una
// categoría es organizaciones, otra puede ser evento, y así (...) por ejemplo
// la noticia es un PDI muerto, acá se puede adjuntar la imagen que representa
// a la ofi más una imagen que represente la muerte".
//
// Eso es lo que decide la forma de esta lista. No es un diccionario de
// frecuencias: es un inventario de PIEZAS QUE SE COMBINAN. Por eso va por
// categorías, y por eso una noticia típica toca una de cada dos o tres:
// una organización, un hecho, a veces un objeto. "PDI" mas "muerte" es
// organización mas hecho, y son dos dibujos, no uno.
//
// Cada entrada trae sus variantes porque el guion habla en prosa: "la PDI",
// "la Policía de Investigaciones" y "detectives" son el mismo dibujo. Las
// variantes se comparan sobre el texto SIN TILDES y en minúsculas, así que se
// escriben sin tildes acá.
//
// Se cuenta UNA VEZ POR PÁRRAFO, no por aparición: lo que importa es en
// cuántos párrafos se podría poner ese dibujo, no cuántas veces se dice la
// palabra.

const CATEGORIAS = [
  {
    clave: "organizaciones",
    titulo: "Organizaciones e instituciones",
    // qué son: el QUIÉN institucional de la noticia. Casi siempre hay una.
    // Son las que más se repiten y las más fáciles de dibujar, porque tienen
    // un objeto propio (un atril, una placa, una balanza).
    terminos: [
      ["gobierno", ["gobierno", "la moneda", "el ejecutivo", "ministerio", "ministra", "ministro", "subsecretar"]],
      ["congreso", ["congreso", "senado", "camara de diputados", "senador", "diputad", "parlament"]],
      ["tribunales", ["tribunal", "corte suprema", "corte de apelaciones", "juzgado", "poder judicial", "magistrad"]],
      ["fiscalia", ["fiscalia", "ministerio publico", "fiscal nacional", "fiscal regional"]],
      ["contraloria", ["contraloria", "contralor"]],
      ["carabineros", ["carabineros", "carabinero", "general director"]],
      ["pdi", ["pdi", "policia de investigaciones", "detectives"]],
      ["municipio", ["municipalidad", "municipio", "alcaldia", "alcalde", "alcaldesa", "concejo municipal"]],
      ["gobierno regional", ["gobierno regional", "gobernador", "delegado presidencial", "consejo regional", "core "]],
      ["empresa", ["empresa", "compania", "holding", "sociedad anonima", "firma "]],
      ["banco central", ["banco central", "banco estado", "banco "]],
      ["universidad", ["universidad", "casa de estudios", "rector"]],
      ["colegio", ["colegio", "escuela", "liceo", "establecimiento educacional", "jardin infantil"]],
      ["hospital", ["hospital", "cesfam", "consultorio", "servicio de salud", "posta"]],
      ["servicio publico", ["superintendencia", "senapred", "servel", "sernac", "sii ", "aduana", "tesoreria", "registro civil", "direccion del trabajo", "seremi", "onemi"]],
      ["sindicato", ["sindicato", "gremio", "colegio de profesores", "central unitaria", "asociacion de funcionarios"]],
      ["partido", ["partido", "republicanos", "renovacion nacional", "udi", "frente amplio", "democracia cristiana", "oficialismo", "oposicion"]],
      ["organismo internacional", ["naciones unidas", "onu", "ocde", "fmi", "banco mundial", "union europea", "mercosur", "corte internacional"]],
      ["medios", ["prensa", "periodista", "medio de comunicacion", "radio ", "television"]],
    ],
  },
  {
    clave: "hechos",
    titulo: "Hechos y eventos",
    // el QUÉ PASÓ. Es la categoría que hace posible el juego que quiere
    // Santiago: la organización sola no es noticia, lo que la vuelve noticia
    // es el hecho que le ocurre.
    terminos: [
      ["anuncio", ["anuncio", "anuncia", "anunciaron", "presento un proyecto", "dio a conocer", "informo que"]],
      ["investigacion", ["investigacion", "investiga", "indaga", "sumario", "peritaje", "auditoria"]],
      ["denuncia", ["denuncia", "denuncio", "querella", "reclamo formal"]],
      ["acusacion", ["acusacion", "acuso", "imputa", "cargos contra", "formaliz"]],
      ["detencion", ["detencion", "detenido", "detuvieron", "arresto", "prision preventiva", "capturad"]],
      ["juicio", ["juicio", "condena", "sentencia", "fallo ", "absolucion", "veredicto"]],
      ["renuncia", ["renuncia", "renuncio", "dejo el cargo", "salida del gabinete", "destitu"]],
      ["nombramiento", ["nombramiento", "designo", "asumio el cargo", "nuevo ministro", "nueva ministra"]],
      ["acuerdo", ["acuerdo", "convenio", "pacto", "firmaron", "entendimiento"]],
      ["votacion", ["votacion", "voto", "aprobo", "rechazo el proyecto", "quorum", "escrutinio"]],
      ["eleccion", ["eleccion", "elecciones", "candidat", "campana electoral", "primarias"]],
      ["protesta", ["protesta", "manifestacion", "marcha ", "paro ", "huelga", "movilizacion"]],
      ["accidente", ["accidente", "choque", "colision", "volcamiento", "atropello"]],
      ["incendio", ["incendio", "fuego", "llamas", "quemad", "siniestro"]],
      ["temporal", ["temporal", "lluvia", "sistema frontal", "nevazon", "viento", "marejada", "inundacion", "aluvion"]],
      ["sismo", ["sismo", "terremoto", "temblor", "magnitud richter", "escala de mercalli"]],
      ["robo", ["robo", "hurto", "asalto", "portonazo", "encerrona", "saqueo"]],
      ["balacera", ["balacera", "disparo", "tiroteo", "herido a bala", "arma de fuego"]],
      ["homicidio", ["homicidio", "asesinato", "muerte", "murio", "fallecio", "fallecid", "cadaver", "femicidio"]],
      ["secuestro", ["secuestro", "secuestrad", "privacion de libertad"]],
      ["incautacion", ["incautacion", "incauto", "decomiso", "allanamiento", "operativo policial"]],
      ["rescate", ["rescate", "rescatad", "evacuacion", "evacuad", "socorro", "busqueda de"]],
      ["inauguracion", ["inauguracion", "inauguro", "puso en marcha", "entrega de obras"]],
      ["reunion", ["reunion", "cumbre", "encuentro bilateral", "audiencia", "sesion "]],
      ["viaje", ["viaje", "gira", "visita oficial", "aterrizo", "delegacion"]],
      ["fiscalizacion", ["fiscalizacion", "fiscalizo", "control ", "inspeccion", "sumario sanitario"]],
    ],
  },
  {
    clave: "dinero",
    titulo: "Dinero y economía",
    terminos: [
      ["dinero publico", ["dinero publico", "recursos publicos", "presupuesto", "erario", "fondos publicos", "gasto fiscal"]],
      ["sueldo", ["sueldo", "salario", "remuneracion", "ingreso minimo"]],
      ["impuesto", ["impuesto", "tributar", "iva ", "contribuciones", "recaudacion"]],
      ["deuda", ["deuda", "moroso", "credito impago", "cae ", "endeudamiento"]],
      ["inversion", ["inversion", "invertir", "capital ", "cartera de proyectos"]],
      ["subsidio", ["subsidio", "bono ", "beneficio estatal", "ayuda estatal", "transferencia directa"]],
      ["precio", ["precio", "alza ", "encarec", "costo ", "tarifa", "valor del"]],
      ["inflacion", ["inflacion", "ipc", "costo de la vida", "canasta basica"]],
      ["dolar", ["dolar", "tipo de cambio", "divisa", "moneda extranjera"]],
      ["exportacion", ["exportacion", "exporta", "embarque", "comercio exterior", "importacion"]],
      ["empleo", ["empleo", "desempleo", "cesantia", "puestos de trabajo", "contratacion", "despido"]],
      ["pension", ["pension", "jubilacion", "afp", "cotizacion previsional"]],
      ["multa", ["multa", "sancion economica", "reparo", "indemnizacion"]],
      ["corrupcion", ["corrupcion", "fraude", "malversacion", "cohecho", "soborno", "coima"]],
    ],
  },
  {
    clave: "territorio",
    titulo: "Territorio y lugares",
    terminos: [
      ["region", ["region", "regional", "regiones"]],
      ["comuna", ["comuna", "localidad", "poblado", "sector de"]],
      ["ciudad", ["ciudad", "urbano", "centro de la ciudad"]],
      ["barrio", ["barrio", "poblacion ", "villa ", "vecindario", "junta de vecinos"]],
      ["carretera", ["carretera", "ruta ", "camino", "autopista"]],
      ["frontera", ["frontera", "paso fronterizo", "limite con", "control migratorio"]],
      ["cordillera", ["cordillera", "montana", "volcan", "nieve", "andes"]],
      ["mar", ["mar ", "costa", "puerto", "caleta", "maritimo", "oceano"]],
      ["rio", ["rio ", "lago", "embalse", "cuenca", "napas"]],
      ["campo", ["agricola", "agricultura", "cultivo", "cosecha", "ganader", "rural"]],
      ["desierto", ["desierto", "atacama", "salar", "norte grande"]],
    ],
  },
  {
    clave: "cosas",
    titulo: "Objetos e infraestructura",
    terminos: [
      ["transporte", ["transporte", "metro ", "tren", "bus ", "micro ", "locomocion"]],
      ["auto", ["automovil", "vehiculo", "auto ", "camioneta", "camion", "conductor"]],
      ["avion", ["avion", "aerea", "aeropuerto", "vuelo"]],
      ["vivienda", ["vivienda", "casa", "departamento", "hogar", "campamento", "arriendo"]],
      ["obra", ["obra ", "construccion", "edificacion", "faena", "licitacion"]],
      ["energia", ["energia", "electricidad", "suministro electrico", "apagon", "generacion electrica"]],
      ["agua", ["agua ", "sanitari", "alcantarillado", "sequia", "potable"]],
      ["tecnologia", ["tecnologia", "inteligencia artificial", "plataforma digital", "software", "internet", "aplicacion movil"]],
      ["documento", ["documento", "informe", "oficio", "acta", "expediente", "titulo profesional"]],
      ["ley", ["ley ", "proyecto de ley", "reforma", "normativa", "reglamento", "decreto"]],
      ["contrato", ["contrato", "contratacion de", "convenio marco", "trato directo"]],
      ["arma", ["arma ", "armamento", "municion", "pistola", "fusil"]],
      ["droga", ["droga", "marihuana", "cocaina", "ketamina", "narcotrafico"]],
      ["salud", ["salud", "enfermedad", "virus", "vacuna", "licencia medica", "tratamiento medico"]],
      ["educacion", ["educacion", "matricula", "gratuidad", "prueba de acceso", "curriculum escolar"]],
    ],
  },
  {
    clave: "tiempo",
    titulo: "Tiempo, medida y proceso",
    // la más abstracta y la que menos se ha pensado: son los dibujos que
    // sirven cuando el párrafo no habla de una cosa sino de un proceso
    terminos: [
      ["plazo", ["plazo", "fecha limite", "vence ", "hasta el proximo", "cronograma"]],
      ["espera", ["espera", "demora", "retraso", "lista de espera", "pendiente desde"]],
      ["aumento", ["aumento", "incremento", "subio", "creci", "al alza"]],
      ["caida", ["caida", "baja ", "disminucion", "reduccion", "recorte", "descenso"]],
      ["comparacion", ["en comparacion", "respecto de", "frente a", "mas que el", "menos que el"]],
      ["etapa", ["etapa", "tramite", "proceso ", "en curso", "primera fase"]],
    ],
  },
];

module.exports = { CATEGORIAS };
