#!/usr/bin/env python3
"""Genera los JSON de la semana del 03-12 al 09-12-2026 desde los datos de verificacion.md
(verificados el 26-11-2026).
  python3 -I contenido/semana/2026-12-03/generar.py

Se deja en el repo por la misma razón que el de la semana pasada: una cifra corregida a mano en
ocho archivos se corrige mal. Acá se corrige en UN lugar y se regenera.

Reglas que esta semana cambian respecto de la anterior (decisión del 26-11-2026, en
estrategia/decisiones.md): 5 de los 7 Shorts son noticia chilena con nombre propio y conflicto
vivo, y ninguno explica una serie oficial sin protagonista. La evidencia son las 312 vistas del
Short de desempleo por región contra las 4 del Short sobre el trámite del Presupuesto.
"""
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

def palabras(t):
    return len([x for x in t.split() if re.search(r'[\w\d]', x, re.UNICODE)])

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
    print(f"  {id_}: {n} palabras habladas ({marca}), titulo {len(titulo)} c, esqueleto [{esq}], grafico {props['grafico']['tipo']}")

def largo(fecha, slug, titulo, desc, hashtags, props):
    id_ = f"{fecha}-largo-{slug}"
    props["id"] = id_
    voz = [props["gancho"]["texto"], props["promesa"]]
    for c in props["capitulos"]:
        voz += [e["texto"] for e in c["escenas"]]
    voz += [props["numeroQueNadieMira"]["texto"], props["remate"], props["siguiente"]]
    n = sum(palabras(x) for x in voz)
    env = {"plantilla": "tesis", "id": id_, "titulo": titulo, "descripcion": desc + PIE,
           "hashtags": hashtags, "publicar": f"{fecha}T19:00", "props": props}
    with open(os.path.join(D, f"{id_}.json"), "w") as f:
        json.dump(env, f, ensure_ascii=False, indent=2); f.write("\n")
    marca = "ok" if 1500 <= n <= 1950 else "FUERA DE RANGO"
    print(f"  {id_}: {n} palabras ({marca}), titulo {len(titulo)} c, {len(props['capitulos'])} capitulos")

# ------------------------------------------------------------------ URLs verificadas (verificacion.md)
U_BBCL_SALA = "https://www.biobiochile.cl/noticias/nacional/chile/2026/11/25/senado-despacha-a-ley-la-sala-cuna-universal-tras-cuatro-anos-de-debate-en-el-congreso.shtml"
U_DF_SALA = "https://www.df.cl/economia-y-politica/laboral-personas/sala-cuna-universal-las-claves-de-la-reforma-que-cambia-el-acceso-y"
U_PAUTA_SALA = "https://www.pauta.cl/actualidad/2026/11/26/sala-cuna-universal-es-despachada-a-ley-quienes-podran-acceder-como-se-financiara-y-cuando-comenzara-a-funcionar.html"
U_INE_NOTA = "https://www.ine.gob.cl/sala-de-prensa/prensa/general/noticia/2026/10/29/la-tasa-de-desocupaci%C3%B3n-nacional-fue-9-8-en-el-trimestre-julio-septiembre-de-2026"
U_DF_LINARES = "https://www.df.cl/empresas/industria/es-definitivo-pese-a-intentos-del-gobierno-iansa-confirma-cierre-de-la"
U_BBCL_GOLPE = "https://www.biobiochile.cl/noticias/economia/negocios-y-empresas/2026/11/25/golpe-al-corazon-productivo-agricola-del-pais-las-consecuencias-del-cierre-remolachero-de-iansa.shtml"
U_BBCL_COUGAR = "https://www.biobiochile.cl/especial/bbcl-investiga/noticias/articulos/2026/11/25/ejercito-rompe-contrato-de-casi-46-mil-millones-con-airbus-por-mantenimiento-de-sus-cougar.shtml"
U_COOP_PENSIONES = "https://www.cooperativa.cl/noticias/pais/infancia/proteccion/pensiones-de-alimentos-tribunales-ordenaron-pagar-mas-de-3-88-billones/2026-11-18/124522.html"
U_LT_PENSIONES = "https://www.latercera.com/nacional/noticia/poder-judicial-ordeno-el-pago-de-38-billones-en-cuatro-anos-del-registro-nacional-de-deudores-de-pensiones-de-alimentos/"
U_PAUTA_PENSIONES = "https://www.pauta.cl/actualidad/2026/11/19/pensiones-de-alimentos-pagos-ordenados-crecen-a-388-billones-pero-mas-de-376-mil-inscripciones-siguen-vigentes.html"
U_CAMARA_PPTO = "https://www.camara.cl/cms/2026/11/25/camara-supera-ultimos-nudos-del-presupuesto-2027/"
U_PAUTA_PROFES = "https://www.pauta.cl/actualidad/2026/11/24/profesores-marchan-contra-recortes-en-educacion-y-advierten-posibles-despidos-y-fusion-de-cursos.html"
U_LT_PIRATA = "https://www.latercera.com/nacional/noticia/pirata-gate-pdi-detiene-a-exalcalde-de-coquimbo-y-vocalista-de-los-vikings-5-por-millonario-fraude-al-fisco/"
U_EMOL_PIRATA = "https://www.emol.com/noticias/Nacional/2026/11/25/1218140/corrupcion-coquimbo-delitos-detenidos.html"
U_BBCL_PIRATA_PP = "https://www.biobiochile.cl/noticias/nacional/region-de-coquimbo/2026/11/26/caso-pirata-gate-exalcalde-habria-retirado-230-millones-y-fiscalia-pide-prision-preventiva.shtml"
U_BBCL_PIRATA_CAUT = "https://www.biobiochile.cl/noticias/nacional/region-de-coquimbo/2026/11/26/pirata-gate-prision-preventiva-para-dos-imputados-y-arresto-nocturno-para-vocalista-de-los-vikings-5.shtml"
U_BBCL_DOLAR = "https://www.biobiochile.cl/noticias/economia/actualidad-economica/2026/11/26/dolar-toco-los-1-046-por-que-subio-y-que-puede-pasar-con-los-precios-y-el-banco-central.shtml"
U_PAUTA_JPM = "https://www.pauta.cl/actualidad/2026/11/26/j-p-morgan-proyecta-dolar-a-1-200-en-junio-de-2027-mientras-la-divisa-bordea-los-1-040-en-chile.html"
U_PAUTA_COSTA = "https://www.pauta.cl/economia/2026/11/25/rosanna-costa-dice-que-el-banco-central-no-ve-motivos-para-intervenir-pese-al-alza-del-dolar.html"
U_BBCL_PESO = "https://www.biobiochile.cl/noticias/economia/actualidad-economica/2026/11/26/peso-chileno-fue-el-cuarto-mas-devaluado-por-alza-del-dolar-y-banco-central-descarta-intervenir.shtml"
U_EMOL_IANSA = "https://www.emol.com/noticias/Economia/2026/11/25/1218188/inansa-dejara-producir-azucar-remolacha.html"
U_LT_IANSA = "https://www.latercera.com/pulso/noticia/empresas-iansa-cierra-su-produccion-de-azucar-de-remolacha-y-preve-impacto-negativo-por-casi-us38-millones/"
U_DF_IANSA = "https://www.df.cl/empresas/industria/fin-de-una-era-iansa-abandona-la-produccion-de-azucar-de-remolacha-tras-73"
U_COOP_IANSA = "https://www.cooperativa.cl/noticias/economia/sectores-productivos/agricultura/iansa-anuncio-el-fin-de-su-produccion-de-azucar-de-remolacha/2026-11-25/234513.html"
U_COOP_LINARES = "https://www.cooperativa.cl/noticias/pais/region-del-maule/iansa-confirmo-cierre-de-planta-en-linares-4-000-personas-quedaran-sin/2018-07-26/170706.html"
U_BBCL_ABRIL = "https://www.biobiochile.cl/noticias/economia/negocios-y-empresas/2026/04/29/duro-golpe-para-la-industria-de-la-remolacha-iansa-anuncia-que-no-comprara-en-el-mercado-chileno.shtml"
U_BBCL_73 = "https://www.biobiochile.cl/noticias/economia/negocios-y-empresas/2026/11/25/fin-de-una-era-iansa-pone-termino-a-la-produccion-de-azucar-de-remolacha-tras-73-anos-de-historia.shtml"
U_EMOL_LINARES_1A = "https://www.emol.com/noticias/Economia/2019/07/09/953983/A-un-ano-del-cierre-de-la-planta-de-Iansa-en-Linares.html"
U_EMOL_240 = "https://www.emol.com/noticias/Economia/2026/06/09/1202254/agro-desafios-2026.html"
U_EMOL_COEXCA = "https://www.emol.com/noticias/Economia/2026/05/22/1200587/empresa-coexa-comprar-remolacheros-maiz.html"
U_DF_CAMPOS = "https://www.df.cl/empresas/industria/ministro-campos-advierte-que-decision-de-iansa-podria-significar-el"
U_INE_EMPLEO = "https://www.ine.gob.cl/docs/default-source/prensa-y-comunicacion/presentacion-empleo-jas-2026_vf_comunicaciones.pdf"

