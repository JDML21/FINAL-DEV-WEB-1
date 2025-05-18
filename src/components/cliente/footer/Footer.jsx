import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4"> {/* py-6 → py-4 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4"> {/* gap-8 → gap-4 */}
          {/* Logo and description */}
          <div className="space-y-1"> {/* space-y-2 → space-y-1 */}
            <Link to="/" className="text-lg font-bold hover:text-gray-300 transition-colors"> {/* text-xl → text-lg */}
              UniFood
            </Link>
            <p className="text-gray-400 text-xs leading-tight"> {/* text-sm → text-xs, leading-snug → leading-tight */}
              Tu plataforma de comida en la universidad. Navega entre los diferentes
              puntos de venta y disfruta de las opciones disponibles.
            </p>
          </div>

          {/* Quick links */}
          <div className="space-y-1"> {/* space-y-2 → space-y-1 */}
            <h3 className="text-sm font-semibold text-white mb-1"> {/* text-base → text-sm, mb-4 → mb-1 */}
              Enlaces Rápidos
            </h3>
            <ul className="space-y-1">
              <li>
                <Link 
                  to="/" 
                  className="text-gray-400 hover:text-white transition-colors text-xs block" /* text-sm → text-xs, quitado py-0.5 */
                >
                  Inicio
                </Link>
              </li>
              <li>
                <Link to="/productos" className="text-gray-400 hover:text-white text-xs block">
                  Productos
                </Link>
              </li>
              <li>
                <Link to="/puntos-venta" className="text-gray-400 hover:text-white text-xs block">
                  Puntos de Venta
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-gray-400 hover:text-white text-xs block">
                  Ingresar
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-1">
            <h3 className="text-sm font-semibold text-white mb-1">
              Contacto
            </h3>
            <address className="text-gray-400 not-italic text-xs leading-tight">
              Universidad de la Sabana
              <br />
              <a href="mailto:foodelivery@gmail.com" className="hover:text-white transition-colors">
                foodelivery@gmail.com
              </a>
              <br />
              <a href="tel:+1234567890" className="hover:text-white transition-colors">
                (+123) 456-7890
              </a>
            </address>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-4 pt-3 border-t border-gray-700 text-center text-gray-400 text-[10px]"> {/* mt-6 → mt-4, pt-4 → pt-3, text-xs → text-xxs */}
          <p>&copy; {currentYear} DobleJJ. Todos los derechos reservados.</p>
          <p className="mt-1 text-xxs"> {/* mt-2 → mt-1 */}
            Diseñado con ❤️ para la comunidad universitaria
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;