#!/usr/bin/env python3
"""Genera los JSON de los Shorts piloto (19 al 23-11-2026) desde datos verificados el 12 y 13-11-2026
(verificacion.md). Se deja en el repo para que una corrección de cifra se haga en UN lugar y se regenere:
  python3 -I contenido/semana/2026-11-19/generar.py"""
import json, os
D = os.path.dirname(os.path.abspath(__file__))
DESC_PIE = "\n\nVoz sintética generada por computador. Cada cifra lleva su fuente en pantalla.\nEntender Chile: el resumen sin gritos."

def ref(indicador, entidades, valores, nombres, fuente, url, etiqueta, unidad, etiquetasX=None):
    r = {"fuente": "manual", "indicador": indicador, "paises": entidades, "valores": valores, "nombres": nombres,
         "fuenteTexto": fuente, "fuenteUrl": url, "etiqueta": etiqueta, "unidad": unidad}
    if etiquetasX: r["etiquetasX"] = etiquetasX
    return r

def guardar(fecha, slug, titulo, desc, hashtags, props, hora="12:00"):
    id_ = f"{fecha}-short-{slug}"
    props["id"] = id_
    env = {"plantilla": "grafico", "id": id_, "titulo": titulo, "descripcion": desc + DESC_PIE,
           "hashtags": hashtags, "publicar": f"{fecha}T{hora}", "props": props}
    with open(os.path.join(D, f"{id_}.json"), "w") as f:
        json.dump(env, f, ensure_ascii=False, indent=2); f.write("\n")
    print("✓", id_)

# ---------- 1. jue 19-11: diésel y camioneros ----------
X = {"0": "29 jul", "1": "19 ago", "2": "9 sep", "3": "30 sep", "4": "21 oct", "5": "4 nov", "6": "11 nov"}
alzas = [[0, 28.5], [1, 97.4], [2, 89.0], [3, 95.0], [4, 91.5], [5, 0.0], [6, 41.9]]
acum = []; s = 0
for x, v in alzas: s += v; acum.append([x, round(s, 1)])
R_DIESEL = ref("diesel-alza-acumulada-2026", ["DIESEL"], {"DIESEL": acum}, {"DIESEL": "Diésel"},
               "ENAP, informes de precios (vía Emol, 21-10 y 11-11-2026)",
               "https://www.emol.com/noticias/Economia/2026/10/21/1214815/combustibles-precio-alza-enap-hoy.html",
               "Alza acumulada del diésel", "$/litro", X)
