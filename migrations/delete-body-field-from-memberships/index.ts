import { defineMigration, at, unset } from 'sanity/migrate';

export default defineMigration({
  title: 'delete-body-field-from-memberships',
  documentTypes: ['membership'],
  migrate: {
    document(doc) {
      return [at('body', unset())];
    },
  },
});
