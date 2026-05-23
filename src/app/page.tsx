import Bounded from '@/components/shared/Bounded';
import { PaperTorn } from '@/components/shared/PaperTorn';
import { YouTubeEmbeded } from '@/components/shared/YouTubeEmbeded';

export default function Home() {
  return (
    <Bounded as="main">
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. In impedit
        quasi corporis porro ducimus a doloremque quibusdam itaque laboriosam
        dignissimos.
      </p>
      <YouTubeEmbeded videoId="5NGyXTsg77E" title="lasdf" />
    </Bounded>
  );
}
