import { useLocation, Link } from "react-router-dom";
import { Plus } from "lucide-react";

export default function Compare() {
  const { state } = useLocation();
  const compareList = state?.compareList || [];

  const slots = [
    compareList[0] || null,
    compareList[1] || null,
    compareList[2] || null,
  ];

  return (
    <div className="bg-white min-h-screen pb-20 font-sans text-slate-800">
      <div className="max-w-7xl mx-auto px-6 py-10">

        <h1 className="text-3xl font-bold text-slate-900">Compare Properties</h1>
        <p className="text-gray-600 mt-1">
          Compare up to 3 properties side by side.
        </p>

        {/* GRID TOP */}
        <div className="grid grid-cols-3 gap-6 mt-10">

          {slots.map((property, index) =>
            property ? (
              <div
                key={index}
                className="border rounded-xl shadow-sm p-5 bg-white relative"
              >
                <button
                  className="absolute top-3 right-3 text-gray-400 hover:text-red-500 text-xl"
                >
                  ×
                </button>

                <img
                  src={property.img}
                  className="w-full h-44 rounded-lg object-cover mb-3"
                />

                <h3 className="font-semibold text-lg truncate">{property.title}</h3>
                <p className="text-gray-500 text-sm truncate">
                  {property.location}
                </p>
              </div>
            ) : (
              <div
                key={index}
                className="border border-gray-300 rounded-xl py-10 bg-gray-50 flex flex-col items-center justify-center"
              >
                <Plus className="w-10 h-10 text-gray-400" />
                <p className="mt-2 text-gray-500 text-sm">Add Property</p>
                <Link
                  to="/listing"
                  className="text-blue-600 hover:underline mt-1 text-sm"
                >
                  Browse Properties
                </Link>
              </div>
            )
          )}
        </div>

        {/* TABLE */}
        <div className="mt-16 border rounded-xl overflow-hidden">

          {/* PRICE */}
          <div className="grid grid-cols-4 bg-gray-50 py-4 px-6 border-b font-semibold text-gray-700">
            <div>Price</div>
            {slots.map((p, i) => (
              <div key={i} className="font-bold text-slate-900">
                {p ? `Rp ${p.price.toLocaleString("id-ID")}` : "-"}
              </div>
            ))}
          </div>

          {/* BEDROOMS */}
          <div className="grid grid-cols-4 py-4 px-6 border-b">
            <div className="text-gray-600">Bedrooms</div>
            {slots.map((p, i) => (
              <div key={i} className="text-slate-900">
                {p ? p.beds : "-"}
              </div>
            ))}
          </div>

          {/* BATHROOMS */}
          <div className="grid grid-cols-4 py-4 px-6 border-b">
            <div className="text-gray-600">Bathrooms</div>
            {slots.map((p, i) => (
              <div key={i}>{p ? p.baths : "-"}</div>
            ))}
          </div>

          {/* AREA */}
          <div className="grid grid-cols-4 py-4 px-6 border-b">
            <div className="text-gray-600">Area</div>
            {slots.map((p, i) => (
              <div key={i}>{p ? `${p.area} m²` : "-"}</div>
            ))}
          </div>

          {/* DESCRIPTION */}
          <div className="grid grid-cols-4 py-6 px-6 border-b text-sm leading-relaxed">
            <div className="text-gray-600">Description</div>
            {slots.map((p, i) => (
              <div key={i}>
                {p
                  ? p.description || "No description available."
                  : "-"}
              </div>
            ))}
          </div>

          {/* ACTION BUTTONS */}
          <div className="grid grid-cols-4 py-6 px-6 bg-gray-50">
            <div></div>

            {slots.map((p, i) =>
              p ? (
                <div key={i} className="flex flex-col gap-3">
                  <Link
                    to={`/property/${p.id}`}
                    className="px-6 py-2 bg-slate-800 text-white rounded-lg text-center hover:bg-slate-900"
                  >
                    View Details
                  </Link>

                  <button className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-100">
                    Contact Agent
                  </button>
                </div>
              ) : (
                <div key={i}></div>
              )
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
