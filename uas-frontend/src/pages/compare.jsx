import { Link } from "react-router-dom";
import { X, Plus } from "lucide-react";
import { getCompare, removeFromCompare } from "../utils/compareStore";

export default function Compare() {
  const compareList = getCompare();

  return (
    <div className="bg-[#F7F9FC] min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-6">

        <h1 className="text-2xl font-bold">Compare Properties</h1>
        <p className="text-sm text-gray-500 mb-8">
          Compare up to 2 properties.
        </p>

        <div className="grid grid-cols-[220px_1fr_1fr] border border-gray-200 rounded-xl overflow-hidden bg-white">

          {/* === FOTO ROW === */}
          <div className="bg-slate-700" />
          {[0, 1].map((i) => (
            <div key={i} className="p-5 border-l relative">
              {compareList[i] ? (
                <>
                  <button
                    onClick={() => {
                      removeFromCompare(compareList[i].id);
                      window.location.reload();
                    }}
                    className="absolute top-3 right-3 bg-white rounded-full p-1 shadow"
                  >
                    <X size={14} />
                  </button>

                  <img
                    src={compareList[i].img}
                    className="w-full h-44 object-cover rounded-lg mb-3"
                  />
                  <h3 className="font-bold text-sm">
                    {compareList[i].title}
                  </h3>
                  <p className="text-xs text-gray-500">
                    {compareList[i].location}
                  </p>
                </>
              ) : (
                <Link
                  to="/listing"
                  className="h-full flex flex-col items-center justify-center text-gray-400 hover:text-slate-800"
                >
                  <Plus size={28} />
                  <span className="text-sm mt-2">Add Property</span>
                </Link>
              )}
            </div>
          ))}

          {/* === ROWS === */}
          {[
            ["Price", "price"],
            ["Bedrooms", "beds"],
            ["Bathrooms", "baths"],
            ["Area", "area"],
            ["Description", "description"],
          ].map(([label, key]) => (
            <div key={label} className="contents">
              <div className="bg-gray-100 px-5 py-4 font-semibold text-sm border-t">
                {label}
              </div>
              {[0, 1].map((i) => (
                <div
                  key={i}
                  className="px-5 py-4 text-center border-t border-l text-sm"
                >
                  {compareList[i]?.[key] || "-"}
                </div>
              ))}
            </div>
          ))}

          {/* === BUTTON ROW === */}
          <div />
          {[0, 1].map((i) => (
            <div key={i} className="p-5 border-l">
              {compareList[i] && (
                <>
                  <Link
                    to={`/property/${compareList[i].id}`}
                    className="block w-full text-center py-2 bg-gray-200 rounded-lg font-semibold text-sm mb-2"
                  >
                    View Details
                  </Link>
                  <button className="w-full py-2 bg-slate-900 text-white rounded-lg font-semibold text-sm">
                    Contact Agent
                  </button>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
