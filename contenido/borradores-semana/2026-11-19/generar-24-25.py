#!/usr/bin/env python3
"""Genera los JSON de los Shorts del 24 y 25-11-2026 y del largo del 25-11-2026 desde datos verificados el 17-11-2026
(verificacion-24-25.md). Misma idea que generar.py: una corrección de cifra se hace en UN lugar y se regenera:
  python3 -I contenido/borradores-semana/2026-11-19/generar-24-25.py"""
import json, os
D = os.path.dirname(os.path.abspath(__file__))  # los borradores viven en contenido/borradores-semana/ (NO en semana/) hasta que el revisor los apruebe
DESC_PIE = "\n\nVoz sintética generada por computador. Cada cifra lleva su fuente en pantalla.\nEntender Chile. El resumen sin gritos."

def ref(indicador, entidades, valores, nombres, fuente, url, etiqueta, unidad, etiquetasX=None):
    r = {"fuente": "manual", "indicador": indicador, "paises": entidades, "valores": valores, "nombres": nombres,
         "fuenteTexto": fuente, "fuenteUrl": url, "etiqueta": etiqueta, "unidad": unidad}
    if etiquetasX: r["etiquetasX"] = etiquetasX
    return r

def cif(texto, valor, datos, op, pais, anio, paisB=None, tol=None):
    c = {"operacion": op, "pais": pais, "anio": anio}
    if paisB: c["paisB"] = paisB
    out = {"texto": texto, "valor": valor, "calculo": {"datos": datos, **c}}
    if tol is not None: out["tolerancia"] = tol
    return out

def guardar(fecha, slug, plantilla, titulo, desc, hashtags, props, hora):
    id_ = f"{fecha}-{'short' if plantilla == 'grafico' else 'largo'}-{slug}"
    props["id"] = id_
    env = {"plantilla": plantilla, "id": id_, "titulo": titulo, "descripcion": desc + DESC_PIE,
           "hashtags": hashtags, "publicar": f"{fecha}T{hora}", "props": props}
    with open(os.path.join(D, f"{id_}.json"), "w") as f:
        json.dump(env, f, ensure_ascii=False, indent=2); f.write("\n")
    print("ok", id_)

INE_ENE = "https://www.ine.gob.cl/estadisticas/sociales/mercado-laboral/ocupacion-y-desocupacion"
INE_PRENSA = "https://www.ine.gob.cl/sala-de-prensa/prensa/general/noticia/2026/10/29/la-tasa-de-desocupaci%C3%B3n-nacional-fue-9-8-en-el-trimestre-julio-septiembre-de-2026"
EMOL_IMACEC_SEP = "https://www.emol.com/noticias/Economia/2026/11/02/1215849/imacec-septiembre-banco-central.html"
EMOL_IMACEC_AGO = "https://www.emol.com/noticias/Economia/2026/10/01/1212912/imacec-de-agosto.html"
DF_QUIROZ = "https://www.df.cl/economia-y-politica/actualidad/quiroz-admite-que-chile-esta-en-recesion-tecnica-pero-asegura-que-sera"
EMOL_CCNN = "https://www.emol.com/noticias/Economia/2026/08/18/1208798/cuentas-nacionales-banco-central.html"
EMOL_DEBATE = "https://www.emol.com/noticias/Economia/2026/08/18/1208875/recesion-tecnica-debate.html"
EMOL_IPC = "https://www.emol.com/noticias/Economia/2026/11/06/1216291/ipc-inflacion-economia-ine.html"
EMOL_QUIROZ_CHILEDAY = "https://www.emol.com/noticias/Economia/2026/09/17/1211725/quiroz-tras-chileday.html"
EMOL_QUIROZ_AGO = "https://www.emol.com/noticias/Economia/2026/08/18/1208873/quiroz-recesion-tecnica.html"
BC_RPM = "https://www.bcentral.cl/web/banco-central/contenido/-/detalle/prensa/comunicados-rpm/comunicado-reunion-de-politica-monetaria-octubre-2026"
EMOL_QUIROZ_NOV = "https://www.emol.com/noticias/Economia/2026/11/11/1216736/quiroz-recesion-tecnica.html"
CHOCALE_EEE = "https://chocale.cl/2026/10/encuesta-del-banco-central-proyecta-un-crecimiento-cercano-a-0-y-una-inflacion-sobre-la-meta-para-2026/"

# ============================================================ SHORT 1 · mar 24-11 · desempleo por región
R_REG = ref("desocupacion-regiones-jas-2026", ["CL-NB", "CL-AI"], {"CL-NB": [[2026, 11.8]], "CL-AI": [[2026, 4.0]]},
            {"CL-NB": "Ñuble", "CL-AI": "Aysén"},
            "INE, Encuesta Nacional de Empleo, trimestre julio a septiembre de 2026", INE_ENE, "Tasa de desocupación", "%")
R_NAC = ref("desocupacion-nacional-jas", ["N2026", "N2025"], {"N2026": [[2026, 9.8]], "N2025": [[2026, 8.5]]},
            {"N2026": "Jul-sep 2026", "N2025": "Jul-sep 2025"},
            "INE, ENE nacional, trimestres julio a septiembre de 2026 y 2025", INE_PRENSA, "Desocupación nacional", "%")
R_OTRAS = ref("desocupacion-otras-regiones-jas-2026", ["CL-BI", "CL-RM", "CL-AN"], {"CL-BI": [[2026, 10.5]], "CL-RM": [[2026, 10.4]], "CL-AN": [[2026, 6.7]]},
              {"CL-BI": "Biobío", "CL-RM": "Metropolitana", "CL-AN": "Antofagasta"},
              "INE, ENE regional, trimestre julio a septiembre de 2026", INE_ENE, "Tasa de desocupación", "%")
R_RM = ref("desocupacion-rm-jas", ["RM26", "RM25"], {"RM26": [[2026, 10.4]], "RM25": [[2026, 8.8]]},
           {"RM26": "RM 2026", "RM25": "RM 2025"},
           "INE, ENE, Región Metropolitana, trimestres julio a septiembre de 2026 y 2025", INE_PRENSA, "Desocupación RM", "%")
