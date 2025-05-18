import Hero from "./Sections/Hero";
import FeaturedProduct from "./Sections/FeaturedProduct";
import CallToAction from "./Sections/CallToAction";

function HomePage() {
  return (
    <div className="pt-16"> {/* Añadido pt-16 para compensar el header fijo */}
      <Hero />
    
      <CallToAction />
    </div>
  );
}

export default HomePage;