guardar("2026-11-19", "diesel-camioneros",
  "El diésel subió 443 pesos por litro: por eso pararon los camioneros",
  "¿Cuánto subió el diésel desde julio y por qué cortaron rutas los camioneros?\nSeis alzas seguidas desde el 29 de julio de 2026 suman unos 443 pesos por litro según los informes de ENAP.\nEl paro partió el 10-11-2026, convocado por la Confederación Fuerza del Norte; las dos confederaciones más grandes no adhirieron.\nFuentes: ENAP vía Emol (21-10-2026 y 11-11-2026), Emol (10-11-2026), The Clinic (10-11-2026).",
  ["#diesel", "#camioneros", "#chile"],
  {"gancho": {"texto": "Desde el 29 de julio, el diésel en Chile acumula unos 443 pesos más por litro. Te explico cómo se llegó ahí y por qué los camioneros cortaron rutas.",
              "rotulo": "+443 $ POR LITRO",
              "cifras": [{"texto": "unos 443 pesos", "valor": 443, "calculo": {"datos": R_DIESEL, "operacion": "valor", "pais": "DIESEL", "anio": 6}, "tolerancia": 0.02}]},
   "visualGancho": {"tipo": "chile", "acercar": False, "puntos": [
       {"texto": "Pozo Almonte", "en": [-69.79, -20.26], "dice": "rutas"},
       {"texto": "San Bernardo", "en": [-70.70, -33.59], "dice": "rutas"},
       {"texto": "Los Ángeles", "en": [-72.35, -37.47], "dice": "rutas"}]},
   "grafico": {"tipo": "lineas", "titulo": "Alza acumulada del diésel desde julio", "datos": R_DIESEL,
               "formato": {"decimales": 0, "prefijo": "$"}, "dice": "ENAP"},
   "escenas": [
     {"tipo": "dato", "usaGraficoPrincipal": True, "fuenteEnVoz": True,
      "texto": "Según los informes de ENAP fueron seis alzas seguidas, cada tres semanas, casi siempre de noventa pesos. Solo a comienzos de noviembre hubo una semana sin cambio."},
     {"tipo": "planteamiento",
      "texto": "El transporte de carga vive del diésel, y cada alza se va directo a sus costos. El 10 de noviembre la Confederación Fuerza del Norte llamó a un paro indefinido.",
      "visual": {"tipo": "chile", "acercar": False, "puntos": [
          {"texto": "Pozo Almonte", "en": [-69.79, -20.26], "dice": "Fuerza"},
          {"texto": "Coquimbo", "en": [-71.34, -29.95], "dice": "paro"},
          {"texto": "San Bernardo", "en": [-70.70, -33.59], "dice": "paro"},
          {"texto": "Los Ángeles", "en": [-72.35, -37.47], "dice": "indefinido"}]}},
     {"tipo": "giro",
      "texto": "Pero las dos confederaciones más grandes no se sumaron. El fondo del reclamo es el mecanismo que fija el precio, el Mepco, que deja subir el diésel de a poco pero sin parar.",
      "rotulo": {"texto": "EL MEPCO", "dice": "Mepco"}}],
   "remate": "El precio no saltó de golpe: subió de a poco, y por eso se notó tarde.",
   "fuentes": [{"texto": "Emol, alzas de ENAP (21-10-2026)", "url": "https://www.emol.com/noticias/Economia/2026/10/21/1214815/combustibles-precio-alza-enap-hoy.html"},
               {"texto": "Emol, paro de camioneros (10-11-2026)", "url": "https://www.emol.com/noticias/Nacional/2026/11/10/1216611/camioneros-bloqueos-bencina-alza-paro.html"}]})

# ---------- 2. vie 20-11: Lago Ranco ----------
R_LR = ref("lago-ranco-terreno-2025", ["PAGADO", "AVALUO"], {"PAGADO": [[2025, 567.08]], "AVALUO": [[2025, 33.57]]},
           {"PAGADO": "Lo que pagó", "AVALUO": "Avalúo fiscal"},
           "Contraloría Regional de Los Ríos, Informe N° 245 de 2026 (vía BioBioChile, 11-11-2026)",
           "https://www.biobiochile.cl/noticias/nacional/region-de-los-rios/2026/11/11/contraloria-revela-que-municipio-de-lago-ranco-compro-terreno-superando-casi-17-veces-el-avaluo-fiscal.shtml",
           "Terreno de 5.911 m²", "millones de $")
