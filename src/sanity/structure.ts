import { AiOutlineQuestionCircle } from 'react-icons/ai';
import { CiTextAlignCenter } from 'react-icons/ci';
import { FiUsers } from 'react-icons/fi';
import { GiGearHammer, GiNewspaper, GiPencil } from 'react-icons/gi';
import { LuMilestone } from 'react-icons/lu';
import { MdCategory } from 'react-icons/md';
import { TbUserDollar } from 'react-icons/tb';
import { TiMessages } from 'react-icons/ti';
import type { StructureResolver } from 'sanity/structure';

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Haru Blog')
    .items([
      S.divider().title('Operations'),
      S.documentTypeListItem('siteSetting')
        .title('Site Setting')
        .icon(GiGearHammer),
      S.documentTypeListItem('member').title('Team Members').icon(FiUsers),
      S.documentTypeListItem('ourStory')
        .title('Yearly milestone')
        .icon(LuMilestone),
      S.documentTypeListItem('faqs')
        .title('FAQs')
        .icon(AiOutlineQuestionCircle),
      S.documentTypeListItem('membership')
        .title('Memberships')
        .icon(TbUserDollar),

      S.divider().title('Marketing'),
      S.documentTypeListItem('author').title('Authors').icon(GiPencil),
      S.documentTypeListItem('category').title('Categories').icon(MdCategory),
      S.documentTypeListItem('blog').title('Blogs').icon(GiNewspaper),
      S.documentTypeListItem('review').title('Reviews').icon(TiMessages),

      S.divider().title('Pages'),
      S.documentTypeListItem('utilityPage')
        .title('Utiliy Pages')
        .icon(CiTextAlignCenter),
    ]);
