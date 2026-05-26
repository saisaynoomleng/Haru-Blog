import Footer from '@/components/shared/Footer';
import Header from '@/components/shared/Header';

const FrontendLayout = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default FrontendLayout;
