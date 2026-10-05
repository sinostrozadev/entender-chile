Acá van las ilustraciones de carátula que genera GPT, una por edición, con el
nombre FECHA.png (o .jpg). Las reglas y el pedido están en
prompts/caratula-pedido.txt, que es el prompt que se manda tal cual (quien lo
usa solo rellena sus tres marcadores). La tubería la explica
prompts/imagen-caratula.md. scripts/dia.js las copia a public/caratulas/ y
arma con ellas miniatura-3.png; si falta la del día, la tercera carátula sale
con el pictograma y la edición sigue igual.
