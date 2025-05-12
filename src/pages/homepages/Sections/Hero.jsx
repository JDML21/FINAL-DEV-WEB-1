import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="bg-primary text-black py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Comida deliciosa a un click de distancia
          </h1>
          <p className="text-lg mb-6">
            Explora los mejores puestos de comida en el campus y realiza tus
            pedidos de forma rápida y sencilla.
          </p>
          <div className="flex flex-wrap gap-2">
            <Link to="/client/categorias" className="bg-white text-primary px-6 py-2 rounded-md font-medium hover:bg-gray-100">
              Ver Categorías
            </Link>
            <Link to="/client/puntos-venta" className="bg-white text-primary px-6 py-2 rounded-md font-medium hover:bg-gray-100">
              Puntos de Venta
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
