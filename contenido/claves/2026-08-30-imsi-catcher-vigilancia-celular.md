# IMSI Catcher y vigilancia celular: cómo funciona una antena falsa y por qué necesita límites judiciales

Slug: imsi-catcher-vigilancia-celular

## La noticia que abrió esta pregunta - 30 de agosto de 2026

El informe diario del 30 de agosto de 2026 señaló que diputados de Renovación Nacional presentaron una moción para incorporar expresamente al Código Procesal Penal el uso excepcional de IMSI Catcher en investigaciones de crimen organizado. Según el informe, la tecnología puede simular una antena celular para captar identificadores y datos de ubicación de teléfonos, y la propuesta busca someter su utilización a autorización y control judicial. (Informe diario, 30 ago 2026).

## La pregunta de fondo

¿Cómo puede una herramienta policial identificar teléfonos sin entrar físicamente en ellos, por qué puede afectar también a personas que no están siendo investigadas y qué función cumple la autorización judicial cuando el Estado utiliza tecnologías intrusivas?

## Un teléfono se identifica constantemente ante la red

Para entender un IMSI Catcher conviene olvidar por un momento las aplicaciones, los mensajes y las fotografías almacenadas en un teléfono. Antes de todo eso existe una capa más básica: para utilizar una red móvil, el dispositivo debe comunicarse con infraestructura celular y demostrar qué abonado y qué equipo están intentando conectarse.

IMSI significa International Mobile Subscriber Identity, o identidad internacional del abonado móvil. Es un identificador asociado a la suscripción celular. Los sistemas modernos utilizan además identificadores temporales y otras protecciones para evitar que ese dato permanente circule innecesariamente, pero la arquitectura de las redes móviles históricamente ha tenido momentos en que un dispositivo debe entregar información de identidad antes de que se complete la protección de la conexión. El Instituto Nacional de Estándares y Tecnología de Estados Unidos ha descrito cómo una estación base falsa puede aprovechar ese proceso para obtener identificadores de dispositivos cercanos. (NIST, 2018).

Esto explica la idea básica del IMSI Catcher. No necesita empezar abriendo el teléfono de una persona ni leyendo su almacenamiento. Se presenta ante los dispositivos cercanos como infraestructura de la red celular y provoca que se comuniquen con él.

## Una antena falsa no es lo mismo que intervenir un teléfono

El nombre más intuitivo para esta tecnología es simulador de estación base celular. El aparato imita ciertas funciones de una antena legítima para conseguir que teléfonos dentro de su radio de operación intenten conectarse o intercambien información técnica con él.

A partir de esas interacciones es posible identificar dispositivos presentes en un área y, dependiendo de las capacidades del sistema, realizar tareas de localización. El Departamento de Justicia de Estados Unidos utiliza precisamente la expresión cell-site simulator para esta familia de equipos. Su política federal distingue expresamente la identificación y localización de dispositivos de la obtención del contenido de las comunicaciones, y prohíbe usar estos simuladores para recoger correos, mensajes, listas de contactos, fotografías u otros contenidos del teléfono dentro de sus investigaciones criminales ordinarias. (Departamento de Justicia de Estados Unidos, 2015, actualización 2025).

La distinción importa porque en el debate público suelen mezclarse varias técnicas bajo expresiones como "pinchar un teléfono" o "interceptar un celular". Técnicamente no son equivalentes.

Una interceptación de comunicaciones busca acceder a una comunicación, por ejemplo una llamada. Un registro de un dispositivo busca examinar información almacenada en él. Un IMSI Catcher, en su función característica, busca que los dispositivos se revelen ante una estación base simulada para identificarlos o localizarlos.

Una investigación puede combinar varias técnicas, pero cada una afecta información distinta y puede exigir reglas jurídicas diferentes.

## El problema de los terceros que están cerca

La característica que vuelve especialmente delicado al IMSI Catcher es que una señal de radio no conoce de antemano cuál de los teléfonos cercanos pertenece al sospechoso.

