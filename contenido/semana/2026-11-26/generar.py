#!/usr/bin/env python3
"""Genera los JSON de la semana del 26-11 al 02-12-2026 desde los datos de verificacion.md
(verificados el 19-11-2026). Se deja en el repo porque la semana del 19-11 enseñó que una cifra
corregida a mano en seis archivos se corrige mal: acá se corrige en UN lugar y se regenera.
  python3 -I contenido/semana/2026-11-26/generar.py

Segunda vuelta (19-11-2026, tras la revisión independiente): se sacó todo lo que la voz afirmaba
sin fila en verificacion.md (los plazos sin fuente, el detalle humano del muelle de 1914, la
inversión de los puertos "hace un siglo"), se dejó de decir "contenedores" donde la fuente dice
TEU, se rompió el esqueleto único de los Shorts (los siete eran dato, planteamiento, giro) y se
quitaron la ironía, la primera persona y los juicios sin fuente."""
import json, os, re
D = os.path.dirname(os.path.abspath(__file__))
PIE = ("\n\nVoz sintética generada por computador. Cada cifra lleva su fuente en pantalla."
       "\nEntender Chile: el resumen sin gritos.")

def hablar(t):
    """Misma cuenta que contarPalabrasHabladas del contrato: token con dígito = 3, con % = 2, resto 1."""
    n = 0
    for tok in t.split():
        if re.search(r'\d', tok): n += 3
        elif '%' in tok: n += 2
        elif re.search(r'[^\W\d_]', tok, re.UNICODE): n += 1
    return n

def ref(ind, ent, val, nom, fuente, url, etiqueta, unidad, ex=None):
    r = {"fuente": "manual", "indicador": ind, "paises": ent, "valores": val, "nombres": nom,
         "fuenteTexto": fuente, "fuenteUrl": url, "etiqueta": etiqueta, "unidad": unidad}
    if ex: r["etiquetasX"] = ex
    return r

def cifra(texto, valor, datos, operacion, pais=None, paisB=None, anio=None, tol=0.02):
    c = {"texto": texto, "valor": valor, "calculo": {"datos": datos, "operacion": operacion}, "tolerancia": tol}
    for k, v in (("pais", pais), ("paisB", paisB), ("anio", anio)):
        if v is not None: c["calculo"][k] = v
    return c

def short(fecha, slug, titulo, desc, hashtags, props):
    id_ = f"{fecha}-short-{slug}"
    props["id"] = id_
    voz = [props["gancho"]["texto"]] + [e["texto"] for e in props["escenas"]] + [props["remate"]]
    n = sum(hablar(x) for x in voz)
    env = {"plantilla": "grafico", "id": id_, "titulo": titulo, "descripcion": desc + PIE,
           "hashtags": hashtags, "publicar": f"{fecha}T12:00", "props": props}
    with open(os.path.join(D, f"{id_}.json"), "w") as f:
        json.dump(env, f, ensure_ascii=False, indent=2); f.write("\n")
    marca = "ok" if 110 <= n <= 150 else "FUERA DE RANGO"
    esq = " ".join(e["tipo"][:4] for e in props["escenas"])
    print(f"  {id_}: {n} palabras ({marca}), titulo {len(titulo)} c, esqueleto [{esq}]")

ID_LARGO = "2026-12-02-largo-valparaiso-puerto-principal"
URL_MEMORIA = "https://www.memoriachilena.gob.cl/602/w3-article-639270.html"
URL_BBCL_VAL = "https://www.biobiochile.cl/especial/bbcl-investiga/noticias/reportajes/2026/11/16/valparaiso-de-capa-caida-las-heridas-de-la-joya-del-pacifico.shtml"
URL_EMOL_CAP = "https://www.emol.com/noticias/Economia/2026/01/12/1188235/puerto-san-antonio-limite-capacidad.html"
URL_EMOL_INFORME = "https://www.emol.com/noticias/Economia/2026/07/07/1204891/informe-gremio-portuario-san-antonio.html"
URL_EMOL_GOB = "https://www.emol.com/noticias/Economia/2026/07/08/1205007/puerto-exterior-gobierno-pronuncia.html"
URL_EMOL_MERINO = "https://www.emol.com/noticias/Economia/2026/07/11/1205335/presidente-puerto-san-antonio-debate.html"
URL_COOP_RCA = "https://www.cooperativa.cl/noticias/pais/region-de-valparaiso/megaproyecto-de-expansion-del-puerto-de-san-antonio-logro-aprobacion/2026-05-26/215451.html"
URL_DF_VAL = "https://www.df.cl/opinion/columnistas/valparaiso-y-la-nueva-frontera-minera-del-pacifico"
URL_DF_VAL_AMPL = "https://www.df.cl/empresas/construccion/comite-de-ministros-destraba-expansion-del-puerto-de-valparaiso-tras-12"
URL_BBCL_PARALELO = "https://www.biobiochile.cl/noticias/nacional/region-de-valparaiso/2026/07/31/gore-y-ejecutivo-respaldan-que-expansiones-de-puertos-de-valparaiso-y-san-antonio-avancen-en-paralelo.shtml"

PT_SA = {"texto": "San Antonio", "en": [-71.61, -33.59], "dice": "Antonio"}
PT_VA = {"texto": "Valparaíso", "en": [-71.62, -33.04], "dice": "Valparaíso"}

print("Shorts:")

# ---------- 1. jueves 26-11: Presupuesto 2027, el plazo y qué pasa si se vence ----------
# Se escribe sobre el plazo y el mecanismo, no sobre el resultado: al 19-11-2026 la Cámara había
# rechazado el artículo 3 y el Senado lo había repuesto, así que un guion escrito sobre "lo
# rechazaron" caducaba solo. Esqueleto planteamiento, dato, giro, para no repetir el del resto.
R_DEUDA = ref("presupuesto-2027-endeudamiento", ["DEUDA"], {"DEUDA": [[2027, 25000]]},
              {"DEUDA": "Endeudamiento del artículo 3"},
              "Ley de Presupuestos 2027, artículo 3 (vía Cooperativa, 06-10-2026)",
              "https://www.cooperativa.cl/noticias/economia/presupuesto/presupuesto-oposicion-cuestiono-solicitud-de-endeudamiento-por-25-mil/2026-10-06/080808.html",
              "Deuda que autoriza el artículo 3", "millones de US$")
R_SENADO = ref("senado-repone-articulo-3", ["AFAVOR", "CONTRA"],
               {"AFAVOR": [[2026, 31]], "CONTRA": [[2026, 10]]},
               {"AFAVOR": "A favor de reponer", "CONTRA": "En contra"},
               "Sala del Senado, 18-11-2026 (vía La Tercera)",
               "https://www.latercera.com/nacional/noticia/con-votos-del-pc-ppd-y-dc-quiroz-logra-reponer-articulo-clave-del-presupuesto-2027-que-autoriza-endeudamiento-publico/",
               "Votación en el Senado", "votos")
short("2026-11-26", "presupuesto-plazo-y-endeudamiento",
      "Si el Congreso no despacha el Presupuesto 2027, rige el del Presidente",
      "¿Qué pasa si el Congreso no despacha la Ley de Presupuestos dentro del plazo?\n"
      "El proyecto entró el 30-09-2026 y la Constitución da 60 días: el plazo vence el 29-11-2026. "
      "Si se vence sin despacho, rige la propuesta del Presidente tal como la presentó.\n"
      "Situación al 19-11-2026: la Cámara rechazó siete partidas y el artículo 3, que autoriza al "
      "fisco a endeudarse hasta por US$ 25.000 millones. El 18-11-2026 el Senado repuso ese "
      "artículo por 31 votos contra 10, con apoyo del PC, el PPD y la DC.\n"
      "Fuentes: Cooperativa (06-10-2026), La Tercera (19-11-2026), Diario Financiero (11-2026).",
      ["#presupuesto2027", "#congreso", "#chile"],
      {"gancho": {"texto": "El Congreso tiene plazo hasta el 29 de noviembre para despachar el "
                           "Presupuesto 2027. Si no lo hace, no manda el Congreso: manda el texto que "
                           "mandó el Presidente.",
                  "rotulo": "VENCE EL 29",
                  "cifras": []},
       "visualGancho": {"tipo": "chile", "regiones": ["CL-VS"],
                        "puntos": [{"texto": "Congreso, Valparaíso", "en": [-71.62, -33.04], "dice": "Congreso"}]},
       "grafico": {"tipo": "contador", "titulo": "La deuda del artículo 3", "datos": R_DEUDA,
                   "destacar": {"pais": "DEUDA"}, "formato": {"decimales": 0, "prefijo": "US$ ", "sufijo": " M"}},
       "escenas": [
           {"tipo": "planteamiento",
            "texto": "El proyecto entró el 30 de septiembre y, según Cooperativa, la Constitución da "
                     "sesenta días. Vencido el plazo, el texto del Presidente rige tal como lo presentó, "
                     "sin los cambios que el Congreso quería.",
            "visual": {"tipo": "chile", "regiones": ["CL-VS"],
                       "puntos": [{"texto": "Congreso, Valparaíso", "en": [-71.62, -33.04]}]},
            "fuenteEnVoz": True},
           {"tipo": "dato", "usaGraficoPrincipal": True,
            "texto": "Lo que más se discute es el artículo 3, que deja al fisco endeudarse hasta por "
                     "25.000 millones de dólares. La Cámara lo rechazó y el Senado lo repuso por 31 "
                     "votos contra 10.",
            "cifras": [cifra("25.000 millones de dólares", 25000, R_DEUDA, "valor", pais="DEUDA", anio=2027, tol=0.01),
                       cifra("31 votos", 31, R_SENADO, "valor", pais="AFAVOR", anio=2026, tol=0.01),
                       cifra("10", 10, R_SENADO, "valor", pais="CONTRA", anio=2026, tol=0.01)]},
           {"tipo": "giro",
            "texto": "Y nada se decide de una vez: lo que no se acuerde vuelve a una comisión mixta "
                     "antes del plazo.",
            "rotulo": {"texto": "VA Y VUELVE", "dice": "repone"}},
       ],
       "remate": "El plazo no lo pone el Gobierno ni el Congreso: lo pone la Constitución.",
       "fuentes": [{"texto": "Cooperativa, endeudamiento y plazo del Presupuesto 2027 (06-10-2026)", "url": "https://www.cooperativa.cl/noticias/economia/presupuesto/presupuesto-oposicion-cuestiono-solicitud-de-endeudamiento-por-25-mil/2026-10-06/080808.html"},
                   {"texto": "La Tercera, el Senado repone el artículo 3 (19-11-2026)", "url": "https://www.latercera.com/nacional/noticia/con-votos-del-pc-ppd-y-dc-quiroz-logra-reponer-articulo-clave-del-presupuesto-2027-que-autoriza-endeudamiento-publico/"}]})

