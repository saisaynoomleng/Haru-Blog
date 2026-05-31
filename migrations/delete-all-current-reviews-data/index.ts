// migrations/delete-all-current-reviews-data/index.ts
import { defineMigration, del } from 'sanity/migrate';

export default defineMigration({
  title: 'Delete all current reviews data',
  documentTypes: ['review'],
  migrate: {
    document(doc) {
      return del(doc._id);
    },
  },
});
