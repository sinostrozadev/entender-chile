#!/usr/bin/env python3
"""Genera los JSON de los Shorts del 24 y 25-11-2026 y del largo del 25-11-2026 desde datos verificados el 17-11-2026
(verificacion-24-25.md). Misma idea que generar.py: una corrección de cifra se hace en UN lugar y se regenera:
  python3 -I contenido/borradores-semana/2026-11-19/generar-24-25.py"""
import json, os
D = os.path.dirname(os.path.abspath(__file__))  # los borradores viven en contenido/borradores-semana/ (NO en semana/) hasta que el revisor los apruebe
DESC_PIE = "\n\nVoz sintética generada por computador. Cada cifra lleva su fuente en pantalla.\nEntender Chile: el resumen sin gritos."

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
  "¿Por qué el desempleo de Chile no es igual en todas las regiones?\nSegún el INE, la desocupación nacional fue de 9,8 % entre julio y septiembre de 2026, contra 8,5 % un año antes. Entre las regiones que revisamos, Ñuble tuvo 11,8 % y Aysén 4,0 %.\nEl INE entrega cada cifra por trimestres móviles: tres meses seguidos, y cada mes el trimestre se corre un lugar.\nEl miércoles 25-11 a las 19:00 sale el video largo sobre la recesión técnica y lo que significa para el empleo y los precios.\nFuentes: INE, Encuesta Nacional de Empleo (29-10-2026) y fichas regionales del INE (regiones.ine.cl).",
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
      "texto": "Según la Encuesta Nacional de Empleo, entre julio y septiembre la desocupación del país fue de 9,8 %, 1,3 puntos más que un año antes. En Ñuble fue 11,8 %; en Aysén, 4,0 %.",
      "cifras": [cif("9,8 %", 9.8, R_NAC, "valor", "N2026", 2026), cif("1,3 puntos", 1.3, R_NAC, "diferencia", "N2026", 2026, paisB="N2025"),
                 cif("11,8 %", 11.8, R_REG, "valor", "CL-NB", 2026), cif("4,0 %", 4.0, R_REG, "valor", "CL-AI", 2026)]},
     {"tipo": "planteamiento",
      "texto": "Biobío, 10,5 %; Metropolitana, 10,4 %; Antofagasta, 6,7 %.",
      "cifras": [cif("10,5 %", 10.5, R_OTRAS, "valor", "CL-BI", 2026), cif("10,4 %", 10.4, R_OTRAS, "valor", "CL-RM", 2026), cif("6,7 %", 6.7, R_OTRAS, "valor", "CL-AN", 2026)],
      "visual": {"tipo": "chile", "regiones": ["CL-NB", "CL-BI", "CL-RM", "CL-AN"], "acercar": False}},
     {"tipo": "giro",
      "texto": "Cada cifra es un trimestre móvil, y un promedio nacional mezcla realidades distintas. En la Metropolitana, la tasa subió 1,6 puntos en doce meses.",
      "cifras": [cif("1,6 puntos", 1.6, R_RM, "diferencia", "RM26", 2026, paisB="RM25")],
      "rotulo": {"texto": "NO ES PAREJO", "dice": "promedio"}}],
   "remate": "Mismo país, mismo trimestre: 11,8 % en Ñuble, 4,0 % en Aysén.",
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
guardar("2026-11-25", "mineria-contra-el-resto", "grafico",
  "Por qué el Imacec subió solo 0,2 % si el resto creció 2 %",
  "¿Cómo puede crecer apenas 0,2 % la actividad si el resto crece 2 %?\nSegún el Banco Central, el Imacec de septiembre de 2026 subió 0,2 % frente a septiembre de 2025. La minería cayó 12,1 %, por menor extracción de cobre (menores leyes del mineral y suspensión temporal de faenas); el componente no minero creció 2,0 % anual, y 0,8 % en la serie ajustada por estación.\nHoy a las 19:00 sale el video largo: qué es una recesión técnica, por qué pasó y qué significa para el empleo y los precios.\nFuentes: Emol con datos del Banco Central (Imacec de septiembre, 02-11-2026; Imacec de agosto, 01-10-2026).",
  ["#imacec", "#cobre", "#chile"],
  {"gancho": {"texto": "Según el Banco Central, en septiembre la minería cayó 12,1 % y el Imacec subió solo 0,2 %. Fuera de la minería, la actividad creció 2 % contra un año antes.",
              "rotulo": "MINERÍA CAYÓ 12,1 %",
              "cifras": [cif("12,1 %", -12.1, R_IMS, "valor", "MINERO", 2026), cif("0,2 %", 0.2, R_IMS, "valor", "TOTAL", 2026), cif("2 %", 2.0, R_IMS, "valor", "NOMINERO", 2026)]},
   "grafico": {"tipo": "barras", "titulo": "Imacec de septiembre, contra un año antes", "datos": R_IMS, "destacar": {"pais": "MINERO"},
               "formato": {"decimales": 1, "sufijo": " %"}, "dice": "minería"},
   "escenas": [
     {"tipo": "dato", "usaGraficoPrincipal": True, "fuenteEnVoz": True,
      "texto": "Ese 2 % es sin ajustes. Con la serie ajustada por estación, el resto creció 0,8 % en doce meses.",
      "cifras": [cif("0,8 %", 0.8, R_IMSD, "valor", "NOMINERO", 2026)]},
     {"tipo": "planteamiento",
      "texto": "En agosto la minería ya había caído 17,4 %. El Banco Central citó menores leyes del mineral y mantenciones; en septiembre, menores leyes y suspensión de faenas.",
      "cifras": [cif("17,4 %", -17.4, R_IMA, "valor", "MINERO", 2026), cif("1,4 %", 1.4, R_IMA, "valor", "NOMINERO", 2026)],
      "visual": {"tipo": "iconos", "titulo": "Por qué cayó la minería", "items": [
          {"icono": "⛏️", "texto": "Menores leyes del mineral", "dice": "leyes"}, {"icono": "🔧", "texto": "Mantenciones (agosto)", "dice": "mantenciones"}, {"icono": "⏸️", "texto": "Faenas suspendidas (sept.)", "dice": "suspensión"}]}},
     {"tipo": "giro",
      "texto": "El resto de la economía creció, pero no alcanzó a compensar a la minería. Hoy a las siete de la tarde, en el video largo, vemos qué significa para el empleo.",
      "rotulo": {"texto": "RESTO: +2,0 %", "dice": "creció"}}],
   "remate": "Una parte cayó 12,1 %, otra creció, y el total quedó en 0,2 %.",
   "fuentes": [{"texto": "Emol, Imacec de septiembre (02-11-2026)", "url": EMOL_IMACEC_SEP},
               {"texto": "Emol, Imacec de agosto (01-10-2026)", "url": EMOL_IMACEC_AGO}]},
  "12:00")