# ---------- 2. viernes 27-11: buque Danstar ----------
# La naviera va nombrada (la fuente la nombra) y el gancho no abre con la fecha. El proyecto de ley
# argentino se atribuye a Infobae, que es la fuente que ya tiene la ficha del repo, y no a un medio
# de defensa sin revisar.
R_DANSTAR = ref("danstar-capacidad-2026", ["CARGA"], {"CARGA": [[2026, 1400]]},
                {"CARGA": "Capacidad del Danstar"},
                "Naviera Easter Island, vía Diario Financiero (14-11-2026)",
                "https://www.df.cl/regiones/magallanes/empresas/naviera-easter-island-confirma-el-primer-zarpe-del-buque-danstar-hacia-las",
                "Capacidad del viaje de diciembre", "toneladas")
short("2026-11-27", "danstar-punta-arenas-malvinas",
      "El Danstar reabre la ruta a las Malvinas y Argentina responde",
      "¿Por qué un barco que sale de Punta Arenas termina en una disputa de soberanía ajena?\n"
      "La naviera Easter Island confirmó el zarpe del Danstar para el 17-12-2026 hacia Puerto "
      "Argentino, que los británicos llaman Stanley: es el primer viaje comercial de esa ruta desde "
      "2011, con 1.400 toneladas de capacidad y la mitad ya vendida.\n"
      "Chile dice que no pide autorización e invoca el derecho de paso inocente. En Argentina se "
      "presentó un proyecto para decomisar embarcaciones que abastezcan las islas. Nada de eso está "
      "resuelto.\n"
      "Fuentes: Diario Financiero y La Nación (14-11-2026), BioBioChile e Infobae (16-11-2026), "
      "Infobae (05-11-2026).",
      ["#danstar", "#puntaarenas", "#chile"],
      {"gancho": {"texto": "La naviera Easter Island confirmó que el buque chileno Danstar llevará 1.400 "
                           "toneladas desde Punta Arenas a las islas Malvinas: es la primera ruta "
                           "comercial de ese tramo en quince años.",
                  "rotulo": "PRIMERA EN 15 AÑOS",
                  "cifras": [cifra("1.400 toneladas", 1400, R_DANSTAR, "valor", pais="CARGA", anio=2026, tol=0.01)]},
       "visualGancho": {"tipo": "chile", "regiones": ["CL-MA"],
                        "puntos": [{"texto": "Punta Arenas", "en": [-70.91, -53.16], "dice": "Arenas"}]},
       "grafico": {"tipo": "contador", "titulo": "Lo que puede llevar el Danstar", "datos": R_DANSTAR,
                   "destacar": {"pais": "CARGA"}, "formato": {"decimales": 0, "sufijo": " t"}},
       "escenas": [
           {"tipo": "dato", "usaGraficoPrincipal": True, "fuenteEnVoz": True,
            "texto": "Según el Diario Financiero, la mitad de esas 1.400 toneladas ya está vendida: "
                     "alimentos e insumos para las islas. El zarpe está previsto para el 17 de diciembre.",
            "cifras": [cifra("1.400 toneladas", 1400, R_DANSTAR, "valor", pais="CARGA", anio=2026, tol=0.01)]},
           {"tipo": "planteamiento",
            "texto": "El tramo pasa por aguas que Argentina considera propias, y ahí está el nudo: el "
                     "Estado chileno dice que no corresponde pedir autorización, porque existe el "
                     "derecho de paso inocente.",
            "visual": {"tipo": "mapa", "destacar": ["CHL", "ARG", "FLK"], "zoom": 4,
                       "etiquetas": [{"texto": "Punta Arenas", "en": [-70.91, -53.16]},
                                     {"texto": "Puerto Argentino", "en": [-57.85, -51.69]}],
                       "flechas": [{"desde": "CHL", "hasta": "FLK", "texto": "1.400 t"}],
                       "dice": "tramo"}},
           {"tipo": "giro",
            "texto": "Del otro lado, Infobae informó que en el Congreso argentino se presentó un "
                     "proyecto para decomisar embarcaciones que abastezcan las islas. Chile apoya "
                     "históricamente el reclamo argentino de soberanía y a la vez defiende la libertad "
                     "de navegación.",
            "rotulo": {"texto": "DOS POSICIONES", "dice": "Chile"}},
       ],
       "remate": "El buque todavía no zarpa, y la disputa ya está en curso.",
       "fuentes": [{"texto": "Diario Financiero, zarpe y carga (14-11-2026)", "url": "https://www.df.cl/regiones/magallanes/empresas/naviera-easter-island-confirma-el-primer-zarpe-del-buque-danstar-hacia-las"},
                   {"texto": "La Nación, posición de Chile (14-11-2026)", "url": "https://www.lanacion.com.ar/politica/tension-por-malvinas-despues-de-quince-anos-un-buque-chileno-partira-de-punta-arenas-hacia-las-islas-nid14112026/"}]})

# ---------- 3. sábado 28-11: dos encuestas, un presidente ----------
# El rótulo prometía una comparación que el gráfico de líneas no mostraba: ahora la comparación va
# en una escena con su propio gráfico, y las etiquetas del eje llevan la fecha completa (regla 35).
R_CRITERIA = ref("criteria-aprobacion-kast-2026", ["APRUEBA"],
                 {"APRUEBA": [[0, 27], [1, 27], [2, 18]]},
                 {"APRUEBA": "Aprobación en Criteria"},
                 "Encuesta Criteria (vía Cooperativa, Emol y La Tercera, 10 y 11-2026)",
                 "https://www.latercera.com/politica/noticia/criteria-aprobacion-del-presidente-kast-llega-al-18-y-desaprobacion-se-ubica-en-72/",
                 "Aprobación de Kast en Criteria", "%",
                 {"0": "11-10-2026", "1": "25-10-2026", "2": "15-11-2026"})
R_DOS = ref("aprobacion-kast-noviembre-2026", ["CRITERIA", "CADEM"],
            {"CRITERIA": [[0, 18]], "CADEM": [[0, 27]]},
            {"CRITERIA": "Criteria", "CADEM": "Cadem"},
            "Criteria y Cadem de mediados de noviembre de 2026 (vía La Tercera y Emol)",
            "https://www.emol.com/noticias/Nacional/2026/11/16/1217205/desplome-aprobacion-kast-debate-comitiva.html",
            "Aprobación de Kast, misma semana", "%", {"0": "15-11-2026"})
