import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getAgentProfile, getAllProperties } from "../services/api";

export default function AgentProfile() {
  const { id } = useParams();
  const [agent, setAgent] = useState(null);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAgentData();
  }, [id]);

  const fetchAgentData = async () => {
    try {
      setLoading(true);
      
      // Fetch agent profile
      const agentResponse = await getAgentProfile(id);
      if (agentResponse.data.status === "success") {
        setAgent(agentResponse.data.data);
      }

      // Fetch agent's properties
      const propertiesResponse = await getAllProperties({ agent_id: id });
      if (propertiesResponse.data.status === "success") {
        setProperties(propertiesResponse.data.data);
      }
    } catch (error) {
      console.error("Error fetching agent data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  if (!agent) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="text-center text-red-600">Agent not found</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      {/* BACK LINK */}
      <div className="mb-6">
        <Link to="/listing" className="text-blue-600 hover:underline">
          ← Back to Listings
        </Link>
      </div>

      {/* HEADER */}
      <div className="flex flex-col md:flex-row gap-6 items-start">
        {/* Agent Photo */}
        <img
          src={agent.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80"}
          className="w-40 h-40 object-cover rounded-full shadow-lg"
          alt={agent.name}
        />

        {/* Agent Info */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold">{agent.name}</h1>
          {agent.company && (
            <p className="text-gray-500 text-sm mt-1">{agent.company}</p>
          )}
          {agent.license_number && (
            <p className="text-gray-500 text-xs">License: {agent.license_number}</p>
          )}
          <p className="text-gray-600 mt-3">{agent.bio || "No bio available"}</p>

          <div className="mt-4 space-y-1 text-gray-700">
            {agent.phone && <p>📞 {agent.phone}</p>}
            <p>✉️ {agent.email}</p>
            <p>🏠 {agent.total_properties} Properties Listed</p>
          </div>

          <Link
            to={`/chat/${agent.id}`}
            className="inline-block mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Chat with Agent
          </Link>
        </div>
      </div>

      {/* AGENT LISTINGS */}
      <div className="mt-14">
        <h2 className="text-2xl font-bold mb-6">Properties by {agent.name}</h2>

        {properties.length === 0 ? (
          <p className="text-gray-500">No properties listed yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((p) => (
              <div
                key={p.id}
                className="bg-white shadow rounded-xl hover:shadow-lg transition p-4"
              >
                <img
                  src={
                    p.images && p.images.length > 0
                      ? p.images[0]
                      : p.img || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80"
                  }
                  className="rounded-lg w-full h-48 object-cover"
                  alt={p.title}
                />
                <h3 className="font-semibold text-lg mt-3">{p.title}</h3>
                <p className="text-gray-500">{p.location}</p>

                <p className="text-blue-600 font-bold mt-1">
                  Rp {p.price.toLocaleString("id-ID")}
                </p>

                <Link
                  to={`/property/${p.id}`}
                  className="text-blue-600 text-sm hover:underline mt-2 inline-block"
                >
                  View Details →
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