guardar("2026-11-24", "desempleo-regiones", "grafico",
  "Desempleo: 11,8 % en Ñuble y 4,0 % en Aysén, en el mismo país",
  "¿Cuánto cambia el desempleo de Chile según la región?\nSegún el INE, la desocupación nacional fue de 9,8 % entre julio y septiembre de 2026, contra 8,5 % un año antes. Entre las regiones que revisamos, Ñuble tuvo 11,8 % y Aysén 4,0 %.\nEl INE entrega cada cifra por trimestres móviles: tres meses seguidos, y cada mes el trimestre se corre un lugar.\nEl miércoles 25-11 a las 19:00 sale el video largo sobre el PIB del tercer trimestre: por qué cayó 1,1 % y cómo llega al empleo y los precios.\nFuentes: INE, Encuesta Nacional de Empleo (29-10-2026) y fichas regionales del INE (regiones.ine.cl).",
  ["#desempleo", "#ine", "#chile"],
  {"gancho": {"texto": "Dos regiones de Chile, el mismo trimestre: según el INE, la desocupación fue de 11,8 % en Ñuble y de 4,0 % en Aysén, casi el triple.",
              "rotulo": "11,8 % CONTRA 4,0 %",
              "cifras": [cif("11,8 %", 11.8, R_REG, "valor", "CL-NB", 2026), cif("4,0 %", 4.0, R_REG, "valor", "CL-AI", 2026),
                         cif("casi el triple", 3.0, R_REG, "razon", "CL-NB", 2026, paisB="CL-AI", tol=0.05)]},
   "visualGancho": {"tipo": "chile", "regiones": ["CL-NB", "CL-AI"], "acercar": False, "puntos": [
       {"texto": "Ñuble", "en": [-72.10, -36.61], "dice": "Ñuble"}, {"texto": "Aysén", "en": [-72.07, -45.57], "dice": "Aysén"}]},
   "grafico": {"tipo": "comparacion", "titulo": "Desocupación, julio a septiembre 2026", "datos": R_REG, "destacar": {"pais": "CL-NB"},
               "formato": {"decimales": 1, "sufijo": " %"}, "dice": "Ñuble"},
   "escenas": [
     {"tipo": "dato", "usaGraficoPrincipal": True, "fuenteEnVoz": True,
      "texto": "Según la Encuesta Nacional de Empleo, entre julio y septiembre la desocupación del país fue de 9,8 %, 1,3 puntos más que un año antes. Ese dato es de todo el país: cada región tiene el suyo.",
      "cifras": [cif("9,8 %", 9.8, R_NAC, "valor", "N2026", 2026), cif("1,3 puntos", 1.3, R_NAC, "diferencia", "N2026", 2026, paisB="N2025"),
                 cif("11,8 %", 11.8, R_REG, "valor", "CL-NB", 2026), cif("4,0 %", 4.0, R_REG, "valor", "CL-AI", 2026)]},
     {"tipo": "planteamiento",
      "texto": "Otras tres regiones: Biobío, 10,5 %; Metropolitana, 10,4 %; Antofagasta, 6,7 %.",
      "cifras": [cif("10,5 %", 10.5, R_OTRAS, "valor", "CL-BI", 2026), cif("10,4 %", 10.4, R_OTRAS, "valor", "CL-RM", 2026), cif("6,7 %", 6.7, R_OTRAS, "valor", "CL-AN", 2026)],
      "visual": {"tipo": "chile", "regiones": ["CL-NB", "CL-BI", "CL-RM", "CL-AN"], "acercar": False}},
     {"tipo": "giro",
      "texto": "El INE mide tres meses seguidos y cada mes corre el trimestre un lugar: por eso estas cifras son de julio a septiembre. En la Metropolitana, la tasa subió 1,6 puntos en doce meses.",
      "cifras": [cif("1,6 puntos", 1.6, R_RM, "diferencia", "RM26", 2026, paisB="RM25")],
      "rotulo": {"texto": "NO ES PAREJO", "dice": "promedio"}}],
   "remate": "Mismo país, mismo trimestre, casi el triple entre dos regiones. El resumen sin gritos.",
   "fuentes": [{"texto": "INE, tasa de desocupación nacional, julio a septiembre de 2026 (29-10-2026)", "url": INE_PRENSA},
               {"texto": "INE, ficha regional de Ñuble", "url": "https://regiones.ine.cl/nuble/estadisticas-regionales/sociales/mercado-laboral/ocupacion-y-desocupacion"},
               {"texto": "INE, ficha regional de Aysén", "url": "https://regiones.ine.cl/aysen/estadisticas-regionales/sociales/mercado-laboral/ocupacion-y-desocupacion"}]},
  "12:00")

# ============================================================ SHORT 2 · mié 25-11 12:00 · minería contra el resto
R_IMS = ref("imacec-septiembre-2026", ["MINERO", "NOMINERO", "TOTAL"], {"MINERO": [[2026, -12.1]], "NOMINERO": [[2026, 2.0]], "TOTAL": [[2026, 0.2]]},
            {"MINERO": "Minería", "NOMINERO": "No minero", "TOTAL": "Imacec total"},
            "Banco Central de Chile, Imacec de septiembre de 2026 (vía Emol, 02-11-2026)", EMOL_IMACEC_SEP, "Variación anual del Imacec", "%")
R_IMSD = ref("imacec-no-minero-septiembre-2026-serie-ajustada", ["NOMINERO"], {"NOMINERO": [[2026, 0.8]]}, {"NOMINERO": "No minero"},
             "Banco Central de Chile, Imacec de septiembre de 2026 (vía Emol, 02-11-2026)", EMOL_IMACEC_SEP, "Variación anual del Imacec no minero", "%")
R_IMA = ref("imacec-agosto-2026", ["MINERO", "NOMINERO"], {"MINERO": [[2026, -17.4]], "NOMINERO": [[2026, 1.4]]},
            {"MINERO": "Minería", "NOMINERO": "No minero"},
            "Banco Central de Chile, Imacec de agosto de 2026 (vía Emol, 01-10-2026)", EMOL_IMACEC_AGO, "Variación anual del Imacec", "%")
R_T3S = ref("pib-t3-2026-anual", ["PIB", "MIN"], {"PIB": [[2026, -1.1]], "MIN": [[2026, -14.7]]}, {"PIB": "PIB total", "MIN": "Minería"},
            "Banco Central de Chile, Cuentas Nacionales del 3.er trimestre de 2026 (vía La Tercera, 18-11-2026)", "https://www.latercera.com/pulso/noticia/pib-del-tercer-trimestre-cae-11/", "Variación contra el 3.er trimestre de 2025", "%")
