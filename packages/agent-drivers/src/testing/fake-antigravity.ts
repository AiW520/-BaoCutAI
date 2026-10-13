import fs from 'node:fs/promises';
import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import type { AntigravityInstall } from '../antigravity/antigravity-binary.ts';

export interface FakeAntigravityScenario {
  version?: string;
  models?: string;
  signedOut?: boolean;
  startup?: 'timeout' | 'exit' | 'invalid';
  wrongResume?: boolean;
  turn?: 'normal' | 'hang' | 'crash' | 'malformed' | 'error' | 'result-only' | 'tail' | 'wrong-id';
  denied?: boolean;
}
export interface FakeAntigravityLog { kind: 'start' | 'prompt'; args?: string[]; cwd?: string; text?: string; pid?: number; childPid?: number }
export async function createFakeAntigravity(dir: string) {
  await fs.mkdir(dir, { recursive: true });
  const entry = path.join(dir, 'fake-agy.mjs');
  const logFile = path.join(dir, 'log.jsonl');
  const configFile = path.join(dir, 'scenario.json');
  let current: FakeAntigravityScenario = { version: '1.3.4', models: 'gemini-3.8-flash-high\tGemini Flash\ngemini-3.1-pro-high\tGemini Pro', turn: 'normal' };
  const script = String.raw`
import fs from 'node:fs';
import path from 'node:path';
import { randomUUID } from 'node:crypto';
import { spawn } from 'node:child_process';
import { createInterface } from 'node:readline';
const dir=process.env.FAKE_AGY_DIR;
const args=process.argv.slice(2);
const read=()=>JSON.parse(fs.readFileSync(path.join(dir,'scenario.json'),'utf8'));
const log=(row)=>fs.appendFileSync(path.join(dir,'log.jsonl'),JSON.stringify(row)+'\n');
const send=(frame)=>process.stdout.write(JSON.stringify(frame)+'\n');
const config=read();
if(args.includes('--version')){console.log(config.version);process.exit(0)}
if(args.includes('models')){if(config.signedOut){console.error('authentication required');process.exit(1)} console.log(config.models);process.exit(0)}
log({kind:'start',args,cwd:process.cwd(),pid:process.pid});
if(config.startup==='exit'){console.error('startup failed');process.exit(3)}
if(config.startup==='timeout')setInterval(()=>{},1000);
else if(config.startup==='invalid')console.log('broken frame');
else {
 const at=args.indexOf('--conversation');
 const id=at>=0&&!config.wrongResume?args[at+1]:randomUUID();
 send({event:'init',conversation_id:id,init:{}});
 createInterface({input:process.stdin}).on('line',line=>{
  const c=read();const input=JSON.parse(line);log({kind:'prompt',text:input.message.content});
  const conversation_id=c.turn==='wrong-id'?'other-id':id;
  const step=(step_index,step_type,state,extra={})=>send({event:'step_update',step_update:{conversation_id,step_index,step_type,state,...extra}});
  if(c.turn==='malformed'){console.log('{broken');return}
  if(c.turn==='hang'){
   const child=spawn(process.execPath,['-e','process.on("SIGINT",()=>{});process.on("SIGTERM",()=>{});setInterval(()=>{},1000)'],{stdio:'ignore'});
   log({kind:'start',childPid:child.pid});
   step(1,'tool','ACTIVE',{tool_name:'run_command',tool_info:{name:'run_command',parameters:{CommandLine:'sleep 30'}}});return;
  }
  if(c.turn==='crash'){step(1,'agent_response','ACTIVE',{text_delta:'partial'});process.exit(4)}
  if(c.turn!=='result-only') {
   step(1,'agent_response','ACTIVE',{text_delta:'Hello\u2028世界'});
   step(1,'agent_response','DONE',{text_delta:'!'});
   step(2,'tool','ACTIVE',{tool_name:'run_command',tool_info:{name:'run_command',parameters:{CommandLine:'printf done'}}});
   step(2,'tool','DONE',{tool_name:'run_command',tool_info:{name:'run_command',parameters:{CommandLine:'printf done'},output:'done'}});
   step(3,'tool','DONE',{tool_name:'write_to_file',tool_info:{name:'write_to_file',parameters:{TargetFile:'/tmp/文稿.txt'}}});
  }
  const frame={event:'result',result:{conversation_id,status:c.turn==='error'?'ERROR':'SUCCESS',response:'Hello\u2028世界!',...(c.turn==='error'?{error:'rate limit 429'}:{}),denied_actions:c.denied?[{action:'command',display_name:'printf blocked'}]:[]}};
  if(c.turn==='tail'){process.stdout.write(JSON.stringify(frame));process.exit(0)}else send(frame);
 }).on('close',()=>process.exit(0));
}
`;
  await fs.writeFile(entry, script);
  const command = path.join(dir, 'agy');
  const quote = (value: string) => `'${value.replace(/'/g, `'\\''`)}'`;
  await fs.writeFile(command, `#!/bin/sh\nexec ${quote(process.execPath)} ${quote(entry)} "$@"\n`, { mode: 0o755 });
  const scenario = (patch: FakeAntigravityScenario) => { current = { ...current, ...patch }; writeFileSync(configFile, JSON.stringify(current)); };
  scenario({});
  const env = { PATH: process.env.PATH, FAKE_AGY_DIR: dir };
  return {
    command, scenario,
    locate: async (): Promise<AntigravityInstall> => ({ command, version: current.version ?? null, env }),
    log: (): FakeAntigravityLog[] => {
      try { return readFileSync(logFile, 'utf8').split('\n').filter(Boolean).map((s) => JSON.parse(s)); } catch { return []; }
    },
  };
}
