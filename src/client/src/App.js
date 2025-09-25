import { BrowserRouter, Routes, Route, useLocation, Outlet  } from 'react-router-dom'
import UserHomePage from './Pages/UserHomePage'
import ProductPage from './Pages/ProductPage'
import AboutPage from './Pages/AboutPage'
import BagPage from './Pages/BagPage'
import AccountPage from './Pages/AccountPage';
import LoginPage from './Pages/LoginPage'
import UserNavbar from './components/UserNavbar'
// import { handlers } from "@/auth" // Referring to the auth.ts we just created
// export const { GET, POST } = handlers
 
//app layout fn that returns a componet holding the navbar 
function AppLayout() {
  const location = useLocation();
  const showNavbar = location.pathname !== '/login'; // Adjust '/login' if your login path is different

  return (
    <>
      {showNavbar && <UserNavbar />}
      <Outlet /> {/* Renders the matched child route component */}
    </>
  );
}

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<UserHomePage />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/bag" element={<BagPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/authorize" />
        </Route>
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;