ID_LARGO = "2026-12-09-largo-nuble-sin-remolacha"

# Puntos en el mapa (lon, lat)
P_CONGRESO = [-71.6256, -33.0472]
P_EJERCITO = [-70.6665, -33.4372]
P_SUPREMA = [-70.6534, -33.4379]
P_SAN_MIGUEL = [-70.6500, -33.4967]
P_MINEDUC = [-70.6483, -33.4425]
P_BCENTRAL = [-70.6519, -33.4420]
P_COQUIMBO = [-71.34, -29.95]
P_LOS_ANGELES = [-72.35, -37.47]
P_SAN_CARLOS = [-71.96, -36.42]
P_LINARES = [-71.60, -35.85]

print("Semana del 03-12-2026 al 09-12-2026")

# ============================================================ 03-12 Sala Cuna Universal
D_SALA = ref("sala-cuna-cotizacion-2026", ["APROBADO", "PROPUESTO"],
             {"APROBADO": [[2026, 0.30]], "PROPUESTO": [[2026, 0.35]]},
             {"APROBADO": "Aprobado", "PROPUESTO": "Propuesta inicial"},
             "Diario Financiero, claves de la reforma (25-11-2026)", U_DF_SALA,
             "Cotización al Fondo de Sala Cuna", "% del sueldo")
short(
    "2026-12-03", "sala-cuna-cotizacion-y-copago",
    "Sala cuna universal: el 0,30 % lo paga el empleador, el copago no",
    "¿Quién paga la sala cuna universal que acaba de aprobar el Congreso?\n"
    "El Senado despachó la ley el 25-11-2026. Se financia con una cotización de 0,30 % de las remuneraciones imponibles, a cargo del empleador, rebajada desde el 0,35 % que pedía el Ejecutivo, y se compensa con una menor cotización al seguro de cesantía para no subir el costo laboral.\n"
    "Desaparece el requisito de que la empresa tenga veinte o más trabajadoras para estar obligada al beneficio, que apunta a los hijos menores de dos años de los trabajadores. Si el aporte del fondo no cubre el costo del jardín, la familia paga la diferencia, con un suplemento del Estado para los hogares de menores ingresos: el Gobierno se comprometió a presentar otra ley para ponerle tope a ese copago.\n"
    "Fuentes:\n"
    f"BioBioChile, despacho de la ley (25-11-2026): {U_BBCL_SALA}\n"
    f"Diario Financiero, financiamiento (25-11-2026): {U_DF_SALA}\n"
    f"Pauta, quiénes acceden y cuándo (26-11-2026): {U_PAUTA_SALA}",
    ["#salacuna", "#congreso", "#chile"],
    {
        "gancho": {
            "texto": "El Congreso aprobó una cotización de 0,30 % de las remuneraciones imponibles, que pagan los empleadores, para financiar la sala cuna de los menores de dos años.",
            "rotulo": "0,30 % LO PAGA LA EMPRESA",
            "cifras": [cifra("un 0,30 %", 0.30, D_SALA, "valor", pais="APROBADO", anio=2026, tol=0.01)],
        },
        "visualGancho": {
            "tipo": "chile", "regiones": ["CL-VS"], "titulo": "Congreso Nacional",
            "puntos": [{"texto": "Valparaíso", "en": P_CONGRESO, "dice": "Congreso"}],
        },
        "grafico": {
            "tipo": "comparacion", "titulo": "Cuánto se cobra para la sala cuna", "datos": D_SALA,
            "destacar": {"pais": "APROBADO"}, "formato": {"decimales": 2, "sufijo": " %"},
        },
        "escenas": [
            {
                "tipo": "dato", "usaGraficoPrincipal": True, "fuenteEnVoz": True,
                "texto": "Según el Diario Financiero, el Ejecutivo pedía 0,35 % y la tramitación lo bajó. Para que no suba el costo laboral, esa cotización se descuenta de la del seguro de cesantía.",
                "cifras": [cifra("0,35 %", 0.35, D_SALA, "valor", pais="PROPUESTO", anio=2026, tol=0.01)],
            },
            {
                "tipo": "planteamiento",
                "texto": "Lo que cambia de fondo es quién tiene derecho: hasta ahora la obligación caía solo en las empresas con veinte o más trabajadoras, y ese requisito desaparece.",
                "visual": {"tipo": "iconos", "titulo": "Qué cambia el fondo", "items": [
                    {"icono": "🏢", "texto": "Regla de 20 trabajadoras", "marca": "no", "dice": "empresas"},
                    {"icono": "👶", "texto": "Fondo para todos", "marca": "si", "dice": "fondo"},
                ]},
            },
            {
                "tipo": "giro",
                "texto": "Queda un cabo sin amarrar: si el aporte del fondo no cubre el jardín, la diferencia la paga la familia, con un suplemento del Estado para los hogares de menores ingresos. El Gobierno prometió otra ley que le ponga tope.",
                "rotulo": {"texto": "LO PAGA LA FAMILIA", "dice": "familia"},
            },
        ],
        "remate": "La ley ya está. El precio que va a pagar cada familia, todavía no.",
        "fuentes": [
            {"texto": "BioBioChile, despacho de la ley (25-11-2026)", "url": U_BBCL_SALA},
            {"texto": "Diario Financiero, claves del financiamiento (25-11-2026)", "url": U_DF_SALA},
            {"texto": "Pauta, quiénes acceden y cuándo (26-11-2026)", "url": U_PAUTA_SALA},
        ],
    })

# ============================================================ 04-12 Ejército y Airbus
D_COUGAR = ref("ejercito-airbus-cougar-2026", ["CONTRATO"], {"CONTRATO": [[2026, 46000]]},
               {"CONTRATO": "Contrato de mantención"},
               "BioBioChile Investiga (25-11-2026)", U_BBCL_COUGAR,
               "Contrato de mantención mayor de los Cougar", "millones de pesos")
short(
    "2026-12-04", "ejercito-airbus-cougar",
    "El Ejército corta 46 mil millones con Airbus por los Cougar",
    "¿Por qué el Ejército rompió el contrato que mantenía sus helicópteros?\n"
    "El contrato, firmado en 2022 por casi 46 mil millones de pesos, cubría la mantención mayor de los helicópteros AS532 Cougar. BioBioChile Investiga informó que la división de compras del Ejército le puso término anticipado de forma unilateral y cobró garantías por 7 millones de dólares.\n"
    "El desacuerdo es por el alcance de los trabajos del helicóptero H-284, que fue a reparación a Brasil: aparecieron trabajos que no estaban en el alcance pactado. Airbus pidió un pronunciamiento a la Contraloría sobre eso y lo obtuvo, y el término llegó igual. Ni el Ejército ni Airbus quisieron declarar.\n"
    "Fuente:\n"
    f"BioBioChile Investiga, término del contrato (25-11-2026): {U_BBCL_COUGAR}",
    ["#ejercito", "#airbus", "#chile"],
    {
        "gancho": {
            "texto": "El Ejército de Chile puso término anticipado a un contrato de casi 46 mil millones de pesos con Airbus para mantener sus helicópteros Cougar.",
            "rotulo": "46 MIL MILLONES",
            "cifras": [cifra("casi 46 mil millones de pesos", 46000, D_COUGAR, "valor", pais="CONTRATO", anio=2026, tol=0.02)],
        },
        "visualGancho": {
            "tipo": "chile", "regiones": ["CL-RM"], "titulo": "Ejército de Chile",
            "puntos": [{"texto": "Santiago", "en": P_EJERCITO, "dice": "Ejército"}],
        },
        "grafico": {
            "tipo": "contador", "titulo": "El contrato que el Ejército cortó", "datos": D_COUGAR,
            "destacar": {"pais": "CONTRATO"}, "formato": {"decimales": 0},
        },
        "escenas": [
            {
                "tipo": "planteamiento",
                "texto": "El contrato se firmó en 2022 y cubría la mantención mayor de parte de la flota: la revisión profunda que devuelve al aire un helicóptero después de años de uso.",
                "visual": {"tipo": "foto", "busqueda": "Eurocopter AS532 Cougar Chilean Army helicopter",
                           "alternativas": ["Airbus Helicopters AS532 Cougar", "Ejercito de Chile helicoptero"],
                           "pie": "Helicóptero AS532 Cougar", "dice": "flota", "encuadre": "ken-burns"},
            },
            {
                "tipo": "dato", "usaGraficoPrincipal": True, "fuenteEnVoz": True,
                "texto": "Según BioBioChile Investiga, la división de compras del Ejército terminó el contrato de forma unilateral y en paralelo cobró garantías por 7 millones de dólares.",
                "cifras": [cifra("casi 46 mil millones", 46000, D_COUGAR, "valor", pais="CONTRATO", anio=2026, tol=0.02)],
            },
            {
                "tipo": "giro",
                "texto": "El desacuerdo es por un solo helicóptero: el H-284, que fue a reparación a Brasil, y por los trabajos extra que aparecieron ahí, fuera del alcance pactado. Airbus pidió un pronunciamiento a la Contraloría y lo obtuvo. El término llegó igual, y ninguna de las dos partes quiso declarar.",
                "rotulo": {"texto": "UN HELICÓPTERO", "dice": "helicóptero"},
            },
        ],
        "remate": "El contrato se terminó. Los helicópteros siguen esperando quién los repare.",
        "fuentes": [
            {"texto": "BioBioChile Investiga, término del contrato (25-11-2026)", "url": U_BBCL_COUGAR},
        ],
    })

