import Bounded from '@/components/shared/Bounded';
import { PaperTorn } from '@/components/shared/PaperTorn';

export default function Home() {
  return (
    <Bounded as="main">
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. In impedit
        quasi corporis porro ducimus a doloremque quibusdam itaque laboriosam
        dignissimos.
      </p>
      <PaperTorn>
        <img
          src="https://cdn.sanity.io/images/u19h5dbs/production/ccb52ed2b9108409dd9f6c07dc67928bcfa2b662-1120x1120.heif"
          alt=""
        />
      </PaperTorn>
    </Bounded>
  );
}
