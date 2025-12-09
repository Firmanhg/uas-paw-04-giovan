import { Link, useParams } from "react-router-dom";
import { Phone, Image as ImageIcon } from "lucide-react";

export default function Detail() {
  const { id } = useParams();

  const property = {
    id,
    title: "Modern House in South Jakarta",
    address: "Jakarta Selatan, DKI Jakarta",
    price: 5500000000,
    beds: 4,
    baths: 3,
    building: 350,
    land: 500,
    about: `
Discover the epitome of modern living in this stunningly designed house located in the heart of South Jakarta. 
This property boasts spacious interiors with high ceilings and large windows, allowing for an abundance of natural light. 
The open-plan living area seamlessly connects to a gourmet kitchen, perfect for entertaining.

Each of the four bedrooms is a private sanctuary, with the master suite featuring a walk-in closet and a luxurious en-suite bathroom. 
Step outside to your private oasis with a beautifully landscaped garden and a sparkling swimming pool. 
Located in a prestigious and secure neighborhood, you’re just minutes away from top international schools, premium shopping malls, 
and fine dining restaurants.
`,
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80",
      "https://images.unsplash.com/photo-1560185008-5a7a594be0c3?q=80",
      "https://images.unsplash.com/photo-1600573472591-ee6bbf0b9218?q=80",
      "https://images.unsplash.com/photo-1600566753531-2ae444ef8e4c?q=80",
      "https://images.unsplash.com/photo-1600585154206-e3b9ae3d6f89?q=80",
    ],
  };

  const agent = {
    name: "Jane Doe",
    company: "PropertiKu Realty",
    phone: "+62 812-3456-7890",
    avatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80",
  };

  const similar = [
    {
      id: 2,
      title: "Minimalist House",
      location: "BSD, Tangerang",
      price: 4800000000,
      img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80",
    },
    {
      id: 3,
      title: "Classic Villa",
      location: "Pondok Indah, Jakarta",
      price: 7200000000,
      img: "https://images.unsplash.com/photo-1600585154206-e3b9ae3d6f89?q=80",
    },
    {
      id: 4,
      title: "Tropical Modern Home",
      location: "Kemang, Jakarta",
      price: 6100000000,
      img: "https://images.unsplash.com/photo-1600566753531-2ae444ef8e4c?q=80",
    },
    {
      id: 5,
      title: "Luxury Residence",
      location: "Menteng, Jakarta",
      price: 9600000000,
      img: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?q=80",
    },
  ];

  return (
    <div className="bg-white pb-0">
      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-5 flex gap-1">
          <Link to="/" className="hover:underline">Home</Link> /
          <Link to="/listing" className="hover:underline"> Search Results </Link> /
          <span className="font-medium text-gray-700">{property.title}</span>
        </div>

        {/* GALLERY */}
        <div className="grid grid-cols-3 gap-4">
          
          {/* Main Image */}
          <div className="col-span-2">
            <img
              src={property.images[0]}
              className="rounded-xl h-[420px] w-full object-cover"
            />
          </div>

          {/* Thumbnails */}
          <div className="col-span-1 grid grid-cols-1 gap-4 relative">
            {property.images.slice(1).map((img, i) => (
              <img
                key={i}
                src={img}
                className="rounded-xl h-[130px] w-full object-cover"
              />
            ))}

            <button className="absolute bottom-3 right-3 bg-white px-4 py-2 rounded-xl shadow flex items-center gap-2 text-sm text-slate-700 hover:bg-gray-50">
              <ImageIcon size={16} /> View All Photos
            </button>
          </div>
        </div>

        {/* CONTENT GRID */}
        <div className="grid grid-cols-3 mt-10 gap-10">

          {/* LEFT CONTENT */}
          <div className="col-span-2">

            <h1 className="text-3xl font-bold text-slate-900">{property.title}</h1>
            <p className="text-gray-600 mt-1">{property.address}</p>

            <button className="mt-4 px-5 py-2 border border-gray-300 rounded-lg text-slate-800 hover:bg-gray-50">
              🤍 Add to Favorites
            </button>

            {/* PRICE CARD */}
            <div className="border border-gray-200 rounded-xl p-6 mt-6 shadow-sm">
              <h3 className="text-sm text-gray-600">Price</h3>
              <p className="text-3xl font-bold text-slate-900 mt-1">
                Rp {property.price.toLocaleString("id-ID")}
              </p>

              <div className="grid grid-cols-4 mt-6 text-center">
                <div>
                  <p className="font-semibold text-lg">{property.beds}</p>
                  <p className="text-gray-600 text-sm">Bedrooms</p>
                </div>
                <div>
                  <p className="font-semibold text-lg">{property.baths}</p>
                  <p className="text-gray-600 text-sm">Bathrooms</p>
                </div>
                <div>
                  <p className="font-semibold text-lg">{property.building} m²</p>
                  <p className="text-gray-600 text-sm">Building Area</p>
                </div>
                <div>
                  <p className="font-semibold text-lg">{property.land} m²</p>
                  <p className="text-gray-600 text-sm">Land Area</p>
                </div>
              </div>
            </div>

            {/* ABOUT */}
            <div className="mt-10">
              <h2 className="text-xl font-semibold mb-3 text-slate-900">
                About this property
              </h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {property.about}
              </p>
            </div>
          </div>

          {/* AGENT CARD */}
          <div className="col-span-1">
            <div className="border border-gray-200 rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-4">
                <img
                  src={agent.avatar}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-bold text-lg text-slate-900">{agent.name}</h3>
                  <p className="text-gray-600 text-sm">{agent.company}</p>
                </div>
              </div>

              <button className="mt-5 w-full bg-slate-800 text-white py-3 rounded-lg hover:bg-slate-900 transition">
                Chat With Agent
              </button>

              <div className="mt-4 flex items-center gap-3 text-gray-700">
                <Phone size={18} className="text-slate-800" />
                {agent.phone}
              </div>
            </div>
          </div>

        </div>

        {/* SIMILAR PROPERTIES */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Similar Properties</h2>

          <div className="grid grid-cols-4 gap-6">
            {similar.map((p) => (
              <Link
                key={p.id}
                to={`/property/${p.id}`}
                className="border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition"
              >
                <img src={p.img} className="h-44 w-full object-cover" />
                <div className="p-4">
                  <h3 className="font-semibold text-lg text-slate-900">{p.title}</h3>
                  <p className="text-gray-600 text-sm">{p.location}</p>
                  <p className="text-slate-900 font-bold mt-1">
                    Rp {p.price.toLocaleString("id-ID")}
                  </p>
                  <div className="mt-3 w-full py-2 border border-gray-300 rounded-lg text-center text-slate-800 hover:bg-gray-50">
                    View Details
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

      </div>

      {/* FOOTER */}
      <footer className="bg-[#1E293B] text-gray-300 mt-20 py-14">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* COLUMN 1 */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">PropertiKu</h3>
            <p className="text-sm leading-relaxed">
              Find your next home with ease and confidence.
            </p>
          </div>

          {/* COLUMN 2 */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">QUICK LINKS</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="hover:underline">About Us</Link></li>
              <li><Link to="/contact" className="hover:underline">Contact</Link></li>
              <li><Link to="/faq" className="hover:underline">FAQ</Link></li>
            </ul>
          </div>

          {/* COLUMN 3 */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">EXPLORE</h4>
            <ul className="space-y-2 text-sm">
              <li>Properties for Sale</li>
              <li>Properties for Rent</li>
              <li>Agents</li>
            </ul>
          </div>

          {/* COLUMN 4 */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">LEGAL</h4>
            <ul className="space-y-2 text-sm">
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-400">
          © 2025 PropertiKu. All rights reserved.
        </div>
      </footer>

    </div>
  );
}