# ============================================================ 05-12 Pensiones de alimentos
D_PENSIONES = ref("pensiones-alimentos-vias-2026", ["AFP", "BANCO"],
                  {"AFP": [[2026, 3.06]], "BANCO": [[2026, 0.82]]},
                  {"AFP": "Desde fondos de AFP", "BANCO": "Desde cuentas bancarias"},
                  "La Tercera, balance del Poder Judicial (18-11-2026)", U_LT_PENSIONES,
                  "Pagos ordenados por vía de cobro, 2022 a 2026", "billones de pesos")
D_TOTAL_PENS = ref("pensiones-alimentos-total-2026", ["ORDENADO"], {"ORDENADO": [[2026, 3.88]]},
                   {"ORDENADO": "Ordenado por los tribunales"},
                   "Cooperativa, balance del Poder Judicial (18-11-2026)", U_COOP_PENSIONES,
                   "Pagos ordenados entre el 18-11-2022 y el 17-11-2026", "billones de pesos")
short(
    "2026-12-05", "pensiones-de-alimentos-cuatro-anos",
    "Los tribunales ordenaron 3,88 billones en pensiones: ¿se pagaron?",
    "¿Cuánta plata ordenaron pagar los tribunales por pensiones de alimentos y cuánta llegó?\n"
    "El balance de los cuatro años del Registro Nacional de Deudores, presentado el 18-11-2026 por la presidenta de la Corte Suprema, Gloria Ana Chevesich, cuenta pagos ordenados por 3,88 billones de pesos entre el 18-11-2022 y el 17-11-2026: el 1,98 % del PIB de Chile.\n"
    "Casi el 79 % se cobró desde los fondos de AFP del deudor. De 728.700 inscripciones ordenadas, 376.644 siguen vigentes. El informe no dice cuánto de lo ordenado llegó efectivamente a las familias.\n"
    "Fuentes:\n"
    f"Cooperativa, balance de cuatro años (18-11-2026): {U_COOP_PENSIONES}\n"
    f"La Tercera, vías de cobro y PIB (18-11-2026): {U_LT_PENSIONES}\n"
    f"Pauta, inscripciones vigentes (19-11-2026): {U_PAUTA_PENSIONES}",
    ["#pensionesdealimentos", "#cortesuprema", "#chile"],
    {
        "gancho": {
            "texto": "Los tribunales de familia ordenaron pagar 3,88 billones de pesos en pensiones de alimentos en cuatro años: el 1,98 % del PIB de Chile.",
            "rotulo": "1,98 % DEL PIB",
            "cifras": [cifra("3,88 billones de pesos", 3.88, D_TOTAL_PENS, "valor", pais="ORDENADO", anio=2026, tol=0.01)],
        },
        "visualGancho": {
            "tipo": "chile", "regiones": ["CL-RM"], "titulo": "Tribunales de familia",
            "puntos": [{"texto": "Corte Suprema", "en": P_SUPREMA, "dice": "tribunales"},
                       {"texto": "San Miguel", "en": P_SAN_MIGUEL, "dice": "familia"}],
        },
        "grafico": {
            "tipo": "barras", "titulo": "De dónde salió la plata cobrada", "datos": D_PENSIONES,
            "destacar": {"pais": "AFP"}, "formato": {"decimales": 2},
        },
        "escenas": [
            {
                "tipo": "dato", "usaGraficoPrincipal": True, "fuenteEnVoz": True,
                "texto": "Según el balance que presentó la presidenta de la Corte Suprema, Gloria Ana Chevesich, casi el 79 % se cobró desde los fondos de AFP del deudor, y una parte mucho menor desde sus cuentas bancarias.",
                "cifras": [cifra("desde los fondos de AFP", 3.06, D_PENSIONES, "valor", pais="AFP", anio=2026, tol=0.01)],
            },
            {
                "tipo": "giro",
                "texto": "Acá está lo que el titular no dice: esa cifra es lo que los tribunales ordenaron pagar, no lo que llegó a las familias. El balance no entrega ese número.",
                "rotulo": {"texto": "ORDENADO NO ES PAGADO", "dice": "ordenaron"},
            },
            {
                "tipo": "planteamiento",
                "texto": "El registro funciona desde el 18 de noviembre de 2022. Desde entonces los tribunales ordenaron 728.700 inscripciones de deudores, y 376.644 siguen vigentes hoy.",
                "visual": {"tipo": "iconos", "titulo": "Inscripciones del registro", "items": [
                    {"icono": "📋", "texto": "Ordenadas", "valor": "728.700", "dice": "ordenaron"},
                    {"icono": "⏳", "texto": "Vigentes", "valor": "376.644", "marca": "no", "dice": "vigentes"},
                ]},
            },
        ],
        "remate": "La orden está contada hasta el último peso. Lo que llegó a cada casa, no.",
        "fuentes": [
            {"texto": "Cooperativa, balance de cuatro años (18-11-2026)", "url": U_COOP_PENSIONES},
            {"texto": "La Tercera, vías de cobro y PIB (18-11-2026)", "url": U_LT_PENSIONES},
            {"texto": "Pauta, inscripciones vigentes (19-11-2026)", "url": U_PAUTA_PENSIONES},
        ],
    })

# ============================================================ 06-12 Horas docentes
D_HORAS = ref("horas-docentes-ppto-2027", ["REPUESTAS", "RETIRO"],
              {"REPUESTAS": [[2027, 40000]], "RETIRO": [[2027, 43000]]},
              {"REPUESTAS": "Repuestas al presupuesto", "RETIRO": "Cubiertas con retiro"},
              "Cámara de Diputados, acuerdo de comisión mixta (25-11-2026)", U_CAMARA_PPTO,
              "Horas docentes de los servicios locales de educación", "horas")