guardar("2026-11-25", "mineria-contra-el-resto", "grafico",
  "Por qué el Imacec subió solo 0,2 % si el resto creció 2 %",
  "¿Cómo puede crecer apenas 0,2 % la actividad si el resto crece 2 %?\nSegún el Banco Central, el Imacec de septiembre de 2026 subió 0,2 % frente a septiembre de 2025. La minería cayó 12,1 %, por menor extracción de cobre (menores leyes del mineral y suspensión temporal de faenas); el componente no minero creció 2,0 % anual, y 0,8 % en la serie ajustada por estación.\nEl PIB de todo el tercer trimestre, publicado el 18 de noviembre, cayó 1,1 %, con la minería a la baja 14,7 %. Hoy a las 19:00 sale el video largo con el detalle.\nFuentes: Emol con datos del Banco Central (Imacec de septiembre, 02-11-2026; Imacec de agosto, 01-10-2026).",
  ["#imacec", "#cobre", "#chile"],
  {"gancho": {"texto": "En septiembre la minería cayó 12,1 % y, aun así, el Imacec subió: solo 0,2 %, porque el resto creció 2 % contra un año antes.",
              "rotulo": "MINERÍA CAYÓ 12,1 %",
              "cifras": [cif("12,1 %", -12.1, R_IMS, "valor", "MINERO", 2026), cif("0,2 %", 0.2, R_IMS, "valor", "TOTAL", 2026), cif("2 %", 2.0, R_IMS, "valor", "NOMINERO", 2026)]},
   "grafico": {"tipo": "barras", "titulo": "Imacec de septiembre, contra un año antes", "datos": R_IMS, "destacar": {"pais": "MINERO"},
               "formato": {"decimales": 1, "sufijo": " %"}, "dice": "minería"},
   "escenas": [
     {"tipo": "dato", "usaGraficoPrincipal": True, "fuenteEnVoz": True,
      "texto": "Según el Banco Central, ese 2 % es sin ajustes; ajustado por estación, el resto creció 0,8 %. Aun así, la minería arrastró al total.",
      "cifras": [cif("0,8 %", 0.8, R_IMSD, "valor", "NOMINERO", 2026)]},
     {"tipo": "planteamiento",
      "texto": "Según el Banco Central, en agosto ya había caído 17,4 %, por menores leyes del mineral y mantenciones; en septiembre, por suspensión de faenas.",
      "cifras": [cif("17,4 %", -17.4, R_IMA, "valor", "MINERO", 2026)],
      "visual": {"tipo": "iconos", "titulo": "Por qué cayó la minería", "items": [
          {"icono": "⛏️", "texto": "Menores leyes del mineral", "dice": "leyes"}, {"icono": "🔧", "texto": "Mantenciones (agosto)", "dice": "mantenciones"}, {"icono": "⏸️", "texto": "Faenas suspendidas (sept.)", "dice": "suspensión"}]}},
     {"tipo": "giro",
      "texto": "Y de julio a septiembre, el PIB cayó 1,1 % y la minería, 14,7 %. Hoy a las siete, el largo lo explica.",
      "cifras": [cif("1,1 %", -1.1, R_T3S, "valor", "PIB", 2026), cif("14,7 %", -14.7, R_T3S, "valor", "MIN", 2026)],
      "rotulo": {"texto": "TRIMESTRE: PIB −1,1 %", "dice": "PIB"}}],
   "remate": "Una parte cayó 12,1 %, el resto creció 2 %: el total, solo 0,2 %.",
   "fuentes": [{"texto": "Emol, Imacec de septiembre (02-11-2026)", "url": EMOL_IMACEC_SEP},
               {"texto": "Emol, Imacec de agosto (01-10-2026)", "url": EMOL_IMACEC_AGO},
               {"texto": "La Tercera, PIB del tercer trimestre (18-11-2026)", "url": "https://www.latercera.com/pulso/noticia/pib-del-tercer-trimestre-cae-11/"}]},
  "12:00")


# ============================================================ LARGO · mié 25-11 19:00 · el cobre que no salió (PLAN B de la pauta)
# Reescrito el 18-11-2026 con las Cuentas Nacionales del 3.er trimestre publicadas ese día (08:30): con la revisión, el 2.º trimestre
# quedó en 0,0 % interanual (antes -0,2 %) y +0,1 % contra el trimestre anterior (La Tercera): ya no hay "dos centésimas" ni dos caídas seguidas.
LT_PIB = "https://www.latercera.com/pulso/noticia/pib-del-tercer-trimestre-cae-11/"
PAUTA_PIB = "https://www.pauta.cl/economia/2026/11/18/economia-chilena-cae-11-en-el-tercer-trimestre-por-retroceso-de-la-mineria.html"
EMOL_PIB = "https://www.emol.com/noticias/Economia/2026/11/18/1217423/pib-banco-central-cuentas-nacionales.html"
DF_PIB = "https://www.df.cl/economia-y-politica/macro/pib-del-tercer-trimestre-sorprende-con-caida-de-1-1-determinado-por-la"
FUENTE_PIB = "Banco Central de Chile, Cuentas Nacionales del 3.er trimestre de 2026 (vía La Tercera, 18-11-2026)"
R_T3 = ref("pib-t3-2026-anual", ["PIB", "MIN", "NOMIN"], {"PIB": [[2026, -1.1]], "MIN": [[2026, -14.7]], "NOMIN": [[2026, 1.0]]},
           {"PIB": "PIB total", "MIN": "Minería", "NOMIN": "PIB no minero"}, FUENTE_PIB, LT_PIB, "Variación contra el 3.er trimestre de 2025", "%")
R_T3EST = ref("pib-t3-2026-contra-imacec", ["IMA", "PIB"], {"IMA": [[2026, -0.8]], "PIB": [[2026, -1.1]]},
              {"IMA": "Estimado con el Imacec", "PIB": "PIB publicado"}, FUENTE_PIB, EMOL_PIB, "Variación contra el 3.er trimestre de 2025", "%")
R_T3Q = ref("pib-t3-2026-desestacionalizado", ["PIB", "MIN", "NOMIN"], {"PIB": [[2026, -1.8]], "MIN": [[2026, -12.9]], "NOMIN": [[2026, -0.2]]},
            {"PIB": "PIB total", "MIN": "Minería", "NOMIN": "PIB no minero"},
            "Banco Central de Chile, Cuentas Nacionales (vía La Tercera y Pauta, 18-11-2026)", PAUTA_PIB, "Variación contra el 2.º trimestre, serie ajustada", "%")
R_REV2 = ref("pib-revision-t1-t2-2026", ["T1A", "T1N", "T2A", "T2N"], {"T1A": [[2026, -0.3]], "T1N": [[2026, -0.4]], "T2A": [[2026, -0.2]], "T2N": [[2026, 0.0]]},
             {"T1A": "1.er trim., antes", "T1N": "1.er trim., ahora", "T2A": "2.º trim., antes", "T2N": "2.º trim., ahora"},
             "Banco Central de Chile, Cuentas Nacionales (vía Cooperativa y La Tercera, 18-11-2026)", LT_PIB, "PIB contra el mismo trimestre de 2025", "%")