short("2026-11-28", "dos-encuestas-aprobacion-kast",
      "Criteria le dio 18 % a Kast y Cadem 27 %: por qué no coinciden",
      "¿Cómo dos encuestas de la misma semana le dan al mismo presidente 18 % y 27 % de aprobación?\n"
      "Criteria publicó el 15-11-2026 un 18 % de aprobación y 72 % de desaprobación, su registro más "
      "bajo: panel online de 802 casos, en terreno el 12 y el 13-11-2026. Cadem, en la misma semana, "
      "marcó 27 %, dos puntos menos que en su medición anterior.\n"
      "Son encuestas distintas, con muestras y días distintos: el número de una no se resta con el de "
      "la otra. Lo que sí se compara es cada encuesta consigo misma, y las dos van hacia abajo.\n"
      "Fuentes: La Tercera y Cooperativa (15-11-2026), Emol (16-11-2026 y 25-10-2026), Cooperativa "
      "(11-10-2026).",
      ["#encuestas", "#kast", "#chile"],
      {"gancho": {"texto": "La encuesta Criteria le dio 18 por ciento de aprobación al Presidente Kast, y "
                           "Cadem 27 en la misma semana. Ninguna de las dos está equivocada.",
                  "rotulo": "DOS ENCUESTAS",
                  "cifras": [cifra("18 por ciento", 18, R_DOS, "valor", pais="CRITERIA", anio=0, tol=0.01),
                             cifra("27", 27, R_DOS, "valor", pais="CADEM", anio=0, tol=0.01)]},
       "visualGancho": {"tipo": "chile", "regiones": ["CL-RM"],
                        "puntos": [{"texto": "La Moneda", "en": [-70.65, -33.44], "dice": "Kast"}]},
       "grafico": {"tipo": "lineas", "titulo": "Aprobación de Kast en Criteria", "datos": R_CRITERIA,
                   "destacar": {"pais": "APRUEBA"}, "formato": {"decimales": 0, "sufijo": " %"},
                   "anotaciones": [{"anio": 2, "texto": "15-11-2026", "dice": "cayó"}]},
       "escenas": [
           {"tipo": "planteamiento",
            "texto": "Las dos preguntan a gente distinta, en días distintos y con su propia muestra. "
                     "Restar un número con el otro no dice nada: no es la misma pregunta hecha a las "
                     "mismas personas.",
            "grafico": {"tipo": "comparacion", "titulo": "La misma semana, dos números", "datos": R_DOS,
                        "destacar": {"pais": "CRITERIA", "anio": 0}, "formato": {"decimales": 0, "sufijo": " %"}},
            "cifras": [cifra("18", 18, R_DOS, "valor", pais="CRITERIA", anio=0, tol=0.01),
                       cifra("27", 27, R_DOS, "valor", pais="CADEM", anio=0, tol=0.01)],
            "rotulo": {"texto": "NO SE RESTAN", "dice": "Restar"}},
           {"tipo": "dato", "usaGraficoPrincipal": True, "fuenteEnVoz": True,
            "texto": "Según La Tercera, en Criteria la aprobación venía en 27 por ciento a fines de "
                     "octubre y cayó a 18. Esa medición es un panel online de 802 casos.",
            "cifras": [cifra("27 por ciento", 27, R_CRITERIA, "valor", pais="APRUEBA", anio=1, tol=0.01),
                       cifra("18", 18, R_CRITERIA, "valor", pais="APRUEBA", anio=2, tol=0.01)]},
           {"tipo": "giro",
            "texto": "Lo que sí se puede comparar es cada encuesta con ella misma. Y ahí las dos apuntan "
                     "al mismo lado: en Cadem la aprobación bajó dos puntos en su última medición.",
            "rotulo": {"texto": "MIRA LA PENDIENTE", "dice": "lado"}},
       ],
       "remate": "Una encuesta sola da un número; dos encuestas seguidas dan una dirección.",
       "fuentes": [{"texto": "La Tercera, Criteria del 15-11-2026", "url": "https://www.latercera.com/politica/noticia/criteria-aprobacion-del-presidente-kast-llega-al-18-y-desaprobacion-se-ubica-en-72/"},
                   {"texto": "Emol, la caída en las dos encuestas (16-11-2026)", "url": "https://www.emol.com/noticias/Nacional/2026/11/16/1217205/desplome-aprobacion-kast-debate-comitiva.html"}]})

# ---------- 4. domingo 29-11: centros de datos y electricidad ----------
# El título atribuye la proyección al Coordinador en vez de afirmar "pasarán", y la voz redondea a
# "unos 1.200" (regla 38b). Se sacó "una central se construye en dos o tres años": era una cifra de
# plazo sin fila, puesta justo donde verificacion.md había excluido otra por venir de una columna.
# Cuatro escenas, para que no todos los Shorts de la semana tengan tres.
R_MW = ref("centros-datos-demanda-mw", ["DEMANDA"], {"DEMANDA": [[2025, 325], [2030, 1207]]},
           {"DEMANDA": "Centros de datos"},
           "Coordinador Eléctrico Nacional (vía Emol, 12-02-2026)",
           "https://www.emol.com/noticias/Economia/2026/02/12/1191254/data-centers-chile.html",
           "Electricidad que piden los centros de datos", "MW")
R_RECHAZO = ref("centros-datos-conexiones-rechazadas", ["PEDIDO", "JAHUEL"],
                {"PEDIDO": [[2026, 1420]], "JAHUEL": [[2025, 200]]},
                {"PEDIDO": "Seis conexiones sin cupo", "JAHUEL": "Alto Jahuel"},
                "Coordinador Eléctrico Nacional (vía La Tercera)",
                "https://www.latercera.com/pulso/noticia/transmision-electrica-en-aprietos-seis-data-center-no-pueden-construirse-en-chile-porque-no-pueden-conectarse-a-la-energia/",
                "Solicitudes sin capacidad", "MW")
short("2026-11-29", "centros-de-datos-electricidad",
      "El Coordinador proyecta 1.207 MW para los centros de datos en 2030",
      "¿Alcanza la red eléctrica chilena para los centros de datos que vienen?\n"
      "El Coordinador Eléctrico Nacional proyecta que lo que piden los centros de datos sube de 325 "
      "MW en 2025 a 1.207 MW en 2030, un alza cercana al 270 %.\n"
      "El cuello de botella no es generar: seis solicitudes de conexión que suman 1.420 MW "
      "recibieron respuesta desfavorable del Coordinador por falta de capacidad en las "
      "subestaciones. Una de ellas pedía 200 MW en Alto Jahuel, al sur de Santiago, y quedó fuera en "
      "2025.\n"
      "Aviso sobre la cifra: Emol publica esos 325 y 1.207 como demanda en MW y La Tercera los "
      "describe como capacidad instalada. Acá se citan como los publica Emol, atribuidos al "
      "Coordinador.\n"
      "Fuentes: Emol (12-02-2026) y La Tercera, con datos del Coordinador Eléctrico Nacional.",
      ["#centrosdedatos", "#electricidad", "#chile"],
      {"gancho": {"texto": "El Coordinador Eléctrico proyecta que los centros de datos de Chile van a "
                           "pedir unos 1.200 megavatios en 2030, casi cuatro veces lo de hoy. El "
                           "problema no es producir esa electricidad.",
                  "rotulo": "CUATRO VECES MÁS",
                  "cifras": [cifra("unos 1.200 megavatios", 1207, R_MW, "valor", pais="DEMANDA", anio=2030, tol=0.01)]},
       "visualGancho": {"tipo": "chile", "regiones": ["CL-RM"],
                        "puntos": [{"texto": "Santiago", "en": [-70.65, -33.44], "dice": "Chile"},
                                   {"texto": "Alto Jahuel", "en": [-70.70, -33.72], "dice": "megavatios"}]},
       "grafico": {"tipo": "barras", "titulo": "Lo que piden los centros de datos", "datos": R_MW,
                   "destacar": {"pais": "DEMANDA", "anio": 2030}, "formato": {"decimales": 0, "sufijo": " MW"}},
       "escenas": [
           {"tipo": "dato", "usaGraficoPrincipal": True, "fuenteEnVoz": True,
            "texto": "La proyección es del Coordinador Eléctrico Nacional: de 325 megavatios este año a "
                     "1.207 en 2030.",
            "cifras": [cifra("325 megavatios", 325, R_MW, "valor", pais="DEMANDA", anio=2025, tol=0.01),
                       cifra("1.207", 1207, R_MW, "valor", pais="DEMANDA", anio=2030, tol=0.01)]},
           {"tipo": "planteamiento",
            "texto": "Pero la electricidad no es lo que falta. Seis solicitudes de conexión que suman "
                     "1.420 megavatios recibieron respuesta desfavorable, porque las subestaciones "
                     "donde querían enchufarse no tienen cupo.",
            "visual": {"tipo": "iconos", "titulo": "Dónde se corta",
                       "items": [{"icono": "⚡", "texto": "Generación: alcanza", "marca": "si", "dice": "electricidad"},
                                 {"icono": "🔌", "texto": "Subestaciones: no", "marca": "no", "dice": "subestaciones"}]},
            "cifras": [cifra("1.420 megavatios", 1420, R_RECHAZO, "valor", pais="PEDIDO", anio=2026, tol=0.01)]},
           {"tipo": "planteamiento",
            "texto": "Un caso: en 2025 rechazó una solicitud de 200 megavatios en Alto Jahuel, al sur de "
                     "Santiago.",
            "visual": {"tipo": "chile", "regiones": ["CL-RM"],
                       "puntos": [{"texto": "Alto Jahuel", "en": [-70.70, -33.72]}]},
            "cifras": [cifra("200 megavatios", 200, R_RECHAZO, "valor", pais="JAHUEL", anio=2025, tol=0.01)]},
           {"tipo": "giro",
            "texto": "Y ahí está el problema de fondo: tender una línea de transmisión necesita permisos, "
                     "terrenos y obra. No se resuelve anunciando inversión.",
            "rotulo": {"texto": "FALTA TRANSMISIÓN", "dice": "transmisión"}},
       ],
       "remate": "La electricidad ya existe; lo que falta son los cables para llevarla.",
       "fuentes": [{"texto": "Emol, proyección del Coordinador Eléctrico (12-02-2026)", "url": "https://www.emol.com/noticias/Economia/2026/02/12/1191254/data-centers-chile.html"},
                   {"texto": "La Tercera, seis centros de datos que no pueden conectarse", "url": "https://www.latercera.com/pulso/noticia/transmision-electrica-en-aprietos-seis-data-center-no-pueden-construirse-en-chile-porque-no-pueden-conectarse-a-la-energia/"}]})

