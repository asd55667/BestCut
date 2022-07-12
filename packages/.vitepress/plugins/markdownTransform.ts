import { join, resolve } from 'path';
import type { Plugin } from 'vite';
import fs from 'fs-extra';
// import { packages } from '../../../meta/packages';
// import { getTypeDefinition, replacer } from '../../../scripts/utils';

export function MarkdownTransform(): Plugin {
  const DIR_TYPES = resolve(__dirname, '../../../types/packages');
  const hasTypes = fs.existsSync(DIR_TYPES);

  if (!hasTypes) console.warn('No types dist found, run `npm run build:types` first.');

  return {
    name: 'md-transform',
    enforce: 'pre',
    async transform(code, id) {
      if (!id.endsWith('.md')) return null;

      const [pkg, name, i] = id.split('/').slice(-3);
      console.log(pkg, name, i);

      if (i === 'index.md') {
        const frontmatterEnds = code.indexOf('---\n\n') + 4;
        const firstSubheader = code.search(/\n## \w/);
        const sliceIndex = firstSubheader < 0 ? frontmatterEnds : firstSubheader;

        const { footer, header } = await transformMarkdown(pkg, name, i);
        // console.log({ code: code.slice(0, sliceIndex), header });
        if (header) code = code.slice(0, sliceIndex) + header + code.slice(sliceIndex);
        // console.log(code);
        // code = code
        //   .replace(/(# \w+?)\n/, `$1\n\n<FunctionInfo fn="${name}"/>\n`)
        //   .replace(/## (Components?(?:\sUsage)?)/i, '## $1\n<LearnMoreComponents />\n\n')
        //   .replace(/## (Directives?(?:\sUsage)?)/i, '## $1\n<LearnMoreDirectives />\n\n');
      }

      return code;
    },
  };
}

const DIR_SRC = resolve(__dirname, '../..');
export async function transformMarkdown(pkg: string, name: string, i: string) {
  const hasDemo = fs.existsSync(join(DIR_SRC, pkg, name, 'demo/index.vue'));

  const demo = `
<script setup>
import Demo from \'./demo/index.vue\'
</script>

## Examples
<DemoContainer>
  <Demo />  
</DemoContainer>
`;

  const demoSection = hasDemo ? demo : '';

  const header = demoSection;

  const footer = '';

  return {
    footer,
    header,
  };
}
