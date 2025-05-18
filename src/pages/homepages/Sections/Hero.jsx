import React, { useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import mockProducts from '../../../data/mockProducts';

const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const formatPrecio = (precio) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP'
    }).format(precio).replace(/,00$/, '');
  };

  // Agrupar productos de 4 en 4 para el carrusel
  const groupProducts = (products, size) => {
    const grouped = [];
    for (let i = 0; i < products.length; i += size) {
      grouped.push(products.slice(i, i + size));
    }
    return grouped;
  };

  const productGroups = groupProducts(mockProducts, 4);

  return (
    <div className="relative overflow-hidden bg-blue-50 py-12">
      {/* Formas decorativas de fondo */}
      <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-blue-100 opacity-70"></div>
      <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-blue-200 opacity-50"></div>
      
      {/* Contenido principal */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          {/* Sección de texto (se mantiene igual) */}
          <div className="lg:w-1/2">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              <span className="text-blue-600">Comida universitaria</span><br />
              entregada en tu lugar de estudio
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              Pide desde cualquier punto del campus y recibe en menos de 30 minutos.
              Menú variado con opciones para todos los gustos.
            </p>
            <div className="flex flex-wrap gap-3">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow transition-colors">
                Ordenar ahora
              </button>
              <button className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-lg transition-colors">
                Ver promociones
              </button>
            </div>
            
            <div className="mt-8 flex flex-wrap gap-4">
              <div className="flex items-center">
                <div className="bg-blue-100 p-2 rounded-full mr-3">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="text-sm">Entrega rápida</span>
              </div>
              <div className="flex items-center">
                <div className="bg-blue-100 p-2 rounded-full mr-3">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </div>
                <span className="text-sm">Pago seguro</span>
              </div>
            </div>
          </div>
          
          {/* Carrusel de productos modificado */}
          <div className="lg:w-1/2 w-full mt-8 lg:mt-0">
            <h3 className="text-xl font-semibold text-center mb-4 text-gray-800">
              Prueba nuestros destacados
            </h3>
            
            <div className="relative">
              <Carousel
                showArrows={true}
                showStatus={false}
                showThumbs={false}
                showIndicators={false}
                infiniteLoop={true}
                autoPlay={true}
                interval={5000}
                stopOnHover={true}
                swipeable={true}
                selectedItem={currentIndex}
                onChange={(index) => setCurrentIndex(index)}
                renderArrowPrev={(onClickHandler, hasPrev, label) =>
                  hasPrev && (
                    <button
                      type="button"
                      onClick={onClickHandler}
                      title={label}
                      className="absolute left-0 top-1/2 z-10 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md hover:bg-gray-100 backdrop-blur-sm"
                    >
                      <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                  )
                }
                renderArrowNext={(onClickHandler, hasNext, label) =>
                  hasNext && (
                    <button
                      type="button"
                      onClick={onClickHandler}
                      title={label}
                      className="absolute right-0 top-1/2 z-10 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md hover:bg-gray-100 backdrop-blur-sm"
                    >
                      <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  )
                }
              >
                {productGroups.map((group, index) => (
                  <div key={index} className="px-2">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {group.map((producto) => (
                        <div 
                          key={producto.id} 
                          className="border border-gray-200 hover:border-gray-300 bg-white/80 hover:bg-white transition-all duration-300 rounded-lg p-2 shadow-sm"
                        >
                          <div className="relative">
                            <img 
                              src={producto.image_url} 
                              alt={producto.name}
                              className="w-full h-28 object-cover rounded-md mb-2"
                            />
                          </div>
                          <div className="p-1">
                            <h4 className="font-semibold text-gray-800 text-sm line-clamp-1">{producto.name}</h4>
                            <p className="text-gray-600 text-xs mt-1 line-clamp-2">{producto.description}</p>
                            <div className="flex justify-between items-center mt-2">
                              <span className="text-blue-600 font-bold text-sm">
                                {formatPrecio(producto.price)}
                              </span>
                              <button className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-2 py-1 rounded transition-colors">
                                +
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </Carousel>

              {/* Nuestros propios indicadores personalizados */}
              <div className="flex justify-center mt-4">
                {productGroups.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`mx-1.5 w-2.5 h-2.5 rounded-full ${currentIndex === index ? 'bg-blue-600' : 'bg-gray-300'} transition-colors`}
                    aria-label={`Ir al grupo ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;