# ============================================================ LARGO · mié 25-11 19:00 · recesión técnica
# OJO: el gancho y el cap. 1 se escribieron el 17-11, ANTES de las Cuentas Nacionales del 18-11-2026 08:30 (ver PAUTA).
NB_T = {"T1": "1.er trimestre", "T2": "2.º trimestre"}
R_PIB = ref("pib-trimestral-desest-2026", ["T1", "T2"], {"T1": [[2026, -0.25]], "T2": [[2026, -0.02]]}, NB_T,
            "Banco Central de Chile, Cuentas Nacionales; cálculo con más decimales de Bloomberg (vía DF, 11-11-2026)", DF_QUIROZ,
            "PIB contra el trimestre anterior", "%")
R_PIBR = ref("pib-trimestral-desest-publicado-2026", ["T1", "T2"], {"T1": [[2026, -0.3]], "T2": [[2026, 0.0]]}, NB_T,
             "Banco Central de Chile, Cuentas Nacionales del 18-08-2026 (vía Emol)", EMOL_CCNN, "PIB contra el trimestre anterior, publicado", "%")
R_PIBA = ref("pib-trimestral-interanual-2026", ["T1", "T2"], {"T1": [[2026, -0.3]], "T2": [[2026, -0.2]]}, NB_T,
             "Banco Central de Chile, Cuentas Nacionales del 18-08-2026 (vía Emol)", EMOL_CCNN, "PIB contra el mismo trimestre de 2025", "%")
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
R_REV = ref("pib-t1-interanual-revision-2026", ["MAYO", "AGOSTO"], {"MAYO": [[2026, -0.5]], "AGOSTO": [[2026, -0.3]]},
            {"MAYO": "Publicado en mayo", "AGOSTO": "Corregido en agosto"},
            "Banco Central de Chile, Cuentas Nacionales (vía Emol, 18-08-2026)", EMOL_CCNN, "PIB del 1.er trimestre contra un año antes", "%")
