import { useState } from "react";
import { useTheme } from "./context/themeContext";
import Header from "./components/Header"
import { Outlet } from "react-router";
import Footer from "./components/Footer"  

export default function Layout() {
  const { theme } = useTheme();
  let [searchText, setSearchText] = useState("");

  return (
    <div
      className={`min-h-screen flex flex-col ${
        theme === "dark"
          ? "bg-gray-900 text-white"
          : "bg-gray-50 text-gray-900"
      } transition-colors duration-100`}
    >
      <Header searchText={searchText} setSearchText={setSearchText} />

      {/* Main Content */}
      <main className="flex-grow">
        <Outlet context={searchText} />
      </main>

      <Footer />
    </div>
  );
}