guardar("2026-11-20", "lago-ranco-terreno",
  "Lago Ranco pagó casi 17 veces el avalúo de un terreno",
  "¿Cómo un municipio termina pagando casi 17 veces el avalúo fiscal de un terreno?\nLa Contraloría Regional de Los Ríos revisó la compra que hizo la Municipalidad de Lago Ranco en febrero de 2025, por trato directo.\nEl informe pasó a la Fiscalía; eso no establece responsabilidades. El alcalde defiende la compra por el valor histórico del sitio.\nFuente: Informe Final N° 245 de 2026 de la Contraloría Regional de Los Ríos, vía BioBioChile (11-11-2026).",
  ["#lagoranco", "#contraloria", "#chile"],
  {"gancho": {"texto": "La Contraloría encontró que la Municipalidad de Lago Ranco pagó casi 17 veces el avalúo fiscal de un terreno. En un minuto, cómo se llega a esa cifra.",
              "rotulo": "17 VECES",
              "cifras": [{"texto": "casi 17 veces", "valor": 16.9, "calculo": {"datos": R_LR, "operacion": "razon", "pais": "PAGADO", "paisB": "AVALUO", "anio": 2025}, "tolerancia": 0.02}]},
   "visualGancho": {"tipo": "chile", "regiones": ["CL-LR"], "puntos": [{"texto": "Lago Ranco", "en": [-72.50, -40.31], "dice": "Lago"}]},
   "grafico": {"tipo": "barras", "titulo": "El terreno de Lago Ranco", "datos": R_LR, "destacar": {"pais": "PAGADO"},
               "formato": {"decimales": 0, "sufijo": " M"}, "dice": "pagó"},
   "escenas": [
     {"tipo": "dato", "usaGraficoPrincipal": True, "fuenteEnVoz": True,
      "texto": "Según el informe de la Contraloría de Los Ríos, el municipio pagó 567 millones de pesos por 5.911 metros cuadrados. El avalúo fiscal de ese terreno era de 33 millones.",
      "cifras": [{"texto": "567 millones", "valor": 567, "calculo": {"datos": R_LR, "operacion": "valor", "pais": "PAGADO", "anio": 2025}, "tolerancia": 0.01},
                 {"texto": "33 millones", "valor": 33.57, "calculo": {"datos": R_LR, "operacion": "valor", "pais": "AVALUO", "anio": 2025}, "tolerancia": 0.03}]},
     {"tipo": "planteamiento",
      "texto": "La compra fue por trato directo, en febrero de 2025, y el municipio no pudo acreditar por qué se autorizó a ese precio. El informe ya está en la Fiscalía.",
      "visual": {"tipo": "chile", "regiones": ["CL-LR"], "puntos": [{"texto": "Lago Ranco", "en": [-72.50, -40.31]}]}},
     {"tipo": "giro",
      "texto": "Ojo: eso no prueba un delito. El alcalde defiende la compra porque el sitio queda junto al muelle y tiene valor histórico, y anunció que él mismo pidió investigar.",
      "rotulo": {"texto": "NO ES CONDENA", "dice": "delito"}}],
   "remate": "El avalúo dice cuánto vale para el fisco; la Contraloría pregunta cuánto valía para el municipio.",
   "fuentes": [{"texto": "BioBioChile, Contraloría y Lago Ranco (11-11-2026)", "url": "https://www.biobiochile.cl/noticias/nacional/region-de-los-rios/2026/11/11/contraloria-revela-que-municipio-de-lago-ranco-compro-terreno-superando-casi-17-veces-el-avaluo-fiscal.shtml"}]})

# ---------- 3. sáb 21-11: Encuesta de Expectativas ----------
XE = {"0": "ene", "1": "feb", "2": "jun", "3": "jul", "4": "ago", "5": "sep", "6": "oct", "7": "nov"}
R_EEE = ref("eee-pib-2026", ["CHL"], {"CHL": [[0, 2.5], [1, 2.6], [2, 1.6], [3, 1.3], [4, 1.3], [5, 0.7], [6, 0.2], [7, 0.0]]}, {"CHL": "PIB 2026"},
            "Banco Central de Chile, Encuesta de Expectativas Económicas (vía The Clinic y Emol)",
            "https://www.theclinic.cl/2026/11/10/expertos-reducen-su-estimacion-de-crecimiento-del-pib-de-este-ano-y-apuestan-por-0/",
            "Crecimiento esperado del PIB 2026", "%", XE)
