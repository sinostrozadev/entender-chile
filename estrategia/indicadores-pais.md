# Chile en cifras: los indicadores del país en la web

Estado: IDEA TRABAJADA (2026-08-27). Origen: Santiago. Nada implementado.

## Qué es

Una sección de la web con los indicadores que cuentan cómo le va al país,
siempre al día, con su fecha de actualización y la de la próxima. No es un
dashboard de consultora: es la respuesta a "¿esto mejoró o empeoró?", que es
la pregunta que queda flotando después de cada noticia.

Encaja con el canal por una razón concreta: el informe diario cuenta el
episodio (el IPC de este mes), y esta sección da la serie (el IPC de los
últimos veinte años). Una noticia sin serie es una anécdota.

## Los indicadores candidatos

Ordenados por lo que más le importa a alguien que vive en Chile. La columna
de cadencia es lo que hace posible prometer "siempre actualizado": sin ella
no se sabe cuándo mirar.

ADVERTENCIA: las cadencias y los organismos de abajo hay que VERIFICARLOS uno
por uno contra la fuente antes de programar nada. Son de conocimiento general
y algunos calendarios cambian.

### Bolsillo (mensual, alta rotación)
| Indicador | Fuente | Cadencia |
|---|---|---|
| IPC (inflación) | INE | mensual, primeros días del mes siguiente |
| IMACEC (actividad) | Banco Central | mensual |
| Desempleo | INE, trimestre móvil | mensual |
| Salarios reales | INE | mensual |
| Precio del cobre | Cochilco | diario o mensual |
| UF y UTM | SII y Banco Central | diaria y mensual |
| Precio de combustibles | ENAP y CNE | semanal |
| Tasa de política monetaria | Banco Central | por reunión |

### Estructura (anual o menos)
| Indicador | Fuente | Cadencia |
|---|---|---|
| PIB y PIB per cápita | Banco Central | trimestral y anual |
| Pobreza y pobreza extrema | CASEN, Desarrollo Social | cada 2 a 3 años |
| Desigualdad (Gini) | CASEN | cada 2 a 3 años |
| Salario mínimo | ley | cuando se legisla |
| Deuda pública | Dipres | trimestral |
| Presupuesto de la nación | Dipres | anual |
| Población | INE, censo y proyecciones | censo cada 10 años |

### Vivir en Chile
| Indicador | Fuente | Cadencia |
|---|---|---|
| Homicidios | Informe Nacional de Homicidios, Fiscalía e INE | anual |
| Delitos de mayor connotación social | CEAD, Seguridad Pública | trimestral |
| Población penal | Gendarmería | mensual |
| Listas de espera en salud | Minsal | periódica, verificar |
| Esperanza de vida | INE | anual |
| Mortalidad infantil | Minsal e INE | anual |
| Déficit habitacional | Minvu y CASEN | con la CASEN |
| Precio de la vivienda | Cámara Chilena de la Construcción o Banco Central | trimestral |

### Futuro
| Indicador | Fuente | Cadencia |
|---|---|---|
| Resultados SIMCE | Agencia de Calidad | anual |
| Asistencia escolar | Mineduc | anual |
| Matrícula en educación superior | Mineduc | anual |
| Generación eléctrica renovable | Coordinador Eléctrico | mensual |
| Emisiones de CO2 | Ministerio del Medio Ambiente | anual |
| Inversión en I+D | ANID y Economía | anual |

Primera tanda sugerida: **IPC, desempleo, PIB per cápita, pobreza,
homicidios y salario mínimo**. Seis series, todas de fuente oficial, todas
con serie larga disponible, y cubren bolsillo, estructura y seguridad. Con
esas seis la sección ya vale; el resto crece después.

## Las bandas de presidentes: la idea buena y su trampa

Mostrar quién gobernaba en cada tramo hace la serie legible de inmediato:
uno reconoce el período y ubica los hechos. Ese es el valor.

La trampa: una banda debajo de una curva **sugiere causalidad**. El precio
del cobre, una pandemia o una crisis internacional no los decide un
presidente, y un gráfico que insinúa lo contrario convierte al canal en
munición de trinchera. Es exactamente lo que la identidad dice no ser.

