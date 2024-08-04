import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Header } from "./component/Header";
import Footer from "./component/Footer";
import QueryClientContextProvider from "./lib/QueryClientContextProvider";
import ThemeToogle from "./component/ThemeToggle";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// const inter = Inter({ subsets: ["latin"] });
const inter = Rubik({
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GovWatch",
  description: "GovWatch",
};

export default function RootLayout({
  children,
  headerVisible,
}: Readonly<{
  children: React.ReactNode;
  headerVisible: any;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class">
          <ThemeToogle />
          <QueryClientContextProvider>
            <Header />
            {children}
            <Footer />
            <ToastContainer />
          </QueryClientContextProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
