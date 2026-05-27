import Footer from '@/components/shared/Footer';
import Header from '@/components/shared/Header';
import { Toaster } from 'sonner';

const FrontendLayout = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <>
      <Header />
      {children}
      <Toaster closeButton richColors position="bottom-center" />
      <Footer />
    </>
  );
};

export default FrontendLayout;