Imaginemos que una investigación busca localizar un dispositivo utilizado por una persona vinculada a una organización criminal y existen cien teléfonos en el área donde se despliega el equipo. Para descubrir cuál está presente, el sistema puede recibir identificadores o señales técnicas provenientes de dispositivos que no pertenecen al objetivo investigado.

Eso crea una diferencia respecto de una medida dirigida desde el comienzo a una línea telefónica perfectamente individualizada. La tecnología puede involucrar incidentalmente datos de personas ajenas a la investigación.

El problema jurídico no consiste únicamente en preguntar si la policía necesita una herramienta eficaz. También hay que decidir qué información puede captar, durante cuánto tiempo, en qué lugar, respecto de qué investigación, qué debe hacer con los datos de terceros y quién verifica que la medida se mantenga dentro de esos límites.

Por eso las reglas de minimización son importantes. En sistemas que regulan estos dispositivos, una salvaguarda habitual consiste en limitar la conservación y utilización de información perteneciente a personas que no son objetivos de la investigación. La política del Departamento de Justicia estadounidense, por ejemplo, acompañó la exigencia general de orden judicial con reglas de privacidad, supervisión y manejo de datos. (Departamento de Justicia de Estados Unidos, 2015, actualización 2025).

## Por qué aparece un juez antes de la diligencia

En un proceso penal existe una diferencia entre investigar y autorizar determinadas intrusiones.

El Ministerio Público dirige la investigación y las policías ejecutan numerosas diligencias. Pero cuando una medida puede afectar intensamente derechos fundamentales, el sistema procesal introduce un tercero institucional: el juez de garantía.

La lógica es evitar que quien necesita obtener la información sea también la única autoridad que decida si puede invadir el ámbito protegido para conseguirla.

El Código Procesal Penal chileno ya aplica esta arquitectura a la interceptación y grabación de comunicaciones. La orden debe provenir de un juez de garantía, individualizar o determinar al afectado, describir la forma y alcance de la interceptación y fijar su duración. La legislación también limita las comunicaciones que pueden ser intervenidas y establece protecciones especiales, entre ellas las comunicaciones entre el imputado y su abogado, salvo una hipótesis excepcional fundada judicialmente. (BCN, Código Procesal Penal, art. 222).

La autorización judicial previa cumple así una función de control de necesidad y proporcionalidad. El investigador debe justificar por qué la diligencia está vinculada a una investigación concreta y por qué corresponde autorizar ese grado de intrusión.

## Autorización judicial no significa permiso ilimitado

Decir que una tecnología se utilizará "con orden judicial" todavía deja muchas preguntas abiertas.

Una regulación robusta debe precisar qué delitos permiten emplearla, qué antecedentes debe presentar el Ministerio Público, cuánto puede durar la medida, qué datos pueden obtenerse, qué ocurre con la información de terceros, quién puede operar el equipo, cómo se registra su utilización y qué sucede si durante la diligencia aparecen datos que exceden lo autorizado.

El Código Procesal Penal muestra esta lógica en otras medidas intrusivas. En materia de interceptación, la resolución judicial debe especificar al afectado, los medios a intervenir cuando sea posible, la autoridad encargada, la forma, el alcance y la duración de la diligencia. La interceptación ordinaria tiene además límites temporales y sus prórrogas requieren un nuevo examen judicial de los requisitos. (BCN, Código Procesal Penal, art. 222).

Por eso el verdadero debate legislativo sobre una nueva herramienta no termina preguntando si habrá juez. También debe definir qué exactamente puede autorizar ese juez.

## Crimen organizado y técnicas especiales de investigación

Las organizaciones criminales presentan un problema distinto al de muchos delitos individuales. Pueden utilizar múltiples teléfonos, cambiar tarjetas SIM, recurrir a intermediarios, operar desde diferentes territorios y distribuir funciones entre personas que no aparecen formalmente vinculadas entre sí.

