import Footer from '@/components/shared/Footer';

const FrontendLayout = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <>
      {children}
      <Footer />
    </>
  );
};

export default FrontendLayout;
