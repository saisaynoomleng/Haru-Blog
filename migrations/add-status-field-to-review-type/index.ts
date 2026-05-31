import { defineMigration, at, setIfMissing, patch } from 'sanity/migrate';

export default defineMigration({
  title: 'add status field to review type',
  documentTypes: ['review'],
  filter: '!defined(status)',
  async *migrate(documents, context) {
    for await (const document of documents()) {
      yield patch(document._id, [at('status', setIfMissing('new'))]);
    }
  },
});