R_SECT = ref("pib-t3-2026-sectores", ["AGRO", "EGA", "COM", "CONS"], {"AGRO": [[2026, 10.2]], "EGA": [[2026, 6.0]], "COM": [[2026, 2.2]], "CONS": [[2026, -5.0]]},
             {"AGRO": "Agro y silvicultura", "EGA": "Electricidad, gas y agua", "COM": "Comercio", "CONS": "Construcción"},
             FUENTE_PIB, LT_PIB, "Variación contra el 3.er trimestre de 2025", "%")
R_DEM = ref("pib-t3-2026-demanda", ["INV", "CONS", "GOB", "EXP"], {"INV": [[2026, -6.7]], "CONS": [[2026, 0.7]], "GOB": [[2026, 2.1]], "EXP": [[2026, -0.6]]},
            {"INV": "Inversión", "CONS": "Consumo hogares", "GOB": "Consumo gobierno", "EXP": "Exportaciones"},
            FUENTE_PIB, LT_PIB, "Variación contra el 3.er trimestre de 2025", "%")
R_MAQ = ref("inversion-maquinaria-2026", ["A25", "A26"], {"A25": [[2026, 22.4]], "A26": [[2026, -10.1]]},
            {"A25": "Maquinaria, 3.er trim. 2025", "A26": "Maquinaria, 3.er trim. 2026"}, FUENTE_PIB, LT_PIB, "Variación anual de maquinaria y equipos", "%")
R_CONSH = ref("consumo-hogares-2026", ["CHL"], {"CHL": [[0, 2.5], [1, 1.1], [2, 0.7]]}, {"CHL": "Consumo de los hogares"},
              FUENTE_PIB, LT_PIB, "Variación contra un año antes", "%", {"0": "1.er trim.", "1": "2.º trim.", "2": "3.er trim."})
R_DES = ref("desocupacion-nacional-jas", ["N2026", "N2025"], {"N2026": [[2026, 9.8]], "N2025": [[2026, 8.5]]},
            {"N2026": "Jul-sep 2026", "N2025": "Jul-sep 2025"},
            "INE, ENE nacional, trimestres julio a septiembre de 2026 y 2025", INE_PRENSA, "Desocupación nacional", "%")
R_EMP = ref("empleo-variacion-12-meses-jas-2026", ["DESOC", "OCUP"], {"DESOC": [[2026, 15.3]], "OCUP": [[2026, -1.1]]},
            {"DESOC": "Desocupados", "OCUP": "Ocupados"},
            "INE, ENE nacional, julio a septiembre de 2026, variación en 12 meses", INE_PRENSA, "Variación en 12 meses", "%")
R_IPC = ref("ipc-octubre-2026", ["ANUAL", "MES", "META", "GAS"], {"ANUAL": [[2026, 4.5]], "MES": [[2026, 0.5]], "META": [[2026, 3.0]], "GAS": [[2026, 4.5]]},
            {"ANUAL": "IPC 12 meses", "MES": "IPC del mes", "META": "Meta", "GAS": "Gasolina"},
            "INE, IPC de octubre de 2026 (vía Emol, 06-11-2026)", EMOL_IPC, "Variación del IPC", "%")
R_TPM = ref("tpm-octubre-2026", ["TPM"], {"TPM": [[2026, 4.5]]}, {"TPM": "Tasa de política monetaria"},
            "Banco Central de Chile, comunicado de la reunión de política monetaria de octubre de 2026", BC_RPM, "Tasa de política monetaria", "%")
R_DESM = ref("desocupacion-trimestres-moviles-2026", ["CHL"], {"CHL": [[0, 9.4], [1, 9.5], [2, 9.6], [3, 9.8]]}, {"CHL": "Desocupación"},
             "INE, Encuesta Nacional de Empleo, trimestres móviles de 2026", INE_ENE, "Tasa de desocupación nacional", "%",
             {"0": "abr-jun", "1": "may-jul", "2": "jun-ago", "3": "jul-sep"})
R_COBRE = ref("quiroz-cobre-puntos-pib-2026", ["BAJO", "ALTO"], {"BAJO": [[2026, 1.0]], "ALTO": [[2026, 1.5]]},
              {"BAJO": "Efecto directo", "ALTO": "Efecto total"},
              "Ministro de Hacienda J. Quiroz, ChileDay de Londres, 16-09-2026 (vía Emol)", EMOL_QUIROZ_CHILEDAY, "Puntos de crecimiento que resta el cobre", "puntos")

R_ACUM = ref("pib-acumulado-2026", ["ACUM", "REQ"], {"ACUM": [[2026, -0.5]], "REQ": [[2026, 1.2]]},
             {"ACUM": "Enero a septiembre", "REQ": "Cuarto trimestre requerido"},
             "Banco Central de Chile, Cuentas Nacionales (vía La Tercera, 18-11-2026)", LT_PIB, "PIB contra el mismo período de 2025", "%")
