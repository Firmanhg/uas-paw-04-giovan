import { Link, useParams } from "react-router-dom";
import { FiPhone, FiImage } from "react-icons/fi";

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

Each of the four bedrooms is a private sanctuary, with the master suite featuring a walk-in closet and a luxurious 
en-suite bathroom. Step outside to your private oasis with a beautifully landscaped garden and a sparkling swimming pool. 
Located in a prestigious and secure neighborhood, you’re just minutes away from top international schools, premium 
shopping malls, and fine dining restaurants. This is a rare opportunity to own a piece of architectural excellence in 
one of Jakarta’s most sought-after locations.
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
    company: "Propertyku Realty",
    phone: "+62 812-3456-7890",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80",
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
    <div className="bg-white pb-20">
      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-5 flex gap-1">
          <Link to="/" className="hover:underline">Home</Link> /
          <Link to="/listing" className="hover:underline"> Search Results </Link> /
          <span className="font-medium text-gray-700">{property.title}</span>
        </div>

        {/* GALLERY AREA */}
        <div className="grid grid-cols-4 gap-4">
          {/* Big Image */}
          <div className="col-span-2">
            <img
              src={property.images[0]}
              className="rounded-xl h-[420px] w-full object-cover"
            />
          </div>

          {/* Smaller Images */}
          <div className="col-span-2 grid grid-cols-2 gap-4 relative">

            {property.images.slice(1, 5).map((img, index) => (
              <img
                key={index}
                src={img}
                className="rounded-xl h-[200px] w-full object-cover"
              />
            ))}

            {/* View All Photos Button (ABSOLUTE) */}
            <button className="absolute bottom-3 right-3 bg-white px-4 py-2 rounded-xl shadow flex items-center gap-2 text-sm hover:bg-gray-50">
              <FiImage /> View All Photos
            </button>
          </div>
        </div>

        {/* TITLE, FAVORITE + AGENT SIDEBAR */}
        <div className="grid grid-cols-3 mt-8 gap-10">

          {/* LEFT SECTION */}
          <div className="col-span-2">

            <h1 className="text-3xl font-bold">{property.title}</h1>
            <p className="text-gray-600 mt-1">{property.address}</p>

            <div className="flex items-center gap-4 mt-4">
              <button className="px-5 py-2 border rounded-xl hover:bg-gray-100 transition">
                🤍 Add to Favorites
              </button>
            </div>

            {/* PRICE CARD */}
            <div className="border rounded-xl p-6 mt-6">
              <h3 className="text-sm text-gray-600">Price</h3>
              <p className="text-3xl font-bold mt-1">
                Rp {property.price.toLocaleString("id-ID")}
              </p>

              {/* SPECS GRID */}
              <div className="grid grid-cols-4 mt-6 text-center">
                <div>
                  <p className="font-bold text-xl">{property.beds}</p>
                  <p className="text-gray-600 text-sm">Bedrooms</p>
                </div>
                <div>
                  <p className="font-bold text-xl">{property.baths}</p>
                  <p className="text-gray-600 text-sm">Bathrooms</p>
                </div>
                <div>
                  <p className="font-bold text-xl">{property.building} m²</p>
                  <p className="text-gray-600 text-sm">Building Area</p>
                </div>
                <div>
                  <p className="font-bold text-xl">{property.land} m²</p>
                  <p className="text-gray-600 text-sm">Land Area</p>
                </div>
              </div>
            </div>

            {/* ABOUT PROPERTY */}
            <div className="mt-10">
              <h2 className="text-xl font-semibold mb-3">About this property</h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {property.about}
              </p>
            </div>
          </div>

          {/* RIGHT SECTION — AGENT CARD */}
          <div className="col-span-1">
            <div className="border rounded-xl p-6 shadow-sm">

              <div className="flex items-center gap-4">
                <img
                  src={agent.avatar}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-bold text-lg">{agent.name}</h3>
                  <p className="text-gray-600 text-sm">{agent.company}</p>
                </div>
              </div>

              {/* Chat Button */}
              <button className="mt-5 w-full bg-gray-900 text-white py-3 rounded-xl hover:bg-black transition">
                Chat With Agent
              </button>

              {/* Phone */}
              <div className="mt-4 flex items-center gap-3 text-gray-700">
                <FiPhone />
                {agent.phone}
              </div>

            </div>
          </div>
        </div>

        {/* SIMILAR PROPERTIES */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Similar Properties</h2>

          <div className="grid grid-cols-4 gap-6">
            {similar.map((p) => (
              <div
                key={p.id}
                className="border rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition"
              >
                <img src={p.img} className="h-44 w-full object-cover" />
                <div className="p-4">
                  <h3 className="font-semibold text-lg">{p.title}</h3>
                  <p className="text-gray-600 text-sm">{p.location}</p>
                  <p className="text-blue-600 font-bold mt-1">
                    Rp {p.price.toLocaleString("id-ID")}
                  </p>
                  <button className="mt-3 w-full py-2 border rounded-xl hover:bg-gray-100">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FOOTER */}
        <footer className="mt-20 border-t pt-10 grid grid-cols-4 gap-8 text-sm text-gray-700">
          
          <div>
            <h4 className="font-bold mb-3">PropertiKu</h4>
            <p>Find your next home with ease and confidence.</p>
          </div>

          <div>
            <h4 className="font-bold mb-3">QUICK LINKS</h4>
            <p>About Us</p>
            <p>Contact</p>
            <p>FAQ</p>
          </div>

          <div>
            <h4 className="font-bold mb-3">EXPLORE</h4>
            <p>Properties for Sale</p>
            <p>Properties for Rent</p>
            <p>Agents</p>
          </div>

          <div>
            <h4 className="font-bold mb-3">LEGAL</h4>
            <p>Privacy Policy</p>
            <p>Terms of Service</p>
          </div>

        </footer>

        <p className="text-center text-gray-500 text-xs mt-10">
          © 2025 PropertiKu. All rights reserved.
        </p>
      </div>
    </div>
  );
}
