import ReviewForm from '@/components/features/ReviewForm';
import Bounded from '@/components/shared/Bounded';
import PageTitle from '@/components/shared/PageTitle';

const LeaveAReviewPage = () => {
  return (
    <Bounded as="main">
      <Bounded padding="none">
        <PageTitle
          label="Tell us what you think about us"
          className="font-sans capitalize"
        />
      </Bounded>

      <Bounded padding="none">
        <ReviewForm />
      </Bounded>
    </Bounded>
  );
};

export default LeaveAReviewPage;
