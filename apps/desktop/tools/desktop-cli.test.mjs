import assert from 'node:assert/strict';
import { execFileSync, spawnSync } from 'node:child_process';
import { copyFileSync, mkdtempSync, mkdirSync, readFileSync, realpathSync, rmSync, statSync, symlinkSync, writeFileSync } from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { test } from 'node:test';
import { stageDesktopCli } from './desktop-cli.mjs';

test('macOS launcher handles relocated apps, arguments, symlinks and child exit codes', {skip: process.platform !== 'darwin'}, () => {
  const dir = realpathSync(mkdtempSync(path.join(os.tmpdir(), 'baocut-cli-launch-')));
  try {
    const mac = path.join(dir, "Moved app's folder", 'OpenFox.app', 'Contents', 'MacOS');
    mkdirSync(mac, {recursive: true});
    const staged = stageDesktopCli(mac, 'darwin');
    assert.equal(staged.to, 'MacOS/baocut-cli');
    assert.ok(statSync(staged.from).mode & 0o111);
    execFileSync('lipo', [staged.from, '-verify_arch', process.arch === 'x64' ? 'x86_64' : 'arm64']);
    writeFileSync(path.join(mac, 'OpenFox'), `#!${process.execPath}\nconsole.log(JSON.stringify({args:process.argv.slice(2),node:process.env.ELECTRON_RUN_AS_NODE}));process.exitCode=7;\n`, {mode:0o755});
    const link = path.join(dir, 'baocut'); symlinkSync(path.relative(dir, staged.from), link);
    for (const command of [staged.from, link]) {
      const r = spawnSync(command, ['version', 'space and 中文', 'literal;$HOME'], {cwd: dir, encoding:'utf8', timeout:10_000});
      assert.equal(r.status, 7, r.stderr);
      const result = JSON.parse(r.stdout);
      assert.equal(result.node, '1');
      assert.equal(path.normalize(result.args[0]), path.join(path.dirname(mac), 'Resources/app.asar/out/main/cli.js'));
      assert.deepEqual(result.args.slice(1), ['version', 'space and 中文', 'literal;$HOME']);
    }
  } finally { rmSync(dir, {recursive:true,force:true}); }
});

test('macOS launcher survives strict app signing and a ZIP round trip', {skip: process.platform !== 'darwin'}, () => {
  const dir = realpathSync(mkdtempSync(path.join(os.tmpdir(), 'baocut-cli-sign-')));
  try {
    const app = path.join(dir, 'OpenFox.app');
    const contents = path.join(app, 'Contents');
    const mac = path.join(contents, 'MacOS');
    mkdirSync(mac, {recursive: true});
    const staged = stageDesktopCli(mac, 'darwin');
    // The production signer skips non-Mach-O files. A shell script in MacOS
    // reproduces "code object is not signed at all" when the app is signed.
    assert.ok([0xfeedface, 0xcefaedfe, 0xfeedfacf, 0xcffaedfe, 0xcafebabe, 0xbebafeca].includes(readFileSync(staged.from).readUInt32BE()));
    copyFileSync('/usr/bin/true', path.join(mac, 'OpenFox'));
    writeFileSync(path.join(contents, 'Info.plist'), '<?xml version="1.0"?><plist version="1.0"><dict><key>CFBundleIdentifier</key><string>com.baocut.cli-test</string><key>CFBundleExecutable</key><string>OpenFox</string><key>CFBundlePackageType</key><string>APPL</string></dict></plist>');
    execFileSync('codesign', ['--sign', '-', '--force', staged.from]);
    execFileSync('codesign', ['--sign', '-', '--force', app]);
    const zip = path.join(dir, 'app.zip');
    execFileSync('ditto', ['-c', '-k', '--keepParent', app, zip]);
    const extracted = path.join(dir, 'extracted');
    execFileSync('ditto', ['-x', '-k', zip, extracted]);
    execFileSync('codesign', ['--verify', '--deep', '--strict', path.join(extracted, 'OpenFox.app')]);
  } finally { rmSync(dir, {recursive:true, force:true}); }
});

test('Windows shim is staged at the app root and propagates arguments and exit status', () => {
  const dir = mkdtempSync(path.join(os.tmpdir(), 'baocut-cli-win-'));
  try {
    const stage = stageDesktopCli(dir, 'win32');
    assert.equal(stage.to, 'baocut.cmd');
    const text = readFileSync(stage.from,'utf8');
    assert.match(text, /setlocal\r\nset ELECTRON_RUN_AS_NODE=1/);
    assert.match(text, /"%~dp0OpenFox.exe" "%~dp0resources\\app.asar\\out\\main\\cli.js" %\*/);
    assert.match(text, /exit \/b %errorlevel%/);
    assert.throws(() => stageDesktopCli(dir, 'linux'), /Unsupported/);
  } finally { rmSync(dir,{recursive:true,force:true}); }
});

test('Windows launcher executes the renamed binary from a relocated app', {skip: process.platform !== 'win32'}, () => {
  const dir = mkdtempSync(path.join(os.tmpdir(), 'openfox cli '));
  try {
    const stage = stageDesktopCli(dir, 'win32');
    copyFileSync(process.execPath, path.join(dir, 'OpenFox.exe'));
    const main = path.join(dir, 'resources', 'app.asar', 'out', 'main');
    mkdirSync(main, {recursive: true});
    writeFileSync(path.join(main, 'cli.js'), 'console.log(JSON.stringify({args:process.argv.slice(2),node:process.env.ELECTRON_RUN_AS_NODE}));process.exitCode=7;');
    const result = spawnSync(process.env.ComSpec || 'cmd.exe', ['/d', '/s', '/c', `""${stage.from}" version "space and 中文""`], {encoding:'utf8', timeout:10_000, windowsVerbatimArguments:true});
    assert.equal(result.status, 7, result.stderr);
    assert.deepEqual(JSON.parse(result.stdout), {args:['version','space and 中文'],node:'1'});
  } finally { rmSync(dir, {recursive:true,force:true}); }
});