# ---------- 5. lunes 30-11: dilema con votación (experimento B, uno por semana) ----------
# Sin "te doy los datos": la regla 18 prohíbe fingir calidez. Los votos bajo diez van en palabras
# (regla 42). De la votación en la Cámara se dice solo el 133 a favor, porque las fuentes se
# contradicen en el reparto de los otros tres votos.
R_VOTO = ref("senado-glosa-apuestas-2026", ["MANTENER", "BORRAR"],
             {"MANTENER": [[2026, 15]], "BORRAR": [[2026, 8]]},
             {"MANTENER": "Mantener la glosa", "BORRAR": "Borrarla"},
             "Sala del Senado, 19-11-2026 (vía The Clinic)",
             "https://www.theclinic.cl/2026/11/19/presupuestos-2027-senadores-rechazan-indicacion-de-hacienda-y-apoyan-propuesta-de-diputados-udi-para-impedir-cobro-de-impuestos-a-las-casas-de-apuestas-en-linea/",
             "Votación en el Senado", "votos")
R_IVA = ref("sii-iva-apuestas-octubre-2026", ["IVA"], {"IVA": [[2026, 100]]},
            {"IVA": "IVA proyectado"},
            "Servicio de Impuestos Internos (vía Cooperativa, 08-09-2026)",
            "https://www.cooperativa.cl/noticias/pais/juegos-de-azar/sii-defendio-cobro-a-apuestas-online-y-proyecto-recaudacion-inicial-de/2026-09-08/155153.html",
            "Lo que el SII proyectó cobrar", "millones de US$")
short("2026-11-30", "dilema-impuesto-apuestas-en-linea",
      "El SII proyectó cobrar US$ 100 millones a las apuestas: ¿lo cobrarías?",
      "¿Debe el Estado cobrarle impuestos a plataformas de apuestas que ninguna ley autoriza?\n"
      "El Servicio de Impuestos Internos habilitó en 2026 un registro de IVA digital: 39 plataformas "
      "extranjeras inscritas y una recaudación proyectada sobre US$ 100 millones.\n"
      "La Cámara aprobó con 133 votos a favor una glosa que impide al SII destinar recursos a ese "
      "mecanismo, y el 19-11-2026 el Senado rechazó por 15 votos contra 8 la indicación del Gobierno "
      "que quería borrarla. El ministro de Hacienda hizo reserva de constitucionalidad.\n"
      "Es una glosa del Presupuesto, no una ley que regule las apuestas.\n"
      "Cuéntanos en los comentarios: ¿le cobras o no le cobras?\n"
      "Fuentes: Cooperativa (08-09-2026), La Tercera (11-11-2026), The Clinic (19-11-2026).",
      ["#apuestas", "#impuestos", "#chile"],
      {"gancho": {"texto": "El Servicio de Impuestos Internos proyectó cobrarle más de 100 millones de "
                           "dólares a las apuestas en línea, y el Congreso votó para que no pueda gastar "
                           "en cobrarlos. Acá están las dos posiciones.",
                  "rotulo": "¿LE COBRAS O NO?",
                  "cifras": [cifra("100 millones de dólares", 100, R_IVA, "valor", pais="IVA", anio=2026, tol=0.01)]},
       "visualGancho": {"tipo": "chile", "regiones": ["CL-VS"],
                        "puntos": [{"texto": "Congreso, Valparaíso", "en": [-71.62, -33.04], "dice": "Congreso"}]},
       "grafico": {"tipo": "barras", "titulo": "El Senado dejó la glosa en pie", "datos": R_VOTO,
                   "destacar": {"pais": "MANTENER"}, "formato": {"decimales": 0}},
       "escenas": [
           {"tipo": "dato", "usaGraficoPrincipal": True, "fuenteEnVoz": True,
            "texto": "Según Cooperativa, hay 39 plataformas extranjeras inscritas para pagar IVA "
                     "digital. El Senado dejó en pie la glosa que se lo impide, por 15 votos contra ocho.",
            "cifras": [cifra("15 votos", 15, R_VOTO, "valor", pais="MANTENER", anio=2026, tol=0.01),
                       cifra("ocho", 8, R_VOTO, "valor", pais="BORRAR", anio=2026, tol=0.01)]},
           {"tipo": "planteamiento",
            "texto": "A favor de cobrar: son ventas reales y el Estado no tiene por qué regalar el "
                     "impuesto. En contra: cobrarle a una plataforma que ninguna ley autoriza se parece "
                     "a aceptarla.",
            "visual": {"tipo": "iconos", "titulo": "Las dos posiciones",
                       "items": [{"icono": "💰", "texto": "Son ventas reales", "marca": "si", "dice": "favor"},
                                 {"icono": "⚖️", "texto": "Ninguna ley la autoriza", "marca": "no", "dice": "contra"}],
                       "dice": "favor"}},
           {"tipo": "giro",
            "texto": "Y un detalle: esto es una glosa del Presupuesto, no una ley que regule las "
                     "apuestas, y el ministro de Hacienda hizo reserva de constitucionalidad. ¿Tú le "
                     "cobras o no?",
            "rotulo": {"texto": "NO ES LA LEY", "dice": "glosa"}},
       ],
       "remate": "Cobrar el impuesto no autoriza el negocio, y no cobrarlo tampoco lo prohíbe.",
       "fuentes": [{"texto": "Cooperativa, el SII y el IVA a las apuestas (08-09-2026)", "url": "https://www.cooperativa.cl/noticias/pais/juegos-de-azar/sii-defendio-cobro-a-apuestas-online-y-proyecto-recaudacion-inicial-de/2026-09-08/155153.html"},
                   {"texto": "The Clinic, el Senado mantiene la glosa (19-11-2026)", "url": "https://www.theclinic.cl/2026/11/19/presupuestos-2027-senadores-rechazan-indicacion-de-hacienda-y-apoyan-propuesta-de-diputados-udi-para-impedir-cobro-de-impuestos-a-las-casas-de-apuestas-en-linea/"}]})

# ---------- 6. martes 01-12: recorte nativo del largo ----------
# Tres cambios de la revisión: se dice TEU y no "contenedores" (un contenedor de 40 pies son dos
# TEU, así que la cifra de la voz no era la de la fuente); se sacó "una década" y "toma diez", que
# eran plazos sin fila, y en su lugar va la aritmética de lo verificado (aprobación en 2026, primera
# etapa en 2036); y el gancho dejó de ser gemelo del tráiler: acá entra por el margen que queda.
R_SA_CAP = ref("san-antonio-capacidad-2025", ["MOVIDO", "TECHO"],
               {"MOVIDO": [[2025, 2.06]], "TECHO": [[2025, 2.65]]},
               {"MOVIDO": "Lo que movió en 2025", "TECHO": "Su capacidad máxima"},
               "Puerto San Antonio y Emol (12-01-2026)", URL_EMOL_CAP,
               "Contenedores de San Antonio", "millones de TEU")
R_VAL_CARGA = ref("valparaiso-carga-2025", ["CARGA", "ALZA"],
                  {"CARGA": [[2025, 9.4]], "ALZA": [[2025, 11.5]]},
                  {"CARGA": "Carga general 2025", "ALZA": "Alza sobre 2024"},
                  "Puerto Valparaíso, vía Diario Financiero (2026)", URL_DF_VAL,
                  "Carga general de Valparaíso", "millones de t")
R_EXTERIOR = ref("puerto-exterior-reparto", ["TOTAL", "ESTADO", "PRIVADOS"],
                 {"TOTAL": [[2026, 4450]], "ESTADO": [[2026, 1950]], "PRIVADOS": [[2026, 2500]]},
                 {"TOTAL": "Inversión total", "ESTADO": "Pone el Estado", "PRIVADOS": "Ponen privados"},
                 "Puerto Exterior de San Antonio, vía Emol (07-07-2026)", URL_EMOL_INFORME,
                 "Quién paga el Puerto Exterior", "millones de US$")