Cómo se resuelve, y va como regla:
1. Las bandas son **contexto, no explicación**: franja tenue al pie del eje
   de tiempo, nunca fondo de color bajo la curva.
2. **Se pueden apagar.** El interruptor por defecto en apagado.
3. La misma serie muestra **hitos no políticos** con el mismo peso visual:
   crisis asiática, estallido, pandemia, precio del cobre. Si los períodos
   presidenciales fueran las únicas marcas, la lectura política es inevitable.
4. Una línea fija bajo el gráfico: los indicadores dependen de muchos
   factores; el período solo ubica en el tiempo.

## Forma: cómo se muestra

Regla que ordena todo: **la mayoría de estos indicadores es una sola serie en
el tiempo**. Una serie no necesita paleta ni leyenda; se dibuja en la pátina
del canal y el título dice qué es. Eso resuelve el 80% de la sección y calza
con la identidad de un solo acento.

- **Portada de la sección**: una grilla de fichas, una por indicador, con el
  valor actual grande, la variación respecto del período anterior, una
  minilínea de la serie completa y la fecha del dato. Se lee de un vistazo.
- **Página por indicador**: la serie larga completa, con hover que muestra el
  valor exacto de cada punto, las bandas apagables, los hitos, la
  metodología en dos frases y el enlace a la fuente oficial.
- **Interacción**: el sitio es estático, así que los gráficos se generan como
  SVG en el build (sin librería, sin depender de JavaScript para verse) y el
  hover se agrega encima como mejora progresiva. Si el JavaScript falla, el
  gráfico igual se ve y la tabla igual está.
- **Siempre hay tabla.** Cada gráfico trae su serie en tabla, plegada.
  Accesibilidad, y además es lo que la gente copia.

### Paleta para gráficos (validada, no elegida a ojo)

Los colores de sección del canal (`src/tema.ts`) **no sirven para gráficos de
varias series**: al medirlos fallan por falta de croma (se leen grises) y dos
de ellos son indistinguibles incluso con visión normal. Sirven para tarjetas,
no para líneas juntas.

Para las excepciones de varias series (comparar regiones, quintiles, sexos),
paleta propia, ya validada en claro y oscuro:

    #00806A  pátina saturada (primera serie, la del canal)
    #C1642B  ocre
    #3A5FA8  azul
    #9A3F6E  vino
    #6E7B1F  oliva

Con leyenda siempre, etiqueta directa cuando son cuatro o menos, y nunca un
color como única señal.

## Actualización: el corazón de la promesa

"Siempre actualizado" es una promesa que se rompe sola si no hay mecanismo.
Cada indicador vive en un archivo con su serie, su fuente, su fecha de dato,
su próxima fecha esperada y su enlace. Un script diario compara la fecha
esperada con hoy y avisa cuáles tocan; el que actualiza (script si la fuente
publica en formato leíble, o la tarea de GPT que abre la página) trae el dato
nuevo, y la ficha muestra siempre cuándo se tomó.

Cuando una fuente se atrasa, se dice: "dato de julio; INE debía publicar
agosto el 8-09-2026 y aún no aparece". Esa honestidad es más valiosa que el
dato mismo, y ningún dashboard la tiene.

## Por qué esto sirve al canal, más allá de ser lindo

- **Búsqueda permanente**: "pobreza en Chile", "PIB per cápita Chile" se
  buscan todos los meses, para siempre. Es el contenido evergreen que la web
  necesita y que el informe diario no puede dar.
- **Reutilización directa**: cada gráfico es una tarjeta de video sin trabajo
  extra, y la serie da el contexto que el informe cita.
- **Refuerza la firma**: el canal ya promete cada cifra con su fuente. Esta
  sección es esa promesa hecha sección.

## Decisiones abiertas

1. ¿Se parte con las seis sugeridas o con otra tanda?
2. ¿Quién actualiza cada indicador: script, GPT abriendo la fuente, o mano?
3. ¿Las bandas de presidentes entran en la versión 1 o después de validar
   que la sección no se lee como juicio político?
4. ¿Sección propia en el menú, o vive dentro de "Acerca" hasta que crezca?
5. ¿Cuántos años de serie? Sugerido: desde 1990 donde exista, porque permite
   comparar democracia completa sin discutir el corte.
