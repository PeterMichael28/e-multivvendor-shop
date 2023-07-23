
import Header from '../components/layout/Header';
import Hero from '../components/Home/Hero';
import CategorySection from '../components/Home/CategorySection';
import BestDeals from '../components/Home/BestDeals';
import FeaturedProduct from '../components/Home/FeaturedProducts';
import Sponsored from '../components/Home/Sponsored';
import Events from '../components/Home/Events';
import Footer from '../components/layout/Footer';

const Homepage = () => {
  



  return (
      <div>
           {/* <Header activeHeading={1} /> */}
           <Hero />
           <CategorySection />
           <BestDeals />
           <Events />
           <FeaturedProduct />
           <Sponsored />
           {/* <Footer /> */}
    </div>
  )
}

export default Homepage