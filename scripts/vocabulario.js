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
// Cada entrada es [nombre, variantes, motivo, materia].
//
// Las VARIANTES existen porque el guion habla en prosa: "la PDI", "la Policía
// de Investigaciones" y "detectives" son el mismo dibujo. Se comparan sobre el
// texto SIN TILDES y en minúsculas, así que se escriben sin tildes acá.
//
// El MOTIVO es la única frase que cambia entre un prompt y otro: el resto del
// prompt lo pone el estilo.
//
// LO PRIMERO QUE SE LE VIENE A LA CABEZA A UNO, Y NO LO SEGUNDO (29-09-2026).
// Santiago, mirando el atril: "por qué pides ese púlpito para gobierno?
// Estamos sin límites, si digo gobierno, qué es lo primero que se viene a la
// cabeza?". Tenía razón y la culpa era de un atajo mío: la regla 29 prohíbe lo
// reconocible, lo primero que se le viene a la cabeza a un chileno es La
// Moneda, y en vez de decirlo me fui al objeto vecino que sí podía pedir. El
// atril no es lo que uno piensa cuando oye "gobierno": es lo que yo podía
// dibujar sin problemas.
//
// La regla sigue siendo la misma, pero se aplica al revés: primero lo que uno
// piensa, y después la versión genérica de eso, salvo que se pueda nombrar.
//
// Y SI SE PUEDE NOMBRAR, SE NOMBRA Y PUNTO (29-09-2026, tarde). El motivo de
// gobierno llegó a tener seis líneas describiendo la fachada de La Moneda:
// plana, con almohadillado, con los frontones alternados, con balaustrada. Se
// probó contra la versión corta y salió PEOR. El generador conoce La Moneda;
// describírsela por partes le tapa lo que ya sabe y termina armando un palacio
// genérico con esas piezas.
//
// Entonces: para una cosa real con nombre, el motivo la nombra y se calla. La
// descripción larga sirve para lo inventado, no para lo que existe.
//
// Y LO QUE FALTABA NO ERA UNA PALABRA SINO UN ORDEN (29-09-2026, noche): para
// una cosa real, primero la IDENTIDAD y después el estilo. El bloque del estilo
// Grabado lo dice ahora con la frase que lo resume: la referencia manda sobre
// el estilo, el estilo solo cambia cómo se dibuja y nunca qué se dibuja. Eso
// vale para cualquier cosa identificable, no solo para un edificio: un
// monumento, un vehículo, un animal.
//
// CONGRESO ERA LA EXCEPCIÓN QUE SOBRABA (29-09-2026, noche). Su motivo decía
// "un hemiciclo", a secas, y era el único de los conceptos con cosa real que
// no la nombraba. Quedó así de antes y no lo revisé cuando se arregló
// gobierno. Genérico sale a la primera, pero dibuja una sala que no es la
// nuestra, y el canal habla de ESTE Congreso. Santiago eligió nombrarlo.
//
// Se asume el costo: nombrar puede traer el problema de La Moneda, que son
// muchos intentos hasta que la arquitectura sale. Lo que NO se hace es lo que
// ya se probó y falló: describir la sala para ayudar. No se puede verificar
// desde acá contra una foto y, aunque se pudiera, describir es justamente lo
// que tapa lo que el generador ya sabe.
//
// Y ya no hay un solo objeto: el estilo sin fondo permite escena, color,
// volumen y luz, así que el motivo puede pedir lo que de verdad se ve.
//
// Y EL EDIFICIO SE PROBÓ DOS VECES Y SE DESCARTÓ (29-09-2026, esa misma noche).
// Yo mismo había propuesto el edificio, y estaba mal por una razón que ignoré:
// La Moneda la reconoce cualquiera y el edificio de la Fiscalía no lo reconoce
// nadie. Le pedíamos al generador una precisión cara que, aunque la acertara, no
// rendía nada. Y no la acertó: el real está en Catedral 1437 y lo distinguen el
// cristal serigrafiado de la fachada principal, la fachada sur doble con jardín
// colgante en los dos últimos pisos y el diálogo con la Iglesia Santa Ana. Las
// dos vueltas devolvieron un edificio institucional moderno cualquiera, con el
// mismo atrio de vidrio y el mismo emblema sin verificar.
//
// La carpeta CERRADA es lo que distingue fiscalía de investigación, y la
// diferencia es semántica antes que visual: investigación tiene las carpetas
// ABIERTAS bajo una lámpara, o sea todavía buscando; fiscalía la tiene cerrada,
// o sea el caso armado. Además no necesita verificar nada, que es lo que hizo
// caer al edificio.
//
// FISCALIA ES UN SUJETO QUE ACTÚA, NO UNA BODEGA (29-09-2026, primer motivo
// escrito con el conteo por delante en vez de por detrás). El motivo eran cajas
// de evidencia selladas. Corriendo scripts/frases-concepto.js salieron 61
// párrafos y un patrón nítido: "la Fiscalía investiga", "la Fiscalía atribuye",
// "la Fiscalía calificó", "la Fiscalía deberá determinar", "el Ministerio
// Público investiga". Casi siempre es un sujeto que actúa.
//
// Las cajas son el RESIDUO de un caso y no el acto: dicen bodega. Y encima
// chocaban con investigación, que ya es carpetas y papeles bajo una lámpara. El
// conteo lo confirmó por donde no se veía a simple vista: los verbos de los dos
// conceptos son los mismos.
//
// Cuando una institución es el sujeto de la frase, su edificio es la manera de
// nombrarla sin afirmar nada del caso. Se distingue de investigación (un
// escritorio) y de tribunales (una sala) por ser un exterior, que además es el
// segundo de la biblioteca después de La Moneda.
//
// UN CONCEPTO SE DIBUJA CONTRA SUS PÁRRAFOS, NO CONTRA SU PALABRA (29-09-2026,
// pregunta de Santiago: "anuncio se va a usar para cualquier tipo de anuncio?").
// El motivo era una sala de prensa con alguien hablando, y al revisar contra qué
// párrafos se activa de verdad salieron estos: "Canadá anunció aranceles de
// represalia", "una feria laboral en Atacama anunció más de seiscientas
// vacantes", "el Ministerio de Minería anunció que trabaja en acelerar
// permisos". Ninguno es una conferencia de prensa. La feria laboral no dio
// ninguna, y ponerle un hombre en un atril AFIRMA UN HECHO QUE NO OCURRIÓ, que
// es lo mismo que la regla 29 evita por el lado de la cara, ahora por el lado de
// la escena.
//
// Entonces el motivo es el objeto y no el evento: el racimo de micrófonos dice
// "esto se dijo en público" y sirve igual para un arancel, una feria y un
// ministerio. La sala de prensa con la figura quedó en anuncio-b.png, para
// cuando la noticia SÍ es una conferencia.
//
// El megáfono, que fue la otra idea, se descartó por lo mismo al revés: lee
// protesta, y "el Ministerio de Minería anunció" con un megáfono insinúa
// movilización donde hubo un comunicado. Cambiaba un error por otro más cargado.
//
// LA FIGURA ENTRA SOLO DONDE LA PERSONA ES EL HECHO (29-09-2026, idea de
// Santiago). La regla 29 siempre permitió "una figura anónima de espaldas y sin
// rasgos", y hasta hoy no se había usado: los seis dibujos de la biblioteca son
// lugares desocupados. Anuncio es el primero que la usa, porque un anuncio es
// alguien hablando y una sala de prensa vacía es otra cosa, un mueble.
//
// El límite se puso ANTES de usarla, no después: no entra para llenar un lugar
// que se ve vacío ni para dar escala, y no se hereda por parecido. El riesgo es
// de acumulación, no de imagen: una figura de espaldas es defendible una vez, y
// treinta llenan el canal de personas generadas, que es lo que la 29 evita.
//
// Y se pide de espaldas, NUNCA como silueta: el entintado lleva cada píxel a su
// luminancia por la tinta, así que una forma oscura queda oscura y sobre el
// video casi negro desaparece. La cara no se ve porque miramos la espalda, no
// porque haya contraluz.
//
// La MATERIA es para los fondos, y es otra cosa que el motivo, no un resumen
// de él. Santiago: "los fondos que no tengan motivos, que sean con texturas".
// Un fondo con el objeto dibujado compite con el texto que va encima y además
// repite lo que el icono ya dice. Entonces el fondo no pide el objeto: pide la
// SUPERFICIE donde ese objeto vive. Gobierno no es un palacio, es la piedra de
// su fachada. Temporal no es la calle inundada, es el agua bajando por un
// vidrio. Se reconoce sin dibujar nada, que es lo que uno quiere detrás de un
// párrafo.
//
// Los conceptos sin materia todavía caen a una textura abstracta: el fondo
// sale igual, solo que sin vínculo con el tema.
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
      ["gobierno", ["gobierno", "la moneda", "el ejecutivo", "ministerio", "ministra", "ministro", "subsecretar"],
        "el Palacio de La Moneda visto de frente desde la Plaza de la Constitución, al caer la tarde, con la explanada empedrada delante",
        "piedra clara de fachada pulida, con la veta del bloque y la junta fina entre los sillares"],
      ["congreso", ["congreso", "senado", "camara de diputados", "senador", "diputad", "parlament"],
        "la Sala de la Cámara de Diputados del Congreso Nacional de Chile, en Valparaíso, vista desde la tribuna alta, con los escaños vacíos",
        "terciopelo de tapiz de escaño, con el tejido a la vista y el desgaste del respaldo"],
      ["tribunales", ["tribunal", "corte suprema", "corte de apelaciones", "juzgado", "poder judicial", "magistrad"],
        "una sala de audiencias vacía vista desde el estrado: el mesón alto del juez, la baranda de madera y las bancas alineadas atrás",
        "madera oscura encerada de mobiliario de tribunal, con la veta abierta y el brillo del uso"],
      ["fiscalia", ["fiscalia", "ministerio publico", "fiscal nacional", "fiscal regional"],
        "una carpeta de investigación gruesa, cerrada y atada con elásticos, sobre un mesón vacío",
        "cinta plástica de sitio del suceso repetida en diagonal, arrugada y sin texto legible"],
      ["contraloria", ["contraloria", "contralor"],
        "una lupa apoyada sobre una columna de cifras alineadas"],
      ["carabineros", ["carabineros", "carabinero", "general director"],
        "una gorra de plato vista de perfil, sin insignia"],
      ["pdi", ["pdi", "policia de investigaciones", "detectives"],
        "una placa ovalada colgando de una cadena corta"],
      ["municipio", ["municipalidad", "municipio", "alcaldia", "alcalde", "alcaldesa", "concejo municipal"],
        "un edificio bajo de tres arcos con un reloj sobre la puerta"],
      ["gobierno regional", ["gobierno regional", "gobernador", "delegado presidencial", "consejo regional", "core "],
        "un mapa alargado dividido en franjas horizontales, con una franja destacada"],
      ["empresa", ["empresa", "compania", "holding", "sociedad anonima", "firma "],
        "tres torres de oficinas de distinto alto, alineadas en una misma base"],
      ["banco central", ["banco central", "banco estado", "banco "],
        "una fachada con cuatro columnas y un frontón triangular"],
      ["universidad", ["universidad", "casa de estudios", "rector"],
        "un birrete visto en tres cuartos, con la borla caída"],
      ["colegio", ["colegio", "escuela", "liceo", "establecimiento educacional", "jardin infantil"],
        "un pupitre con una silla y un libro abierto encima"],
      ["hospital", ["hospital", "cesfam", "consultorio", "servicio de salud", "posta"],
        "una cruz gruesa dentro de un círculo, con una línea de pulso cruzándola"],
      ["servicio publico", ["superintendencia", "senapred", "servel", "sernac", "sii ", "aduana", "tesoreria", "registro civil", "direccion del trabajo", "seremi", "onemi"],
        "un mesón de atención con una ventanilla y un timbre encima"],
      ["sindicato", ["sindicato", "gremio", "colegio de profesores", "central unitaria", "asociacion de funcionarios"],
        "tres figuras de bastón tomadas del hombro, vistas de espalda"],
      ["partido", ["partido", "republicanos", "renovacion nacional", "udi", "frente amplio", "democracia cristiana", "oficialismo", "oposicion"],
        "dos banderines triangulares en astas cruzadas"],
      ["organismo internacional", ["naciones unidas", "onu", "ocde", "fmi", "banco mundial", "union europea", "mercosur", "corte internacional"],
        "un globo terráqueo con dos ramas de laurel abiertas a los lados"],
      ["medios", ["prensa", "periodista", "medio de comunicacion", "radio ", "television"],
        "un micrófono de mano con un cable enroscado que cae"],
    ],
  },
  {
    clave: "hechos",
    titulo: "Hechos y eventos",
    // el QUÉ PASÓ. Es la categoría que hace posible el juego que quiere
    // Santiago: la organización sola no es noticia, lo que la vuelve noticia
    // es el hecho que le ocurre.
    terminos: [
      ["anuncio", ["anuncio", "anuncia", "anunciaron", "presento un proyecto", "dio a conocer", "informo que"],
        "varios micrófonos de distintos canales apiñados sobre un atril, vistos de cerca y de frente, sin nadie detrás",
        "tela acústica de panel de sala de prensa, en retícula fina y parejo"],
      ["investigacion", ["investigacion", "investiga", "indaga", "sumario", "peritaje", "auditoria"],
        "un escritorio de noche visto desde arriba, con carpetas abiertas y desordenadas, papeles subrayados, una lupa apoyada encima y el cono de luz de una lámpara cayendo sobre ellos",
        "papel de expediente envejecido, con marcas de dobleces, subrayados que se transparentan y el óvalo borroso de un timbre"],
      ["denuncia", ["denuncia", "denuncio", "querella", "reclamo formal"],
        "una mano levantando un papel doblado por una esquina"],
      ["acusacion", ["acusacion", "acuso", "imputa", "cargos contra", "formaliz"],
        "un dedo índice apuntando desde el borde hacia el centro, con tres líneas de énfasis"],
      ["detencion", ["detencion", "detenido", "detuvieron", "arresto", "prision preventiva", "capturad"],
        "un par de esposas abiertas, una argolla sobre la otra"],
      ["juicio", ["juicio", "condena", "sentencia", "fallo ", "absolucion", "veredicto"],
        "un mazo de juez apoyado sobre su taco redondo"],
      ["renuncia", ["renuncia", "renuncio", "dejo el cargo", "salida del gabinete", "destitu"],
        "una silla de oficina vacía, girada hacia un costado"],
      ["nombramiento", ["nombramiento", "designo", "asumio el cargo", "nuevo ministro", "nueva ministra"],
        "una cinta cortada con una tijera, los dos extremos cayendo"],
      ["acuerdo", ["acuerdo", "convenio", "pacto", "firmaron", "entendimiento"],
        "dos manos estrechándose, vistas de perfil y sin brazos"],
      ["votacion", ["votacion", "voto", "aprobo", "rechazo el proyecto", "quorum", "escrutinio"],
        "una urna con una ranura y una papeleta entrando"],
      ["eleccion", ["eleccion", "elecciones", "candidat", "campana electoral", "primarias"],
        "una papeleta doblada con una cruz marcada en un recuadro"],
      ["protesta", ["protesta", "manifestacion", "marcha ", "paro ", "huelga", "movilizacion"],
        "tres carteles en palo, de distinto alto, vistos desde abajo"],
      ["accidente", ["accidente", "choque", "colision", "volcamiento", "atropello"],
        "un triángulo de emergencia parado sobre el asfalto, con la línea del camino detrás"],
      ["incendio", ["incendio", "fuego", "llamas", "quemad", "siniestro"],
        "tres lenguas de fuego saliendo de una línea de base quebrada"],
      ["temporal", ["temporal", "lluvia", "sistema frontal", "nevazon", "viento", "marejada", "inundacion", "aluvion"],
        "una calle anegada al anochecer, con el agua cubriendo media rueda de los autos detenidos y la lluvia rayando la luz de los focos",
        "agua de lluvia corriendo sobre un vidrio, con las gotas gruesas y los regueros bajando"],
      ["sismo", ["sismo", "terremoto", "temblor", "magnitud richter", "escala de mercalli"],
        "una línea de sismógrafo con un pico alto al centro sobre papel milimetrado"],
      ["robo", ["robo", "hurto", "asalto", "portonazo", "encerrona", "saqueo"],
        "una puerta entreabierta con la chapa forzada y una palanca apoyada"],
      ["balacera", ["balacera", "disparo", "tiroteo", "herido a bala", "arma de fuego"],
        "un vidrio estrellado, con las grietas saliendo de un punto"],
      ["homicidio", ["homicidio", "asesinato", "muerte", "murio", "fallecio", "fallecid", "cadaver", "femicidio"],
        "una silueta de cinta en el suelo, apenas insinuada por su contorno"],
      ["secuestro", ["secuestro", "secuestrad", "privacion de libertad"],
        "una cuerda anudada que cruza el cuadro en diagonal"],
      ["incautacion", ["incautacion", "incauto", "decomiso", "allanamiento", "operativo policial"],
        "tres bultos apilados con una cinta de precinto cruzada"],
      ["rescate", ["rescate", "rescatad", "evacuacion", "evacuad", "socorro", "busqueda de"],
        "un arnés con mosquetón colgando de una cuerda tensa"],
      ["inauguracion", ["inauguracion", "inauguro", "puso en marcha", "entrega de obras"],
        "una cinta con un lazo tendida entre dos postes"],
      ["reunion", ["reunion", "cumbre", "encuentro bilateral", "audiencia", "sesion "],
        "una mesa ovalada vista desde arriba con seis sillas alrededor"],
      ["viaje", ["viaje", "gira", "visita oficial", "aterrizo", "delegacion"],
        "una maleta rígida de cantos redondeados con un asa arriba"],
      ["fiscalizacion", ["fiscalizacion", "fiscalizo", "control ", "inspeccion", "sumario sanitario"],
        "una tabla con pinza y una lista de casillas, dos marcadas"],
    ],
  },
  {
    clave: "dinero",
    titulo: "Dinero y economía",
    terminos: [
      ["dinero publico", ["dinero publico", "recursos publicos", "presupuesto", "erario", "fondos publicos", "gasto fiscal"],
        "tres pilas de monedas de distinto alto sobre una misma línea de base"],
      ["sueldo", ["sueldo", "salario", "remuneracion", "ingreso minimo"],
        "un sobre abierto con un fajo de billetes asomando"],
      ["impuesto", ["impuesto", "tributar", "iva ", "contribuciones", "recaudacion"],
        "un papel con una tabla de dos columnas y un porcentaje grande"],
      ["deuda", ["deuda", "moroso", "credito impago", "cae ", "endeudamiento"],
        "una cadena de tres eslabones, el del medio estirado"],
      ["inversion", ["inversion", "invertir", "capital ", "cartera de proyectos"],
        "una flecha ascendente apoyada en tres barras crecientes"],
      ["subsidio", ["subsidio", "bono ", "beneficio estatal", "ayuda estatal", "transferencia directa"],
        "una mano abierta recibiendo una moneda que cae"],
      ["precio", ["precio", "alza ", "encarec", "costo ", "tarifa", "valor del"],
        "una etiqueta colgante con un hilo y un círculo vacío"],
      ["inflacion", ["inflacion", "ipc", "costo de la vida", "canasta basica"],
        "un globo inflado atado a una piedra"],
      ["dolar", ["dolar", "tipo de cambio", "divisa", "moneda extranjera"],
        "una moneda de canto sobre una línea quebrada ascendente"],
      ["exportacion", ["exportacion", "exporta", "embarque", "comercio exterior", "importacion"],
        "un contenedor rectangular con puertas y una grúa sobre él"],
      ["empleo", ["empleo", "desempleo", "cesantia", "puestos de trabajo", "contratacion", "despido"],
        "una fila larga de personas de espaldas esperando frente a una puerta cerrada, vistas desde atrás y sin rasgos",
        "cartón corrugado de carpeta de currículum, gastado en los cantos y con la onda a la vista"],
      ["pension", ["pension", "jubilacion", "afp", "cotizacion previsional"],
        "un reloj de arena con la arena casi toda abajo"],
      ["multa", ["multa", "sancion economica", "reparo", "indemnizacion"],
        "una boleta perforada con un sello circular encima"],
      ["corrupcion", ["corrupcion", "fraude", "malversacion", "cohecho", "soborno", "coima"],
        "un maletín entreabierto con un sobre asomando"],
    ],
  },
  {
    clave: "territorio",
    titulo: "Territorio y lugares",
    terminos: [
      ["region", ["region", "regional", "regiones"],
        "una vista aérea de un valle con un pueblo chico, su plaza, el camino de tierra que lo cruza y los cerros cerrándolo al fondo",
        "curvas de nivel de una carta topográfica, con sus cotas y el trazo de un camino cruzando"],
      ["comuna", ["comuna", "localidad", "poblado", "sector de"],
        "tres casas de distinto alto alineadas sobre una calle"],
      ["ciudad", ["ciudad", "urbano", "centro de la ciudad"],
        "una fila de edificios de distinto alto vistos de frente, sin ventanas"],
      ["barrio", ["barrio", "poblacion ", "villa ", "vecindario", "junta de vecinos"],
        "dos casas bajas con un árbol entre ellas y una reja adelante"],
      ["carretera", ["carretera", "ruta ", "camino", "autopista"],
        "una ruta en perspectiva que se angosta hacia el horizonte, con línea discontinua"],
      ["frontera", ["frontera", "paso fronterizo", "limite con", "control migratorio"],
        "una barrera a rayas levantada con un poste a cada lado"],
      ["cordillera", ["cordillera", "montana", "volcan", "nieve", "andes"],
        "tres cumbres de distinto alto con nieve insinuada en la más alta"],
      ["mar", ["mar ", "costa", "puerto", "caleta", "maritimo", "oceano"],
        "tres olas superpuestas con una boya asomando"],
      ["rio", ["rio ", "lago", "embalse", "cuenca", "napas"],
        "un cauce que serpentea hacia el horizonte entre dos riberas"],
      ["campo", ["agricola", "agricultura", "cultivo", "cosecha", "ganader", "rural"],
        "cuatro surcos paralelos que se angostan, con una espiga adelante"],
      ["desierto", ["desierto", "atacama", "salar", "norte grande"],
        "tres dunas superpuestas con una línea de horizonte alta"],
    ],
  },
  {
    clave: "cosas",
    titulo: "Objetos e infraestructura",
    terminos: [
      ["transporte", ["transporte", "metro ", "tren", "bus ", "micro ", "locomocion"],
        "un vagón visto de frente sobre dos rieles que se alejan"],
      ["auto", ["automovil", "vehiculo", "auto ", "camioneta", "camion", "conductor"],
        "un automóvil de perfil, contorno simple y ruedas grandes"],
      ["avion", ["avion", "aerea", "aeropuerto", "vuelo"],
        "un avión visto desde abajo con dos estelas cortas detrás"],
      ["vivienda", ["vivienda", "casa", "departamento", "hogar", "campamento", "arriendo"],
        "una casa de dos aguas con una llave grande apoyada en la puerta"],
      ["obra", ["obra ", "construccion", "edificacion", "faena", "licitacion"],
        "una grúa torre vista de perfil con un bloque colgando"],
      ["energia", ["energia", "electricidad", "suministro electrico", "apagon", "generacion electrica"],
        "un poste de alta tensión con tres líneas cruzando el cuadro"],
      ["agua", ["agua ", "sanitari", "alcantarillado", "sequia", "potable"],
        "una llave de paso con una gota cayendo"],
      ["tecnologia", ["tecnologia", "inteligencia artificial", "plataforma digital", "software", "internet", "aplicacion movil"],
        "una placa de circuito con tres pistas saliendo hacia los bordes"],
      ["documento", ["documento", "informe", "oficio", "acta", "expediente", "titulo profesional"],
        "una hoja con dobleces y tres líneas de texto insinuadas"],
      ["ley", ["ley ", "proyecto de ley", "reforma", "normativa", "reglamento", "decreto"],
        "un tomo grueso de código legal abierto sobre un atril de lectura, las hojas finas separadas por una cinta, y detrás un estante lleno de tomos iguales",
        "papel biblia de código legal, con columnas de texto fuera de foco y la numeración al margen"],
      ["contrato", ["contrato", "contratacion de", "convenio marco", "trato directo"],
        "un papel con una firma trazada y un lápiz cruzado encima"],
      ["arma", ["arma ", "armamento", "municion", "pistola", "fusil"],
        "un casquillo de bala de pie sobre su base"],
      ["droga", ["droga", "marihuana", "cocaina", "ketamina", "narcotrafico"],
        "una bolsa sellada con cierre, vista de frente"],
      ["salud", ["salud", "enfermedad", "virus", "vacuna", "licencia medica", "tratamiento medico"],
        "un estetoscopio formando un lazo abierto"],
      ["educacion", ["educacion", "matricula", "gratuidad", "prueba de acceso", "curriculum escolar"],
        "tres libros apilados con un lápiz apoyado en diagonal"],
    ],
  },
  {
    clave: "tiempo",
    titulo: "Tiempo, medida y proceso",
    // la más abstracta y la que menos se ha pensado: son los dibujos que
    // sirven cuando el párrafo no habla de una cosa sino de un proceso
    terminos: [
      ["plazo", ["plazo", "fecha limite", "vence ", "hasta el proximo", "cronograma"],
        "un calendario de hoja suelta con un día encerrado en círculo"],
      ["espera", ["espera", "demora", "retraso", "lista de espera", "pendiente desde"],
        "una fila de cinco figuras de bastón, una detrás de otra"],
      ["aumento", ["aumento", "incremento", "subio", "creci", "al alza"],
        "una flecha que sube en tres escalones"],
      ["caida", ["caida", "baja ", "disminucion", "reduccion", "recorte", "descenso"],
        "una flecha que baja en tres escalones"],
      ["comparacion", ["en comparacion", "respecto de", "frente a", "mas que el", "menos que el"],
        "dos barras verticales de distinto alto lado a lado, unidas por una llave"],
      ["etapa", ["etapa", "tramite", "proceso ", "en curso", "primera fase"],
        "cuatro círculos unidos por una línea, el segundo relleno"],
    ],
  },
];

module.exports = { CATEGORIAS };