guardar("2026-11-21", "expectativas-pib-cero",
  "En enero esperaban que Chile creciera 2,5 %. Hoy esperan 0 %",
  "¿Cómo pasó Chile de esperar un crecimiento de 2,5 % a esperar 0 % en 2026?\nLa mediana de la Encuesta de Expectativas Económicas del Banco Central, mes a mes (los meses de marzo a mayo no se muestran porque no pudimos confirmarlos).\nEl miércoles 25-11 sale el video largo: qué es una recesión técnica y qué significa para tu bolsillo.\nFuentes: Banco Central de Chile, EEE, vía The Clinic (10-11-2026) y Emol (10-06 y 10-09-2026).",
  ["#economia", "#chile", "#pib"],
  {"gancho": {"texto": "En enero, los economistas que consulta el Banco Central esperaban que Chile creciera 2,5 % este año. En noviembre esperan 0 %. Mira cómo se fue cayendo.",
              "rotulo": "DE 2,5 % A 0 %",
              "cifras": [{"texto": "2,5 %", "valor": 2.5, "calculo": {"datos": R_EEE, "operacion": "valor", "pais": "CHL", "anio": 0}},
                         {"texto": "0 %", "valor": 0, "calculo": {"datos": R_EEE, "operacion": "valor", "pais": "CHL", "anio": 7}, "tolerancia": 0.05}]},
   "grafico": {"tipo": "lineas", "titulo": "¿Cuánto crecerá Chile en 2026?", "datos": R_EEE, "formato": {"decimales": 1, "sufijo": " %"},
               "anotaciones": [{"anio": 5, "texto": "cae el cobre", "dice": "septiembre"}], "dice": "enero"},
   "escenas": [
     {"tipo": "dato", "usaGraficoPrincipal": True, "fuenteEnVoz": True,
      "texto": "Según la encuesta del Banco Central, en junio ya bajaban a 1,6 %. En septiembre, con la minería cayendo, a 0,7 %. En octubre, 0,2 %.",
      "cifras": [{"texto": "1,6 %", "valor": 1.6, "calculo": {"datos": R_EEE, "operacion": "valor", "pais": "CHL", "anio": 2}},
                 {"texto": "0,7 %", "valor": 0.7, "calculo": {"datos": R_EEE, "operacion": "valor", "pais": "CHL", "anio": 5}},
                 {"texto": "0,2 %", "valor": 0.2, "calculo": {"datos": R_EEE, "operacion": "valor", "pais": "CHL", "anio": 6}}]},
     {"tipo": "giro",
      "texto": "Y el dato que más pesa: tres de cada diez consultados ya ponen una cifra negativa. El ministro de Hacienda, Jorge Quiroz, reconoció el 11 de noviembre que Chile está en recesión técnica.",
      "rotulo": {"texto": "RECESIÓN TÉCNICA", "dice": "recesión"},
      "visual": {"tipo": "chile", "regiones": ["CL-RM"], "acercar": False}}],
   "remate": "No cayó de un mes a otro: se fue cayendo, encuesta tras encuesta. El miércoles, el video completo.",
   "fuentes": [{"texto": "The Clinic, EEE de noviembre (10-11-2026)", "url": "https://www.theclinic.cl/2026/11/10/expertos-reducen-su-estimacion-de-crecimiento-del-pib-de-este-ano-y-apuestan-por-0/"},
               {"texto": "Emol, EEE de septiembre (10-09-2026)", "url": "https://www.emol.com/noticias/Economia/2026/09/10/1211110/empeoran-proyecciones-crecimiento-2026.html"},
               {"texto": "DF, Quiroz y la recesión técnica (11-11-2026)", "url": "https://www.df.cl/economia-y-politica/actualidad/quiroz-admite-que-chile-esta-en-recesion-tecnica-pero-asegura-que-sera"}]})

# ---------- 4. dom 22-11: Presupuesto ----------
R_CH = ref("ley-cholito-ptrac-2027", ["P2026", "P2027"], {"P2026": [[2027, 3634]], "P2027": [[2027, 514]]},
           {"P2026": "Hasta ahora", "P2027": "Propuesta 2027"},
           "Diputados en la discusión del Presupuesto 2027 (vía Cooperativa, 10-11-2026)",
           "https://www.cooperativa.cl/noticias/economia/presupuesto/presupuesto-camara-rechazo-partida-del-ministerio-del-interior-por/2026-11-10/192635.html",
           "Programa de la Ley Cholito", "millones de $")
