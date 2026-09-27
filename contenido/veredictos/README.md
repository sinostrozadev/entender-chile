# contenido/veredictos/ : lo que decide Claude sobre cada pieza

Los escribe la rutina validadora con `prompts/validador.md`, uno por pieza:
`AAAA-MM-DD-<pieza>.md` en la cadena diaria y `clave-<slug>-<pieza>.md` en el
flujo de la Clave. Traen el veredicto (APROBADA o CORREGIR), las
`Correcciones:` numeradas para GPT y las `Observaciones:` que no bloquean pero
que lee quien escribe la pieza siguiente.

**Es dato del sistema, no se edita a mano**: cada veredicto mueve el estado
(`estado.yml`, `estado-clave.yml`) y despierta el turno que sigue.