La legislación chilena ha respondido ampliando y sistematizando técnicas especiales de investigación para criminalidad organizada. El Código Procesal Penal contiene un párrafo específico sobre diligencias especiales aplicables a estos casos, incluyendo medidas intrusivas sobre comunicaciones, imágenes, sonidos y equipos informáticos, además de agentes encubiertos, agentes reveladores, informantes y entregas vigiladas. (BCN, Código Procesal Penal, arts. 226 A y siguientes; Ley 21.577, 2023).

La existencia de herramientas especiales no elimina los límites. Al contrario, cuanto mayor es la capacidad técnica de una diligencia para observar conductas que normalmente quedarían fuera del alcance estatal, más importante se vuelve definir el supuesto habilitante y los controles.

Esta es una tensión permanente del proceso penal moderno. Si la ley regula las investigaciones como si las organizaciones criminales utilizaran tecnologías de hace treinta años, puede volver ineficaz la persecución. Si entrega facultades tecnológicas amplias sin delimitar su uso, puede convertir una herramienta excepcional en una forma de vigilancia general.

## Identificar, localizar e interceptar son preguntas jurídicas diferentes

Una de las mejores formas de leer futuras discusiones sobre vigilancia es preguntar qué dato quiere obtener exactamente el Estado.

Saber que un determinado identificador celular estuvo presente en una zona es una cosa. Determinar con precisión creciente dónde está un dispositivo es otra. Obtener metadatos sobre comunicaciones es otra. Escuchar el contenido de una llamada es otra. Registrar archivos almacenados dentro del equipo es otra.

Todas pueden ser útiles para una investigación, pero no producen la misma intrusión ni necesitan necesariamente el mismo procedimiento.

La Ley General de Telecomunicaciones chilena sanciona la interceptación o captación maliciosa y no autorizada de señales de servicios públicos de telecomunicaciones. El proceso penal, por su parte, establece las condiciones bajo las cuales la autoridad puede realizar legalmente determinadas interceptaciones en una investigación. (BCN, Ley 18.168, art. 36 B; Código Procesal Penal, art. 222).

Esto ayuda a entender por qué una ley que incorpora una tecnología específica no es simplemente una autorización para "espiar celulares". Debe insertar una capacidad técnica determinada dentro de un sistema jurídico que ya distingue entre información protegida, diligencias investigativas y medidas intrusivas.

## El principio de proporcionalidad

Aunque la palabra proporcionalidad puede sonar abstracta, su lógica es cotidiana: una medida más invasiva necesita una justificación más fuerte.

No tendría sentido utilizar una tecnología capaz de identificar numerosos dispositivos en un área para investigar cualquier infracción menor si existen mecanismos menos intrusivos suficientes. En cambio, una organización dedicada a secuestros, extorsiones o tráfico de drogas, que cambia continuamente de teléfonos para impedir su localización, puede presentar una necesidad investigativa mucho mayor.

El análisis de proporcionalidad obliga a conectar el medio con el objetivo. La pregunta no es solo si la herramienta sirve, sino si su utilización concreta está justificada frente a la gravedad del delito, la información buscada, la existencia de alternativas y el impacto sobre personas no investigadas.

La autorización judicial previa transforma esa evaluación en una decisión controlable. Una resolución fundada deja registro de por qué la medida fue autorizada y de cuáles eran sus límites.

## Por qué regular expresamente una tecnología puede importar

Una tecnología nueva puede quedar durante un tiempo dentro de categorías legales creadas antes de que existiera. Eso genera incertidumbre sobre qué norma la habilita, qué estándar judicial corresponde y qué datos puede recoger.

Una regulación expresa puede reducir esa ambigüedad. El legislador puede nombrar la técnica, definir sus finalidades, establecer requisitos y fijar obligaciones de eliminación o reserva de datos.

Pero regular expresamente tampoco equivale automáticamente a proteger mejor la privacidad. Todo depende del contenido de la regulación. Una norma muy amplia puede legalizar usos que antes eran discutibles; una norma precisa puede restringirlos y hacerlos fiscalizables.

