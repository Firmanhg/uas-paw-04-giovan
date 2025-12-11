import { Link } from "react-router-dom";
import { Search, MapPin, Bed, Bath, Square, Award, Users, Home as HomeIcon } from "lucide-react";

const featuredProperties = [
  {
    id: 1,
    title: "Modern Apartment in City Center",
    location: "Jakarta | For Sale",
    price: "Rp 2.500.000.000",
    beds: 2,
    baths: 2,
    area: "120m²",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2340&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Spacious Suburban House",
    location: "Bandung | For Rent",
    price: "Rp 150.000.000 / thn",
    beds: 4,
    baths: 3,
    area: "250m²",
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=2340&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Luxury Villa with Ocean View",
    location: "Bali | For Sale",
    price: "Rp 15.000.000.000",
    beds: 5,
    baths: 5,
    area: "400m²",
    image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=2340&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Cozy Downtown Studio",
    location: "Surabaya | For Rent",
    price: "Rp 5.000.000 / bln",
    beds: 1,
    baths: 1,
    area: "45m²",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=2340&auto=format&fit=crop",
  },
];

export default function Home() {
  return (
    <div className="w-full bg-white font-sans text-slate-800">
      
      {/* HERO SECTION */}
      <div className="relative w-full h-[600px]">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1501183638710-841dd1904471?q=80')" }}
        >
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-md">
            Temukan Properti Impian Anda
          </h1>
          <p className="text-white text-lg mb-8 drop-shadow-sm opacity-90">
            Find your next home with ease and confidence.
          </p>

          {/* SEARCH BAR */}
          <div className="bg-white p-2 rounded-lg shadow-xl flex flex-col md:flex-row items-center gap-2 w-full max-w-3xl">
            
            {/* Input Lokasi */}
            <div className="flex items-center px-3 flex-1 w-full">
              <MapPin className="text-gray-400 w-5 h-5 mr-2" />
              <input 
                type="text" 
                placeholder="Enter city or area" 
                className="w-full py-2 outline-none text-gray-700 placeholder-gray-400"
              />
            </div>

            {/* Divider Vertical (Hidden on mobile) */}
            <div className="hidden md:block w-px h-8 bg-gray-200"></div>

            {/* Dropdown Tipe */}
            <div className="flex items-center px-3 w-full md:w-auto">
              <HomeIcon className="text-gray-400 w-5 h-5 mr-2" />
              <select className="py-2 outline-none text-gray-700 bg-transparent cursor-pointer">
                <option value="sale">For Sale</option>
                <option value="rent">For Rent</option>
              </select>
            </div>

            {/* Tombol Search */}
            <button className="w-full md:w-auto bg-slate-800 hover:bg-slate-900 text-white px-8 py-3 rounded-md font-semibold transition flex items-center justify-center gap-2">
              <Search className="w-4 h-4" />
              Search
            </button>
          </div>
        </div>
      </div>

      {/* FEATURED PROPERTIES */}
      <section className="max-w-7xl mx-auto py-16 px-6">
        <h2 className="text-3xl font-bold text-slate-800 text-center mb-10">Featured Properties</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProperties.map((prop) => (
            <div key={prop.id} className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-lg transition overflow-hidden group">
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={prop.image} 
                  alt={prop.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
              </div>

              {/* Card Body */}
              <div className="p-5">
                <h3 className="text-lg font-bold text-slate-900 truncate mb-1">{prop.title}</h3>
                <p className="text-sm text-gray-500 mb-3 uppercase tracking-wide">{prop.location}</p>
                
                {/* Stats Row */}
                <div className="flex items-center gap-4 text-xs text-gray-500 mb-4 border-b border-gray-100 pb-4">
                  <div className="flex items-center gap-1">
                    <Bed className="w-4 h-4" /> {prop.beds} Beds
                  </div>
                  <div className="flex items-center gap-1">
                    <Bath className="w-4 h-4" /> {prop.baths} Baths
                  </div>
                  <div className="flex items-center gap-1">
                    <Square className="w-4 h-4" /> {prop.area}
                  </div>
                </div>

                {/* Price */}
                <p className="text-slate-800 font-bold text-lg">{prop.price}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* BROWSE BY CATEGORY */}
      <section className="max-w-7xl mx-auto py-10 px-6 mb-10">
        <h2 className="text-3xl font-bold text-slate-800 text-center mb-10">Browse by Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Category: Rumah */}
          <Link to="/listing?type=house" className="group relative rounded-2xl overflow-hidden h-64 md:h-80 shadow-lg">
            <img 
              src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80" 
              className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
              alt="Rumah"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-8">
              <span className="text-white text-3xl font-bold">Rumah</span>
            </div>
          </Link>

          {/* Category: Apartemen */}
          <Link to="/listing?type=apartment" className="group relative rounded-2xl overflow-hidden h-64 md:h-80 shadow-lg">
            <img 
              src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80" 
              className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
              alt="Apartemen"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-8">
              <span className="text-white text-3xl font-bold">Apartemen</span>
            </div>
          </Link>

        </div>
      </section>

      {/* STATISTICS */}
      <section className="bg-white py-16 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="flex flex-col items-center">
            <HomeIcon className="w-10 h-10 text-slate-800 mb-4" />
            <h3 className="text-4xl font-bold text-slate-900 mb-2">10,000+</h3>
            <p className="text-gray-500 font-medium">Properties Listed</p>
          </div>
          <div className="flex flex-col items-center">
            <Users className="w-10 h-10 text-slate-800 mb-4" />
            <h3 className="text-4xl font-bold text-slate-900 mb-2">5,000+</h3>
            <p className="text-gray-500 font-medium">Happy Clients</p>
          </div>
          <div className="flex flex-col items-center">
            <Award className="w-10 h-10 text-slate-800 mb-4" />
            <h3 className="text-4xl font-bold text-slate-900 mb-2">50+</h3>
            <p className="text-gray-500 font-medium">Awards Won</p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-900 text-slate-300 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4 text-white">
               <HomeIcon className="w-6 h-6" />
               <span className="text-xl font-bold">PropertiKu</span>
            </div>
            <p className="text-sm leading-relaxed text-slate-400">
              Find your next home with ease and confidence. We provide the best service for you.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">QUICK LINKS</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="hover:text-white transition">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-white transition">Contact</Link></li>
              <li><Link to="/faq" className="hover:text-white transition">FAQ</Link></li>
            </ul>
          </div>

          {/* Explore */}
          <div>
            <h4 className="text-white font-semibold mb-4">EXPLORE</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/listing" className="hover:text-white transition">Properties for Sale</Link></li>
              <li><Link to="/listing" className="hover:text-white transition">Properties for Rent</Link></li>
              <li><Link to="/agents" className="hover:text-white transition">Agents</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-semibold mb-4">LEGAL</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/privacy" className="hover:text-white transition">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-white transition">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-slate-800 pt-8 text-center text-xs text-slate-500">
          &copy; 2025 PropertiKu. All rights reserved.
        </div>
      </footer>

    </div>
  );
}