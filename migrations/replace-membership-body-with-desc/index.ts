import { pathsAreEqual, stringToPath, type PortableTextBlock } from 'sanity';
import { defineMigration, set } from 'sanity/migrate';

const targetPath = stringToPath('body');

function toPlainText(blocks: PortableTextBlock[]) {
  return blocks
    .map((block) => {
      if (block._type !== 'block' || !block.children) {
        return '';
      }
      return (block.children as { text: string }[])
        .map((child) => child.text)
        .join('');
    })
    .join('\n\n');
}

export default defineMigration({
  title: 'Convert a Portable Text field into plain text',
  documentTypes: ['desc'],
  migrate: {
    array(node, path, ctx) {
      if (pathsAreEqual(path, targetPath)) {
        return set(toPlainText(node as PortableTextBlock[]));
      }
    },
  },
});
