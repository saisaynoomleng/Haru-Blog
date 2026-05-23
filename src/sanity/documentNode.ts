import type { DefaultDocumentNodeResolver } from 'sanity/structure';
import DocumentPane from 'sanity-plugin-documents-pane';

export const defaultDocumentNode: DefaultDocumentNodeResolver = (
  S,
  { schemaType },
) => {
  switch (schemaType) {
    case `author`:
      return S.document().views([
        S.view.form(),
        S.view
          .component(DocumentPane)
          .options({
            query: `*[_type == 'blog' && references($id)]`,
            params: { id: `_id` },
          })
          .title('Blogs'),
      ]);

    case `category`:
      return S.document().views([
        S.view.form(),
        S.view
          .component(DocumentPane)
          .options({
            query: `*[_type == 'blog' && references($id)]`,
            params: { id: `_id` },
          })
          .title('Blogs'),
      ]);

    default:
      return S.document().views([S.view.form()]);
  }
};
