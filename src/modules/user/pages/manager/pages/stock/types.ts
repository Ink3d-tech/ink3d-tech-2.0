export interface StockMovement {
    id: string;
    product: {
      id: string;
      name: string;
      image: string[];
      description: string;
      price: string;
    };
    size: string;
    stockInicial: number;
    vendidos: number;
    stockActual: number;
    createdAt: string;
    quantity: number;
    type: string;
    reason: string;
    previousStock: number,
    newStock: number,
  }
  