R_PIBA3 = ref("pib-interanual-con-estimacion-t3-2026", ["T1", "T2", "T3"], {"T1": [[2026, -0.3]], "T2": [[2026, -0.2]], "T3": [[2026, -0.8]]},
              {"T1": "1.er trimestre", "T2": "2.º trimestre", "T3": "3.º (estimado)"},
              "Banco Central de Chile; el 3.er trimestre es el promedio del Imacec (vía Emol, 02-11-2026)", EMOL_IMACEC_SEP, "PIB contra el mismo trimestre de 2025", "%")
R_DESM = ref("desocupacion-trimestres-moviles-2026", ["CHL"], {"CHL": [[0, 9.4], [1, 9.5], [2, 9.6], [3, 9.8]]}, {"CHL": "Desocupación"},
             "INE, Encuesta Nacional de Empleo, trimestres móviles de 2026", INE_ENE, "Tasa de desocupación nacional", "%",
             {"0": "abr-jun", "1": "may-jul", "2": "jun-ago", "3": "jul-sep"})
R_COBRE = ref("quiroz-cobre-puntos-pib-2026", ["BAJO", "ALTO"], {"BAJO": [[2026, 1.0]], "ALTO": [[2026, 1.5]]},
              {"BAJO": "Efecto directo", "ALTO": "Efecto total"},
              "Ministro de Hacienda J. Quiroz, ChileDay de Londres, 16-09-2026 (vía Emol)", EMOL_QUIROZ_CHILEDAY, "Puntos de crecimiento que resta el cobre", "puntos")

