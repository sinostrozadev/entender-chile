# Entender Chile Assets MCP

Puente para que ChatGPT tome un archivo que ya tiene disponible —por ejemplo un PNG recién generado— y lo guarde directamente en `sinostrozadev/entender-chile`.

## Seguridad
- Repo fijado en código: `sinostrozadev/entender-chile`.
- Solo escribe dentro de `public/`.
- Solo PNG, WebP y JPEG; máximo 25 MB.
- `GITHUB_TOKEN` vive como Cloudflare Secret y jamás se versiona.
- Antes del uso permanente, el endpoint de escritura debe quedar protegido con autenticación compatible con MCP/ChatGPT (OAuth 2.1 recomendado).

## Despliegue
```bash
cd tools/entender-chile-assets
npm install
npx wrangler login
npx wrangler secret put GITHUB_TOKEN
npm run deploy
```

El endpoint será `https://entender-chile-assets.<subdominio>.workers.dev/mcp`.

## GitHub token
Crear un fine-grained PAT restringido únicamente a `sinostrozadev/entender-chile`, con permiso de Contents de lectura/escritura. No pegarlo en ChatGPT: introducirlo directamente cuando Wrangler solicite `GITHUB_TOKEN`.

## Flujo final
`image_gen → file param de ChatGPT → subir_asset → GitHub Contents API → commit`

Ejemplo: `public/fondos/gobierno.png`.
