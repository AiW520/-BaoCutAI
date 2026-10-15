// i18n-ignore-file: developer-facing type inventory.
import path from "node:path";
import { fileURLToPath } from "node:url";
import { API } from "typescript/unstable/sync";
import { SyntaxKind } from "typescript/unstable/ast";

const packageRoot = fileURLToPath(new URL("../", import.meta.url));
const sourceRoot = path.join(packageRoot, "src");
const api = new API();
try {
  const snapshot = api.updateSnapshot({
    openProjects: [path.join(packageRoot, "tsconfig.json")],
  });
  try {
    const project = snapshot.getProjects()[0];
    if (!project) throw new Error("Docs runtime project was not loaded");
    const rows = [];
    for (const file of project.rootFiles) {
      if (!file.startsWith(sourceRoot + path.sep)) continue;
      const source = project.program.getSourceFile(file);
      if (!source) throw new Error(`Source was not loaded: ${file}`);
      const row = {
        file: path.relative(sourceRoot, file).split(path.sep).join("/"),
        dynamic: 0,
        explicitAny: 0,
        untypedModules: 0,
      };
      function visit(node) {
        if (
          node.kind === SyntaxKind.TypeReference &&
          node.typeName.kind === SyntaxKind.Identifier &&
          node.typeName.text === "Dynamic"
        ) row.dynamic++;
        if (node.kind === SyntaxKind.AnyKeyword) row.explicitAny++;
        if (node.kind === SyntaxKind.ModuleDeclaration && !node.body)
          row.untypedModules++;
        node.forEachChild(visit);
      }
      visit(source);
      rows.push(row);
    }
    const totals = rows.reduce(
      (sum, row) => ({
        files: sum.files + 1,
        dynamic: sum.dynamic + row.dynamic,
        explicitAny: sum.explicitAny + row.explicitAny,
        untypedModules: sum.untypedModules + row.untypedModules,
      }),
      { files: 0, dynamic: 0, explicitAny: 0, untypedModules: 0 },
    );
    rows.sort((a, b) => b.dynamic + b.explicitAny - a.dynamic - a.explicitAny || a.file.localeCompare(b.file));
    // AST counts exclude imports, comments, strings and JSX text. This measures
    // explicit source debt; it does not claim that inferred types are all safe.
    console.log(JSON.stringify({ totals, files: rows }, null, 2));
    if (process.argv.includes("--check-target") &&
      (totals.dynamic > 9 || totals.explicitAny > 9 || totals.untypedModules > 0)) {
      process.exitCode = 1;
    }
  } finally {
    snapshot.dispose();
  }
} finally {
  api.close();
}
