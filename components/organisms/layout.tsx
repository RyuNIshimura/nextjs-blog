import Header from '@/components/organisms/header';
import Footer from '@/components/organisms/footer';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <div className="sticky top-0 z-40 font-body">
        <Header />
      </div>
      <div className="mx-auto max-w-7xl font-body">
        <div>{children}</div>
      </div>
      <Footer />
    </>
  );
}
