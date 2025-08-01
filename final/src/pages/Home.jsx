import '../App.css';
import Navbar from '../components/Navbar'; 
import HeroSection from '../components/HeroSection';
import Tools from '../components/Tools';
import Features from '../components/Features';
import Footer from '../components/Footer';
import Cards from '../components/Cards';
import Feedback from '../components/Feedback';

function Home() {
  return (
    <div className="Home"> 
      <Navbar />
      <HeroSection />
      <Tools />
      <Features />
      < Cards />
      <Feedback />
      <Footer />
    </div>
  );
}

export default Home;