# Registro de decisiones

Formato de cada entrada: fecha - decisión - por qué - evidencia/fuente.

Este archivo cumple doble función: (1) memoria del proyecto, para no
re-litigar lo ya decidido; (2) registro del APORTE EDITORIAL HUMANO que la
política de contenido inauténtico del YPP exige poder demostrar
(support.google.com/youtube/answer/1311392). Se escribe corto y seguido; una
línea honesta vale más que un párrafo retórico.

---

## 2026-08-25 - Crear estrategia/ como base fundacional
**Qué**: carpeta con identidad, público, modelo de negocio, hoja de ruta y
este registro. **Por qué**: las definiciones estaban implícitas y dispersas
en prompts/ y README; las decisiones aguas abajo (títulos, tagline,
auspicios) necesitan una fuente de verdad, y el registro de decisiones es
además evidencia de cumplimiento YPP. **Evidencia**:
ideas/investigacion-crecimiento-2026-08-25.md, dimensión 6.

## 2026-08-25 - Tagline: "El resumen sin gritos"
**Qué**: tagline oficial del canal, para descripción, cierre de videos,
banner y bios. **Por qué**: nombra el diferenciador real (sobriedad frente
a matinales y redes) y es memorable; venía propuesta del backlog y Santiago
la eligió entre alternativas. **Decidió**: Santiago.

## 2026-08-25 - Público primario: "el ciudadano ocupado"
**Qué**: 25-55 años, trabaja, quiere informarse y entender en ~10 min por
la mañana. Manda en títulos, selección de temas y horario; el perfil
secundario (busca conceptos, llega a Claves) suma pero no desempata.
**Por qué**: calza con el producto principal (informe diario a hora fija)
y con el mejor CPM. **Decidió**: Santiago.

## 2026-08-25 - Identidad DECIDIDA
**Qué**: estrategia/identidad.md es la base oficial. Los ajustes de
Santiago fueron dos, ya aplicados: (1) cero jerga interna del pipeline en
documentos fundacionales (los pesos [A]/[B]/[C] se quedan en prompts/);
(2) cero rayas largas en todo el proyecto, con regla en los prompts para
que el contenido generado tampoco las use. **Decidió**: Santiago.

## 2026-08-25 - El trabajo de Claude se pushea directo a main
**Qué**: permiso explícito de Santiago para commitear directo a main, sin
rama intermedia ni PR. **Por qué**: main es lo que leen la automatización
de madrugada y el workflow; una rama paralela solo agrega fricción a un
repo de un solo dueño. **Decidió**: Santiago.

## 2026-08-25 - Observatorio de la plata pública: recopilar desde ya
**Qué**: se crea contenido/casos/ (dossiers vivos por caso de fondos
públicos mal usados, con reglas de rigor estrictas) y su actualización
diaria automática (scripts/casos.js en la madrugada). La recopilación de
datos queda decidida; el formato de publicación (reportaje mensual,
mega-informe, contador) queda en evaluación en ideas/evaluar.md.
**Por qué**: el seguimiento sostenido de casos es un vacío de los medios
grandes y calza con la identidad del canal; acumular primero permite
decidir el formato con material real. **Decidió**: Santiago.

## Decisiones previas, reconstruidas del repo (para que no se pierdan)

- **Firma epistémica del canal**: toda cifra con fuente visible en pantalla;
  chips HECHO (sólido) / INTERPRETACIÓN (contorno). (prompts/, src/tema.ts)
- **Sin secciones de trámite**: nada de pronóstico del tiempo como sección
  ni resumen deportivo de fecha - el canal explica, no cubre.
  (prompts/informe.md)
- **Acento visual único, apolítico**: verde pátina de cobre - chileno sin
  bandera. (src/tema.ts)
- **Pipeline automatizado con gate humano**: la máquina produce, el humano
  aprueba antes de publicar; escuchar el audio completo no se automatiza.
  (README.md, scripts/gate.js)
- **Serie doble**: Informe diario (hábito) + Claves (biblioteca evergreen,
  diaria, con banco de temas acumulativo). (prompts/claves.md)
- **prompts/ como única fuente de verdad de los prompts**; ChatGPT los lee
  del repo. (prompts/README.md)
- **2026-08-24 - Shorts y miniaturas automáticas aprobados** por Santiago.
  (ideas/ejecutar.md)
- **2026-08-25 - La voz clonada se trata como requisito de monetización**,
  no como mejora estética. (ideas/IMPLEMENTAR.md, política YouTube
  15-jul-2025)
