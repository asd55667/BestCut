const fs = require('fs');
const path = require('path');
const { watch } = require('chokidar');
const { capitalize, camelize } = require('vue');

const prefix = 'Lp';
const pascalize = (name) => capitalize(camelize(name));

const root = 'packages';

const stem = (p) => {
  const basename = path.basename(p);
  let name = basename.slice(0, basename.indexOf(path.extname(p)));
  name = name ? name : basename;
  return name;
};

function watchComponents() {
  watch(`${root}/components/**/**.vue`, { ignored: '**/node_modules/**' })
    .on('add', (sfc) => {
      if (sfc.includes('demo')) return;
      // console.log('add', sfc);
      const name = stem(sfc);

      const _import = `import ${name} from './${path.basename(sfc)}';`;
      const _export = `export const ${prefix}${pascalize(name)} = ${name};\n`;

      addExportForIndex(sfc, _import + '\n\n' + _export, [
        { head: true, target: `from './${path.basename(sfc)}';`, content: _import },
        { target: `const ${prefix}${pascalize(name)}`, content: _export },
      ]);
    })
    .on('unlink', (sfc) => {
      if (sfc.includes('demo')) return;
      console.log('unlink', sfc);
      const name = stem(sfc);

      rmExportFromIndex(sfc, [
        `from './${path.basename(sfc)}';`,
        `const ${prefix}${pascalize(name)}`,
      ]);
    });
}

function watchTsfiles(dir, depth = 1) {
  watch(dir, { ignored: '**/node_modules/**' })
    .on('add', (ts) => {
      // console.log('add', ts);
      const onTsFileAdded = (ts) => {
        const name = stem(ts);
        if (name === dir.split('/')[depth]) return;
        if (name !== 'index') {
          const _export = `export * from './${name}';`;

          addExportForIndex(ts, _export, [
            { pre: true, target: `from './${name}';`, content: _export },
          ]);
        }
        onTsFileAdded(path.dirname(ts));
      };
      onTsFileAdded(ts);
    })
    .on('unlink', (ts) => {
      console.log('unlink', ts);
      const onTsFileUnlinked = (ts) => {
        const name = stem(ts);

        if (name === dir.split('/')[depth]) return;
        if (name !== 'index') {
          rmExportFromIndex(ts, [`from './${name}';`]);
        }
        onTsFileUnlinked(path.dirname(ts));
      };
      onTsFileUnlinked(ts);
    });
}

function addExportForIndex(file, placeholder, opts) {
  const entry = `${path.dirname(file)}/index.ts`;

  if (!fs.existsSync(entry)) {
    fs.writeFileSync(entry, placeholder, 'utf8');
  } else {
    let code = fs.readFileSync(entry, 'utf8');

    for (const opt of opts) {
      if (code.includes(opt.target)) continue;

      if (opt.pre) code = opt.content + '\n' + code;
      else code += '\n' + opt.content;
    }
    fs.writeFileSync(entry, code, 'utf8');
  }
}

function rmExportFromIndex(file, targets) {
  const entry = `${path.dirname(file)}/index.ts`;
  if (!fs.existsSync(entry)) return;

  let code = fs.readFileSync(entry, 'utf8');
  for (const target of targets) {
    code = removeExportLine(code, target);
  }

  try {
    if (!code.trim()) fs.unlinkSync(entry);
    else fs.writeFileSync(entry, code, 'utf8');
  } catch {}
}

function removeExportLine(code, target) {
  const idx = code.indexOf(target);
  // console.log('dectect', target, idx);
  if (idx === -1) return;
  let i = idx;
  let j = idx;
  while (i !== 0 && code[--i] !== '\n');
  while (j !== code.length - 1 && code[++j] !== '\n');
  return code.slice(0, i) + code.slice(j);
}

const repos = fs
  .readdirSync(root)
  .filter(
    (path) =>
      fs.lstatSync(`${root}/${path}`).isDirectory() && fs.existsSync(`${root}/${path}/package.json`)
  );

for (const repo of repos) {
  watchTsfiles(`${root}/${repo}/**/**.ts`);
}

watchComponents();
