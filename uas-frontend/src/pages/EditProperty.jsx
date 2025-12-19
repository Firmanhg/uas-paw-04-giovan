import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getPropertyById, updateProperty } from "../services/api";
import { getCurrentUser } from "../services/authService";

export default function EditProperty() {
  const navigate = useNavigate();
  const { id } = useParams();
  
  const currentUser = getCurrentUser();
  const AGENT_ID = currentUser?.id;
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [imagePreviews, setImagePreviews] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    property_type: "House",
    listing_type: "sale",
    location: "",
    bedrooms: "",
    bathrooms: "",
    area: "",
  });

  useEffect(() => {
    fetchProperty();
  }, [id]);

  const fetchProperty = async () => {
    try {
      setLoading(true);
      console.log('Fetching property ID:', id);
      const response = await getPropertyById(id);

      const property = response.data.data || response.data;
      
      console.log('Full response:', response.data);
      console.log('Property data:', property);
      console.log('Property agent_id:', property.agent_id, 'Current AGENT_ID:', AGENT_ID);

      if (property.agent_id !== AGENT_ID) {
        setError(`You do not have permission to edit this property (Owner: ${property.agent_id}, You: ${AGENT_ID})`);
        setLoading(false);
        return;
      }
      
      setForm({
        title: property.title || '',
        description: property.description || '',
        price: property.price ? property.price.toString() : '',
        property_type: property.property_type || 'House',
        listing_type: property.listing_type || 'sale',
        location: property.location || '',
        bedrooms: property.bedrooms ? property.bedrooms.toString() : '',
        bathrooms: property.bathrooms ? property.bathrooms.toString() : '',
        area: property.area ? property.area.toString() : '',
      });

      if (property.images && Array.isArray(property.images)) {
        setImagePreviews(property.images);
      } else if (property.img) {

        setImagePreviews([property.img]);
      }
      
      setLoading(false);
    } catch (err) {
      console.error('Error fetching property:', err);
      console.error('Error response:', err.response);
      setError('Failed to load property data: ' + (err.response?.data?.error || err.message));
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    
    if (files.length === 0) return;

    files.forEach(file => {
      if (!file.type.startsWith('image/')) {
        alert(`${file.name} is not an image file`);
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviews(prev => [...prev, reader.result]);
      };
      reader.readAsDataURL(file);
    });

    e.target.value = null;
  };

  const handleRemoveImage = (index) => {
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setError('');
      
      const updateData = {
        title: form.title,
        description: form.description,
        price: parseInt(form.price),
        property_type: form.property_type,
        listing_type: form.listing_type,
        location: form.location,
        bedrooms: parseInt(form.bedrooms),
        bathrooms: parseInt(form.bathrooms),
        area: parseInt(form.area),
        agent_id: AGENT_ID
      };

      if (imagePreviews.length > 0) {
        updateData.images = imagePreviews;
      }
      
      console.log('Updating property:', updateData);
      
      await updateProperty(id, updateData);
      
      alert('Property updated successfully!');
      navigate("/my-properties");
    } catch (err) {
      console.error('Error updating property:', err);
      setError(err.response?.data?.error || 'Failed to update property');
    }
  };

  const labelClass = "block text-sm font-bold text-gray-900 mb-2";
  const inputClass = "w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:bg-white transition";

  return (
    <div className="flex min-h-screen bg-white font-sans text-gray-800">
      
      {}
      <aside className="w-64 bg-white border-r border-gray-200 flex-col hidden md:flex sticky top-0 h-screen">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
             <div className="w-10 h-10 rounded-full bg-orange-200 flex items-center justify-center text-orange-600 font-bold text-lg">{currentUser?.name?.charAt(0).toUpperCase() || 'A'}</div>
             <div>
              <h3 className="text-sm font-bold text-gray-900">{currentUser?.name || 'Agent'}</h3>
              <p className="text-xs text-gray-500">{currentUser?.email || ''}</p>
            </div>
          </div>
          <nav className="space-y-1">
             <Link to="/dashboard" className="flex items-center gap-3 px-4 py-3 text-gray-500 hover:text-gray-900 font-medium rounded-lg hover:bg-gray-50 transition">Dashboard</Link>
             <Link to="/my-properties" className="flex items-center gap-3 px-4 py-3 bg-blue-50 text-blue-600 font-medium rounded-lg">My Properties</Link>
             <Link to="/settings" className="flex items-center gap-3 px-4 py-3 text-gray-500 hover:text-gray-900 font-medium rounded-lg hover:bg-gray-50 transition">Settings</Link>
          </nav>
          <div className="mt-auto pt-8 absolute bottom-8 w-52">
             <Link to="/add-property" className="block w-full bg-slate-800 text-white font-bold py-3 px-4 rounded-lg mb-6 shadow-md text-center">Add New Property</Link>
             <div className="space-y-2 text-sm font-medium text-gray-500 pl-4">
               <p>Help</p>
               <p>Logout</p>
             </div>
          </div>
        </div>
      </aside>

      {}
      <main className="flex-1 p-8 md:p-12 overflow-y-auto bg-gray-50/50">
        <div className="mb-8">
           <h1 className="text-3xl font-extrabold text-gray-900">Edit Property</h1>
           <p className="text-gray-500 mt-1">Update the details for the property listing.</p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {}
          <div className="lg:col-span-2 bg-white p-8 rounded-xl border border-gray-200 shadow-sm h-fit">
            <h2 className="text-lg font-bold text-gray-900 mb-6 pb-2 border-b border-gray-100">Property Details</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className={labelClass}>Property Title</label>
                <input type="text" name="title" value={form.title} onChange={handleChange} className={inputClass} />
              </div>

              <div>
                <label className={labelClass}>Description</label>
                <textarea name="description" rows="5" value={form.description} onChange={handleChange} className={inputClass}></textarea>
              </div>

              {}
              <div className="mb-4">
                <label className={labelClass}>Listing Type</label>
                <div className="flex gap-4">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="listing_type"
                      value="sale"
                      checked={form.listing_type === "sale"}
                      onChange={handleChange}
                      className="w-4 h-4 text-blue-600 focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-gray-700 font-medium">For Sale</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="listing_type"
                      value="rent"
                      checked={form.listing_type === "rent"}
                      onChange={handleChange}
                      className="w-4 h-4 text-blue-600 focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-gray-700 font-medium">For Rent</span>
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div>
                    <label className={labelClass}>Price (IDR){form.listing_type === "rent" && " / Month"}</label>
                    <input type="number" name="price" value={form.price} onChange={handleChange} className={inputClass} required />
                 </div>
                 <div>
                    <label className={labelClass}>Property Type</label>
                    <div className="relative">
                       <select name="property_type" value={form.property_type} onChange={handleChange} className={`${inputClass} appearance-none`} required>
                         <option value="House">House</option>
                         <option value="Apartment">Apartment</option>
                         <option value="Villa">Villa</option>
                         <option value="Land">Land</option>
                       </select>
                       <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-500">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                       </div>
                    </div>
                 </div>
              </div>

              <div>
                <label className={labelClass}>Location</label>
                <input type="text" name="location" value={form.location} onChange={handleChange} className={inputClass} />
              </div>

              <div className="grid grid-cols-3 gap-6">
                <div>
                  <label className={labelClass}>Bedrooms</label>
                  <input type="number" name="bedrooms" value={form.bedrooms} onChange={handleChange} className={inputClass} required />
                </div>
                 <div>
                  <label className={labelClass}>Bathrooms</label>
                  <input type="number" name="bathrooms" value={form.bathrooms} onChange={handleChange} className={inputClass} required />
                </div>
                 <div>
                  <label className={labelClass}>Area (m²)</label>
                  <input type="number" name="area" value={form.area} onChange={handleChange} className={inputClass} required />
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                  {error}
                </div>
              )}
            </form>
          </div>

          {}
          <div className="space-y-6">
             {}
             <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Property Photos</h2>
                
                {}
                {imagePreviews.length > 0 && (
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    {imagePreviews.map((preview, index) => (
                      <div key={index} className="relative group">
                        <img 
                          src={preview} 
                          className="rounded-lg w-full h-32 object-cover" 
                          alt={`Property ${index + 1}`}
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(index)}
                          className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full hover:bg-red-600 transition opacity-0 group-hover:opacity-100"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                        <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                          {index + 1}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  id="edit-image-upload"
                  multiple
                />
                <label
                  htmlFor="edit-image-upload"
                  className="border-2 border-dashed border-gray-200 rounded-lg p-6 flex flex-col items-center justify-center text-center hover:bg-gray-50 cursor-pointer transition"
                >
                   <svg className="w-6 h-6 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
                   <p className="text-sm font-bold text-gray-700">Click to upload multiple images</p>
                   <p className="text-xs text-gray-400 mt-1">PNG, JPG, GIF - All sizes supported</p>
                </label>
             </div>

             {}
             <div className="flex gap-3">
               <button 
                 type="button"
                 onClick={handleSubmit} 
                 className="flex-1 bg-slate-800 text-white font-bold py-3 px-4 rounded-lg hover:bg-slate-900 transition"
               >
                 Update Property
               </button>
               <button 
                 type="button"
                 onClick={() => navigate('/my-properties')} 
                 className="flex-1 bg-white border border-gray-200 text-gray-700 font-bold py-3 px-4 rounded-lg hover:bg-gray-50 transition"
               >
                 Cancel
               </button>
             </div>
          </div>

        </div>
        )}
      </main>
    </div>
  );
}