R_FECHAS = ref("puerto-exterior-fechas", ["PLAN", "ESTUDIO"],
               {"PLAN": [[2026, 2036]], "ESTUDIO": [[2026, 2045]]},
               {"PLAN": "Primera etapa prevista", "ESTUDIO": "Lo que dice el estudio"},
               "Emol, informe de Port Consultants Rotterdam para Camport (07-07-2026)", URL_EMOL_INFORME,
               "Cuándo haría falta el muelle nuevo", "año")
C_MOVIDO = cifra("2,06 millones de TEU", 2.06, R_SA_CAP, "valor", pais="MOVIDO", anio=2025, tol=0.01)
C_TECHO = cifra("2,65 millones", 2.65, R_SA_CAP, "valor", pais="TECHO", anio=2025, tol=0.01)

short("2026-12-01", "san-antonio-al-limite-de-su-capacidad",
      "San Antonio se queda sin espacio y el muelle nuevo llega en 2036",
      "¿Qué pasa cuando el puerto más grande de Chile se queda sin espacio?\n"
      "En 2025 San Antonio movió 2,06 millones de TEU (la unidad con que se cuentan los "
      "contenedores: un contenedor de 40 pies son dos TEU), su primera vez sobre los dos millones, "
      "y quedó operando en torno al 80 % de su capacidad máxima, que ronda los 2,65 millones de TEU "
      "al año.\n"
      "El proyecto que lo agranda, el Puerto Exterior, obtuvo su aprobación ambiental en mayo de "
      "2026 y tiene su primera etapa prevista para 2036.\n"
      "Valparaíso, el otro puerto de la región, movió más de 9,4 millones de toneladas de carga "
      "general en 2025, un 11,5 % más que el año anterior, y menos de la mitad de los TEU de su "
      "vecino (926.860 según su propio balance anual).\n"
      "Fuentes: Emol (12-01-2026 y 07-07-2026), Cooperativa (26-05-2026), Diario Financiero (2026).",
      ["#sanantonio", "#valparaiso", "#puertos"],
      {"gancho": {"texto": "Al puerto de San Antonio le queda poco más de medio millón de TEU de margen: "
                           "movió 2,06 millones en 2025 y el sistema actual aguanta 2,65.",
                  "rotulo": "CASI LLENO",
                  "cifras": [C_MOVIDO, C_TECHO]},
       "visualGancho": {"tipo": "chile", "regiones": ["CL-VS"], "puntos": [PT_SA, PT_VA]},
       "grafico": {"tipo": "barras", "titulo": "Lo que movió y lo que aguanta", "datos": R_SA_CAP,
                   "destacar": {"pais": "TECHO", "anio": 2025}, "formato": {"decimales": 2, "sufijo": " M"}},
       "escenas": [
           {"tipo": "planteamiento",
            "texto": "Según Emol, el TEU es la unidad con que se cuentan los contenedores, y ese techo "
                     "lo fija la infraestructura que ya está construida: los metros de muelle, la "
                     "profundidad y el patio.",
            "visual": {"tipo": "chile", "regiones": ["CL-VS"],
                       "puntos": [{"texto": "San Antonio", "en": [-71.61, -33.59]}]},
            "fuenteEnVoz": True},
           {"tipo": "dato", "usaGraficoPrincipal": True,
            "texto": "El proyecto que lo agranda es el Puerto Exterior, y obtuvo su aprobación "
                     "ambiental en mayo de 2026. Su primera etapa está prevista para 2036.",
            "cifras": [cifra("2036", 2036, R_FECHAS, "valor", pais="PLAN", anio=2026, tol=0.001)]},
           {"tipo": "giro",
            "texto": "O sea: diez años entre el permiso y el primer barco. Cuando un puerto llega a su "
                     "techo, la decisión tenía que estar tomada mucho antes.",
            "rotulo": {"texto": "2026 A 2036", "dice": "años"}},
       ],
       "remate": "La carga llegó antes que el muelle; el muelle recién llega en 2036.",
       "fuentes": [{"texto": "Emol, San Antonio cerca de su límite (12-01-2026)", "url": URL_EMOL_CAP},
                   {"texto": "Emol, el Puerto Exterior y su calendario (07-07-2026)", "url": URL_EMOL_INFORME}],
       "enlaceLargo": ID_LARGO})

# ---------- 7. miércoles 02-12: tráiler del largo ----------
# La revisión encontró dos fallas de tráiler: no llevaba la escena del arranque del largo y sí daba
# la respuesta (enumeraba las tres causas). Ahora abre con la bahía de 1914 y no nombra ninguna causa.
short("2026-12-02", "trailer-valparaiso-puerto-principal",
      "Valparaíso se llama el Puerto Principal y la pelea es por otro muelle",
      "¿Por qué Valparaíso dejó de ser el Puerto Principal de Chile?\n"
      "Hace un siglo el puerto que mandaba en el Pacífico sur era Valparaíso. Hoy San Antonio, a 100 "
      "kilómetros al sur, movió 2,06 millones de TEU en 2025 y está en torno al 80 % de su "
      "capacidad, y la discusión es un proyecto de US$ 4.450 millones, de los que el Estado pone "
      "US$ 1.950 millones.\n"
      "Video completo hoy a las 19:00: qué perdió Valparaíso, cuándo lo perdió y quién decide dónde "
      "va el muelle grande de Chile.\n"
      "Fuentes: Memoria Chilena (Biblioteca Nacional de Chile), Emol (12-01-2026 y 07-07-2026).",
      ["#valparaiso", "#sanantonio", "#puertos"],
      {"gancho": {"texto": "Mira esta bahía. Es agosto de 1914 y Valparaíso es el puerto que manda en el "
                           "Pacífico sur. Hoy el que mueve la carga es San Antonio, a 100 kilómetros al "
                           "sur, con 2,06 millones de TEU al año.",
                  "rotulo": "¿QUÉ PASÓ, VALPARAÍSO?",
                  "cifras": [C_MOVIDO]},
       "visualGancho": {"tipo": "chile", "regiones": ["CL-VS"], "puntos": [PT_VA, PT_SA]},
       "grafico": {"tipo": "comparacion", "titulo": "Lo que movió y lo que aguanta", "datos": R_SA_CAP,
                   "destacar": {"pais": "MOVIDO", "anio": 2025}, "formato": {"decimales": 2, "sufijo": " M"}},
       "escenas": [
           {"tipo": "planteamiento",
            "texto": "Valparaíso sigue siendo un puerto grande y todavía se llama el Puerto Principal. "
                     "Pero el primer lugar en carga de contenedores lo tiene su vecino del sur.",
            "visual": {"tipo": "chile", "regiones": ["CL-VS"],
                       "puntos": [{"texto": "Valparaíso", "en": [-71.62, -33.04]}]}},
           {"tipo": "dato", "usaGraficoPrincipal": True, "fuenteEnVoz": True,
            "texto": "Según Emol, con esos 2,06 millones San Antonio quedó en torno al 80 por ciento de "
                     "su capacidad máxima, que es de 2,65 millones de TEU al año.",
            "cifras": [C_TECHO]},
           {"tipo": "giro",
            "texto": "Hoy a las siete de la tarde sale el video completo: qué perdió Valparaíso, cuándo "
                     "lo perdió y quién decide dónde va el muelle grande de Chile.",
            "rotulo": {"texto": "HOY A LAS 19:00", "dice": "completo"}},
       ],
       "remate": "El nombre se quedó en Valparaíso; la carga se fue al sur.",
       "fuentes": [{"texto": "Emol, San Antonio cerca de su límite (12-01-2026)", "url": URL_EMOL_CAP},
                   {"texto": "Memoria Chilena, Biblioteca Nacional de Chile", "url": URL_MEMORIA}],
       "enlaceLargo": ID_LARGO})

# ---------- LARGO del miércoles 02-12 a las 19:00 ----------
# Modelo chilenómetro (decisión del 18-11-2026): tema chileno visual y de rivalidad, arranque con
# escena fechada y título de pregunta con el lugar nombrado.
# Lo que la revisión independiente obligó a cambiar: el arranque ya no inventa lo que se pensó en el
# muelle (ni el telégrafo ni "nadie entiende todavía"), la fecha baja a "agosto de 1914" porque el
# día exacto no está verificado, el giro del capítulo 1 ya no afirma que el canal causó la caída (la
# verificación prometió no afirmarlo), la década se dice como la aritmética de 2026 a 2036, se dice
# TEU y no "contenedores", y salieron la ironía y los juicios sin fuente.
R_APERTURA = ref("san-antonio-apertura", ["APERTURA"], {"APERTURA": [[1922, 1922]]},
                 {"APERTURA": "Año de apertura"},
                 "Memoria Chilena, Biblioteca Nacional de Chile", URL_MEMORIA,
                 "Año en que San Antonio se abre al comercio", "año")