NUM = lambda txt: txt
largo = {
 "cabecera": "RECESIÓN TÉCNICA · CHILE 2026",
 "gancho": {
   "texto": "Con más decimales, la economía chilena cayó 0,02 % entre abril y junio, solo dos centésimas. Con la regla que compara con el trimestre anterior, esa diferencia decide si hubo recesión técnica. Con la regla interanual, la que se usa tradicionalmente en Chile, hay dos caídas seguidas, según las cifras de agosto. Por eso se discute qué nombre ponerle.",
   "rotulo": "¿RECESIÓN POR 0,02 %?",
   "grafico": {"tipo": "contador", "titulo": "Lo que cayó el PIB entre abril y junio", "datos": R_PIB, "destacar": {"pais": "T2", "texto": "contra el trimestre anterior"},
               "formato": {"decimales": 2, "sufijo": " %"}},
   "cifras": [cif("0,02 %", -0.02, R_PIB, "valor", "T2", 2026)]},
 "promesa": "Vas a saber qué es una recesión técnica, por qué hay dos formas de medirla, qué frenó a la economía y cómo llega al empleo, los precios y la tasa de interés.",
 "indice": ["Qué es y qué no es", "Por qué cayó", "Cómo llega a casa", "Qué mirar ahora"],
 "estructura": "autopsia",
 "capitulos": [
  {"titulo": "Qué es una recesión técnica, y qué no es", "escenas": [
    {"tipo": "planteamiento",
     "texto": "Recesión técnica suena a diagnóstico médico, pero es una regla de cuenta simple: la economía cae durante dos trimestres seguidos. La pregunta es: ¿caer comparado con qué? Hay dos respuestas posibles, y en Chile se usan las dos. Se llama técnica porque no mira si la gente la está pasando mal, ni cuánto cayó la actividad: solo cuenta el signo de dos números seguidos, y por eso se la considera una señal de alerta, no un diagnóstico completo.",
     "visual": {"tipo": "iconos", "titulo": "Dos formas de medir una caída", "items": [
        {"icono": "📉", "texto": "Contra el trimestre anterior"}, {"icono": "📆", "texto": "Contra hace un año", "dice": "respuestas"}]}},
    {"tipo": "dato", "fuenteEnVoz": True,
     "texto": "La primera compara cada trimestre con el que viene justo antes, con la serie ajustada por estación del año. Según el Banco Central, el primer trimestre de 2026 cayó 0,3 % y el segundo quedó en cero. Pero Bloomberg y el Diario Financiero calcularon con más decimales: menos 0,25 % y menos 0,02 %.",
     "grafico": {"tipo": "barras", "titulo": "PIB contra el trimestre anterior", "datos": R_PIB, "destacar": {"pais": "T2"}, "formato": {"decimales": 2, "sufijo": " %"}, "dice": "decimales"},
     "cifras": [cif("0,3 %", -0.3, R_PIBR, "valor", "T1", 2026), cif("cero", 0.0, R_PIBR, "valor", "T2", 2026, tol=0.0),
                cif("0,25 %", -0.25, R_PIB, "valor", "T1", 2026), cif("0,02 %", -0.02, R_PIB, "valor", "T2", 2026)]},
    {"tipo": "dato", "fuenteEnVoz": True,
     "texto": "La segunda forma compara con el mismo trimestre del año anterior, y es la que tradicionalmente se usa en Chile. Con ese método, según Emol, el primer trimestre cayó 0,3 % y el segundo, 0,2 %. También son dos caídas seguidas, según esas cifras de agosto.",
     "grafico": {"tipo": "barras", "titulo": "PIB contra el mismo trimestre de 2025", "datos": R_PIBA, "destacar": {"pais": "T2"}, "formato": {"decimales": 1, "sufijo": " %"}, "dice": "Emol"},
     "cifras": [cif("0,3 %", -0.3, R_PIBA, "valor", "T1", 2026), cif("0,2 %", -0.2, R_PIBA, "valor", "T2", 2026)]},
    {"tipo": "dato", "fuenteEnVoz": True,
     "texto": "Hay un detalle que explica por qué los números se mueven: no son definitivos. Cada vez que sale un trimestre nuevo, el Banco Central revisa los anteriores. La caída del primer trimestre contra un año antes se publicó en mayo como 0,5 % y en agosto se corrigió a 0,3 %. Por eso, el 18 de noviembre, junto con el tercer trimestre, se volvieron a revisar el primero y el segundo.",
     "grafico": {"tipo": "barras", "titulo": "Primer trimestre: la cifra se corrigió", "datos": R_REV, "destacar": {"pais": "AGOSTO"}, "formato": {"decimales": 1, "sufijo": " %"}, "dice": "mayo"},
     "cifras": [cif("0,5 %", -0.5, R_REV, "valor", "MAYO", 2026), cif("0,3 %", -0.3, R_REV, "valor", "AGOSTO", 2026)]},
    {"tipo": "giro",
     "texto": "Aquí cambia la lectura: que haya o no recesión técnica depende de la regla elegida, no de una economía distinta. En agosto hubo economistas que dijeron que sí la hubo, y otros que dijeron que no, mirando los mismos números. Rodrigo Vergara, del CEP, afirmó que hubo una recesión técnica. Sergio Lehmann, de BCI, dijo que en rigor no la hubo, y que estuvieron muy cerca. El ministro de Hacienda, Jorge Quiroz, dijo el 18 de agosto que no había recesión. El 11 de noviembre, en una entrevista con Bloomberg, dijo: se le puede llamar técnicamente una recesión, y atribuyó la caída a shocks de oferta, sobre todo la baja del cobre.",
     "rotulo": {"texto": "DOS REGLAS", "dice": "regla"}}]},
  {"titulo": "Por qué cayó: el cobre", "escenas": [
    {"tipo": "planteamiento",
     "texto": "¿Qué frenó a la economía? Para entenderlo hay que mirar un sector que pesa mucho en Chile: la minería del cobre. Y el Banco Central publica cada mes un indicador que permite verlo con precisión. El PIB se conoce una vez por trimestre; este otro indicador llega cada mes, como un adelanto, y por eso es el que primero muestra los cambios.",
     "visual": {"tipo": "foto", "busqueda": "Chuquicamata open pit copper mine", "alternativas": ["Chile copper mine open pit", "Escondida copper mine"], "pie": "Mina de cobre a rajo abierto, Chile", "encuadre": "ken-burns"}},
    {"tipo": "dato", "fuenteEnVoz": True,
     "texto": "Es el Imacec, el índice mensual de actividad. Según el Banco Central, en septiembre la economía creció 0,2 % frente a un año antes. La minería cayó 12,1 %, por menor extracción de cobre, y el resto de la economía, la no minera, creció 2,0 %.",
     "grafico": {"tipo": "barras", "titulo": "Imacec de septiembre, contra un año antes", "datos": R_IMS, "destacar": {"pais": "MINERO"}, "formato": {"decimales": 1, "sufijo": " %"}, "dice": "minería"},
     "cifras": [cif("0,2 %", 0.2, R_IMS, "valor", "TOTAL", 2026), cif("12,1 %", -12.1, R_IMS, "valor", "MINERO", 2026), cif("2,0 %", 2.0, R_IMS, "valor", "NOMINERO", 2026)]},
    {"tipo": "dato", "fuenteEnVoz": True,
     "texto": "Un mes antes la brecha era todavía mayor. En agosto la minería cayó 17,4 % y la no minera creció 1,4 %. Según el Banco Central, pesaron las menores leyes del mineral, las mantenciones y el clima adverso.",
     "grafico": {"tipo": "barras", "titulo": "Imacec de agosto, contra un año antes", "datos": R_IMA, "destacar": {"pais": "MINERO"}, "formato": {"decimales": 1, "sufijo": " %"}, "dice": "agosto"},
     "cifras": [cif("17,4 %", -17.4, R_IMA, "valor", "MINERO", 2026), cif("1,4 %", 1.4, R_IMA, "valor", "NOMINERO", 2026)]},
    {"tipo": "dato", "fuenteEnVoz": True,
     "texto": "El Imacec también sirve para anticipar el PIB del trimestre. Según Emol, con los tres meses del tercer trimestre ya conocidos, el promedio apuntaba a una caída de 0,8 % contra un año antes. Sería el tercer trimestre seguido con caída en la comparación anual, y la más profunda de las tres. Es una estimación: el dato definitivo salió el 18 de noviembre.",
     "grafico": {"tipo": "barras", "titulo": "PIB contra un año antes, con el tercer trimestre estimado", "datos": R_PIBA3, "destacar": {"pais": "T3"}, "formato": {"decimales": 1, "sufijo": " %"}, "dice": "estimación"},
     "cifras": [cif("0,8 %", -0.8, R_PIBA3, "valor", "T3", 2026)]},
    {"tipo": "giro",
     "texto": "Y esto cambia la lectura: en agosto y septiembre, el resto de la economía creció. Quiroz calcula que la baja del cobre le quita a este año entre 1 y 1,5 puntos de crecimiento. Y según Bloomberg, la producción de cobre estaría bajo los 5 millones de toneladas, la menor en más de dos décadas. El ministro sostiene que el resto de los sectores crece con fuerza, y proyecta que la producción de cobre se recupere de a poco, hasta entre 5,5 y 6 millones de toneladas en cinco años.",
     "rotulo": {"texto": "SIN MINERÍA, CRECE", "dice": "creció"},
     "cifras": [cif("1 y 1,5 puntos", 1.5, R_COBRE, "valor", "ALTO", 2026)]},
    {"tipo": "reenganche",
     "texto": "Pero una caída de la actividad no se queda en las estadísticas: llega a una casa por el trabajo, por los precios y por la tasa de interés."}]},
  {"titulo": "Cómo llega a tu casa: empleo y precios", "escenas": [
    {"tipo": "planteamiento",
     "texto": "Una caída de la actividad llega a una casa por tres puertas. La primera es el trabajo, y ahí los datos del INE muestran dos cosas a la vez: el desempleo es alto a nivel nacional y muy distinto entre regiones: en Ñuble fue 11,8 % y en Aysén, 4,0 %, en julio a septiembre.",
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
     "texto": "La segunda puerta son los precios. Según el INE, el IPC de octubre subió 0,5 % en el mes, y la inflación de doce meses llegó a 4,5 %, sobre la meta de 3 % del Banco Central. Los combustibles pesaron: la gasolina subió 4,5 % en un solo mes.",
     "grafico": {"tipo": "contador", "titulo": "Inflación a doce meses, octubre", "datos": R_IPC, "destacar": {"pais": "ANUAL", "texto": "IPC a doce meses"}, "formato": {"decimales": 1, "sufijo": " %"}, "dice": "4,5"},
     "cifras": [cif("0,5 %", 0.5, R_IPC, "valor", "MES", 2026), cif("4,5 %", 4.5, R_IPC, "valor", "ANUAL", 2026), cif("3 %", 3.0, R_IPC, "valor", "META", 2026), cif("4,5 %", 4.5, R_IPC, "valor", "GAS", 2026)]},
    {"tipo": "giro",
     "texto": "La tercera puerta, la tasa de interés, no se movió. El Banco Central mantuvo la tasa en 4,5 % en octubre, por unanimidad, en una pausa que viene desde diciembre de 2025. El Consejo dice que decidirá reunión a reunión. Mientras tanto, el empleo está débil y los precios, sobre la meta. En teoría, subir la tasa enfría los precios pero encarece los créditos, y bajarla ayuda a la actividad pero puede presionar los precios. Cuando el empleo y la inflación señalan hacia lados opuestos, el Consejo ha dicho que decidirá reunión a reunión.",
     "rotulo": {"texto": "TASA EN 4,5 %", "dice": "interés"},
     "visual": {"tipo": "iconos", "titulo": "Las tres puertas", "items": [
        {"icono": "👷", "texto": "Trabajo", "valor": "9,8 %", "dice": "empleo"}, {"icono": "🛒", "texto": "Precios", "valor": "4,5 %", "dice": "precios"}, {"icono": "🏦", "texto": "Tasa de interés", "valor": "4,5 %", "dice": "unanimidad"}]},
     "cifras": [cif("4,5 %", 4.5, R_TPM, "valor", "TPM", 2026)]},
    {"tipo": "reenganche",
     "texto": "Entonces, con la actividad frenada, el empleo débil y los precios arriba, queda lo práctico: qué datos mirar en las próximas semanas para saber si esto se profundiza o se estabiliza."}]},
  {"titulo": "Qué mirar en las próximas semanas", "escenas": [
    {"tipo": "planteamiento",
     "texto": "Hay cinco datos que van a mostrar hacia dónde va esto. El primero ya salió el 18 de noviembre: ese día el Banco Central publicó el PIB del tercer trimestre y actualizó los dos anteriores. Esa cifra suma o resta un trimestre de caída en cada una de las dos reglas.",
     "visual": {"tipo": "iconos", "titulo": "Qué mirar ahora", "items": [
        {"icono": "📊", "texto": "PIB del tercer trimestre", "dice": "primero"}, {"icono": "⛏️", "texto": "Imacec de octubre"},
        {"icono": "👷", "texto": "Empleo, agosto a octubre"}, {"icono": "🏦", "texto": "Tasa: reunión del 15 de dic"}, {"icono": "🛒", "texto": "IPC de noviembre"}]}},
    {"tipo": "dato", "fuenteEnVoz": True,
     "texto": "El segundo es la tasa de política monetaria. Según el comunicado del Banco Central, la próxima reunión es el martes 15 de diciembre, y la Encuesta de Expectativas de octubre esperaba que la tasa siga en 4,5 % en esa cita. Después vienen el Imacec de octubre, que dirá si la minería se recupera; el empleo del trimestre de agosto a octubre, que dirá si la escalera sigue subiendo; y el IPC de noviembre, que dirá si los combustibles siguen empujando los precios.",
     "grafico": {"tipo": "contador", "titulo": "Tasa de política monetaria", "datos": R_TPM, "destacar": {"pais": "TPM", "texto": "vigente desde diciembre de 2025"}, "formato": {"decimales": 1, "sufijo": " %"}, "dice": "4,5"},
     "cifras": [cif("4,5 %", 4.5, R_TPM, "valor", "TPM", 2026)]},
    {"tipo": "giro",
     "texto": "Y hay un detalle que corrige una idea común: la recesión técnica no mide cuánto cae la economía, solo si cae dos trimestres seguidos. Dos caídas de centésimas cuentan igual que dos caídas grandes. Por eso el nombre importa menos que el tamaño de la caída y lo que viene después.",
     "rotulo": {"texto": "NO MIDE EL TAMAÑO", "dice": "tamaño"}},
    {"tipo": "reenganche",
     "texto": "Antes de cerrar, queda la pregunta de cómo se nota todo esto en una familia."},
    {"tipo": "significado",
     "texto": "En resumen, qué cambia y qué no. Lo que no cambia con la regla es que el empleo, los precios y la tasa son los mismos datos con cualquier etiqueta. Lo que sí cambia es el nombre: recesión técnica, sí o no, según cómo se mida. Y lo que se nota en la vida diaria es que el freno del cobre no se quedó en las minas: aparece en un mercado laboral más débil y en precios que suben por sobre la meta. Nada de esto es una predicción: es lo que muestran, hasta hoy, las cifras oficiales. El ministro Quiroz proyecta volver a crecer cerca de 4 % en 2028, y los datos de los próximos meses dirán si el camino va hacia allá."}]}],
 "numeroQueNadieMira": {
   "texto": "Y queda un número que casi nadie mira: 0,02 por ciento. Es lo que cayó la economía entre abril y junio, con más decimales, y es unas doce veces menos que lo que cayó entre enero y marzo. Una cifra tan chica explica por qué se discute el nombre: lo que se discute es el nombre, no que la actividad se frenó. Según la regla del trimestre anterior, dos centésimas separan una recesión técnica de no tenerla; los demás datos de este video muestran cómo se siente esa baja.",
   "grafico": {"tipo": "contador", "titulo": "Lo que cayó el PIB entre abril y junio", "datos": R_PIB, "destacar": {"pais": "T2", "texto": "contra el trimestre anterior"}, "formato": {"decimales": 2, "sufijo": " %"}},
   "cifras": [cif("0,02 por ciento", -0.02, R_PIB, "valor", "T2", 2026), cif("doce veces menos", 12.5, R_PIB, "razon", "T1", 2026, paisB="T2", tol=0.05)]},
 "remate": "Dos centésimas no cambian la economía: con una regla deciden el nombre, y con la otra no hacen falta.",
 "siguiente": "¿Cuánto tarda el empleo en recuperarse después de una caída de la actividad? Lo vemos en el próximo video.",
 "miniatura": {"texto": "¿RECESIÓN POR 0,02 %?", "grafico": {"tipo": "contador", "titulo": "Lo que cayó el PIB entre abril y junio", "datos": R_PIB, "destacar": {"pais": "T2"}, "formato": {"decimales": 2, "sufijo": " %"}}},
 "fuentes": [
   {"texto": "DF y Bloomberg, Quiroz y la recesión técnica (11-11-2026)", "url": DF_QUIROZ},
   {"texto": "Emol, Cuentas Nacionales del Banco Central (18-08-2026)", "url": EMOL_CCNN},
   {"texto": "Emol, el debate sobre la recesión técnica (18-08-2026)", "url": EMOL_DEBATE},
   {"texto": "Emol, Quiroz sobre la recesión técnica (18-08-2026)", "url": EMOL_QUIROZ_AGO},
   {"texto": "Emol, Imacec de septiembre (02-11-2026)", "url": EMOL_IMACEC_SEP},
   {"texto": "Emol, Imacec de agosto (01-10-2026)", "url": EMOL_IMACEC_AGO},
   {"texto": "Emol, Quiroz tras el ChileDay (17-09-2026)", "url": EMOL_QUIROZ_CHILEDAY},
   {"texto": "INE, desocupación de julio a septiembre de 2026 (29-10-2026)", "url": INE_PRENSA},
   {"texto": "Emol, IPC de octubre del INE (06-11-2026)", "url": EMOL_IPC},
   {"texto": "Banco Central, comunicado de la reunión de política monetaria de octubre de 2026", "url": BC_RPM}]}
