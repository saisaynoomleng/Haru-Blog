import { defineMigration, at, unset, patch } from 'sanity/migrate';

export default defineMigration({
  title: 'remove incorrectly added status field',
  documentTypes: [
    'author',
    'blog',
    'category',
    'faqs',
    'membership',
    'member',
    'ourStory',
    'siteSetting',
    'utilityPage',
  ],
  filter: 'defined(status)',
  async *migrate(documents, context) {
    for await (const document of documents()) {
      yield patch(document._id, [at('status', unset())]);
    }
  },
});
