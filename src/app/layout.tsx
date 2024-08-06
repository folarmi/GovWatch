"use client";

import { Rubik } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { usePathname } from "next/navigation";
import { Header } from "./component/Header";
import Footer from "./component/Footer";
import QueryClientContextProvider from "./lib/QueryClientContextProvider";
import ThemeToogle from "./component/ThemeToggle";
import ProfileHeader from "./component/ProfileHeader";
<<<<<<< HEAD
=======
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
>>>>>>> b4eda4abc03267b9bda3abf23da7f8363440a915

// const inter = Inter({ subsets: ["latin"] });
const inter = Rubik({
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export default function RootLayout({
  children,
  headerVisible,
}: Readonly<{
  children: React.ReactNode;
  headerVisible: any;
}>) {
  const pathname = usePathname();

  const isUserProfilePage = (pathname: string) => {
    const profilePaths = [
      "/userProfileAbout",
      "/userProfileEdit",
      "/userProfilePassword",
    ];
    return profilePaths.includes(pathname);
  };

  //const renderHeader = isUserProfilePage(pathname) ? <ProfileHeader /> : <Header />;

  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class">
          <ThemeToogle />
          <QueryClientContextProvider>
            {/* {renderHeader} */}
            <Header />
            {children}
            <Footer />
          </QueryClientContextProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
