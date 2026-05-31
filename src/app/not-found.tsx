import Bounded from '@/components/shared/Bounded';
import { CallToAction } from '@/components/shared/CallToAction';
import { ErrorPaper } from '@/components/shared/ErrorPaper';

const NotFoundPage = () => {
  return (
    <Bounded
      as="main"
      className="flex justify-center items-center flex-col min-h-screen"
    >
      <h3 className="font-semibold text-fs-600  text-center">
        This Article might have been destroyed
      </h3>

      <ErrorPaper width={1000} />

      <CallToAction label="Go back home" href="/" />
    </Bounded>
  );
};

export default NotFoundPage;
