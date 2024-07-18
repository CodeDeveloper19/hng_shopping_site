import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { CartContextProvider } from "@/components/cart_context";
import { FavoriteContextProvider } from "@/components/favorite_context.";

export const metadata = {
  title: "Home Affairs",
  description: "A HNG Task completed by Okoli Akachukwu",
};

export default function RootLayout({ children }) {
  return (
    <>
    <html lang="en">
    <body suppressHydrationWarning={true}>
      <FavoriteContextProvider>
      <CartContextProvider>
        <Header/>
        {children}
        <Footer/>
      </CartContextProvider>
      </FavoriteContextProvider>
    </body>
    </html>
    </>
  );
}
