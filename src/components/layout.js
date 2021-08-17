import Header from './header'
import Footer from './footer'

export default function Layout({ children }) {
    return (
        <section className='bg-gradient header relative items-center mt-20 py-10 md:mt-0'>
            <Header />
            <div className="container mx-auto items-center flex flex-wrap">

                {children}
                <Footer />
            </div>
        </section>
    )
}