short(
    "2026-12-06", "horas-docentes-presupuesto-2027",
    "Presupuesto 2027: vuelven 40 mil horas docentes, ¿y las 43 mil?",
    "¿Qué pasó con las horas de los profesores en el Presupuesto 2027?\n"
    "El acuerdo de la comisión mixta, aprobado por la Sala de la Cámara el 25-11-2026, repone hasta 40 mil horas docentes para los servicios locales de educación pública y asegura cupos y fondos de la bonificación por retiro voluntario para cubrir las otras 43 mil.\n"
    "Las dos cifras suman las 83 mil horas del ajuste de dotación que traía el proyecto. El Colegio de Profesores tradujo ese ajuste a casi 2 mil profesores y llamó a paro nacional el 24-11-2026: esa conversión a personas es del gremio, no del Ministerio de Educación.\n"
    "Fuentes:\n"
    f"Cámara de Diputados, acuerdo de comisión mixta (25-11-2026): {U_CAMARA_PPTO}\n"
    f"Pauta, paro y estimación del gremio (24-11-2026): {U_PAUTA_PROFES}",
    ["#presupuesto2027", "#profesores", "#chile"],
    {
        "gancho": {
            "texto": "La comisión mixta del Presupuesto 2027 repuso hasta 40 mil horas docentes para los servicios locales de educación, y dejó otras 43 mil al retiro voluntario.",
            "rotulo": "40 MIL HORAS",
            "cifras": [cifra("40 mil horas docentes", 40000, D_HORAS, "valor", pais="REPUESTAS", anio=2027, tol=0.01)],
        },
        "visualGancho": {
            "tipo": "chile", "regiones": ["CL-RM"], "titulo": "Ministerio de Educación",
            "puntos": [{"texto": "Santiago", "en": P_MINEDUC, "dice": "educación"}],
        },
        "grafico": {
            "tipo": "comparacion", "titulo": "Las horas docentes del Presupuesto 2027", "datos": D_HORAS,
            "destacar": {"pais": "REPUESTAS"}, "formato": {"decimales": 0},
        },
        "escenas": [
            {
                "tipo": "planteamiento",
                "texto": "Las horas docentes son horas de contrato: cuando un servicio local pierde horas, lo que se ajusta son los profesores.",
                "visual": {"tipo": "iconos", "titulo": "Qué es una hora docente", "items": [
                    {"icono": "🕐", "texto": "Hora de contrato", "dice": "contrato"},
                    {"icono": "🧑‍🏫", "texto": "Profesor con dotación", "dice": "profesores"},
                ]},
            },
            {
                "tipo": "giro",
                "texto": "Las dos cifras suman 83 mil horas: el ajuste de dotación completo que traía el proyecto. El Colegio de Profesores lo tradujo a casi 2 mil profesores y llamó a paro el 24 de noviembre de 2026. Esa conversión a personas es del gremio, no del Ministerio.",
                "rotulo": {"texto": "83 MIL EN TOTAL", "dice": "suman"},
            },
            {
                "tipo": "dato", "usaGraficoPrincipal": True, "fuenteEnVoz": True,
                "texto": "Según la Cámara de Diputados, el acuerdo asegura además cupos y fondos del retiro voluntario para cubrir las 43 mil horas que faltan.",
                "cifras": [cifra("43 mil horas", 43000, D_HORAS, "valor", pais="RETIRO", anio=2027, tol=0.01)],
            },
        ],
        "remate": "Las horas volvieron al presupuesto. Quién se queda con ellas se decide en 2027.",
        "fuentes": [
            {"texto": "Cámara de Diputados, acuerdo de comisión mixta (25-11-2026)", "url": U_CAMARA_PPTO},
            {"texto": "Pauta, paro y estimación del gremio (24-11-2026)", "url": U_PAUTA_PROFES},
        ],
    })

# ============================================================ 07-12 Pirata Gate
D_PIRATA2 = ref("pirata-gate-fiscalia-2026", ["SIN-ORIGEN", "RETIRO"],
                {"SIN-ORIGEN": [[2026, 57.2]], "RETIRO": [[2026, 230]]},
                {"SIN-ORIGEN": "Sin origen acreditado", "RETIRO": "Retiro en dos días"},
                "BioBioChile, petición de prisión preventiva (26-11-2026)", U_BBCL_PIRATA_PP,
                "Montos que cuestiona la Fiscalía", "millones de pesos")
D_PIRATA = ref("pirata-gate-perjuicio-2026", ["PERJUICIO"], {"PERJUICIO": [[2026, 632]]},
               {"PERJUICIO": "Perjuicio que calcula la PDI"},
               "La Tercera, detenciones del caso (25-11-2026)", U_LT_PIRATA,
               "Perjuicio fiscal investigado en el municipio de Coquimbo", "millones de pesos")
short(
    "2026-12-07", "pirata-gate-coquimbo-632-millones",
    "Coquimbo: 632 millones y 11 detenidos en el Pirata Gate",
    "¿Qué investiga la Fiscalía en la Municipalidad de Coquimbo?\n"
    "La PDI calcula un perjuicio fiscal de al menos 632 millones de pesos por contrataciones y pagos irregulares entre 2019 y 2021. El 24-11-2026 fueron detenidas 11 personas, entre ellas el exalcalde Marcelo Pereira, que encabezó el municipio entre 2016 y 2021. La Fiscalía investiga fraude al fisco, asociación criminal, lavado de activos, enriquecimiento ilícito y negociación incompatible.\n"
    "En la formalización del 26-11-2026 la Fiscalía pidió prisión preventiva para el exalcalde y cuestionó 57,2 millones sin origen acreditado y un retiro de 230 millones en dos días. Ese día el tribunal decretó cautelares para ocho de los once imputados y fijó seis meses de investigación, con la situación del exalcalde aún sin resolver. Hay dos querellas, del Consejo de Defensa del Estado y del municipio actual. Todo lo anterior es lo que acusa la Fiscalía: nadie está condenado y la defensa del exalcalde no había hecho declaraciones públicas al cierre de este guion, el 26-11-2026.\n"
    "Fuentes:\n"
    f"La Tercera, perjuicio y detenciones (25-11-2026): {U_LT_PIRATA}\n"
    f"Emol, los once detenidos (25-11-2026): {U_EMOL_PIRATA}\n"
    f"BioBioChile, prisión preventiva pedida (26-11-2026): {U_BBCL_PIRATA_PP}\n"
    f"BioBioChile, cautelares y plazo (26-11-2026): {U_BBCL_PIRATA_CAUT}",
    ["#coquimbo", "#piratagate", "#chile"],
    {
        "gancho": {
            "texto": "La PDI calcula un perjuicio de al menos 632 millones de pesos en la Municipalidad de Coquimbo.",
            "rotulo": "632 MILLONES",
            "cifras": [cifra("632 millones de pesos", 632, D_PIRATA, "valor", pais="PERJUICIO", anio=2026, tol=0.01)],
        },
        "visualGancho": {
            "tipo": "chile", "regiones": ["CL-CO"], "titulo": "Municipalidad de Coquimbo",
            "puntos": [{"texto": "Coquimbo", "en": P_COQUIMBO, "dice": "Coquimbo"}],
        },
        "grafico": {
            "tipo": "contador", "titulo": "El perjuicio que calcula la PDI", "datos": D_PIRATA,
            "destacar": {"pais": "PERJUICIO"}, "formato": {"decimales": 0},
        },
        "escenas": [
            {
                "tipo": "dato", "usaGraficoPrincipal": True, "fuenteEnVoz": True,
                "texto": "Según La Tercera, la investigación apunta a contrataciones y pagos irregulares. El 24 de noviembre de 2026 fueron detenidas 11 personas, entre ellas el exalcalde Marcelo Pereira.",
                "cifras": [cifra("632 millones", 632, D_PIRATA, "valor", pais="PERJUICIO", anio=2026, tol=0.01)],
            },
            {
                "tipo": "dato", "usaGraficoPrincipal": True,
                "texto": "En la formalización del 26 de noviembre la Fiscalía pidió prisión preventiva para el exalcalde: cuestiona 57,2 millones sin origen acreditado y un retiro de 230 millones en dos días.",
                "cifras": [cifra("57,2 millones", 57.2, D_PIRATA2, "valor", pais="SIN-ORIGEN", anio=2026, tol=0.01),
                           cifra("230 millones", 230, D_PIRATA2, "valor", pais="RETIRO", anio=2026, tol=0.01)],
            },
            {
                "tipo": "giro",
                "texto": "Ese mismo día el tribunal decretó cautelares para ocho de los once imputados y fijó seis meses de investigación, con la situación del exalcalde sin resolver. Esto es lo que acusa la Fiscalía: nadie está condenado.",
                "rotulo": {"texto": "SEIS MESES", "dice": "plazo"},
            },
        ],
        "remate": "El cálculo son 632 millones. Quién responde por ellos se define en seis meses.",
        "fuentes": [
            {"texto": "La Tercera, perjuicio y detenciones (25-11-2026)", "url": U_LT_PIRATA},
            {"texto": "Emol, los once detenidos (25-11-2026)", "url": U_EMOL_PIRATA},
            {"texto": "BioBioChile, petición de prisión preventiva (26-11-2026)", "url": U_BBCL_PIRATA_PP},
            {"texto": "BioBioChile, cautelares y plazo de investigación (26-11-2026)", "url": U_BBCL_PIRATA_CAUT},
        ],
    })

# ============================================================ 08-12 Dólar y Banco Central (dilema, experimento B)
D_DOLAR = ref("dolar-proyeccion-jpmorgan-2027", ["DOLAR"],
              {"DOLAR": [[0, 1046], [1, 1100], [2, 1200]]},
              {"DOLAR": "Dólar observado y proyectado"},
              "BioBioChile (26-11-2026) el dato de hoy; Pauta (26-11-2026) la proyección", U_PAUTA_JPM,
              "Dólar en pesos: hoy y la proyección de J.P. Morgan", "pesos",
              {"0": "26-11-2026", "1": "1T 2027", "2": "jun 2027"})
