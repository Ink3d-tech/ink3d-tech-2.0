import { Edit2, User, Mail, Phone, MapPin, Building, Globe } from "lucide-react";


const SkeletonProfile = () => {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight">Mi perfil</h1>
        <p className="text-gray-600 mt-2">Gestionar su información personal</p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
        <div className="p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-8">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-gray-300 animate-pulse"></div>
              <div className="absolute bottom-0 right-0 bg-black text-white p-2 rounded-full shadow-lg animate-pulse">
                <Edit2 className="w-4 h-4" />
              </div>
            </div>
            <div className="space-y-4">
              <div className="w-32 h-6 bg-gray-300 animate-pulse"></div>
              <div className="w-24 h-4 bg-gray-300 animate-pulse"></div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                <User className="w-5 h-5 text-gray-600 animate-pulse" />
                <div>
                  <p className="text-sm text-gray-600 animate-pulse">Full Name</p>
                  <div className="w-32 h-4 bg-gray-300 animate-pulse"></div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                <Mail className="w-5 h-5 text-gray-600 animate-pulse" />
                <div>
                  <p className="text-sm text-gray-600 animate-pulse">Email</p>
                  <div className="w-32 h-4 bg-gray-300 animate-pulse"></div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                <Phone className="w-5 h-5 text-gray-600 animate-pulse" />
                <div>
                  <p className="text-sm text-gray-600 animate-pulse">Phone</p>
                  <div className="w-32 h-4 bg-gray-300 animate-pulse"></div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                <MapPin className="w-5 h-5 text-gray-600 animate-pulse" />
                <div>
                  <p className="text-sm text-gray-600 animate-pulse">Address</p>
                  <div className="w-32 h-4 bg-gray-300 animate-pulse"></div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                <Building className="w-5 h-5 text-gray-600 animate-pulse" />
                <div>
                  <p className="text-sm text-gray-600 animate-pulse">City</p>
                  <div className="w-32 h-4 bg-gray-300 animate-pulse"></div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                <Globe className="w-5 h-5 text-gray-600 animate-pulse" />
                <div>
                  <p className="text-sm text-gray-600 animate-pulse">Country</p>
                  <div className="w-32 h-4 bg-gray-300 animate-pulse"></div>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-6">
              <button className="flex items-center gap-2 px-6 py-2 rounded-xl bg-gray-300 text-gray-600 animate-pulse"></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonProfile;
