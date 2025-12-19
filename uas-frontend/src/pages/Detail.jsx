import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { 
  MapPin, Heart, BedDouble, Bath, Square, Scaling, 
  Phone, MessageCircle, Image as ImageIcon, ChevronLeft, ChevronRight 
} from "lucide-react";
import { getPropertyById, addToFavorites as addToFavoritesAPI, getFavorites as getFavoritesAPI, removeFavorite as removeFavoriteAPI, getAllProperties } from "../services/api";
import { getCurrentUser } from "../services/authService";

export default function Detail() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [favoriteList, setFavoriteList] = useState([]);
  const [isFavoritedLocal, setIsFavoritedLocal] = useState(false); // ✅ state lokal untuk favorit
  const [favLoading, setFavLoading] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      fetchServerFavorites();
    } else {
      setFavoriteList([]);
    }
    const onUserChanged = () => {
      const u = getCurrentUser();
      if (u) fetchServerFavorites();
      else setFavoriteList([]);
    };
    window.addEventListener('userChanged', onUserChanged);
    return () => window.removeEventListener('userChanged', onUserChanged);
  }, []);

  useEffect(() => {
    if (property && favoriteList.length > 0) {
      const favorited = favoriteList.some(p => p.id === parseInt(property.id));
      setIsFavoritedLocal(favorited);
    } else {
      setIsFavoritedLocal(false);
    }
  }, [property, favoriteList]); 

  const fetchServerFavorites = async () => {
    try {
      const resp = await getFavoritesAPI();
      if (resp.data && resp.data.success) {
        const mapped = resp.data.favorites.map((f) => {
          const p = f.property || {};
          return {
            id: p.id,
            title: p.title,
            location: p.location,
            price: p.price,
            bedrooms: p.bedrooms,
            bathrooms: p.bathrooms,
            area: p.area,
            property_type: p.property_type,
            img: p.thumbnail || (p.images && p.images[0]) || null,
            favorite_id: f.id
          };
        });
        setFavoriteList(mapped);
        window.dispatchEvent(new Event('favoritesChanged'));
      }
    } catch (err) {
      console.error('Failed to load server favorites', err);
    }
  };

  useEffect(() => {
    fetchPropertyDetail();
  }, [id]);

  useEffect(() => {
    if (property) {
      fetchSimilar(property.property_type, property.id);
    }
  }, [property]);

  const fetchPropertyDetail = async () => {
    try {
      setLoading(true);
      const response = await getPropertyById(id);
      if (response.data.status === "success") {
        setProperty(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching property:", error);
    } finally {
      setLoading(false);
    }
  };

  const defaultImages = [
    "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  ];

  const [similarProps, setSimilarProps] = useState([]);

  const fetchSimilar = async (ptype, excludeId) => {
    try {
      if (!ptype) return;
      const resp = await getAllProperties({ property_type: ptype });
      const items = resp.data?.data || [];
      const filtered = items.filter((p) => p.id !== parseInt(excludeId)).slice(0, 4);
      setSimilarProps(filtered);
    } catch (err) {
      console.error('Failed to fetch similar properties', err);
    }
  };

  const toggleFavorite = async () => {
    if (!property) return;

    const user = getCurrentUser();
    const exists = isFavoritedLocal;

    if (!user) {
      alert('Please login to manage favorites');
      navigate('/login');
      return;
    }

    setFavLoading(true);
    setIsFavoritedLocal(!exists);

    try {
      if (exists) {
        const resp = await getFavoritesAPI();
        if (resp.data && resp.data.success) {
          const serverFav = resp.data.favorites.find(f => f.property && f.property.id === parseInt(property.id));
          if (serverFav) {
            await removeFavoriteAPI(serverFav.id);
            window.dispatchEvent(new Event('favoritesChanged'));
          }
        }
      } else {
        await addToFavoritesAPI(parseInt(property.id));
        window.dispatchEvent(new Event('favoritesChanged'));
      }
      await fetchServerFavorites();
    } catch (err) {
      console.error('Favorite toggle error', err);
      setIsFavoritedLocal(exists);
      if (err.response && err.response.status === 401) {
        alert('Session expired. Please login again.');
        navigate('/login');
      } else {
        alert('Failed to update favorite');
      }
    } finally {
      setFavLoading(false);
    }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(value);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-800 mx-auto mb-4"></div>
          <p className="text-gray-500">Loading property details...</p>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Property not found</h2>
          <p className="text-gray-500 mb-4">The property you're looking for doesn't exist.</p>
          <Link to="/listing" className="text-blue-600 hover:underline">
            Browse all properties →
          </Link>
        </div>
      </div>
    );
  }

  const propertyImages = property.images && property.images.length > 0 
    ? property.images 
    : property.img 
    ? [property.img] 
    : defaultImages;

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % propertyImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + propertyImages.length) % propertyImages.length);
  };

  return (
    <div className="bg-white min-h-screen pb-0 font-sans text-slate-800">
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="text-sm text-gray-500 mb-6 flex items-center gap-2">
          <Link to="/" className="hover:text-slate-900 transition">Home</Link> <span className="text-gray-300">/</span>
          <Link to="/listing" className="hover:text-slate-900 transition">Search Results</Link> <span className="text-gray-300">/</span>
          <span className="font-medium text-slate-900 truncate">{property.title}</span>
        </div>

        <div className="relative rounded-2xl overflow-hidden bg-gray-100 mb-6">
          <div className="relative h-[400px] md:h-[500px]">
            <img 
              src={propertyImages[currentImageIndex]} 
              className="w-full h-full object-cover" 
              alt={`Property ${currentImageIndex + 1}`} 
              onError={(e) => {
                console.error('Image failed to load:', propertyImages[currentImageIndex]);
                e.target.src = defaultImages[0];
              }}
            />
            
            {propertyImages.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-3 rounded-full transition"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-3 rounded-full transition"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}

            <div className="absolute bottom-4 right-4 bg-black bg-opacity-60 text-white px-3 py-1.5 rounded-lg text-sm">
              {currentImageIndex + 1} / {propertyImages.length}
            </div>
          </div>

          {propertyImages.length > 1 && (
            <div className="bg-white p-4">
              <div className="flex gap-3 overflow-x-auto">
                {propertyImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-24 h-20 rounded-lg overflow-hidden border-2 transition ${
                      index === currentImageIndex 
                        ? 'border-blue-600 ring-2 ring-blue-200' 
                        : 'border-gray-200 hover:border-gray-400'
                    }`}
                  >
                    <img 
                      src={img} 
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = defaultImages[0];
                      }}
                    />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-10">
          <div className="lg:col-span-2">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold text-slate-900">{property.title}</h1>
                <div className="flex items-center gap-2 text-gray-500 mt-2"><MapPin size={18} /><span>{property.location}</span></div>
              </div>
              {}
              <button 
                onClick={toggleFavorite}
                disabled={favLoading}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition ${
                  isFavoritedLocal
                    ? 'bg-red-500 text-white hover:bg-red-600 border-red-500'
                    : 'border border-gray-300 hover:bg-gray-50'
                }`}
              >
                <Heart size={18} fill={isFavoritedLocal ? 'currentColor' : 'none'} /> 
                {favLoading ? 'Processing...' : (isFavoritedLocal ? 'Remove from Favorites' : 'Add to Favorites')}
              </button>
            </div>

            <div className="mt-8 border border-gray-200 rounded-2xl p-8 shadow-sm">
              <p className="text-sm text-gray-500 mb-1">Price</p>
              <h2 className="text-3xl font-bold text-slate-900">{formatCurrency(property.price)}</h2>
              <hr className="my-6 border-gray-100" />
              <div className="grid grid-cols-4 gap-4 text-center">
                <div><div className="flex justify-center mb-2 text-slate-700"><BedDouble size={24} /></div><p className="font-bold text-lg">{property.bedrooms || 0}</p><p className="text-xs text-gray-500 uppercase">Bedrooms</p></div>
                <div><div className="flex justify-center mb-2 text-slate-700"><Bath size={24} /></div><p className="font-bold text-lg">{property.bathrooms || 0}</p><p className="text-xs text-gray-500 uppercase">Bathrooms</p></div>
                <div><div className="flex justify-center mb-2 text-slate-700"><Square size={24} /></div><p className="font-bold text-lg">{property.area || 0} m²</p><p className="text-xs text-gray-500 uppercase">Building</p></div>
                <div><div className="flex justify-center mb-2 text-slate-700"><Scaling size={24} /></div><p className="font-bold text-lg">{property.area || 0} m²</p><p className="text-xs text-gray-500 uppercase">Land</p></div>
              </div>
            </div>

            <div className="mt-10">
              <h3 className="text-xl font-bold text-slate-900 mb-4">About this property</h3>
              <p className="text-gray-600 leading-relaxed whitespace-pre-line">{property.description}</p>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="border border-gray-200 rounded-2xl p-6 shadow-sm sticky top-24 bg-white">
              <span className="bg-gray-100 text-slate-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">For Sale</span>
                <div className="flex items-center gap-4 mt-6">
                  <img src={property.agent?.avatar || defaultImages[0]} className="w-14 h-14 rounded-full object-cover" alt="Agent" />
                  <div>
                    <h4 className="font-bold text-lg text-slate-900">{property.agent?.name || 'Agent'}</h4>
                    <p className="text-sm text-gray-500">{property.agent?.company || property.agent?.email || ''}</p>
                  </div>
                </div>
              <div className="mt-8 space-y-3">
                <button
                  onClick={async () => {
                    try {
                      const res = await fetch('http://localhost:6543/api/inquiries', {
                        method: 'POST',
                        credentials: 'include',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                          property_id: property.id,
                          message: 'Saya tertarik dengan properti ini'
                        })
                      });
                      const data = await res.json();
                      if (data.success && data.inquiry) {
                        navigate(`/chat/${data.inquiry.id}`);
                      } else {
                        alert('Gagal membuat inquiry!');
                      }
                    } catch (err) {
                      alert('Terjadi error saat membuat inquiry!');
                    }
                  }}
                  className="w-full bg-slate-800 hover:bg-slate-900 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition"
                >
                  <MessageCircle size={18} /> Chat With Agent
                </button>
                <button className="w-full border border-gray-300 text-slate-800 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-gray-50 transition"><Phone size={18} /> {property.agent?.phone || ''}</button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Similar Properties</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {similarProps.map((p) => (
              <Link
                key={p.id}
                to={`/property/${p.id}`}
                className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition group"
              >
                <div className="h-44 overflow-hidden bg-gray-200">
                   <img src={(p.images && p.images[0]) || defaultImages[0]} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" alt={p.title} />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-slate-900 truncate">{p.title}</h3>
                  <p className="text-sm text-gray-500 mb-2 truncate">{p.location}</p>
                  <p className="font-bold text-slate-900 mb-4">{new Intl.NumberFormat('id-ID').format(p.price)}</p>
                  <div className="w-full py-2 bg-gray-100 text-slate-900 rounded-lg text-sm font-semibold text-center hover:bg-gray-200 transition">View Details</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <footer className="bg-[#1E293B] text-gray-300 mt-20 py-14">
        <div className="max-w-7xl mx-auto px-6 text-center text-sm">© 2025 PropertiKu. All rights reserved.</div>
      </footer>
    </div>
  );
}