import galletaImg from '../assets/images/galleta.jpg';
import aguaImg from '../assets/images/agua.jpg';

const mockProducts = [
  {
    id: 1,
    name: 'Galleta de chocolate',
    description: 'Deliciosa galleta artesanal con chips de chocolate.',
    price: 2500,
    stock: 10,
    image_url: galletaImg,
    category: 'Dulces',
    estimatedDelivery: '5 - 7 días',
  },
  {
    id: 2,
    name: 'Agua mineral',
    description: 'Agua purificada ideal para hidratarte todo el día.',
    price: 1500,
    stock: 25,
    image_url: aguaImg,
    category: 'Bebidas',
    estimatedDelivery: '3 - 5 días',
  },
  // Más productos
];

export default mockProducts;