guardar("2026-11-22", "presupuesto-interior-educacion",
  "La Cámara rechazó Interior y Educación: ¿se quedan sin plata?",
  "¿Qué pasa cuando la Cámara rechaza la partida de un ministerio en el Presupuesto 2027?\nInterior cayó el 10-11-2026 con un empate de 71 a 71; Educación, el 11-11-2026 con 72 a 72. Ninguno se queda sin fondos: el Senado discute y, si las cámaras no coinciden, se resuelve en comisión mixta antes del 30-11.\nFuentes: Cooperativa (10-11-2026), BioBioChile (11-11-2026).",
  ["#presupuesto", "#congreso", "#chile"],
  {"gancho": {"texto": "La Cámara rechazó dos partidas del Presupuesto 2027 por empate: Interior, 71 a 71, y Educación, 72 a 72. ¿Se quedan sin plata? En un minuto, cómo sigue.",
              "rotulo": "71 A 71",
              "cifras": [{"texto": "71 a 71", "valor": 71, "calculo": {"datos": ref("votacion-interior-2026", ["SI", "NO"], {"SI": [[2026, 71]], "NO": [[2026, 71]]}, {"SI": "A favor", "NO": "En contra"}, "Cámara de Diputados vía Cooperativa", "https://www.cooperativa.cl/noticias/economia/presupuesto/presupuesto-camara-rechazo-partida-del-ministerio-del-interior-por/2026-11-10/192635.html", "Votación de Interior", "votos"), "operacion": "valor", "pais": "SI", "anio": 2026}, "tolerancia": 0.01}]},
   "grafico": {"tipo": "barras", "titulo": "Lo que reclamaron en Interior", "datos": R_CH, "destacar": {"pais": "P2027"}, "formato": {"decimales": 0, "sufijo": " M"}, "dice": "Cholito"},
   "escenas": [
     {"tipo": "planteamiento",
      "texto": "Un empate no alcanza para aprobar, así que la partida cae. En Interior el reclamo fue por los recortes a Senapred y a la Ley Cholito.",
      "visual": {"tipo": "chile", "regiones": ["CL-VS"], "puntos": [{"texto": "Congreso", "en": [-71.62, -33.05]}]}},
     {"tipo": "dato", "usaGraficoPrincipal": True, "fuenteEnVoz": True,
      "texto": "Según los diputados, el programa de la Ley Cholito baja de 3.634 a 514 millones de pesos.",
      "cifras": [{"texto": "3.634", "valor": 3634, "calculo": {"datos": R_CH, "operacion": "valor", "pais": "P2026", "anio": 2027}, "tolerancia": 0.01},
                 {"texto": "514 millones", "valor": 514, "calculo": {"datos": R_CH, "operacion": "valor", "pais": "P2027", "anio": 2027}, "tolerancia": 0.01}]},
     {"tipo": "giro",
      "texto": "Pero ningún ministerio se queda sin plata. El proyecto pasa al Senado, el Gobierno puede reponer la partida, y si las cámaras no coinciden decide una comisión mixta. El plazo es el 30 de noviembre.",
      "rotulo": {"texto": "SIGUE EN EL SENADO", "dice": "Senado"}}],
   "remate": "Rechazar una partida no la borra: la manda de vuelta a negociar.",
   "fuentes": [{"texto": "Cooperativa, rechazo de Interior (10-11-2026)", "url": "https://www.cooperativa.cl/noticias/economia/presupuesto/presupuesto-camara-rechazo-partida-del-ministerio-del-interior-por/2026-11-10/192635.html"},
               {"texto": "BioBioChile, rechazo de Educación (11-11-2026)", "url": "https://www.biobiochile.cl/noticias/nacional/chile/2026/11/11/reves-para-el-gobierno-camara-rechaza-presupuesto-de-educacion-pese-a-promesa-de-reponer-computadores.shtml"}]})

