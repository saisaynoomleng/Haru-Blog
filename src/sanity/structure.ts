import { FiUsers } from 'react-icons/fi';
import type { StructureResolver } from 'sanity/structure';

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Haru Blog')
    .items([
      S.divider().title('Operations'),
      S.documentTypeListItem('member').title('Team Members').icon(FiUsers),
    ]);
