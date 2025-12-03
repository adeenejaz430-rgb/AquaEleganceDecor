'use client';

import Link from 'next/link';
import Image from 'next/image';

const promoCards = [
  {
    id: 1,
    image: '/product.jpg', // Replace with your fountain image
    title: 'Collection',
    discount: '20% OFF',
    bgColor: 'bg-yellow-400',
    labelBg: 'bg-green-500',
    borderColor: 'border-yellow-400',
    link: '/products?category=fountains',
  },
  {
    id: 2,
    image: '/earbuds.jpg', // Replace with your artificial flowers image
    title: 'Earbuds',
    discount: 'Free delivery',
    bgColor: 'bg-gray-600',
    labelBg: 'bg-white',
    borderColor: 'border-gray-600',
    link: '/products?category=flowers',
  },
  {
    id: 3,
    image: '/headphones.jpg', // Replace with your plants & vases image
    title: 'Headphones',
    discount: 'Discount 30$',
    bgColor: 'bg-green-500',
    labelBg: 'bg-yellow-400',
    borderColor: 'border-green-500',
    link: '/products?category=plants',
  },
];

export default function PromoCardsSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {promoCards.map((card) => (
            <Link key={card.id} href={card.link}>
              <div className="group relative overflow-hidden rounded-3xl border-4 border-white shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer">
                {/* Image Section - Top Half */}
                <div className="relative h-64 bg-white overflow-hidden">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  
                  {/* Colored border on top */}
                  <div className={`absolute top-0 left-0 right-0 h-1 ${card.borderColor}`}></div>
                </div>

                {/* Label Card - Overlapping (positioned lower) */}
                <div className="absolute top-[55%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                  <div className={`${card.labelBg} rounded-2xl px-8 py-6 shadow-xl text-center min-w-[280px]`}>
                    <p className={`text-sm font-semibold mb-1 ${card.labelBg === 'bg-white' ? 'text-gray-600' : 'text-white'}`}>
                      {card.title}
                    </p>
                    <p className={`text-2xl font-bold ${card.labelBg === 'bg-white' ? 'text-gray-800' : card.labelBg === 'bg-yellow-400' ? 'text-gray-800' : 'text-white'}`}>
                      {card.discount}
                    </p>
                  </div>
                </div>

                {/* Colored Section - Bottom Half */}
                <div className={`h-40 ${card.bgColor}`}></div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}