short(
    "2026-12-08", "dilema-dolar-intervencion-banco-central",
    "El dólar tocó 1.046 pesos: ¿intervendrías el mercado?",
    "¿Debería el Banco Central intervenir el mercado para bajar el dólar?\n"
    "El 26-11-2026 el dólar tocó 1.046 pesos, según BioBioChile. El informe Global FX Strategy 2027 de J.P. Morgan lo proyecta en 1.100 pesos el primer trimestre de 2027, con su máximo de 1.200 en junio, y sobre los 1.000 pesos durante todo 2027.\n"
    "La presidenta del Banco Central, Rosanna Costa, dijo el 25-11-2026 que no ve motivos para intervenir: atribuyó la caída del peso a que el cobre bajó cerca de 20 % en un mes, al dólar fuerte en el mundo y al bajo crecimiento de Chile. Intervenir significa vender reservas para bajar el precio.\n"
    "Tu respuesta va en los comentarios.\n"
    "Fuentes:\n"
    f"BioBioChile, el dólar en 1.046 pesos (26-11-2026): {U_BBCL_DOLAR}\n"
    f"Pauta, proyección de J.P. Morgan (26-11-2026): {U_PAUTA_JPM}\n"
    f"Pauta, Rosanna Costa descarta intervenir (25-11-2026): {U_PAUTA_COSTA}",
    ["#dolar", "#bancocentral", "#chile"],
    {
        "gancho": {
            "texto": "El dólar tocó 1.046 pesos, y J.P. Morgan proyecta que llegue a 1.200 en junio de 2027.",
            "rotulo": "1.046 PESOS",
            "cifras": [cifra("1.046 pesos", 1046, D_DOLAR, "valor", pais="DOLAR", anio=0, tol=0.01)],
        },
        "visualGancho": {
            "tipo": "chile", "regiones": ["CL-RM"], "titulo": "Banco Central",
            "puntos": [{"texto": "Santiago", "en": P_BCENTRAL, "dice": "dólar"}],
        },
        "grafico": {
            "tipo": "lineas", "titulo": "La ruta que proyecta J.P. Morgan", "datos": D_DOLAR,
            "destacar": {"pais": "DOLAR"}, "formato": {"decimales": 0},
        },
        "escenas": [
            {
                "tipo": "dato", "usaGraficoPrincipal": True, "fuenteEnVoz": True,
                "texto": "Según Pauta, el informe del banco pone el dólar en 1.100 pesos el primer trimestre de 2027, con el máximo en junio, y después cediendo, pero sobre los 1.000 todo el año.",
                "cifras": [cifra("1.100 pesos", 1100, D_DOLAR, "valor", pais="DOLAR", anio=1, tol=0.01)],
            },
            {
                "tipo": "planteamiento",
                "texto": "La presidenta del Banco Central, Rosanna Costa, dio tres razones: el cobre cayó cerca de 20 % en un mes, el dólar se fortaleció en el mundo y Chile crece poco.",
                "visual": {"tipo": "iconos", "titulo": "Las tres razones de Costa", "items": [
                    {"icono": "⛏️", "texto": "Cobre", "valor": "-20 % en un mes", "marca": "no", "dice": "cobre"},
                    {"icono": "💵", "texto": "Dólar fuerte", "dice": "mundo"},
                    {"icono": "📉", "texto": "Crecimiento bajo", "marca": "no", "dice": "crece"},
                ]},
            },
            {
                "tipo": "giro",
                "texto": "Costa dijo algo más: que no ve motivos para intervenir, porque el mercado está funcionando. Intervenir significa vender reservas para bajar el precio. ¿Tú lo harías? Déjalo en los comentarios.",
                "rotulo": {"texto": "SIN INTERVENIR", "dice": "intervenir"},
            },
        ],
        "remate": "El precio lo pone el mercado. No tocarlo también es una decisión.",
        "fuentes": [
            {"texto": "BioBioChile, el dólar en 1.046 pesos (26-11-2026)", "url": U_BBCL_DOLAR},
            {"texto": "Pauta, proyección de J.P. Morgan (26-11-2026)", "url": U_PAUTA_JPM},
            {"texto": "Pauta, Rosanna Costa descarta intervenir (25-11-2026)", "url": U_PAUTA_COSTA},
            {"texto": "BioBioChile, caída del cobre y del peso (26-11-2026)", "url": U_BBCL_PESO},
        ],
    })

# ============================================================ 09-12 Tráiler del largo
D_ANOS = ref("iansa-anos-remolacha", ["ANOS"], {"ANOS": [[2026, 73]]},
             {"ANOS": "Años de azúcar de remolacha"},
             "Emol, fin de la producción de azúcar de remolacha (25-11-2026)", U_EMOL_IANSA,
             "Años del negocio con el que nació Iansa", "años")
short(
    "2026-12-09", "trailer-nuble-sin-remolacha",
    "Iansa cierra 73 años de azúcar de remolacha chilena",
    "¿Por qué Chile deja de hacer azúcar con remolacha propia?\n"
    "El 25-11-2026 el directorio de Empresas Iansa acordó descontinuar la producción de azúcar de remolacha, el negocio con el que la empresa nació hace 73 años. La planta de Linares cerró en 2018 y la de Los Ángeles en 2020; la de San Carlos, en Ñuble, seguirá funcionando, pero refinando azúcar cruda importada.\n"
    "Video completo hoy a las 19:00: qué pasó con las hectáreas sembradas, con los cerca de 240 agricultores que quedaron sin comprador y con las plantas que se apagaron una por una.\n"
    "Fuentes:\n"
    f"Emol, cierre del negocio de remolacha (25-11-2026): {U_EMOL_IANSA}\n"
    f"La Tercera, impacto en los resultados (25-11-2026): {U_LT_IANSA}\n"
    f"Cooperativa, la planta de San Carlos (25-11-2026): {U_COOP_IANSA}",
    ["#iansa", "#nuble", "#chile"],
    {
        "gancho": {
            "texto": "Iansa cerró el negocio con el que nació hace 73 años: hacer azúcar con remolacha chilena.",
            "rotulo": "73 AÑOS",
            "cifras": [cifra("73 años", 73, D_ANOS, "valor", pais="ANOS", anio=2026, tol=0.01)],
        },
        "visualGancho": {
            "tipo": "chile", "regiones": ["CL-NB", "CL-BI", "CL-ML"],
            "puntos": [
                {"texto": "San Carlos", "en": P_SAN_CARLOS, "dice": "azúcar"},
                {"texto": "Los Ángeles", "en": P_LOS_ANGELES, "dice": "remolacha"},
            ],
        },
        "grafico": {
            "tipo": "contador", "titulo": "Lo que duró la remolacha chilena", "datos": D_ANOS,
            "destacar": {"pais": "ANOS"}, "formato": {"decimales": 0, "sufijo": " años"},
        },
        "escenas": [
            {
                "tipo": "planteamiento",
                "texto": "En 1953 la Corfo creó la Industria Azucarera Nacional para que Chile hiciera su propia azúcar, y la primera planta se levantó en Los Ángeles.",
                "visual": {"tipo": "foto", "busqueda": "sugar beet harvest field",
                           "alternativas": ["sugar beet roots pile", "sugar beet farming"],
                           "pie": "Remolacha azucarera", "dice": "raíz", "encuadre": "ken-burns"},
            },
            {
                "tipo": "dato", "usaGraficoPrincipal": True, "fuenteEnVoz": True,
                "texto": "Según Emol, la planta de Linares cerró en 2018 y la de Los Ángeles en 2020, y la producción quedó en Ñuble. El 25 de noviembre de 2026 el directorio puso fin también a eso.",
                "cifras": [cifra("73 años", 73, D_ANOS, "valor", pais="ANOS", anio=2026, tol=0.01)],
            },
            {
                "tipo": "giro",
                "texto": "La pregunta es qué pasó en el medio: con las hectáreas sembradas, con los agricultores que quedaron sin comprador y con las plantas que se apagaron una por una. Eso está en el video completo, hoy a las 19:00.",
                "rotulo": {"texto": "HOY A LAS 19:00", "dice": "completo"},
            },
        ],
        "remate": "El azúcar va a seguir saliendo de Ñuble. La remolacha chilena, no.",
        "enlaceLargo": ID_LARGO,
        "fuentes": [
            {"texto": "Emol, cierre del negocio de remolacha (25-11-2026)", "url": U_EMOL_IANSA},
            {"texto": "BioBioChile, origen de la empresa en 1953 (25-11-2026)", "url": U_BBCL_73},
            {"texto": "La Tercera, impacto de 37,8 millones de dólares (25-11-2026)", "url": U_LT_IANSA},
            {"texto": "Cooperativa, qué pasa con la planta de San Carlos (25-11-2026)", "url": U_COOP_IANSA},
        ],
    })

