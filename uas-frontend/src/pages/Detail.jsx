import { Link, useParams } from "react-router-dom";
import { 
  MapPin, Heart, BedDouble, Bath, Square, Scaling, 
  Phone, MessageCircle, Image as ImageIcon 
} from "lucide-react";

export default function Detail() {
  const { id } = useParams();

  // DATA DUMMY PROPERTI (Gambar Pexels)
  const property = {
    id,
    title: "Modern House in South Jakarta",
    address: "Jakarta Selatan, DKI Jakarta",
    price: 5500000000,
    beds: 4,
    baths: 3,
    building: 350,
    land: 500,
    description: `Discover the epitome of modern living in this stunningly designed house located in the heart of South Jakarta. This property boasts spacious interiors with high ceilings and large windows, allowing for an abundance of natural light.

Each of the four bedrooms is a private sanctuary. Step outside to your private oasis with a beautifully landscaped garden and a sparkling swimming pool.`,
    images: [
      "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", // Main
      "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", // Interior
      "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", // Room
      "https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", // Kitchen
      "https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", // Decor
    ],
  };

  const agent = {
    name: "Jane Doe",
    company: "PropertiKu Realty",
    phone: "+62 812-3456-7890",
    avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150",
  };

  // DATA SIMILAR
  const similar = [
    { id: 2, title: "Minimalist House", location: "BSD, Tangerang", price: 4800000000, img: "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { id: 3, title: "Classic Villa", location: "Pondok Indah", price: 7200000000, img: "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { id: 4, title: "Tropical Modern", location: "Kemang", price: 6100000000, img: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { id: 5, title: "Luxury Residence", location: "Menteng", price: 9600000000, img: "https://images.pexels.com/photos/439391/pexels-photo-439391.jpeg?auto=compress&cs=tinysrgb&w=600" },
  ];

  return (
    <div className="bg-white min-h-screen pb-0 font-sans text-slate-800">
      
      {/* CONTAINER UTAMA */}
      <div className="max-w-7xl mx-auto px-6 py-6">

        {/* BREADCRUMB */}
        <div className="text-sm text-gray-500 mb-6 flex items-center gap-2">
          <Link to="/" className="hover:text-slate-900 transition">Home</Link> <span className="text-gray-300">/</span>
          <Link to="/listing" className="hover:text-slate-900 transition">Search Results</Link> <span className="text-gray-300">/</span>
          <span className="font-medium text-slate-900 truncate">{property.title}</span>
        </div>

        {/* GALLERY GRID (Sesuai Gambar) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-[400px] md:h-[500px] rounded-2xl overflow-hidden bg-gray-100">
          <div className="h-full">
            <img src={property.images[0]} className="w-full h-full object-cover hover:scale-105 transition duration-700 cursor-pointer" alt="Main Property" />
          </div>
          <div className="grid grid-cols-2 gap-4 h-full">
            <img src={property.images[1]} className="w-full h-full object-cover" alt="Detail 1" />
            <img src={property.images[2]} className="w-full h-full object-cover rounded-tr-2xl" alt="Detail 2" />
            <img src={property.images[3]} className="w-full h-full object-cover" alt="Detail 3" />
            <div className="relative w-full h-full">
              <img src={property.images[4]} className="w-full h-full object-cover" alt="Detail 4" />
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                 <button className="bg-white px-4 py-2 rounded-lg shadow-md flex items-center gap-2 text-sm font-semibold text-slate-800 hover:bg-gray-100 transition">
                    <ImageIcon size={16} /> View All Photos
                 </button>
              </div>
            </div>
          </div>
        </div>

        {/* SPLIT LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-10">

          {/* KOLOM KIRI (Info Properti) */}
          <div className="lg:col-span-2">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold text-slate-900">{property.title}</h1>
                <div className="flex items-center gap-2 text-gray-500 mt-2"><MapPin size={18} /><span>{property.address}</span></div>
              </div>
              <button className="flex items-center gap-2 border border-gray-300 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition"><Heart size={18} /> Add to Favorites</button>
            </div>

            {/* Price Box */}
            <div className="mt-8 border border-gray-200 rounded-2xl p-8 shadow-sm">
              <p className="text-sm text-gray-500 mb-1">Price</p>
              <h2 className="text-3xl font-bold text-slate-900">Rp {property.price.toLocaleString("id-ID")}</h2>
              <hr className="my-6 border-gray-100" />
              <div className="grid grid-cols-4 gap-4 text-center">
                <div><div className="flex justify-center mb-2 text-slate-700"><BedDouble size={24} /></div><p className="font-bold text-lg">{property.beds}</p><p className="text-xs text-gray-500 uppercase">Bedrooms</p></div>
                <div><div className="flex justify-center mb-2 text-slate-700"><Bath size={24} /></div><p className="font-bold text-lg">{property.baths}</p><p className="text-xs text-gray-500 uppercase">Bathrooms</p></div>
                <div><div className="flex justify-center mb-2 text-slate-700"><Square size={24} /></div><p className="font-bold text-lg">{property.building} m²</p><p className="text-xs text-gray-500 uppercase">Building</p></div>
                <div><div className="flex justify-center mb-2 text-slate-700"><Scaling size={24} /></div><p className="font-bold text-lg">{property.land} m²</p><p className="text-xs text-gray-500 uppercase">Land</p></div>
              </div>
            </div>

            <div className="mt-10">
              <h3 className="text-xl font-bold text-slate-900 mb-4">About this property</h3>
              <p className="text-gray-600 leading-relaxed whitespace-pre-line">{property.description}</p>
            </div>
          </div>

          {/* KOLOM KANAN (Agent Sticky) */}
          <div className="lg:col-span-1">
            <div className="border border-gray-200 rounded-2xl p-6 shadow-sm sticky top-24 bg-white">
              <span className="bg-gray-100 text-slate-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">For Sale</span>
              <div className="flex items-center gap-4 mt-6">
                <img src={agent.avatar} className="w-14 h-14 rounded-full object-cover" alt="Agent" />
                <div><h4 className="font-bold text-lg text-slate-900">{agent.name}</h4><p className="text-sm text-gray-500">{agent.company}</p></div>
              </div>
              <div className="mt-8 space-y-3">
                <Link to="/chat/1" className="w-full bg-slate-800 hover:bg-slate-900 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition"><MessageCircle size={18} /> Chat With Agent</Link>
                <button className="w-full border border-gray-300 text-slate-800 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-gray-50 transition"><Phone size={18} /> {agent.phone}</button>
              </div>
            </div>
          </div>

        </div>

        {/* SIMILAR PROPERTIES */}
        <div className="mt-20">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Similar Properties</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {similar.map((p) => (
              <Link
                key={p.id}
                to={`/property/${p.id}`}
                className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition group"
              >
                <div className="h-44 overflow-hidden bg-gray-200">
                   <img src={p.img} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" alt={p.title} />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-slate-900 truncate">{p.title}</h3>
                  <p className="text-sm text-gray-500 mb-2 truncate">{p.location}</p>
                  <p className="font-bold text-slate-900 mb-4">Rp {p.price.toLocaleString("id-ID")}</p>
                  <div className="w-full py-2 bg-gray-100 text-slate-900 rounded-lg text-sm font-semibold text-center hover:bg-gray-200 transition">View Details</div>
                </div>
              </Link>
            ))}
          </div>
        </div>

      </div>

      {/* FOOTER */}
      <footer className="bg-[#1E293B] text-gray-300 mt-20 py-14">
        <div className="max-w-7xl mx-auto px-6 text-center text-sm">© 2025 PropertiKu. All rights reserved.</div>
      </footer>
    </div>
  );
}
