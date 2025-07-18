import React, { useState, useEffect } from 'react';
import { Search, Filter, Globe, Users, MapPin, DollarSign, Languages, Loader } from 'lucide-react';

interface Country {
  name: {
    common: string;
    official: string;
  };
  capital?: string[];
  population: number;
  region: string;
  subregion?: string;
  languages?: { [key: string]: string };
  currencies?: { [key: string]: { name: string; symbol: string } };
  flags: {
    png: string;
    svg: string;
  };
  cca3: string;
  area: number;
  timezones: string[];
  borders?: string[];
}

function App() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

  const regions = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

  useEffect(() => {
    fetchCountries();
  }, []);

  useEffect(() => {
    filterCountries();
  }, [countries, searchTerm, selectedRegion]);

  const fetchCountries = async () => {
    try {
      console.log('API ga so\'rov yuborilmoqda...');
      const response = await fetch('https://restcountries.com/v3.1/all');
      console.log('API javob holati:', response.status);
      const data = await response.json();
      console.log('API dan kelgan ma\'lumot:', data);
      console.log('Ma\'lumot turi:', typeof data);
      console.log('Array ekanmi:', Array.isArray(data));
      
      // Ma'lumot array ekanligini tekshirish
      if (Array.isArray(data)) {
        console.log('Mamlakatlar soni:', data.length);
        setCountries(data);
      } else {
        console.error('API dan kelgan ma\'lumot array emas:', data);
        setCountries([]);
      }
      setLoading(false);
    } catch (error) {
      console.error('Mamlakatlar ma\'lumotini olishda xatolik:', error);
      setCountries([]); // Xatolik bo'lganda bo'sh array o'rnatish
      setLoading(false);
    }
  };

  const filterCountries = () => {
    console.log('Filtrlash boshlandi. Countries soni:', countries.length);
    let filtered = countries;

    if (searchTerm) {
      filtered = filtered.filter(country =>
        country.name.common.toLowerCase().includes(searchTerm.toLowerCase()) ||
        country.name.official.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedRegion) {
      filtered = filtered.filter(country => country.region === selectedRegion);
    }

    console.log('Filtrlangan mamlakatlar soni:', filtered.length);
    setFilteredCountries(filtered);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('uz-UZ').format(num);
  };

  const getLanguages = (languages?: { [key: string]: string }) => {
    if (!languages) return 'Ma\'lumot yo\'q';
    return Object.values(languages).join(', ');
  };

  const getCurrencies = (currencies?: { [key: string]: { name: string; symbol: string } }) => {
    if (!currencies) return 'Ma\'lumot yo\'q';
    return Object.values(currencies).map(curr => `${curr.name} (${curr.symbol})`).join(', ');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-12 h-12 text-blue-500 animate-spin mx-auto mb-4" />
          <p className="text-white text-xl">Mamlakatlar ma'lumoti yuklanmoqda...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <Globe className="w-8 h-8 text-blue-500" />
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Country Explorer
              </h1>
            </div>
            <div className="text-sm text-gray-400">
              {filteredCountries.length} ta mamlakat topildi
            </div>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Mamlakat nomini qidiring..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="pl-10 pr-8 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white appearance-none cursor-pointer min-w-[200px]"
              >
                <option value="">Barcha mintaqalar</option>
                {regions.map(region => (
                  <option key={region} value={region}>{region}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </header>

      {/* Countries Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCountries.map((country) => (
            <div
              key={country.cca3}
              onClick={() => setSelectedCountry(country)}
              className="bg-gray-800 rounded-xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-2xl border border-gray-700 hover:border-blue-500"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={country.flags.png}
                  alt={`${country.name.common} bayrog'i`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>
              
              <div className="p-4">
                <h3 className="text-lg font-bold text-white mb-2 truncate">
                  {country.name.common}
                </h3>
                
                <div className="space-y-2 text-sm text-gray-300">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-blue-400" />
                    <span>Poytaxt: {country.capital?.[0] || 'Ma\'lumot yo\'q'}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-green-400" />
                    <span>Aholi: {formatNumber(country.population)}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Globe className="w-4 h-4 text-purple-400" />
                    <span>Mintaqa: {country.region}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredCountries.length === 0 && (
          <div className="text-center py-16">
            <Globe className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-400 mb-2">Hech qanday mamlakat topilmadi</h3>
            <p className="text-gray-500">Qidiruv so'zini o'zgartiring yoki filterni olib tashlang</p>
          </div>
        )}
      </main>

      {/* Country Detail Modal */}
      {selectedCountry && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              <img
                src={selectedCountry.flags.png}
                alt={`${selectedCountry.name.common} bayrog'i`}
                className="w-full h-64 object-cover rounded-t-2xl"
              />
              <button
                onClick={() => setSelectedCountry(null)}
                className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
              >
                ✕
              </button>
            </div>
            
            <div className="p-6">
              <h2 className="text-3xl font-bold text-white mb-2">
                {selectedCountry.name.common}
              </h2>
              <p className="text-gray-400 mb-6">
                Rasmiy nomi: {selectedCountry.name.official}
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-blue-400 mt-1" />
                    <div>
                      <p className="font-semibold text-white">Poytaxt</p>
                      <p className="text-gray-300">{selectedCountry.capital?.[0] || 'Ma\'lumot yo\'q'}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Users className="w-5 h-5 text-green-400 mt-1" />
                    <div>
                      <p className="font-semibold text-white">Aholi soni</p>
                      <p className="text-gray-300">{formatNumber(selectedCountry.population)}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Globe className="w-5 h-5 text-purple-400 mt-1" />
                    <div>
                      <p className="font-semibold text-white">Mintaqa</p>
                      <p className="text-gray-300">{selectedCountry.region}</p>
                      {selectedCountry.subregion && (
                        <p className="text-gray-400 text-sm">{selectedCountry.subregion}</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Languages className="w-5 h-5 text-yellow-400 mt-1" />
                    <div>
                      <p className="font-semibold text-white">Tillar</p>
                      <p className="text-gray-300">{getLanguages(selectedCountry.languages)}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <DollarSign className="w-5 h-5 text-green-400 mt-1" />
                    <div>
                      <p className="font-semibold text-white">Valyuta</p>
                      <p className="text-gray-300">{getCurrencies(selectedCountry.currencies)}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-red-400 mt-1" />
                    <div>
                      <p className="font-semibold text-white">Maydon</p>
                      <p className="text-gray-300">{formatNumber(selectedCountry.area)} km²</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-700">
                <p className="font-semibold text-white mb-2">Vaqt zonalari</p>
                <div className="flex flex-wrap gap-2">
                  {selectedCountry.timezones.map((timezone, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm"
                    >
                      {timezone}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;