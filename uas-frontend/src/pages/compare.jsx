import { useLocation, Link } from "react-router-dom";
import { Plus } from "lucide-react";

export default function Compare() {
  const location = useLocation();
  const compareList = location.state?.compareList || [];

  // Jika belum pilih property → tampilkan pesan
  if (compareList.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">No Properties Selected</h2>
        <p className="text-gray-500 mb-6">
          Please add properties to compare from the Listing Page.
        </p>
        <Link
          to="/listing"
          className="px-5 py-3 bg-slate-800 text-white rounded-lg hover:bg-slate-900"
        >
          Go to Listings
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen pb-0 font-sans text-slate-800">

      {/* PAGE HEADER */}
      <div className="max-w-6xl mx-auto px-6 py-10">
        <h1 className="text-2xl font-bold text-slate-900">Compare Properties</h1>
        <p className="text-gray-500 text-sm mt-1">
          Check the 'Compare' box on any listing to add it here.
        </p>

        {/* TOP PROPERTY CARDS */}
        <div className="grid grid-cols-3 gap-6 mt-10">

          {/* PROPERTY 1 */}
          {compareList[0] && (
            <div className="border border-gray-200 rounded-xl p-4 shadow-sm">
              <img
                src={compareList[0].img}
                className="w-full h-40 object-cover rounded-lg mb-3"
              />
              <h3 className="font-bold text-slate-900 text-sm">{compareList[0].title}</h3>
              <p className="text-xs text-gray-500">{compareList[0].location}</p>
            </div>
          )}

          {/* PROPERTY 2 */}
          {compareList[1] && (
            <div className="border border-gray-200 rounded-xl p-4 shadow-sm">
              <img
                src={compareList[1].img}
                className="w-full h-40 object-cover rounded-lg mb-3"
              />
              <h3 className="font-bold text-slate-900 text-sm">{compareList[1].title}</h3>
              <p className="text-xs text-gray-500">{compareList[1].location}</p>
            </div>
          )}

          {/* ADD PROPERTY BOX */}
          <Link
            to="/listing"
            className="border border-gray-300 border-dashed rounded-xl p-4 flex flex-col items-center justify-center hover:bg-gray-50 transition"
          >
            <div className="w-12 h-12 flex items-center justify-center border rounded-full text-slate-800">
              <Plus size={20} />
            </div>
            <h4 className="font-semibold mt-3 text-sm">Add Property</h4>
            <p className="text-xs text-gray-500">Add another property from browse</p>
          </Link>

        </div>

        {/* COMPARISON TABLE */}
        <div className="mt-10 border border-gray-200 rounded-xl overflow-hidden">

          {/* PRICE ROW */}
          <div className="grid grid-cols-3 border-b">
            <div className="bg-gray-50 p-4 font-semibold text-sm">Price</div>
            <div className="p-4 text-sm font-bold text-slate-900">
              {compareList[0] ? compareList[0].price : "-"}
            </div>
            <div className="p-4 text-sm font-bold text-slate-900">
              {compareList[1] ? compareList[1].price : "-"}
            </div>
          </div>

          {/* BEDROOMS */}
          <div className="grid grid-cols-3 border-b">
            <div className="bg-gray-50 p-4 font-semibold text-sm">Bedrooms</div>
            <div className="p-4 text-sm">{compareList[0]?.beds || "-"}</div>
            <div className="p-4 text-sm">{compareList[1]?.beds || "-"}</div>
          </div>

          {/* BATHROOMS */}
          <div className="grid grid-cols-3 border-b">
            <div className="bg-gray-50 p-4 font-semibold text-sm">Bathrooms</div>
            <div className="p-4 text-sm">{compareList[0]?.baths || "-"}</div>
            <div className="p-4 text-sm">{compareList[1]?.baths || "-"}</div>
          </div>

          {/* AREA */}
          <div className="grid grid-cols-3 border-b">
            <div className="bg-gray-50 p-4 font-semibold text-sm">Area</div>
            <div className="p-4 text-sm">{compareList[0]?.area || "-"} m²</div>
            <div className="p-4 text-sm">{compareList[1]?.area || "-"} m²</div>
          </div>

          {/* DESCRIPTION */}
          <div className="grid grid-cols-3 border-b">
            <div className="bg-gray-50 p-4 font-semibold text-sm">Description</div>
            <div className="p-4 text-xs leading-relaxed">
              {compareList[0]?.description || "-"}
            </div>
            <div className="p-4 text-xs leading-relaxed">
              {compareList[1]?.description || "-"}
            </div>
          </div>

        </div>

        {/* BUTTON ROW */}
        <div className="grid grid-cols-3 mt-6 gap-6">

          {/* PROPERTY 1 BUTTONS */}
          {compareList[0] && (
            <div className="flex flex-col gap-2">
              <Link
                to={`/property/${compareList[0].id}`}
                className="w-full py-2 bg-gray-100 text-slate-900 text-sm font-semibold rounded-lg"
              >
                View Details
              </Link>
              <button className="w-full py-2 bg-slate-800 text-white text-sm font-semibold rounded-lg">
                Contact Agent
              </button>
            </div>
          )}

          {/* PROPERTY 2 BUTTONS */}
          {compareList[1] && (
            <div className="flex flex-col gap-2">
              <Link
                to={`/property/${compareList[1].id}`}
                className="w-full py-2 bg-gray-100 text-slate-900 text-sm font-semibold rounded-lg"
              >
                View Details
              </Link>
              <button className="w-full py-2 bg-slate-800 text-white text-sm font-semibold rounded-lg">
                Contact Agent
              </button>
            </div>
          )}

        </div>
      </div>

      {/* FOOTER */}
      <footer className="bg-[#1E293B] text-gray-300 mt-20 py-14">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-4 text-sm gap-6">

          <div>
            <h3 className="font-semibold text-white mb-3">PropertiKu</h3>
            <p className="text-gray-400 text-xs">Find your next home with ease and confidence.</p>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-3">QUICK LINKS</h4>
            <p className="text-gray-400 text-xs">About Us</p>
            <p className="text-gray-400 text-xs">Contact</p>
            <p className="text-gray-400 text-xs">FAQ</p>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-3">EXPLORE</h4>
            <p className="text-gray-400 text-xs">Properties for Sale</p>
            <p className="text-gray-400 text-xs">Properties for Rent</p>
            <p className="text-gray-400 text-xs">Agents</p>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-3">LEGAL</h4>
            <p className="text-gray-400 text-xs">Privacy Policy</p>
            <p className="text-gray-400 text-xs">Terms of Service</p>
          </div>

        </div>

        <div className="text-center text-gray-500 text-xs mt-10">
          © 2025 PropertiKu. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
