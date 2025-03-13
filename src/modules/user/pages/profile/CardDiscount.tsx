import { Percent, CheckCircle, XCircle, Clock } from "lucide-react"

interface DiscountProps {
    amount: string
    createdAt: string
    expiresAt: string
    id: string
    status: string
    isUsed: boolean
}

function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

export default function CardDiscount({discountData}: {discountData: DiscountProps}) {
    return (
        <div className="bg-transparent flex items-center justify-center py-4">
          <div className="w-full max-w-4xl bg-black rounded-xl overflow-hidden relative">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1547582304-f3dba6e40e47?q=80&w=1000')] bg-cover bg-center"></div>
            </div>
            
            {/* Content */}
            <div className="relative p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                  <span className="flex text-3xl font-bold gap-1 text-purple-500">{discountData.amount}<Percent className="mt-1 w-8 h-8 text-purple-500" /> OFF</span>
                  
                </div>
                <div className="flex items-center">
                  {discountData.status === "active" && !discountData.isUsed ? (
                    <div className="flex items-center text-green-500">
                      <CheckCircle className="w-5 h-5 mr-1" />
                      <span className="text-sm font-medium">Activo</span>
                    </div>
                  ) : (
                    <div className="flex items-center text-red-500">
                      <XCircle className="w-5 h-5 mr-1" />
                      <span className="text-sm font-medium">Usado</span>
                    </div>
                  )}
                </div>
              </div>
    
              {/* Dates */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center text-gray-400">
                  <Clock className="w-4 h-4 mr-2" />
                  <div>
                    <p className="text-sm">Creado: <span className="text-white">{formatDate(discountData.createdAt)}</span></p>
                    <p className="text-sm">Expira: <span className="text-white">{formatDate(discountData.expiresAt)}</span></p>
                  </div>
                </div>
              </div>
    
              {/* Code */}
              <div className="bg-gray-800 rounded-lg p-4 mb-4">
                <p className="text-xs text-gray-400 mb-1">¡Codigo de descuento!</p>
                <p className="text-sm font-mono text-gray-300 break-all">{discountData.id}</p>
              </div>
    
              {/* Status Bar */}
              <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                  style={{
                    width: `${discountData.isUsed ? '100%' : '50%'}`
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      );
}
