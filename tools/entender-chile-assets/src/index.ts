import { createMcpHandler } from "agents/mcp/server";
import { McpServer } from "@modelcontextprotocol/server";
import { z } from "zod";

interface Env { GITHUB_TOKEN: string }
const OWNER="sinostrozadev", REPO="entender-chile";
const API=`https://api.github.com/repos/${OWNER}/${REPO}`;
const MAX_BYTES=25*1024*1024;

const OpenAIFile=z.object({
  download_url:z.string().url(),
  file_id:z.string().min(1),
  mime_type:z.string().optional(),
  file_name:z.string().optional(),
});

function safePath(path:string){
  const p=path.replace(/^\/+/, "");
  if(!p.startsWith("public/")) throw new Error("La ruta debe estar dentro de public/.");
  if(p.includes("..")||p.includes("\\")) throw new Error("Ruta inválida.");
  if(!/\.(png|webp|jpe?g)$/i.test(p)) throw new Error("Solo PNG, WebP o JPEG.");
  return p;
}
function bytesToBase64(bytes:Uint8Array){
  let binary=""; const chunk=0x8000;
  for(let i=0;i<bytes.length;i+=chunk) binary+=String.fromCharCode(...bytes.subarray(i,i+chunk));
  return btoa(binary);
}
async function github(env:Env,path:string,init:RequestInit={}){
  return fetch(`${API}${path}`,{...init,headers:{
    Accept:"application/vnd.github+json",
    Authorization:`Bearer ${env.GITHUB_TOKEN}`,
    "X-GitHub-Api-Version":"2022-11-28",
    "User-Agent":"entender-chile-assets-mcp",
    ...(init.headers||{})
  }});
}
function createServer(env:Env){
  const server=new McpServer({name:"entender-chile-assets",version:"0.1.0"},{instructions:
    "Sube exclusivamente assets visuales para Entender Chile. Repo fijo sinostrozadev/entender-chile; rutas solo dentro de public/."
  });
  server.registerTool("subir_asset",{
    title:"Subir asset a Entender Chile",
    description:"Toma un archivo ya autorizado por ChatGPT y lo crea o reemplaza en sinostrozadev/entender-chile sin pedir al usuario que lo vuelva a subir.",
    inputSchema:{
      file:OpenAIFile,
      path:z.string().describe("Ruta dentro de public/, ej. public/fondos/gobierno.png"),
      branch:z.string().default("main"),
      message:z.string().default("assets: actualizar imagen generada")
    },
    annotations:{readOnlyHint:false,destructiveHint:false,openWorldHint:true},
    _meta:{"openai/fileParams":["file"]}
  },async({file,path,branch,message})=>{
    try{
      const target=safePath(path);
      const mime=file.mime_type??"";
      if(mime&&!["image/png","image/webp","image/jpeg"].includes(mime)) throw new Error(`Tipo no permitido: ${mime}`);
      const download=await fetch(file.download_url,{redirect:"follow"});
      if(!download.ok) throw new Error(`No pude descargar el archivo de ChatGPT (${download.status}).`);
      const data=new Uint8Array(await download.arrayBuffer());
      if(!data.byteLength) throw new Error("El archivo llegó vacío.");
      if(data.byteLength>MAX_BYTES) throw new Error("El archivo supera 25 MB.");
      const encoded=target.split("/").map(encodeURIComponent).join("/");
      const current=await github(env,`/contents/${encoded}?ref=${encodeURIComponent(branch)}`);
      let sha:string|undefined;
      if(current.ok) sha=((await current.json()) as {sha?:string}).sha;
      else if(current.status!==404) throw new Error(`No pude consultar GitHub (${current.status}).`);
      const put=await github(env,`/contents/${encoded}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({
        message,content:bytesToBase64(data),branch,...(sha?{sha}:{})
      })});
      if(!put.ok) throw new Error(`GitHub rechazó la subida (${put.status}): ${(await put.text()).slice(0,500)}`);
      const r=await put.json() as any;
      return {content:[{type:"text",text:`Asset subido: ${r.content?.path??target} | ${data.byteLength} bytes | commit ${r.commit?.sha??"desconocido"}`}],
        structuredContent:{repository:`${OWNER}/${REPO}`,branch,path:r.content?.path??target,bytes:data.byteLength,blob_sha:r.content?.sha,commit_sha:r.commit?.sha,file_url:r.content?.html_url,commit_url:r.commit?.html_url}};
    }catch(e){return {content:[{type:"text",text:e instanceof Error?e.message:String(e)}],isError:true}}
  });
  return server;
}
export default {
  async fetch(request:Request,env:Env,ctx:ExecutionContext){
    const url=new URL(request.url);
    if(url.pathname==="/") return new Response("Entender Chile Assets MCP");
    if(url.pathname!=="/mcp") return new Response("Not Found",{status:404});
    return createMcpHandler(()=>createServer(env),{route:"/mcp"})(request,env,ctx);
  }
} satisfies ExportedHandler<Env>;
