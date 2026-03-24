import  {Suspense, lazy, useState } from "react";
import { useTheme } from "./context/themeContext";

import { Outlet } from "react-router";
const Footer= lazy(()=>import("./components/Footer"))
const Header = lazy(()=> import("./components/Header"))
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
     
<Suspense fallback={<div>Loading...</div>}>
   <Header searchText={searchText} setSearchText={setSearchText} />
</Suspense>
      {/* Main Content */}
      <main className="flex-grow">
        <Outlet context={searchText} />
      </main>
<Suspense fallback={<div>Loading...</div>}>
      <Footer />
      </Suspense>
    </div>
  );
}