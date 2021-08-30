import Header from '@/components/organisms/header';
import Footer from '@/components/organisms/footer';

export default function Layout({ children }: any) {
  return (
    <>
      <div className="sticky top-0 z-40">
        <Header />
      </div>
      <div className="max-w-full mx-2 my-2">
        <div>{children}</div>
      </div>
      <Footer />
    </>
  );
}
