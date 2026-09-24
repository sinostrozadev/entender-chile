# Taller de voz · voces neutras

Prueba del 2026-09-24.

Azure tiene DOS voces chilenas y ninguna soporta estilos (confirmado con
la API en la ronda 2). Con acento chileno, el techo está donde está. Acá
se escucha qué hay fuera de Chile y qué trae cada una.

**Esto es una prueba.** La regla 31 exige acento chileno declarado; nada
de esto entra en producción sin cambiar esa regla primero.

## Lo que sintetizamos

| Archivo | Voz | ¿Funcionó? |
|---|---|---|
| `es-mx-jorge.mp3` | es-MX-JorgeNeural | ✅ |
| `es-co-gonzalo.mp3` | es-CO-GonzaloNeural | ✅ |
| `es-ar-tomas.mp3` | es-AR-TomasNeural | ✅ |
| `es-pe-alex.mp3` | es-PE-AlexNeural | ✅ |
| `es-us-alonso.mp3` | es-US-AlonsoNeural | ✅ |
| `es-es-alvaro.mp3` | es-ES-AlvaroNeural | ✅ |
| `es-mx-jorge-estilo-cheerful.mp3` | es-MX-JorgeNeural · estilo cheerful | ✅ |

## Todas las voces en español que Azure declara, y sus estilos

Los estilos son lo que NO tienen las chilenas: la misma voz diciendo lo
mismo con otra intención.

| Voz | País | Género | Estilos |
|---|---|---|---|
| `es-MX-Alejo:MAI-Voice-2-Flash` | es-MX | masculina | angry, confused, determined, disgusted, embarrassed, excited, fearful, happy, hopeful, jealous, joyful, regretful, relieved, sad, shouting, softvoice, surprised, whispering |
| `es-MX-Valeria:MAI-Voice-2-Flash` | es-MX | femenina | angry, confused, determined, disgusted, embarrassed, excited, fearful, happy, hopeful, jealous, joyful, regretful, relieved, sad, shouting, softvoice, surprised, whispering |
| `es-MX-Alejo:MAI-Voice-2` | es-MX | masculina | angry, confused, determined, disgusted, embarrassed, excited, fearful, happy, hopeful, jealous, joyful, regretful, relieved, sad, shouting, softvoice, surprised, whispering |
| `es-MX-Valeria:MAI-Voice-2` | es-MX | femenina | angry, confused, determined, disgusted, embarrassed, excited, fearful, happy, hopeful, jealous, joyful, regretful, relieved, sad, shouting, softvoice, surprised, whispering |
| `es-ES-Marta:MAI-Voice-2-Flash` | es-ES | femenina | adventurous, caringempathy, curious, encouraging, excited, friendlycheerful, nostalgic, reflective, saddisappointed, serious |
| `es-ES-Marta:MAI-Voice-2` | es-ES | femenina | adventurous, caringempathy, curious, encouraging, excited, friendlycheerful, nostalgic, reflective, saddisappointed, serious |
| `es-MX-JorgeNeural` | es-MX | masculina | cheerful, chat, whispering, sad, excited |
| `es-MX-DaliaNeural` | es-MX | femenina | cheerful, sad, whispering |
| `es-ES-AlvaroNeural` | es-ES | masculina | cheerful, sad |
| `es-MX-DaliaMultilingualNeural` | es-MX | femenina | ninguno |
| `es-MX-JorgeMultilingualNeural` | es-MX | masculina | ninguno |
| `es-MX-BeatrizNeural` | es-MX | femenina | ninguno |
| `es-MX-CandelaNeural` | es-MX | femenina | ninguno |
| `es-MX-CarlotaNeural` | es-MX | femenina | ninguno |
| `es-MX-CecilioNeural` | es-MX | masculina | ninguno |
| `es-MX-GerardoNeural` | es-MX | masculina | ninguno |
| `es-MX-LarissaNeural` | es-MX | femenina | ninguno |
| `es-MX-LibertoNeural` | es-MX | masculina | ninguno |
| `es-MX-LucianoNeural` | es-MX | masculina | ninguno |
| `es-MX-MarinaNeural` | es-MX | femenina | ninguno |
| `es-MX-NuriaNeural` | es-MX | femenina | ninguno |
| `es-MX-PelayoNeural` | es-MX | masculina | ninguno |
| `es-MX-RenataNeural` | es-MX | femenina | ninguno |
| `es-MX-YagoNeural` | es-MX | masculina | ninguno |
| `es-MX-Dalia:DragonHDLatestNeural` | es-MX | femenina | ninguno |
| `es-MX-Jorge:DragonHDLatestNeural` | es-MX | masculina | ninguno |
| `es-CO-SalomeNeural` | es-CO | femenina | ninguno |
| `es-CO-GonzaloNeural` | es-CO | masculina | ninguno |
| `es-AR-ElenaNeural` | es-AR | femenina | ninguno |
| `es-AR-TomasNeural` | es-AR | masculina | ninguno |
| `es-PE-CamilaNeural` | es-PE | femenina | ninguno |
| `es-PE-AlexNeural` | es-PE | masculina | ninguno |
| `es-US-PalomaNeural` | es-US | femenina | ninguno |
| `es-US-AlonsoNeural` | es-US | masculina | ninguno |
| `es-ES-Ximena:DragonHDLatestNeural` | es-ES | femenina | ninguno |
| `es-ES-Tristan:DragonHDLatestNeural` | es-ES | masculina | ninguno |
| `es-ES-ElviraNeural` | es-ES | femenina | ninguno |
| `es-ES-ArabellaMultilingualNeural` | es-ES | femenina | ninguno |
| `es-ES-IsidoraMultilingualNeural` | es-ES | femenina | ninguno |
| `es-ES-TristanMultilingualNeural` | es-ES | masculina | ninguno |
| `es-ES-XimenaMultilingualNeural` | es-ES | femenina | ninguno |
| `es-ES-AbrilNeural` | es-ES | femenina | ninguno |
| `es-ES-ArnauNeural` | es-ES | masculina | ninguno |
| `es-ES-DarioNeural` | es-ES | masculina | ninguno |
| `es-ES-EliasNeural` | es-ES | masculina | ninguno |
| `es-ES-EstrellaNeural` | es-ES | femenina | ninguno |
| `es-ES-IreneNeural` | es-ES | femenina | ninguno |
| `es-ES-LaiaNeural` | es-ES | femenina | ninguno |
| `es-ES-LiaNeural` | es-ES | femenina | ninguno |
| `es-ES-NilNeural` | es-ES | masculina | ninguno |
| `es-ES-SaulNeural` | es-ES | masculina | ninguno |
| `es-ES-TeoNeural` | es-ES | masculina | ninguno |
| `es-ES-TrianaNeural` | es-ES | femenina | ninguno |
| `es-ES-VeraNeural` | es-ES | femenina | ninguno |
| `es-ES-XimenaNeural` | es-ES | femenina | ninguno |

## Texto usado

> La Cámara rechazó por un voto ampliar la detención para ejecutar expulsiones administrativas. La reforma obtuvo ochenta y ocho votos a favor. Necesitaba ochenta y nueve. ¿Qué pasa ahora con el proyecto? El Gobierno todavía puede pedir que el Senado revise la reforma.
