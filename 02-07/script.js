const fs = require("fs");
const path = require("path");

const pastaProjeto = __dirname;
const arquivoSaida = path.join(__dirname, "projeto.txt");

const ignorarPastas = [
  "node_modules",
  ".git",
  "dist",
  "build",
  ".vscode",
  "coverage"
];

const ignorarArquivos = [
  "package-lock.json",
  "yarn.lock",
  "projeto.txt"
];

fs.writeFileSync(
  arquivoSaida,
  "===== CONTEÚDO DO PROJETO =====\n\n",
  "utf8"
);

function lerDiretorio(diretorio) {
  const itens = fs.readdirSync(diretorio);

  for (const item of itens) {
    const caminhoCompleto = path.join(diretorio, item);
    const stats = fs.statSync(caminhoCompleto);

    if (stats.isDirectory()) {
      if (!ignorarPastas.includes(item)) {
        lerDiretorio(caminhoCompleto);
      }
    } else {
      if (ignorarArquivos.includes(item)) continue;

      try {
        const conteudo = fs.readFileSync(caminhoCompleto, "utf8");

        fs.appendFileSync(
          arquivoSaida,
          `\n${"=".repeat(80)}\n` +
          `ARQUIVO: ${path.relative(pastaProjeto, caminhoCompleto)}\n` +
          `${"=".repeat(80)}\n\n` +
          conteudo +
          "\n\n"
        );

        console.log(`✔ ${path.relative(pastaProjeto, caminhoCompleto)}`);
      } catch {
        console.log(`✖ Ignorado (arquivo binário): ${item}`);
      }
    }
  }
}

lerDiretorio(pastaProjeto);

console.log(`\nArquivo gerado em: ${arquivoSaida}`);