Por eso, ante una propuesta sobre vigilancia tecnológica, conviene evitar dos conclusiones automáticas. La primera es que incorporar una herramienta a la ley necesariamente expande sin límites el poder policial. La segunda es que exigir autorización judicial resuelve por sí solo todos los riesgos. Lo relevante está en el diseño completo: supuestos, alcance, duración, tratamiento de terceros, trazabilidad y control posterior.

## Aplicado al caso de hoy - 30 de agosto de 2026

Al 30 de agosto de 2026, el informe diario registró una moción parlamentaria destinada a incorporar expresamente al Código Procesal Penal el uso excepcional de IMSI Catcher en investigaciones de crimen organizado, bajo autorización y control judicial. El informe describió la tecnología como capaz de simular una antena celular para captar identificadores y datos de ubicación de teléfonos. (Informe diario, 30 ago 2026).

Con el mecanismo explicado, la discusión puede leerse con más precisión. La pregunta no es solamente si las policías deberían disponer de una herramienta más potente contra organizaciones criminales. También importa determinar qué dispositivos puede alcanzar la diligencia, qué información puede obtener, cómo se individualiza el objetivo, qué sucede con los identificadores de terceros cercanos y qué condiciones debe revisar el juez antes de autorizarla.

El hecho de que una estación base simulada pueda interactuar con teléfonos que no pertenecen al investigado explica por qué el control judicial y las reglas sobre datos incidentales forman parte del problema técnico, no solamente de una discusión abstracta sobre privacidad.

Como el informe del 30 de agosto de 2026 señala que la iniciativa recién fue presentada como moción, sus reglas concretas deben analizarse durante la tramitación y pueden cambiar antes de una eventual aprobación. Esta entrega no presupone que la propuesta llegue a convertirse en ley ni que su texto definitivo conserve el diseño inicial.

## Qué conviene recordar

- Un IMSI Catcher simula funciones de una estación base celular para conseguir que dispositivos cercanos se comuniquen con él, lo que puede permitir identificarlos o localizarlos.
- Identificar un dispositivo, localizarlo, interceptar una comunicación y registrar el contenido almacenado en un teléfono son operaciones distintas y no deben tratarse como sinónimos.
- La dificultad jurídica particular de una antena simulada es que puede interactuar también con teléfonos de personas ajenas a la investigación, por lo que importan las reglas sobre minimización, conservación y eliminación de datos.
- La autorización judicial previa busca separar a quien necesita ejecutar una diligencia de quien decide si la intrusión está suficientemente justificada, pero su eficacia depende de que la ley defina con precisión alcance, duración y condiciones.
- Las tecnologías investigativas para crimen organizado plantean una tensión permanente entre eficacia penal y protección de derechos. Una regulación adecuada intenta permitir la herramienta cuando sea necesaria sin convertir una medida excepcional en vigilancia general.

## Fuentes

Informe diario, 30 de agosto de 2026. Caso de entrada.
Biblioteca del Congreso Nacional, Código Procesal Penal, Ley 19.696, artículos 222 y 226 A y siguientes. Reglas de interceptación y técnicas especiales para criminalidad organizada.
Biblioteca del Congreso Nacional, Ley 21.577, 15 de junio de 2023. Fortalecimiento de la persecución de delincuencia organizada y técnicas especiales de investigación.
Biblioteca del Congreso Nacional, Ley General de Telecomunicaciones, Ley 18.168, artículo 36 B. Interceptación o captación no autorizada de señales.
Instituto Nacional de Estándares y Tecnología de Estados Unidos, evaluación sobre amenazas de IMSI Catcher, 2018. Funcionamiento técnico de estaciones base falsas e identificadores móviles.
Departamento de Justicia de Estados Unidos, política sobre simuladores de estaciones base celulares, 3 de septiembre de 2015, actualización 5 de febrero de 2025. Alcance, autorización judicial y protecciones de privacidad.