largo = {
    "cabecera": "VALPARAÍSO Y SAN ANTONIO · 1914-2045",
    "estructura": "autopsia",
    "gancho": {
        "texto": "Mira bien esta bahía. Es agosto de 1914 y Valparaíso es el puerto que manda en el "
                 "Pacífico sur: la primera escala de todo barco que viene del Atlántico por el "
                 "estrecho de Magallanes. Ese mismo mes, a miles de kilómetros al norte, se abre el "
                 "Canal de Panamá. ¿Cuánto tarda una ciudad en perder el lugar que le daba de comer?",
        "rotulo": "EL PUERTO PRINCIPAL",
    },
    "promesa": "Al final vas a saber qué perdió Valparaíso, cuándo lo perdió y por qué hoy hay una "
               "pelea de miles de millones por dónde va el muelle grande de Chile.",
    "indice": ["El Puerto Principal", "El canal y el salitre", "San Antonio y su techo", "La pelea por el muelle"],
    "capitulos": [
        {"titulo": "Cuando todo pasaba por Valparaíso", "escenas": [
            {"tipo": "planteamiento",
             "texto": "Para entender lo que se perdió hay que mirar el mapa como lo miraban los "
                      "capitanes del siglo diecinueve. Un barco que salía de Liverpool hacia la costa "
                      "oeste de Sudamérica tenía un solo camino: bajar el Atlántico, cruzar el estrecho "
                      "de Magallanes o el cabo de Hornos, y subir por el Pacífico. La primera ciudad "
                      "grande que encontraba después de ese paso era Valparaíso. No la eligieron por la "
                      "bahía: la eligieron por quedar justo donde el viaje se podía interrumpir. Y esa "
                      "escala no era un detalle: un barco a vapor necesitaba carbón y agua, y después "
                      "del paso no había otro lugar grande donde cargarlos.",
             "visual": {"tipo": "chile", "regiones": ["CL-VS", "CL-MA"],
                        "puntos": [{"texto": "Valparaíso", "en": [-71.62, -33.04]},
                                   {"texto": "Estrecho de Magallanes", "en": [-70.91, -53.16]}]},
             "rotulo": {"texto": "UNA SOLA RUTA", "dice": "camino"}},
            # Tercera vuelta (25-11-2026): el largo rindió 9:14 con la voz real y producir.mts exige 10:00 a
            # 12:30. Se agregan dos escenas con hechos verificados (filas "tercera vuelta" de verificacion.md).
            {"tipo": "planteamiento",
             "texto": ("Ese papel quedó escrito en un documento oficial. En 2003 la UNESCO declaró "
                      "Patrimonio de la Humanidad el barrio histórico de Valparaíso, y el criterio con que "
                      "lo inscribió se apoya en el puerto. Según su ficha, la ciudad es un testimonio de la "
                      "fase temprana de la globalización, a fines del siglo diecinueve, cuando fue el primer "
                      "y más importante puerto mercante de la ruta que unía el Atlántico con el Pacífico por "
                      "el estrecho de Magallanes. Y la misma ficha sitúa ese papel entre la década de 1880 y "
                      "la apertura del Canal de Panamá, en 1914."),
             "visual": {"tipo": "iconos", "titulo": "La ficha de la UNESCO",
                        "items": [{"icono": "🏛️", "texto": "Patrimonio desde 2003", "dice": "UNESCO"},
                                  {"icono": "⚓", "texto": "Primer puerto mercante", "dice": "mercante"},
                                  {"icono": "🚢", "texto": "Hasta el Canal de Panamá", "dice": "Panamá"}]},
             "rotulo": {"texto": "LO DICE LA UNESCO", "dice": "globalización"}},
            {"tipo": "planteamiento",
             "texto": "Hay un detalle de lenguaje que conviene tener presente. A Valparaíso se le dice "
                      "el Puerto Principal desde hace más de un siglo, y el apodo sigue puesto después "
                      "de que dejara de ser cierto en los números. Mientras el nombre seguía ahí, a 100 "
                      "kilómetros al sur se levantaba un muelle en una caleta que casi no aparecía en "
                      "las conversaciones sobre comercio.",
             "visual": {"tipo": "chile", "regiones": ["CL-VS"],
                        "puntos": [{"texto": "Valparaíso", "en": [-71.62, -33.04]},
                                   {"texto": "San Antonio", "en": [-71.61, -33.59]}]},
             "rotulo": {"texto": "EL NOMBRE QUEDÓ", "dice": "apodo"}},
            {"tipo": "dato", "fuenteEnVoz": True,
             "texto": "Y no es que Valparaíso haya dejado de funcionar. Según el Diario Financiero, en "
                      "2025 movió más de 9,4 millones de toneladas de carga general, un 11,5 por ciento "
                      "más que el año anterior. Lo que perdió no es el movimiento: es el primer lugar en "
                      "carga de contenedores, que es donde se juega el comercio de hoy.",
             "grafico": {"tipo": "contador", "titulo": "Carga general de Valparaíso en 2025",
                         "datos": R_VAL_CARGA, "destacar": {"pais": "CARGA"},
                         "formato": {"decimales": 1, "sufijo": " M t"}},
             "cifras": [cifra("9,4 millones de toneladas", 9.4, R_VAL_CARGA, "valor", pais="CARGA", anio=2025, tol=0.01),
                        cifra("11,5 por ciento", 11.5, R_VAL_CARGA, "valor", pais="ALZA", anio=2025, tol=0.01)],
             "rotulo": {"texto": "SIGUE CRECIENDO", "dice": "movimiento"}},
            {"tipo": "giro",
             "texto": "Y la explicación clásica de esa pérdida no pasa por ningún puerto chileno. Pasa "
                      "por una obra en otro continente, que nadie en Valparaíso podía controlar ni "
                      "discutir. Es la versión que se repite desde hace cien años, y en el próximo "
                      "capítulo vamos a ver quién la discute.",
             "visual": {"tipo": "mapa", "destacar": ["PAN", "CHL"], "zoom": 2,
                        "etiquetas": [{"texto": "Canal de Panamá", "en": [-79.68, 9.08]},
                                      {"texto": "Valparaíso", "en": [-71.62, -33.04]}]},
             "rotulo": {"texto": "OTRO CONTINENTE", "dice": "obra"}},
        ]},
        {"titulo": "El canal de 1914 y la crisis del salitre", "escenas": [
            {"tipo": "planteamiento",
             "texto": "En 1914 se abrió el Canal de Panamá. De un día para otro, un barco que iba de "
                      "Nueva York o de Liverpool hacia Valparaíso tenía un camino más corto, y ese "
                      "camino no pasaba por el sur de Chile.",
             "visual": {"tipo": "foto", "busqueda": "Panama Canal 1914 first transit ship Ancon",
                        "alternativas": ["Panama Canal opening 1914", "Panama Canal construction locks 1913"],
                        "pie": "Canal de Panamá, 1914", "encuadre": "ken-burns"},
             "rotulo": {"texto": "1914", "dice": "abrió"},
             "sellos": [{"texto": "1914", "dice": "otro"},
                        {"texto": "MÁS CORTO", "dice": "corto"}]},
            {"tipo": "dato", "fuenteEnVoz": True,
             "texto": "Memoria Chilena, de la Biblioteca Nacional, lo resume así: la apertura del canal "
                      "desvió gran parte del comercio que circulaba por el estrecho de Magallanes. Y "
                      "agrega un segundo golpe que casi nadie nombra: en 1922 se abrió al comercio el "
                      "puerto de San Antonio, y eso atrajo capitales que hasta entonces estaban en "
                      "Valparaíso. El competidor no apareció en los años dos mil con los contenedores. "
                      "Apareció hace más de un siglo, mientras Valparaíso mantenía la vista en el canal.",
             "grafico": {"tipo": "contador", "titulo": "San Antonio se abre al comercio", "datos": R_APERTURA,
                         "destacar": {"pais": "APERTURA"}, "formato": {"decimales": 0}},
             "cifras": [cifra("1922", 1922, R_APERTURA, "valor", pais="APERTURA", anio=1922, tol=0.001)],
             "rotulo": {"texto": "1922: SAN ANTONIO", "dice": "capitales"}},
            {"tipo": "planteamiento",
             "texto": "Al mismo tiempo se cayó el negocio que llenaba las bodegas. Entre 1914 y 1929, "
                      "con la Primera Guerra Mundial de por medio, el salitre chileno entró en crisis. "
                      "Valparaíso no embarcaba salitre desde sus propios muelles, pero vivía del "
                      "movimiento que el salitre generaba: las casas comerciales, los seguros y el "
                      "crédito. Cuando el norte dejó de producir plata, el puerto del centro dejó de "
                      "administrarla.",
             "visual": {"tipo": "iconos", "titulo": "De qué vivía el puerto",
                        "items": [{"icono": "🏦", "texto": "Bancos y crédito", "dice": "crédito"},
                                  {"icono": "📜", "texto": "Seguros", "dice": "seguros"},
                                  {"icono": "⛵", "texto": "Casas comerciales", "dice": "comerciales"}]},
             "rotulo": {"texto": "1914 A 1929", "dice": "crisis"}},
            {"tipo": "reenganche",
             "texto": "Y hay historiadores que sostienen que esta explicación, la del canal, está mal "
                      "contada."},
            {"tipo": "giro",
             "texto": "El historiador Pablo Aravena, de la Universidad de Valparaíso, cuestiona "
                      "justamente eso. En un reportaje de BioBioChile del 16 de noviembre de 2026 "
                      "plantea que el canal no es el origen del problema, y que la crisis de verdad "
                      "empieza varias décadas después. Según su planteamiento, lo que se perdió no fue "
                      "solo el empleo del muelle, sino la economía urbana que ese empleo sostenía. Esa "
                      "discusión no la vamos a resolver acá, pero hay que decirla: la fecha del canal es "
                      "la explicación clásica, no la única.",
             "visual": {"tipo": "iconos", "titulo": "Dos explicaciones",
                        "items": [{"icono": "🚢", "texto": "El canal, en 1914", "dice": "canal"},
                                  {"icono": "🏚️", "texto": "La ciudad, décadas después", "dice": "décadas"}]},
             "rotulo": {"texto": "ESTÁ DISCUTIDO", "dice": "cuestiona"}},
        ]},
        {"titulo": "San Antonio llegó a su techo", "escenas": [
            {"tipo": "planteamiento",
             "texto": "Lo que vino después no fue una decisión política: fue una caja. El contenedor "
                      "estandarizado cambió la pregunta que define a un puerto. Antes la pregunta era "
                      "cuántos hombres y cuántas grúas tenías para bajar sacos uno por uno. Después pasó "
                      "a ser otra: cuántos metros de muelle corrido tienes, cuánta profundidad, y cuánto "
                      "patio plano detrás para apilar cajas. Valparaíso tiene cerros pegados al mar. San "
                      "Antonio tiene planicie. Y el cambio no fue gradual: los puertos que podían "
                      "recibir la caja se quedaron con la carga que crece, y los que no, pasaron a "
                      "mover lo que la caja no sirve para llevar.",
             "visual": {"tipo": "iconos", "titulo": "Qué le pide un portacontenedores",
                        "items": [{"icono": "📏", "texto": "Muelle corrido", "dice": "muelle"},
                                  {"icono": "🌊", "texto": "Profundidad", "dice": "profundidad"},
                                  {"icono": "🧱", "texto": "Patio plano", "dice": "patio"}]},
             "rotulo": {"texto": "CERROS Y PLANICIE", "dice": "planicie"}},
            {"tipo": "dato", "fuenteEnVoz": True,
             "texto": "Y la planicie ganó. Según Emol, en 2025 San Antonio movió 2,06 millones de TEU, "
                      "que es la unidad con que se cuentan los contenedores, y fue la primera vez que un "
                      "puerto chileno pasa los dos millones. El problema es el otro número de la misma "
                      "nota: el sistema actual tiene un techo de 2,65 millones al año, así que el puerto "
                      "quedó en torno al 80 por ciento de lo que aguanta. Le queda poco más de medio "
                      "millón de margen.",
             "grafico": {"tipo": "barras", "titulo": "Lo que movió y lo que aguanta", "datos": R_SA_CAP,
                         "destacar": {"pais": "TECHO", "anio": 2025}, "formato": {"decimales": 2, "sufijo": " M"}},
             "cifras": [C_MOVIDO, C_TECHO],
             "rotulo": {"texto": "AL 80 % DEL TECHO", "dice": "aguanta"}},
            {"tipo": "planteamiento",
             "texto": "La diferencia entre los dos puertos no es solo de tamaño: es de para qué sirve "
                      "cada muelle. San Antonio concentra buena parte de la carga en contenedor de la "
                      "zona central. Valparaíso quedó con una mezcla distinta, con bastante carga "
                      "fraccionada y con pasajeros de crucero, que ocupan muelle y no se cuentan en TEU.",
             "visual": {"tipo": "chile", "regiones": ["CL-VS"],
                        "puntos": [{"texto": "Valparaíso", "en": [-71.62, -33.04]},
                                   {"texto": "San Antonio", "en": [-71.61, -33.59]}]},
             "rotulo": {"texto": "DOS MEZCLAS", "dice": "mezcla"}},
            {"tipo": "reenganche",
             "texto": "Y cuando un puerto se acerca a su techo, el país tiene que decidir dónde pone el "
                      "siguiente."},
            {"tipo": "giro",
             "texto": "Acá aparece el plazo, que es el dato que cambia la lectura. El proyecto que "
                      "agranda San Antonio obtuvo su aprobación ambiental en mayo de 2026 y tiene su "
                      "primera etapa prevista para 2036: diez años entre el permiso y el primer barco. "
                      "Un muelle de este tamaño no se construye en un gobierno. Por eso lo que se "
                      "discute hoy no es un problema de 2026.",
             "visual": {"tipo": "mapa", "destacar": ["CHL"], "zoom": 5,
                        "etiquetas": [{"texto": "Zona central", "en": [-71.6, -33.3]}]},
             "rotulo": {"texto": "2026 A 2036", "dice": "años"}},
        ]},
        {"titulo": "La pelea por el muelle grande", "escenas": [
            {"tipo": "planteamiento",
             "texto": "Hoy los dos puertos están en la misma región, a 100 kilómetros de distancia, y "
                      "los dos quieren crecer. Esa es la parte que hace que esto no sea una historia de "
                      "Valparaíso, sino una decisión de país: cuánta plata pública va a cada uno, y "
                      "dónde queda el muelle que va a recibir los barcos de los próximos treinta años. Y "
                      "las dos ampliaciones ya pasaron por la evaluación ambiental: la de Valparaíso "
                      "la destrabó el Comité de Ministros después de doce años de tramitación, según "
                      "el Diario Financiero. O sea, la pregunta no es si se puede. Es cuál se hace "
                      "primero, y con qué plata.",
             "visual": {"tipo": "chile", "regiones": ["CL-VS"],
                        "puntos": [{"texto": "Valparaíso", "en": [-71.62, -33.04]},
                                   {"texto": "San Antonio", "en": [-71.61, -33.59]}]},
             "rotulo": {"texto": "100 KILÓMETROS", "dice": "kilómetros"}},
            {"tipo": "dato", "fuenteEnVoz": True,
             "texto": "La apuesta principal se llama Puerto Exterior de San Antonio. Según Emol, la "
                      "inversión total son 4.450 millones de dólares: 1.950 millones los pone el Estado, "
                      "para las obras de abrigo y los accesos, y 2.500 millones los ponen privados por "
                      "concesión.",
             "grafico": {"tipo": "comparacion", "titulo": "Quién paga el Puerto Exterior", "datos": R_EXTERIOR,
                         "destacar": {"pais": "ESTADO", "anio": 2026},
                         "formato": {"decimales": 0, "prefijo": "US$ ", "sufijo": " M"}},
             "cifras": [cifra("4.450 millones de dólares", 4450, R_EXTERIOR, "valor", pais="TOTAL", anio=2026, tol=0.01),
                        cifra("1.950 millones", 1950, R_EXTERIOR, "valor", pais="ESTADO", anio=2026, tol=0.01),
                        cifra("2.500 millones", 2500, R_EXTERIOR, "valor", pais="PRIVADOS", anio=2026, tol=0.01)],
             "rotulo": {"texto": "PLATA PÚBLICA", "dice": "Estado"}},
            {"tipo": "reenganche",
             "texto": "Y entonces apareció un informe que puso esa cuenta en duda."},
            {"tipo": "dato", "fuenteEnVoz": True,
             "texto": "El gremio portuario encargó un estudio a la consultora Port Consultants "
                      "Rotterdam. Su conclusión, según Emol, es que no haría falta empezar a construir "
                      "el Puerto Exterior antes de 2045, y que ampliar Valparaíso sale más eficiente por "
                      "contenedor movido. El argumento es que el comercio cambió y que en la costa del "
                      "Pacífico ya entraron terminales nuevos y grandes, como Callao, Chancay y "
                      "Posorja. El plan oficial, en cambio, tiene la primera etapa funcionando en 2036.",
             "grafico": {"tipo": "comparacion", "titulo": "Cuándo haría falta el muelle nuevo",
                         "datos": R_FECHAS, "destacar": {"pais": "ESTUDIO", "anio": 2026},
                         "formato": {"decimales": 0}},
             "cifras": [cifra("2045", 2045, R_FECHAS, "valor", pais="ESTUDIO", anio=2026, tol=0.001),
                        cifra("2036", 2036, R_FECHAS, "valor", pais="PLAN", anio=2026, tol=0.001)],
             "rotulo": {"texto": "2036 O 2045", "dice": "etapa"}},
            {"tipo": "planteamiento",
             "texto": ("Uno de esos nombres está en la misma costa y ya ofrece servicio para carga chilena. "
                      "Chancay queda 80 kilómetros al norte de Lima, se inauguró en noviembre de 2024 y, según "
                      "la prensa de entonces, es en un 60 por ciento de la naviera estatal china Cosco Shipping. "
                      "En febrero de 2025 esa naviera lanzó el servicio Chancay Express: pasa cada semana por "
                      "Iquique y lleva carga chilena hacia Asia con transbordo en Chancay. Esa es la clase de "
                      "cambio que el estudio señala: el mapa del Pacífico ya no es el de antes. En noviembre de "
                      "2024, Curtis Doiron, de DP World Chile, advirtió lo contrario: que pasar carga chilena por "
                      "puertos de Perú o Ecuador podría alargar el viaje y encarecerlo."),
             "visual": {"tipo": "mapa", "destacar": ["PER", "CHL"], "zoom": 3,
                        "etiquetas": [{"texto": "Chancay", "en": [-77.27, -11.58]},
                                      {"texto": "Iquique", "en": [-70.15, -20.21]},
                                      {"texto": "San Antonio", "en": [-71.61, -33.59]}]},
             "rotulo": {"texto": "CARGA CHILENA POR PERÚ", "dice": "Iquique"}},
            {"tipo": "giro",
             "texto": "Las tres respuestas que vinieron después no rechazan la obra: discuten el "
                      "momento. El Ministerio de Transportes dijo que la planificación portuaria del "
                      "Estado no se basa en un solo estudio, y abrió la puerta a revisar cuándo "
                      "avanzar. El presidente de la empresa portuaria de San Antonio, Sergio Merino, "
                      "dijo que Valparaíso, cito, está muy estresado por la configuración que tiene. Y "
                      "el gobierno regional respaldó que las dos ampliaciones avancen en paralelo.",
             "visual": {"tipo": "iconos", "titulo": "Las tres respuestas",
                        "items": [{"icono": "🏛️", "texto": "Transportes: lo revisa", "dice": "Transportes"},
                                  {"icono": "⚓", "texto": "San Antonio: insiste", "dice": "Merino"},
                                  {"icono": "🗺️", "texto": "La región: las dos", "dice": "paralelo"}]},
             "rotulo": {"texto": "DISCUTEN EL CUÁNDO", "dice": "momento"}},
            {"tipo": "significado",
             "texto": "Para quien vive en Chile esto se nota en algo muy concreto: buena parte de lo que "
                      "llega a la zona central entra en contenedor por uno de estos dos muelles, y el "
                      "costo de ese viaje va dentro del precio final. Un puerto saturado se traduce en "
                      "barcos esperando, y los barcos esperando se pagan. La competencia entre San "
                      "Antonio y Valparaíso no es una rivalidad de ciudades ni un asunto de orgullo "
                      "regional: es la cuenta del flete de todo el país, y la pagamos todos sin verla en "
                      "la boleta.",
             "visual": {"tipo": "chile", "regiones": ["CL-VS", "CL-RM"],
                        "puntos": [{"texto": "San Antonio", "en": [-71.61, -33.59]},
                                   {"texto": "Santiago", "en": [-70.65, -33.44]}]},
             "rotulo": {"texto": "VA EN EL PRECIO", "dice": "precio"}},
        ]},
    ],
    "numeroQueNadieMira": {
        "texto": "Y el número que nadie mira no es una cifra de plata: es un año. 2045. Ese es el plazo "
                 "que el estudio del gremio portuario pone para que el muelle nuevo haga falta de "
                 "verdad. El plan oficial lo quiere funcionando en 2036, nueve años antes. Nueve años "
                 "de diferencia en una obra donde el Estado pone 1.950 millones de dólares. Nadie mira "
                 "ese año porque no es una noticia de un día, y es lo único que decide si la obra llega "
                 "temprano o llega tarde.",
        "grafico": {"tipo": "comparacion", "titulo": "El plan y el estudio", "datos": R_FECHAS,
                    "destacar": {"pais": "ESTUDIO", "anio": 2026}, "formato": {"decimales": 0},
                    "anotaciones": [{"anio": 2026, "texto": "el plan: 2036", "dice": "oficial"},
                                    {"anio": 2026, "texto": "el estudio: 2045", "dice": "diferencia"}]},
        "cifras": [cifra("2045", 2045, R_FECHAS, "valor", pais="ESTUDIO", anio=2026, tol=0.001),
                   cifra("2036", 2036, R_FECHAS, "valor", pais="PLAN", anio=2026, tol=0.001),
                   cifra("1.950 millones de dólares", 1950, R_EXTERIOR, "valor", pais="ESTADO", anio=2026, tol=0.01)],
    },
    "remate": "Valparaíso conserva el nombre de Puerto Principal; San Antonio se quedó con los barcos.",
    "siguiente": "Si el muelle se decide hoy y se usa en 2036, ¿quién revisa esa cuenta en los nueve años del medio?",
    "miniatura": {"texto": "VALPARAÍSO PERDIÓ EL PRIMER LUGAR"},
    "fuentes": [
        {"texto": "Memoria Chilena, Biblioteca Nacional de Chile: el puerto de Valparaíso y su declive", "url": URL_MEMORIA},
        {"texto": "Emol, San Antonio cerca de su límite de capacidad (12-01-2026)", "url": URL_EMOL_CAP},
        {"texto": "Emol, el informe que cuestiona la necesidad del megapuerto (07-07-2026)", "url": URL_EMOL_INFORME},
        {"texto": "Emol, el Gobierno responde al estudio (08-07-2026)", "url": URL_EMOL_GOB},
        {"texto": "Emol, el presidente de la empresa portuaria de San Antonio (11-07-2026)", "url": URL_EMOL_MERINO},
        {"texto": "Cooperativa, aprobación ambiental del Puerto Exterior (26-05-2026)", "url": URL_COOP_RCA},
        {"texto": "BioBioChile, Valparaíso de capa caída (16-11-2026)", "url": URL_BBCL_VAL},
        {"texto": "BioBioChile, las dos ampliaciones en paralelo (31-07-2026)", "url": URL_BBCL_PARALELO},
        {"texto": "Diario Financiero, la carga de Valparaíso en 2025", "url": URL_DF_VAL},
        {"texto": "Diario Financiero, el Comité de Ministros destraba la ampliación de Valparaíso", "url": URL_DF_VAL_AMPL},
    ],
    "id": ID_LARGO,
}
voz_largo = ([largo["gancho"]["texto"], largo["promesa"]]
             + [e["texto"] for c in largo["capitulos"] for e in c["escenas"]]
             + [largo["numeroQueNadieMira"]["texto"], largo["remate"], largo["siguiente"]])