largo = {
 "cabecera": "EL COBRE QUE NO SALIÓ · PIB 2026",
 "gancho": {
   "texto": "La economía chilena cayó 1,1 % entre julio y septiembre contra un año antes, la mayor caída anual desde fines de 2022. Pero todo lo que no es minería creció 1,0 %. Un solo sector, la minería, cayó 14,7 %. El Banco Central lo informó el miércoles 18 de noviembre, y esto es lo que pasó.",
   "rotulo": "EL PIB CAYÓ 1,1 %",
   "grafico": {"tipo": "barras", "titulo": "PIB del tercer trimestre de 2026, contra un año antes", "datos": R_T3, "destacar": {"pais": "MIN"}, "formato": {"decimales": 1, "sufijo": " %"}},
   "cifras": [cif("1,1 %", -1.1, R_T3, "valor", "PIB", 2026), cif("14,7 %", -14.7, R_T3, "valor", "MIN", 2026), cif("1,0 %", 1.0, R_T3, "valor", "NOMIN", 2026)]},
 "promesa": "Vas a saber qué publicó el Banco Central, por qué la minería explica la caída, qué pasó con la inversión y el consumo, y qué muestran el empleo, los precios y la tasa de interés.",
 "indice": ["El dato del 18 de nov.", "Dónde cayó: el cobre", "Inversión y consumo", "Tres cifras cotidianas", "Qué mirar ahora"],
 "estructura": "autopsia",
 "capitulos": [
  {"titulo": "El dato del 18 de noviembre", "escenas": [
    {"tipo": "planteamiento",
     "texto": "El 18 de noviembre, a las 8:30 de la mañana, el Banco Central publicó las Cuentas Nacionales del tercer trimestre. Son el balance oficial de cuánto produjo el país entre julio y septiembre, y salen una vez por trimestre. Antes, el Imacec, el indicador mensual de actividad, ya había adelantado una baja. La pregunta era de cuánto sería la caída, y si se hablaría otra vez de recesión técnica.",
     "visual": {"tipo": "iconos", "titulo": "Dos indicadores, un mismo trimestre", "items": [
        {"icono": "📅", "texto": "Imacec: cada mes", "dice": "mensual"}, {"icono": "📊", "texto": "PIB: cada trimestre", "dice": "trimestre"}]}},
    {"tipo": "dato", "fuenteEnVoz": True,
     "texto": "El resultado fue una caída de 1,1 % contra el tercer trimestre de 2025. El promedio del Imacec apuntaba a 0,8 %, así que la caída fue tres décimas mayor. Aparte, según La Tercera, es la mayor caída anual desde el cuarto trimestre de 2022. Y el trimestre tuvo dos días hábiles más que el año anterior, un efecto calendario que sumó 0,3 puntos a la cifra.",
     "grafico": {"tipo": "barras", "titulo": "PIB del tercer trimestre: estimado y publicado", "datos": R_T3EST, "destacar": {"pais": "PIB"}, "formato": {"decimales": 1, "sufijo": " %"}, "dice": "Imacec"},
     "cifras": [cif("1,1 %", -1.1, R_T3EST, "valor", "PIB", 2026), cif("0,8 %", -0.8, R_T3EST, "valor", "IMA", 2026), cif("tres décimas", 0.3, R_T3EST, "diferencia", "IMA", 2026, paisB="PIB")]},
    {"tipo": "dato", "fuenteEnVoz": True,
     "texto": "Contra el trimestre anterior, con la serie ajustada por estación, el PIB retrocedió 1,8 %. Hay dos formas de contar una recesión técnica: dos trimestres seguidos de caída contra el trimestre anterior, o dos seguidos de caída contra el mismo trimestre del año anterior. Veamos si alguna se cumple. Para eso hay que mirar los trimestres de antes, y también cambiaron.",
     "grafico": {"tipo": "contador", "titulo": "PIB del 3.er trimestre contra el 2.º, ajustado", "datos": R_T3Q, "destacar": {"pais": "PIB", "texto": "contra el 2.º trimestre"}, "formato": {"decimales": 1, "sufijo": " %"}, "dice": "retrocedió"},
     "cifras": [cif("1,8 %", -1.8, R_T3Q, "valor", "PIB", 2026)]},
    {"tipo": "dato", "fuenteEnVoz": True,
     "texto": "Cada vez que sale un trimestre nuevo, el Banco Central revisa los anteriores. Esta vez, el segundo trimestre pasó de menos 0,2 % a cero contra un año antes, y el primero, de menos 0,3 % a menos 0,4 %. Según La Tercera, con esa revisión el segundo trimestre creció 0,1 % contra el primero, en la serie ajustada.",
     "grafico": {"tipo": "barras", "titulo": "PIB del 1.º y 2.º trimestre, antes y ahora", "datos": R_REV2, "destacar": {"pais": "T2N"}, "formato": {"decimales": 1, "sufijo": " %"}, "dice": "revisó"},
     "cifras": [cif("0,2 %", -0.2, R_REV2, "valor", "T2A", 2026), cif("0,3 %", -0.3, R_REV2, "valor", "T1A", 2026), cif("0,4 %", -0.4, R_REV2, "valor", "T1N", 2026)]},
    {"tipo": "giro",
     "texto": "Y aquí cambia el nombre, aunque no cambian los hechos. El 11 de noviembre, con las cifras de agosto, el ministro de Hacienda, Jorge Quiroz, dijo en una entrevista con Bloomberg que se le podía llamar técnicamente una recesión. Con las cifras revisadas, el segundo trimestre ya no cae, ni contra un año antes ni, según La Tercera, contra el trimestre anterior. Por eso, según La Tercera, aún no se cumple ninguna de las dos reglas. Lo que sí ocurrió es otra cosa: el tercer trimestre tuvo la mayor caída anual desde fines de 2022.",
     "rotulo": {"texto": "AÚN SIN DOS CAÍDAS SEGUIDAS", "dice": "caídas"}}]},
  {"titulo": "Dónde cayó: el cobre", "escenas": [
    {"tipo": "planteamiento",
     "texto": "¿Dónde se concentró la caída? El PIB se puede abrir por sector, y ahí aparece una diferencia enorme entre la minería y el resto de la economía.",
     "visual": {"tipo": "foto", "busqueda": "Chuquicamata open pit copper mine", "alternativas": ["Chile copper mine open pit", "Escondida copper mine"], "pie": "Mina de cobre a rajo abierto, Chile", "encuadre": "ken-burns"}},
    {"tipo": "dato", "fuenteEnVoz": True,
     "texto": "Según el Banco Central, la minería cayó 14,7 % contra un año antes, su quinto trimestre seguido de caída en esa comparación. El PIB no minero, en cambio, creció 1,0 %. Fue el cobre lo que más pesó, por menores leyes del mineral, mantenciones y condiciones climáticas adversas. La ley es cuánto cobre trae cada tonelada de roca: con una ley más baja, la misma roca entrega menos metal.",
     "grafico": {"tipo": "barras", "titulo": "PIB del tercer trimestre por tipo de actividad", "datos": R_T3, "destacar": {"pais": "MIN"}, "formato": {"decimales": 1, "sufijo": " %"}, "dice": "cobre"},
     "cifras": [cif("14,7 %", -14.7, R_T3, "valor", "MIN", 2026), cif("1,0 %", 1.0, R_T3, "valor", "NOMIN", 2026)]},
    {"tipo": "dato", "fuenteEnVoz": True,
     "texto": "Contra el trimestre anterior, con ajuste por estación, la minería cayó 12,9 %. Según Pauta, el PIB no minero retrocedió apenas 0,2 %, y fue la minería la que explicó la contracción. Dicho de otro modo: de la caída de 1,8 % del total, la mayor parte viene de un solo sector.",
     "grafico": {"tipo": "barras", "titulo": "Contra el 2.º trimestre, serie ajustada", "datos": R_T3Q, "destacar": {"pais": "MIN"}, "formato": {"decimales": 1, "sufijo": " %"}, "dice": "Pauta"},
     "cifras": [cif("12,9 %", -12.9, R_T3Q, "valor", "MIN", 2026), cif("0,2 %", -0.2, R_T3Q, "valor", "NOMIN", 2026), cif("1,8 %", -1.8, R_T3Q, "valor", "PIB", 2026)]},
    {"tipo": "dato", "fuenteEnVoz": True,
     "texto": "Dentro del resto de la economía hubo de todo. Según el Banco Central, crecieron la agricultura y la silvicultura, 10,2 %; la electricidad, el gas y el agua, 6,0 %; y el comercio, 2,2 %. La construcción, en cambio, cayó 5,0 %, con menos obras de ingeniería. Y dentro de la minería, no todo bajó: el litio creció por mayores leyes y mejoras operacionales.",
     "grafico": {"tipo": "barras", "titulo": "Algunos sectores, contra un año antes", "datos": R_SECT, "destacar": {"pais": "CONS"}, "formato": {"decimales": 1, "sufijo": " %"}, "dice": "agricultura"},
     "cifras": [cif("10,2 %", 10.2, R_SECT, "valor", "AGRO", 2026), cif("6,0 %", 6.0, R_SECT, "valor", "EGA", 2026), cif("2,2 %", 2.2, R_SECT, "valor", "COM", 2026), cif("5,0 %", -5.0, R_SECT, "valor", "CONS", 2026)]},
    {"tipo": "dato", "fuenteEnVoz": True,
     "texto": "El Imacec ya lo mostraba mes a mes. En septiembre, la minería cayó 12,1 % y el resto de la economía creció 2,0 % contra un año antes. Según Bloomberg, citado por el Diario Financiero, la producción de cobre del año quedaría bajo los 5 millones de toneladas, la menor en más de dos décadas. Y el ministro Quiroz calculó en septiembre que el cobre le resta al crecimiento de este año entre 1 y 1,5 puntos.",
     "grafico": {"tipo": "barras", "titulo": "Imacec de septiembre, contra un año antes", "datos": R_IMS, "destacar": {"pais": "MINERO"}, "formato": {"decimales": 1, "sufijo": " %"}, "dice": "septiembre"},
     "cifras": [cif("12,1 %", -12.1, R_IMS, "valor", "MINERO", 2026), cif("2,0 %", 2.0, R_IMS, "valor", "NOMINERO", 2026), cif("1 y 1,5 puntos", 1.5, R_COBRE, "valor", "ALTO", 2026)]},
    {"tipo": "giro",
     "texto": "Distinguir entre la caída de la minería y lo que pasa con la demanda importa, porque no tienen las mismas causas. La caída de la minería viene del mineral, las mantenciones y el clima, y es lo que concentra el retroceso. Lo que pasa con la inversión y el consumo es otra historia, y la vemos ahora.",
     "rotulo": {"texto": "UN SECTOR, NO TODOS", "dice": "sector"}},
    {"tipo": "reenganche",
     "texto": "Pero una economía no es solo lo que produce: también es lo que se destina a inversión, lo que se consume y lo que se exporta. Veamos la demanda: inversión, consumo y exportaciones."}]},
  {"titulo": "Inversión y consumo", "escenas": [
    {"tipo": "planteamiento",
     "texto": "El PIB también se puede mirar desde la demanda: cuánto se destina a inversión, cuánto se consume y cuánto sale al exterior. Mirado así, el tercer trimestre dejó cifras para cada lado.",
     "visual": {"tipo": "iconos", "titulo": "El PIB visto desde la demanda", "items": [
        {"icono": "🏗️", "texto": "Inversión", "dice": "inversión"}, {"icono": "🛒", "texto": "Consumo", "dice": "consume"}, {"icono": "🚢", "texto": "Exportaciones", "dice": "exporta"}]}},
    {"tipo": "dato", "fuenteEnVoz": True,
     "texto": "La inversión, que el Banco Central mide como formación bruta de capital fijo, cayó 6,7 %. La maquinaria y los equipos bajaron 10,1 %, después de haber subido 22,4 % en el mismo trimestre de 2025. La construcción y otras obras bajaron 4,1 %. Según el Banco Central, el resultado se explicó por una menor inversión, atenuada por más consumo de los hogares y del gobierno.",
     "grafico": {"tipo": "barras", "titulo": "Piezas de la demanda, contra un año antes", "datos": R_DEM, "destacar": {"pais": "INV"}, "formato": {"decimales": 1, "sufijo": " %"}, "dice": "inversión"},
     "cifras": [cif("6,7 %", -6.7, R_DEM, "valor", "INV", 2026), cif("10,1 %", -10.1, R_MAQ, "valor", "A26", 2026), cif("22,4 %", 22.4, R_MAQ, "valor", "A25", 2026)]},
    {"tipo": "dato", "fuenteEnVoz": True,
     "texto": "El consumo de los hogares sí creció, 0,7 %, pero cada vez menos: 2,5 % en el primer trimestre, 1,1 % en el segundo y 0,7 % en el tercero. El gasto del gobierno subió 2,1 %, por salud. Las exportaciones bajaron 0,6 % y las importaciones, 0,4 %, con un efecto neto nulo sobre la actividad.",
     "grafico": {"tipo": "lineas", "titulo": "Consumo de los hogares, contra un año antes", "datos": R_CONSH, "formato": {"decimales": 1, "sufijo": " %"}, "dice": "moderación"},
     "cifras": [cif("0,7 %", 0.7, R_CONSH, "valor", "CHL", 2), cif("2,5 %", 2.5, R_CONSH, "valor", "CHL", 0), cif("1,1 %", 1.1, R_CONSH, "valor", "CHL", 1), cif("2,1 %", 2.1, R_DEM, "valor", "GOB", 2026)]},
    {"tipo": "giro",
     "texto": "Hay un matiz que suaviza la lectura. El ingreso nacional bruto disponible real, que mide cuánto ingreso le queda al país, cayó 0,3 %, menos que el PIB. El Banco Central lo atribuyó a mejores términos de intercambio: el precio de lo que Chile exporta subió más que el de lo que Chile importa. La actividad cayó más que el ingreso.",
     "rotulo": {"texto": "INGRESO: −0,3 %", "dice": "ingreso"}},
    {"tipo": "reenganche",
     "texto": "Hasta aquí, cifras de producción. Falta lo que más se siente: qué pasa con el trabajo, los precios y la tasa de interés."}]},
  {"titulo": "Tres cifras del día a día", "escenas": [
    {"tipo": "planteamiento",
     "texto": "En las semanas previas se publicaron tres cifras que se sienten en el día a día: el trabajo, los precios y la tasa de interés. Las fuentes oficiales no establecen que una cause a otra. Empecemos por el trabajo: el desempleo es alto a nivel nacional y muy distinto entre regiones. En Ñuble fue 11,8 % y en Aysén, 4,0 %, entre julio y septiembre.",
     "visual": {"tipo": "chile", "regiones": ["CL-NB", "CL-AI"], "acercar": False, "puntos": [
        {"texto": "Ñuble 11,8 %", "en": [-72.10, -36.61], "dice": "Ñuble"}, {"texto": "Aysén 4,0 %", "en": [-72.07, -45.57], "dice": "Aysén"}]}},
    {"tipo": "dato", "fuenteEnVoz": True,
     "texto": "Entre julio y septiembre, la desocupación nacional fue de 9,8 %, contra 8,5 % un año antes. Son 1,3 puntos más, y es la tasa más alta en cinco años. Los desocupados subieron 15,3 % en doce meses, y los ocupados bajaron 1,1 %.",
     "grafico": {"tipo": "comparacion", "titulo": "Desocupación nacional, julio a septiembre", "datos": R_DES, "destacar": {"pais": "N2026"}, "formato": {"decimales": 1, "sufijo": " %"}, "dice": "contra"},
     "cifras": [cif("9,8 %", 9.8, R_DES, "valor", "N2026", 2026), cif("8,5 %", 8.5, R_DES, "valor", "N2025", 2026), cif("1,3 puntos", 1.3, R_DES, "diferencia", "N2026", 2026, paisB="N2025"),
                cif("15,3 %", 15.3, R_EMP, "valor", "DESOC", 2026), cif("1,1 %", -1.1, R_EMP, "valor", "OCUP", 2026)]},
    {"tipo": "dato", "fuenteEnVoz": True,
     "texto": "Y no fue un salto: fue una escalera. Según el INE, el trimestre de abril a junio dio 9,4 %; mayo a julio, 9,5 %; junio a agosto, 9,6 %; y julio a septiembre, 9,8 %. Como el INE mide trimestres móviles, cada cifra comparte dos meses con la anterior, y por eso la curva sube de a poco.",
     "grafico": {"tipo": "lineas", "titulo": "Desocupación, trimestres móviles de 2026", "datos": R_DESM, "formato": {"decimales": 1, "sufijo": " %"}, "dice": "escalera"},
     "cifras": [cif("9,4 %", 9.4, R_DESM, "valor", "CHL", 0), cif("9,8 %", 9.8, R_DESM, "valor", "CHL", 3)]},
    {"tipo": "dato", "fuenteEnVoz": True,
     "texto": "Segunda cifra, los precios. Según el INE, el IPC de octubre subió 0,5 % en el mes, y la inflación de doce meses llegó a 4,5 %, sobre la meta de 3 % del Banco Central. Los combustibles pesaron: la gasolina subió 4,5 % en un solo mes, según el INE.",
     "grafico": {"tipo": "contador", "titulo": "Inflación a doce meses, octubre", "datos": R_IPC, "destacar": {"pais": "ANUAL", "texto": "IPC a doce meses"}, "formato": {"decimales": 1, "sufijo": " %"}, "dice": "4,5"},
     "cifras": [cif("0,5 %", 0.5, R_IPC, "valor", "MES", 2026), cif("4,5 %", 4.5, R_IPC, "valor", "ANUAL", 2026), cif("3 %", 3.0, R_IPC, "valor", "META", 2026), cif("4,5 %", 4.5, R_IPC, "valor", "GAS", 2026)]},
    {"tipo": "giro",
     "texto": "La tercera cifra, la tasa de interés, no se movió. El Banco Central mantuvo la tasa en 4,5 % en octubre, por unanimidad, en una pausa que viene desde diciembre de 2025. En teoría, subir la tasa enfría los precios pero encarece los créditos, y bajarla ayuda a la actividad pero puede presionar los precios. El Consejo dijo que evaluará la tasa reunión a reunión, y que los riesgos para la inflación aumentaron de forma relevante.",
     "rotulo": {"texto": "TASA EN 4,5 %", "dice": "interés"},
     "visual": {"tipo": "iconos", "titulo": "Tres cifras", "items": [
        {"icono": "👷", "texto": "Trabajo", "valor": "9,8 %", "dice": "empleo"}, {"icono": "🛒", "texto": "Precios", "valor": "4,5 %", "dice": "precios"}, {"icono": "🏦", "texto": "Tasa de interés", "valor": "4,5 %", "dice": "unanimidad"}]},
     "cifras": [cif("4,5 %", 4.5, R_TPM, "valor", "TPM", 2026)]},
    {"tipo": "reenganche",
     "texto": "Con esas cifras sobre la mesa, queda lo práctico: qué datos mirar en las próximas semanas."}]},
  {"titulo": "Qué mirar en las próximas semanas", "escenas": [
    {"tipo": "planteamiento",
     "texto": "Hay cuatro datos que van a mostrar hacia dónde va esto. Y la primera responde la pregunta de la recesión técnica: el PIB del cuarto trimestre, que el Banco Central publicará el año próximo.",
     "visual": {"tipo": "iconos", "titulo": "Qué mirar ahora", "items": [
        {"icono": "⛏️", "texto": "Imacec de octubre", "dice": "octubre"}, {"icono": "🏦", "texto": "Tasa: reunión del 15 de dic"},
        {"icono": "👷", "texto": "Empleo, agosto a octubre"}, {"icono": "📊", "texto": "PIB del cuarto trimestre"}]}},
    {"tipo": "dato", "fuenteEnVoz": True,
     "texto": "Según La Tercera, para que el año cierre en terreno positivo, el cuarto trimestre tendría que crecer en torno a 1,2 %, algo que el medio considera difícil. El acumulado de enero a septiembre es de menos 0,5 %. Y la regla de la recesión técnica es simple: si el cuarto trimestre también cae contra el tercero, serían dos caídas seguidas.",
     "grafico": {"tipo": "contador", "titulo": "PIB acumulado de enero a septiembre de 2026", "datos": R_ACUM, "destacar": {"pais": "ACUM", "texto": "contra el mismo período de 2025"}, "formato": {"decimales": 1, "sufijo": " %"}, "dice": "acumulado"},
     "cifras": [cif("0,5 %", -0.5, R_ACUM, "valor", "ACUM", 2026), cif("1,2 %", 1.2, R_ACUM, "valor", "REQ", 2026)]},
    {"tipo": "dato", "fuenteEnVoz": True,
     "texto": "Antes de eso vienen otras tres citas. La tasa de política monetaria: según el comunicado del Banco Central, la próxima reunión es el martes 15 de diciembre, y la Encuesta de Expectativas de octubre esperaba que siga en 4,5 %. El Imacec de octubre, que dirá si la minería se recupera. Y el empleo del trimestre de agosto a octubre, que dirá si la escalera sigue subiendo.",
     "grafico": {"tipo": "contador", "titulo": "Tasa de política monetaria", "datos": R_TPM, "destacar": {"pais": "TPM", "texto": "vigente desde diciembre de 2025"}, "formato": {"decimales": 1, "sufijo": " %"}, "dice": "4,5"},
     "cifras": [cif("4,5 %", 4.5, R_TPM, "valor", "TPM", 2026)]},
    {"tipo": "giro",
     "texto": "Y hay un detalle que corrige una idea común: la recesión técnica no mide cuánto cae la economía, solo si cae dos trimestres seguidos. Dos caídas pequeñas cuentan igual que dos grandes, y una caída grande, como la de este trimestre, no la declara sola. Por eso el nombre importa menos que el tamaño de la caída y lo que viene después.",
     "rotulo": {"texto": "NO MIDE EL TAMAÑO", "dice": "tamaño"}},
    {"tipo": "reenganche",
     "texto": "Antes de cerrar, un resumen de qué cambió el 18 de noviembre y qué no."},
    {"tipo": "significado",
     "texto": "En resumen, qué cambió y qué no. Lo que cambió el 18 de noviembre es el dato: el tercer trimestre cayó 1,1 %, más de lo esperado, y la revisión dejó al segundo en cero. Lo que no cambia es el origen principal: el cobre, con menores leyes, mantenciones y clima. Y lo que se vive en el día a día es un mercado laboral con más desempleo y precios sobre la meta, y el desempleo venía subiendo desde antes de este dato. Esto es lo que muestran, hasta hoy, las cifras oficiales, y los datos de los próximos meses dirán hacia dónde va el año."}]}],
 "numeroQueNadieMira": {
   "texto": "Y queda un número que conviene mirar: 12,9 por ciento. Es lo que cayó la minería contra el trimestre anterior, mientras el PIB no minero retrocedió 0,2 por ciento, según Pauta. La economía que no es minera casi no se movió; la minera, sí. El titular del trimestre es una caída de 1,1 por ciento, pero la historia está concentrada en un sector.",
   "grafico": {"tipo": "comparacion", "titulo": "Contra el 2.º trimestre, serie ajustada", "datos": R_T3Q, "destacar": {"pais": "NOMIN"}, "formato": {"decimales": 1, "sufijo": " %"}, "dice": "casi"},
   "cifras": [cif("0,2 por ciento", -0.2, R_T3Q, "valor", "NOMIN", 2026), cif("12,9 por ciento", -12.9, R_T3Q, "valor", "MIN", 2026)]},
 "remate": "Un sector cayó 14,7 %, el resto creció 1,0 %: importa más su origen que su nombre.",
 "siguiente": "Con los datos oficiales a la vista, ese fue el detalle del PIB. Entender Chile. El resumen sin gritos.",
 "miniatura": {"texto": "CAYÓ 1,1 %: EL COBRE", "grafico": {"tipo": "barras", "titulo": "PIB del tercer trimestre, contra un año antes", "datos": R_T3, "destacar": {"pais": "MIN"}, "formato": {"decimales": 1, "sufijo": " %"}}},
 "fuentes": [
   {"texto": "La Tercera, PIB del tercer trimestre (18-11-2026)", "url": LT_PIB},
   {"texto": "Emol, Cuentas Nacionales del Banco Central (18-11-2026)", "url": EMOL_PIB},
   {"texto": "Pauta, PIB del tercer trimestre (18-11-2026)", "url": PAUTA_PIB},
   {"texto": "DF, PIB del tercer trimestre (18-11-2026)", "url": DF_PIB},
   {"texto": "DF y Bloomberg, Quiroz y la recesión técnica (11-11-2026)", "url": DF_QUIROZ},
   {"texto": "Emol, Imacec de septiembre (02-11-2026)", "url": EMOL_IMACEC_SEP},
   {"texto": "Emol, Quiroz tras el ChileDay (17-09-2026)", "url": EMOL_QUIROZ_CHILEDAY},
   {"texto": "INE, desocupación de julio a septiembre de 2026 (29-10-2026)", "url": INE_PRENSA},
   {"texto": "Emol, IPC de octubre del INE (06-11-2026)", "url": EMOL_IPC},
   {"texto": "Banco Central, comunicado de la reunión de política monetaria de octubre de 2026", "url": BC_RPM}]}
