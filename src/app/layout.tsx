import type { Metadata } from "next";
import "./globals.css";
import NavBar from "@/shared/components//navbar/NavBar.component";
import { AuthProvider } from "@/modules/auth/shared/context/Auth.context"
import ExcludedPaths from "../modules/auth/shared/helpers/ExcludedPath";
import { ProductsProvider } from "../modules/user/pages/manager/context/Products.context";
import Chatbot from "@/shared/components/Chatbot";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    
    <html lang="en">
      
      <body>

        <ProductsProvider>
          <AuthProvider>
              <main className="bg-[#D9D9D9]">
                <Chatbot />
                
                <ExcludedPaths >
                  <NavBar /> 
                </ExcludedPaths>
                {children}
              </main>
          </AuthProvider>
        </ProductsProvider>
      </body>
    </html>
  );
}