# ---------- 5. lun 23-11: dilema congelar combustibles ----------
R_CO = ref("costo-congelamiento-combustibles", ["C2026", "C2027"], {"C2026": [[2026, 172969]], "C2027": [[2026, 365905]]},
           {"C2026": "Costo en 2026", "C2027": "Costo en 2027"},
           "Mensaje N° 439-374, informe financiero (vía Emol, 12-11-2026)",
           "https://www.emol.com/noticias/Nacional/2026/11/12/1216863/gobierno-proyecto-congela-precio-combustible.html",
           "Menores ingresos fiscales", "millones de $")
guardar("2026-11-23", "dilema-congelar-combustibles",
  "Congelar la bencina cuesta US$550 millones: ¿lo harías?",
  "¿Conviene congelar el precio de las gasolinas y el diésel hasta el 3 de febrero de 2027?\nEl Gobierno ingresó el 12-11-2026 el proyecto de ley (Mensaje N° 439-374) que fija en cero las alzas hasta esa fecha. Es un proyecto, no una ley: revisa en qué quedó su trámite.\nCuéntanos en los comentarios: ¿lo congelas o lo dejas subir?\nFuente: Emol (12-11-2026), con el informe financiero del proyecto.",
  ["#bencina", "#combustibles", "#chile"],
  {"gancho": {"texto": "Congelar las alzas de la bencina y el diésel hasta el 3 de febrero le costaría al fisco unos 550 millones de dólares. Te doy los datos y tú decides si lo harías.",
              "rotulo": "¿LO CONGELAS?"},
   "grafico": {"tipo": "barras", "titulo": "Lo que dejaría de recibir el fisco", "datos": R_CO, "formato": {"decimales": 0, "sufijo": " M"}, "dice": "fisco"},
   "escenas": [
     {"tipo": "dato", "usaGraficoPrincipal": True, "fuenteEnVoz": True,
      "texto": "Según el informe financiero del proyecto, son 172.969 millones de pesos este año y 365.905 millones el próximo, que se pagarían vendiendo activos del Tesoro.",
      "cifras": [{"texto": "172.969 millones", "valor": 172969, "calculo": {"datos": R_CO, "operacion": "valor", "pais": "C2026", "anio": 2026}, "tolerancia": 0.01},
                 {"texto": "365.905 millones", "valor": 365905, "calculo": {"datos": R_CO, "operacion": "valor", "pais": "C2027", "anio": 2026}, "tolerancia": 0.01}]},
     {"tipo": "planteamiento",
      "texto": "A favor: frena el alza que llevó al paro de camioneros y alivia a quien llena el estanque. En contra: es plata de todos que no va a otra cosa, y en febrero el precio vuelve a la regla del Mepco."},
     {"tipo": "giro",
      "texto": "Y un detalle: todavía es un proyecto de ley, no una ley. ¿Tú lo congelas o lo dejas subir? Escríbelo en los comentarios.",
      "rotulo": {"texto": "AÚN NO ES LEY", "dice": "proyecto"}}],
   "remate": "Congelar el precio no lo baja: decide quién paga la diferencia.",
   "fuentes": [{"texto": "Emol, proyecto que congela los combustibles (12-11-2026)", "url": "https://www.emol.com/noticias/Nacional/2026/11/12/1216863/gobierno-proyecto-congela-precio-combustible.html"},
               {"texto": "La Tercera, anuncio del Gobierno (11-11-2026)", "url": "https://www.latercera.com/politica/noticia/paro-de-camioneros-gobierno-anuncia-que-reingresara-proyecto-y-congelara-tarifas-del-combustible-hasta-febrero-para-contener-conflicto/"}]})
