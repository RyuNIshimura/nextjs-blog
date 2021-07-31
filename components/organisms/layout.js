import Header from '@/components/organisms/header'
import Footer from '@/components/organisms/footer'

export default function Layout({ children }) {
  return (
    <>
      <div className="sticky top-0 z-40">
        <Header />
      </div>
      <div className="mx-2 my-2 max-w-full">
        <div>{children}</div>
      </div>
      <Footer />
    </>
  )
}
