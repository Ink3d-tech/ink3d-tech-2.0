import ProtectedRoute from "@/shared/helpers/ProtectedRoute";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ProtectedRoute title="Debes ingresar o crear una cuenta para ver 'Mi cuenta'">
        <div className="bg-[#D9D9D9]">
            {children}
        </div>
    </ProtectedRoute>         
  );
}