n_largo = sum(len([t for t in x.split() if any(ch.isalnum() for ch in t)]) for x in voz_largo)
env = {"plantilla": "tesis", "id": ID_LARGO,
       "titulo": "¿Por qué Valparaíso dejó de ser el Puerto Principal?",
       "descripcion": "¿Por qué Valparaíso dejó de ser el Puerto Principal de Chile?\n"
                      "En 2025 San Antonio movió 2,06 millones de TEU (la unidad con que se cuentan los "
                      "contenedores: un contenedor de 40 pies son dos TEU), la primera vez que un puerto "
                      "chileno pasa los dos millones, y quedó en torno al 80 % de su capacidad máxima, que "
                      "ronda los 2,65 millones al año. Valparaíso movió más de 9,4 millones de toneladas de "
                      "carga general, un 11,5 % más que en 2024, y 926.860 TEU según su propio balance "
                      "anual: menos de la mitad de su vecino.\n"
                      "El relato clásico culpa al Canal de Panamá, abierto en 1914. Memoria Chilena agrega "
                      "la apertura de San Antonio en 1922 y la crisis del salitre entre 1914 y 1929; el "
                      "historiador Pablo Aravena discute que el canal sea el origen. Las dos versiones "
                      "están en el video.\n"
                      "Hoy la discusión es el Puerto Exterior de San Antonio: US$ 4.450 millones, de los "
                      "que el Estado pone US$ 1.950 millones, con aprobación ambiental en mayo de 2026 y la "
                      "primera etapa prevista para 2036. Un estudio de Port Consultants Rotterdam "
                      "encargado por el gremio portuario sostiene que no haría falta antes de 2045 y que "
                      "ampliar Valparaíso es más eficiente.\n"
                      "Fuentes:\n"
                      f"Memoria Chilena, Biblioteca Nacional de Chile: {URL_MEMORIA}\n"
                      f"Emol (12-01-2026): {URL_EMOL_CAP}\n"
                      f"Emol (07-07-2026): {URL_EMOL_INFORME}\n"
                      f"Cooperativa (26-05-2026): {URL_COOP_RCA}\n"
                      f"BioBioChile (16-11-2026): {URL_BBCL_VAL}\n"
                      f"Diario Financiero: {URL_DF_VAL}" + PIE,
       "hashtags": ["#valparaiso", "#sanantonio", "#puertos", "#chile"],
       "publicar": "2026-12-02T19:00", "props": largo}
with open(os.path.join(D, f"{ID_LARGO}.json"), "w") as f:
    json.dump(env, f, ensure_ascii=False, indent=2); f.write("\n")
print(f"Largo:\n  {ID_LARGO}: {n_largo} palabras (deben ser 1500 a 1950), titulo {len(env['titulo'])} c")