guardar("2026-11-25", "recesion-tecnica-dos-centesimas", "tesis",
  "¿Recesión técnica por dos centésimas? Qué cambia y qué no",
  "¿Está Chile en recesión técnica, o depende de cómo se mida?\nEl PIB del segundo trimestre de 2026 cayó 0,02 % contra el trimestre anterior (cálculo con más decimales de Bloomberg; el Banco Central publica 0,0 %). Contra el mismo trimestre de 2025 cayó 0,2 %. Según la regla que se use, hay recesión técnica o no.\nRevisamos qué es, por qué cayó la minería y cómo llega al empleo, los precios y la tasa de interés, sin consejos financieros.\n\nCapítulos:\n00:00 El número de 0,02 %\n(los tiempos exactos se agregan al renderizar)\n\nFuentes:\n- DF y Bloomberg (11-11-2026): " + DF_QUIROZ + "\n- Emol, Cuentas Nacionales (18-08-2026): " + EMOL_CCNN + "\n- Emol, el debate (18-08-2026): " + EMOL_DEBATE + "\n- Emol, Imacec de septiembre (02-11-2026): " + EMOL_IMACEC_SEP + "\n- Emol, Imacec de agosto (01-10-2026): " + EMOL_IMACEC_AGO + "\n- INE, desocupación jul-sep 2026: " + INE_PRENSA + "\n- Emol, IPC de octubre (06-11-2026): " + EMOL_IPC + "\n- Banco Central, comunicado RPM octubre 2026: " + BC_RPM + "\n\nNo es asesoría financiera.",
  ["#economia", "#chile", "#pib", "#recesion"], largo, "19:00")