guardar("2026-11-25", "el-cobre-que-no-salio", "tesis",
  "El cobre que no salió: por qué el PIB de Chile cayó 1,1 %",
  "¿Por qué cayó 1,1 % la economía chilena en el tercer trimestre de 2026?\nSegún las Cuentas Nacionales que el Banco Central publicó el 18-11-2026, el PIB cayó 1,1 % contra el mismo trimestre de 2025: la minería cayó 14,7 % y el PIB no minero creció 1,0 %. Con la revisión, el segundo trimestre quedó en 0,0 % contra un año antes.\nRevisamos qué pasó por sector, con la inversión y el consumo, y qué muestran el empleo, los precios y la tasa de interés, sin consejos financieros.\n\nCapítulos:\n00:00 El PIB cayó 1,1 %\n(los tiempos exactos se agregan al renderizar)\n\nFuentes:\n- La Tercera, PIB del tercer trimestre (18-11-2026): " + LT_PIB + "\n- Emol, Cuentas Nacionales (18-11-2026): " + EMOL_PIB + "\n- Pauta (18-11-2026): " + PAUTA_PIB + "\n- DF (18-11-2026): " + DF_PIB + "\n- DF y Bloomberg (11-11-2026): " + DF_QUIROZ + "\n- Emol, Imacec de septiembre (02-11-2026): " + EMOL_IMACEC_SEP + "\n- INE, desocupación jul-sep 2026: " + INE_PRENSA + "\n- Emol, IPC de octubre (06-11-2026): " + EMOL_IPC + "\n- Banco Central, comunicado RPM octubre 2026: " + BC_RPM + "\n\nNo es asesoría financiera.",
  ["#economia", "#chile", "#pib", "#cobre"], largo, "19:00")