# ============================================================ 09-12 Largo: Ñuble sin remolacha
D_SUP = ref("remolacha-superficie-sembrada", ["HECTAREAS"],
            {"HECTAREAS": [[2018, 11400], [2022, 6284]]},
            {"HECTAREAS": "Superficie sembrada"},
            "Diario Financiero, cierre del negocio de remolacha (25-11-2026)", U_DF_IANSA,
            "Superficie sembrada con remolacha, según el Diario Financiero", "hectáreas")
D_LINARES = ref("iansa-linares-2018", ["PERSONAS"], {"PERSONAS": [[2018, 4000]]},
                {"PERSONAS": "Personas afectadas"},
                "Cooperativa, cierre de la planta de Linares (26-07-2018)", U_COOP_LINARES,
                "Afectados directos e indirectos por el cierre de Linares", "personas")
D_CONTRATOS = ref("iansa-contratos-2025", ["CONTRATOS", "COSECHADAS"],
                  {"CONTRATOS": [[2025, 440]], "COSECHADAS": [[2025, 7700]]},
                  {"CONTRATOS": "Contratos con agricultores", "COSECHADAS": "Hectáreas cosechadas"},
                  "BioBioChile, fin de la compra de remolacha (29-04-2026)", U_BBCL_ABRIL,
                  "Contratos de remolacha de la temporada 2025", "contratos")
D_CIERRE = ref("iansa-impacto-2026", ["IMPACTO", "ACTIVOS"],
               {"IMPACTO": [[2026, 37.8]], "ACTIVOS": [[2026, 28.6]]},
               {"IMPACTO": "Impacto en el resultado", "ACTIVOS": "Ajuste de activos"},
               "La Tercera, hecho esencial a la CMF (25-11-2026)", U_LT_IANSA,
               "Costo del cierre para la empresa", "millones de US$")
D_PRODUCTORES = ref("remolacheros-sin-comprador-2026", ["PRODUCTORES"], {"PRODUCTORES": [[2026, 240]]},
                    {"PRODUCTORES": "Productores sin comprador"},
                    "Emol, el difícil 2026 del agro chileno (09-06-2026)", U_EMOL_240,
                    "Productores de remolacha que quedaron sin comprador", "productores")
D_DESEMPLEO = ref("desocupacion-nuble-jas-2026", ["CL-NB", "CHL"],
                  {"CL-NB": [[2026, 11.8]], "CHL": [[2026, 9.8]]},
                  {"CL-NB": "Ñuble", "CHL": "Chile"},
                  "INE, Encuesta Nacional de Empleo julio-septiembre de 2026 (29-10-2026)", U_INE_NOTA,
                  "Tasa de desocupación", "%")

largo(
    "2026-12-09", "nuble-sin-remolacha",
    "¿Por qué Ñuble se queda con la planta y sin la remolacha?",
    "¿Por qué Chile deja de hacer azúcar con remolacha propia después de 73 años?\n"
    "En 1953 la Corfo creó la Industria Azucarera Nacional y levantó su primera planta en Los Ángeles. El 25-11-2026 el directorio de Empresas Iansa acordó descontinuar la producción de azúcar de remolacha chilena, con un impacto de 37,8 millones de dólares después de impuestos.\n"
    "Este video sigue la cadena completa: el cierre de Linares en 2018 con cerca de 4.000 personas afectadas, el fin de la producción en Los Ángeles en 2020, la superficie sembrada que bajó de 11.400 hectáreas en 2018-2019 a 6.284 cuatro temporadas después, los 440 contratos de 2025 y los cerca de 240 productores que quedaron sin comprador.\n"
    "La planta de San Carlos sigue funcionando, pero refinando azúcar cruda importada. Y Ñuble llega a este cierre con 11,8 % de desocupación, la tasa más alta del país según el INE.\n"
    "Fuentes:\n"
    f"Emol, fin de la producción de remolacha (25-11-2026): {U_EMOL_IANSA}\n"
    f"La Tercera, hecho esencial a la CMF (25-11-2026): {U_LT_IANSA}\n"
    f"Diario Financiero, superficie sembrada (25-11-2026): {U_DF_IANSA}\n"
    f"Cooperativa, cierre de Linares (26-07-2018): {U_COOP_LINARES}\n"
    f"BioBioChile, fin de la compra de remolacha (29-04-2026): {U_BBCL_ABRIL}\n"
    f"Emol, productores sin comprador (09-06-2026): {U_EMOL_240}\n"
    f"INE, desocupación de julio-septiembre de 2026 (29-10-2026): {U_INE_NOTA}\n"
    f"BioBioChile, consecuencias del cierre remolachero (25-11-2026): {U_BBCL_GOLPE}",
    ["#iansa", "#nuble", "#remolacha", "#chile"],
    {
        "cabecera": "ÑUBLE Y LA REMOLACHA · 1953-2026",
        "estructura": "autopsia",
        "indice": ["La fábrica de 1953", "Linares y Los Ángeles", "La superficie que cae", "La cuenta de 2026"],
        "gancho": {
            "texto": "Año 1953. El Estado chileno, a través de la Corfo, crea una empresa para hacer algo que el país no hacía: su propia azúcar, con una raíz que crece en el valle central, la remolacha. La primera planta se levanta en Los Ángeles, en la región del Biobío, y el negocio es ese: comprarles remolacha a los agricultores de la zona y venderle azúcar al país, año tras año, con contrato firmado antes de la siembra. Setenta y tres años después, el 25 de noviembre de 2026, el directorio de esa misma empresa firma el acuerdo que termina con ese negocio. ¿Qué pasó en el medio?",
            "rotulo": "AÑO 1953",
        },
        "promesa": "Al final vas a saber por qué se apagó la remolacha chilena, qué quedó en los campos de Maule, Ñuble y Biobío, y de dónde va a venir el azúcar que Chile consume.",
        "capitulos": [
            {
                "titulo": "La fábrica que hacía azúcar chilena",
                "escenas": [
                    {
                        "tipo": "planteamiento",
                        "texto": "Para entender lo que se apagó hay que mirar el mapa del valle central. La remolacha azucarera no se siembra en cualquier parte: necesita suelo plano, riego y, sobre todo, una fábrica cerca, porque la raíz es pesada y conviene molerla a poca distancia de donde se cosecha. Por eso esta industria se armó siempre igual en todo el mundo: una planta en el medio de una zona agrícola y, alrededor, los agricultores que le venden. En Chile esa zona es la franja que va del Maule al Biobío, pasando por Ñuble. Ahí se sembró remolacha durante siete décadas, y ahí está hoy lo que queda del rubro.",
                        "visual": {"tipo": "chile", "regiones": ["CL-ML", "CL-NB", "CL-BI"],
                                   "puntos": [{"texto": "Los Ángeles", "en": P_LOS_ANGELES, "dice": "franja"}],
                                   "titulo": "La franja de la remolacha"},
                    },
                    {
                        "tipo": "planteamiento",
                        "texto": "La remolacha azucarera es una raíz blanca, parecida a un nabo grande. No llega entera a la mesa de nadie: se muele, se le saca el jugo y de ese jugo sale el azúcar. Para el agricultor es un cultivo de contrato, y esa palabra es la que importa en toda esta historia: se siembra porque hay alguien que se compromete a comprar la cosecha, a un precio, antes de que la semilla toque la tierra. Nadie siembra una temporada completa de trabajo para después salir a buscar comprador. Sin contrato, la remolacha simplemente no se siembra.",
                        "visual": {"tipo": "foto", "busqueda": "sugar beet harvest roots field",
                                   "alternativas": ["sugar beet pile harvest", "sugar beet farming tractor"],
                                   "pie": "Remolacha azucarera", "dice": "raíz", "encuadre": "ken-burns"},
                        "rotulo": {"texto": "CULTIVO DE CONTRATO", "dice": "contrato"},
                        "sellos": [{"texto": "AZÚCAR", "dice": "jugo"}, {"texto": "A PRECIO", "dice": "precio"}, {"texto": "SIN FIRMA", "dice": "Sin"}],
                    },
                    {
                        "tipo": "dato", "fuenteEnVoz": True,
                        "texto": "Según Emol, ese negocio, el de hacer azúcar con remolacha chilena, duró 73 años: es el negocio con el que la empresa nació en 1953 y el que cerró en noviembre de 2026. En el medio hay plantas que abrieron, plantas que cerraron y una superficie sembrada que se fue encogiendo temporada por temporada. La historia no es un portazo: es una resta que duró décadas. Importa decirlo al principio, porque el titular de noviembre suena a decisión repentina y no lo es: cada pieza de este cierre estaba puesta con años de anticipación, a la vista de todos, en documentos públicos y en declaraciones de la propia empresa.",
                        "grafico": {"tipo": "contador", "titulo": "Lo que duró la remolacha chilena",
                                    "datos": D_ANOS, "destacar": {"pais": "ANOS"},
                                    "formato": {"decimales": 0, "sufijo": " años"}},
                        "sellos": [{"texto": "73 AÑOS", "dice": "noviembre", "animo": "triste"}, {"texto": "DÉCADAS", "dice": "décadas"}],
                        "cifras": [cifra("73 años", 73, D_ANOS, "valor", pais="ANOS", anio=2026, tol=0.01)],
                    },
                    {
                        "tipo": "giro",
                        "texto": "Y acá aparece lo que explica casi todo lo que viene. El azúcar es una materia prima que se transa en el mundo entero, y su precio no lo pone Chile: lo ponen las grandes cosechas de otros países. Cuando el azúcar importada está barata, la remolacha chilena queda cara, por buena que haya sido la temporada acá. Esa es la razón que la empresa dio en 2018, cuando cerró la planta de Linares, y es la misma que dio en 2026, cuando cerró el negocio completo: precio internacional bajo y costos propios altos. Ocho años separan esas dos frases y son casi la misma frase.",
                        "visual": {"tipo": "iconos", "titulo": "La cuenta que no cierra", "items": [
                            {"icono": "🌍", "texto": "Precio mundial", "marca": "no", "dice": "mundo"},
                            {"icono": "💸", "texto": "Costos locales", "marca": "no", "dice": "costos"},
                        ]},
                        "rotulo": {"texto": "EL PRECIO VIENE DE AFUERA", "dice": "precio"},
                    },
                ],
            },
            {
                "titulo": "Linares 2018, Los Ángeles 2020",
                "escenas": [
                    {
                        "tipo": "planteamiento",
                        "texto": "El final no fue un día: fue una fila de cierres repartida en años. En julio de 2018 la empresa confirmó que cerraba su planta de Linares, en el Maule. El Gobierno de la época le pidió postergar la decisión y no lo consiguió. Y la explicación oficial de entonces ya traía las dos piezas completas: la baja sostenida del precio internacional del azúcar y la reducción de la superficie de remolacha sembrada en el país. Linares no era una planta cualquiera: era la que compraba la remolacha del Maule, y su cierre dejó a esa parte del valle fuera del negocio ocho años antes que al resto. El gremio agrícola de la zona lo dijo entonces y lo repitió en 2026: lo más grave no es la planta, es dejar de sembrar.",
                        "visual": {"tipo": "chile", "regiones": ["CL-ML"],
                                   "puntos": [{"texto": "Linares", "en": P_LINARES, "dice": "Linares"}],
                                   "titulo": "Linares, 2018"},
                    },
                    {
                        "tipo": "dato", "fuenteEnVoz": True,
                        "texto": "Según Cooperativa, ese cierre afectó a cerca de 4.000 personas de forma directa e indirecta: trabajadores de la planta, temporeros, transportistas y agricultores que le vendían a esa fábrica. Un año después, Emol volvió a Linares y el tema seguía siendo el mismo: el desempleo y los esfuerzos por capacitar a los afectados. Una planta de azúcar no es solo una planta: es el único comprador de un cultivo en toda su zona.",
                        "grafico": {"tipo": "contador", "titulo": "Afectados por el cierre de Linares",
                                    "datos": D_LINARES, "destacar": {"pais": "PERSONAS"},
                                    "formato": {"decimales": 0}},
                        "sellos": [{"texto": "4.000", "dice": "temporeros", "animo": "triste"}],
                        "rotulo": {"texto": "UN SOLO COMPRADOR", "dice": "comprador"},
                        "cifras": [cifra("cerca de 4.000 personas", 4000, D_LINARES, "valor", pais="PERSONAS", anio=2018, tol=0.02)],
                    },
                    {
                        "tipo": "reenganche",
                        "texto": "Dos años después de Linares se apagó la planta donde todo había empezado.",
                    },
                    {
                        "tipo": "giro",
                        "texto": "Según Emol, la planta de Los Ángeles dejó de producir azúcar en 2020, y la producción quedó concentrada en Ñuble. O sea: la planta con la que empezó todo dejó de hacer azúcar, y el rubro quedó dependiendo de la única fábrica del país que seguía elaborando azúcar con remolacha, la de San Carlos. A partir de ahí, cualquier decisión sobre esa planta era la decisión de toda la industria.",
                        "visual": {"tipo": "chile", "regiones": ["CL-BI", "CL-NB"],
                                   "puntos": [{"texto": "Los Ángeles", "en": P_LOS_ANGELES, "dice": "Ángeles"},
                                              {"texto": "San Carlos", "en": P_SAN_CARLOS, "dice": "Carlos"}],
                                   "titulo": "De dos plantas a una", "dice": "planta"},
                        "rotulo": {"texto": "QUEDA UNA PLANTA", "dice": "sola"},
                    },
                ],
            },
            {
                "titulo": "La superficie que se fue del valle",
                "escenas": [
                    {
                        "tipo": "planteamiento",
                        "texto": "Con una sola planta comprando, el cultivo se volvió una cuenta simple para el agricultor: si el contrato que ofrece la empresa rinde menos que el maíz o que un huerto de avellanos, la remolacha no se siembra ese año. Esa decisión se puede medir, porque la superficie sembrada se cuenta cada temporada. Y la escala de lo que se perdió está en esa medición: según BioBioChile, en su mejor momento el rubro llegó a más de 60 mil hectáreas sembradas en el país, con cinco plantas funcionando. Lo que quedaba el año pasado es una fracción de eso.",
                        "visual": {"tipo": "iconos", "titulo": "Lo que compite con la remolacha", "items": [
                            {"icono": "🌽", "texto": "Maíz", "dice": "maíz"},
                            {"icono": "🌾", "texto": "Trigo", "dice": "trigo"},
                            {"icono": "🌰", "texto": "Avellano", "dice": "avellanos"},
                        ]},
                    },
                    {
                        "tipo": "dato", "fuenteEnVoz": True,
                        "texto": "Según el Diario Financiero, la superficie sembrada con remolacha bajó de cerca de 11.400 hectáreas en la temporada 2018-2019 a 6.284 hectáreas cuatro temporadas después. Es casi la mitad en cuatro años, y la caída viene de antes: arranca con el cierre de Linares y sigue temporada por temporada, mientras San Carlos seguía moliendo.",
                        "grafico": {"tipo": "lineas", "titulo": "Hectáreas de remolacha, según el DF",
                                    "datos": D_SUP, "destacar": {"pais": "HECTAREAS"},
                                    "formato": {"decimales": 0}, "dice": "superficie"},
                        "cifras": [cifra("cerca de 11.400 hectáreas", 11400, D_SUP, "valor", pais="HECTAREAS", anio=2018, tol=0.02),
                                   cifra("6.284 hectáreas", 6284, D_SUP, "valor", pais="HECTAREAS", anio=2022, tol=0.01)],
                    },
                    {
                        "tipo": "dato", "fuenteEnVoz": True,
                        "texto": "En abril de 2026 llegó el aviso que lo cambió todo. Según BioBioChile, la empresa comunicó que no iba a comprar remolacha para la temporada 2026-2027. Ese año tenía 440 contratos con agricultores y había cosechado más de 7.700 hectáreas. Quien decidía cuántas hectáreas de remolacha se iban a sembrar en Chile no era el Ministerio ni el agricultor: era el único comprador que quedaba.",
                        "grafico": {"tipo": "contador", "titulo": "Contratos de remolacha en 2025",
                                    "datos": D_CONTRATOS, "destacar": {"pais": "CONTRATOS"},
                                    "formato": {"decimales": 0}},
                        "cifras": [cifra("440 contratos", 440, D_CONTRATOS, "valor", pais="CONTRATOS", anio=2025, tol=0.01),
                                   cifra("más de 7.700 hectáreas", 7700, D_CONTRATOS, "valor", pais="COSECHADAS", anio=2025, tol=0.02)],
                    },
                    {
                        "tipo": "reenganche",
                        "texto": "Cuando el único comprador se va, lo que queda no es una mala temporada.",
                    },
                    {
                        "tipo": "giro",
                        "texto": "El ministro de Agricultura, Jaime Campos, lo dijo en mayo de 2026, según el Diario Financiero: advirtió que la decisión podía significar el término de la producción de azúcar en Chile a partir de remolacha nacional. Era el ministro del sector describiendo el escenario siete meses antes de que ocurriera. En noviembre de 2026, eso es exactamente lo que el directorio escribió en su acuerdo.",
                        "visual": {"tipo": "iconos", "titulo": "La advertencia de mayo", "items": [
                            {"icono": "📄", "texto": "Aviso de abril", "dice": "decisión"},
                            {"icono": "🏛️", "texto": "Ministerio", "dice": "ministro"},
                        ], "dice": "Campos"},
                        "rotulo": {"texto": "SIETE MESES ANTES", "dice": "siete"},
                    },
                ],
            },
            {
                "titulo": "La cuenta de 2026 y lo que queda",
                "escenas": [
                    {
                        "tipo": "planteamiento",
                        "texto": "El 25 de noviembre de 2026 la empresa informó a la Comisión para el Mercado Financiero que su directorio había acordado descontinuar la producción de azúcar de remolacha. Esa frase dice menos de lo que parece y también más. La planta de San Carlos, en Ñuble, no cierra: va a seguir funcionando, pero refinando azúcar cruda importada, principalmente de caña. La fábrica queda y sigue operando, con azúcar que llega de otro continente. Lo que se termina es el cultivo, y con el cultivo se termina la parte de la cadena que estaba en el campo: la siembra, el riego, la cosecha y el flete de la raíz hasta la planta. El azúcar que sale por la puerta de San Carlos va a ser la misma; lo que entra por la otra puerta, no.",
                        "visual": {"tipo": "chile", "regiones": ["CL-NB"],
                                   "puntos": [{"texto": "San Carlos", "en": P_SAN_CARLOS, "dice": "planta"}],
                                   "titulo": "San Carlos, Ñuble"},
                    },
                    {
                        "tipo": "dato", "fuenteEnVoz": True,
                        "texto": "Según La Tercera, el cierre le cuesta a la empresa 37,8 millones de dólares después de impuestos. Antes de impuestos, 28,6 millones de ese ajuste son propiedades, plantas, equipos y repuestos de la producción de remolacha. Esa segunda cifra es la que mide el tamaño de lo que se cierra: es el valor contable de una industria que ya no va a operar, borrado de un balance en un día.",
                        "grafico": {"tipo": "comparacion", "titulo": "Lo que cuesta cerrar, en millones de dólares",
                                    "datos": D_CIERRE, "destacar": {"pais": "IMPACTO"},
                                    "formato": {"decimales": 1}, "dice": "cuesta"},
                        "cifras": [cifra("37,8 millones de dólares", 37.8, D_CIERRE, "valor", pais="IMPACTO", anio=2026, tol=0.01),
                                   cifra("28,6 de esos millones", 28.6, D_CIERRE, "valor", pais="ACTIVOS", anio=2026, tol=0.01)],
                    },
                    {
                        "tipo": "reenganche",
                        "texto": "Al otro lado de esa cuenta hay gente que también está haciendo la suya.",
                    },
                    {
                        "tipo": "dato", "fuenteEnVoz": True,
                        "texto": "Según Emol, el aviso de abril dejó a cerca de 240 productores sin comprador. Algunos tienen una salida a la vista: la empresa Coexca ofreció en mayo comprar la producción de unas 2.500 hectáreas del Maule si los remolacheros se pasan al maíz. Pero cambiar de cultivo no es cambiar de semilla: cambian la maquinaria, el riego, los plazos y el contrato. Y no todos los suelos que servían para la remolacha sirven igual para otra cosa.",
                        "grafico": {"tipo": "contador", "titulo": "Productores que quedaron sin comprador",
                                    "datos": D_PRODUCTORES, "destacar": {"pais": "PRODUCTORES"},
                                    "formato": {"decimales": 0}},
                        "sellos": [{"texto": "2.500 HA", "dice": "maíz"}],
                        "rotulo": {"texto": "CAMBIAR DE CULTIVO", "dice": "cultivo"},
                        "cifras": [cifra("cerca de 240 productores", 240, D_PRODUCTORES, "valor", pais="PRODUCTORES", anio=2026, tol=0.02)],
                    },
                    {
                        "tipo": "giro",
                        "texto": "El azúcar que Chile consume no desaparece: cambia de origen. La planta de San Carlos va a refinar caña importada, y el mayor exportador de azúcar del mundo es Brasil. La misma planta que molía remolacha de Ñuble va a procesar caña que llegó en barco, y el azúcar seguirá diciendo Iansa en el supermercado. Cambió el campo que la produce, no la marca del paquete.",
                        "visual": {"tipo": "mapa", "destacar": ["BRA", "CHL"], "zoom": 3,
                                   "flechas": [{"desde": "BRA", "hasta": "CHL", "texto": "caña"}],
                                   "etiquetas": [{"texto": "San Carlos", "en": P_SAN_CARLOS}],},
                        "rotulo": {"texto": "LA MISMA MARCA", "dice": "marca"},
                    },
                    {
                        "tipo": "significado",
                        "texto": "Para quien vive en la zona esto se nota en algo muy concreto: una temporada que no se siembra es una temporada que no contrata. La remolacha ocupaba manos en la siembra, en la cosecha y en la planta, y esas manos estaban en las tres regiones donde el cultivo existía. El cultivo no estaba repartido por todo Chile: estaba concentrado en un lugar preciso del mapa, y es ahí donde se siente completo. Ñuble, además, llega a este cierre en la peor posición posible para absorber un golpe así, y eso no es una impresión: está medido, trimestre por trimestre, por el organismo que lleva la cuenta del empleo en Chile.",
                        "visual": {"tipo": "chile", "regiones": ["CL-NB", "CL-BI", "CL-ML"],
                                   "titulo": "Donde estaba el cultivo"},
                    },
                ],
            },
        ],
        "numeroQueNadieMira": {
            "texto": "Y el número que nadie mira en esta historia no es de la empresa: es del INE. En el trimestre julio-septiembre de 2026, Ñuble tuvo 11,8 % de desocupación, la tasa más alta de Chile, contra 9,8 % del país. La región que pierde su cultivo de contrato es justamente la que tiene menos espacio para reubicar a la gente que ese cultivo ocupaba.",
            "grafico": {"tipo": "comparacion", "titulo": "Desocupación: Ñuble y Chile",
                        "datos": D_DESEMPLEO, "destacar": {"pais": "CL-NB"},
                        "formato": {"decimales": 1, "sufijo": " %"}},
            "cifras": [cifra("11,8 % de desocupación", 11.8, D_DESEMPLEO, "valor", pais="CL-NB", anio=2026, tol=0.01),
                       cifra("9,8 % del país", 9.8, D_DESEMPLEO, "valor", pais="CHL", anio=2026, tol=0.01)],
        },
        "remate": "La planta de San Carlos sigue encendida. El azúcar que refina ya no crece en Ñuble.",
        "siguiente": "Si el azúcar ahora llega de afuera, ¿qué otro cultivo chileno depende hoy de un solo comprador?",
        "miniatura": {"texto": "ÑUBLE SIN REMOLACHA"},
        "fuentes": [
            {"texto": "Emol, fin de la producción de azúcar de remolacha (25-11-2026)", "url": U_EMOL_IANSA},
            {"texto": "BioBioChile, origen de la empresa en 1953 (25-11-2026)", "url": U_BBCL_73},
            {"texto": "La Tercera, hecho esencial a la CMF (25-11-2026)", "url": U_LT_IANSA},
            {"texto": "Diario Financiero, superficie sembrada (25-11-2026)", "url": U_DF_IANSA},
            {"texto": "Emol, Linares un año después del cierre (09-07-2019)", "url": U_EMOL_LINARES_1A},
            {"texto": "Cooperativa, cierre de la planta de Linares (26-07-2018)", "url": U_COOP_LINARES},
            {"texto": "BioBioChile, fin de la compra de remolacha (29-04-2026)", "url": U_BBCL_ABRIL},
            {"texto": "Emol, productores sin comprador (09-06-2026)", "url": U_EMOL_240},
            {"texto": "Emol, oferta de reconversión al maíz (22-05-2026)", "url": U_EMOL_COEXCA},
            {"texto": "Diario Financiero, advertencia del ministro Campos (05-05-2026)", "url": U_DF_CAMPOS},
            {"texto": "Cooperativa, qué pasa con la planta de San Carlos (25-11-2026)", "url": U_COOP_IANSA},
            {"texto": "INE, desocupación de julio-septiembre de 2026 (29-10-2026)", "url": U_INE_NOTA},
            {"texto": "BioBioChile, consecuencias del cierre remolachero (25-11-2026)", "url": U_BBCL_GOLPE},
            {"texto": "Diario Financiero, el Gobierno no logró postergar el cierre de Linares", "url": U_DF_LINARES},
        ],
    })
