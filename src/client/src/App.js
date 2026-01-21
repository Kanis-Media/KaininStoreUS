import { BrowserRouter, Routes, Route, useLocation, Outlet  } from 'react-router-dom'
import UserHomePage from './pages/UserHomePage'
import ProductPage from './pages/ProductPage'
import AboutPage from './pages/AboutPage'
import BagPage from './pages/BagPage'
import AccountPage from './pages/AccountPage';
import LoginPage from './pages/LoginPage'
import UserNavbar from './components/UserNavbar'
import ReleaseBanner from './components/ReleaseBanner'
 
//app layout fn that returns a componet holding the navbar 
function AppLayout() {
  const location = useLocation();
  const showNavbar = location.pathname !== '/login';
  const showReleaseBanner = location.pathname === '/' 

  return (
    <div className="full-screen-container px-0" style={{overflow: "hidden"}}>
      {showNavbar && <UserNavbar />} {/*Render navbar if is not login page */}
      {showReleaseBanner && <ReleaseBanner />}
      <Outlet /> {/* Renders the matched child route component */}
    </div>
  );
}

const App = () => {
  // const [fontsLoaded] = useFonts({
  //   Poppins_400Regular,
  //   Poppins_700Bold,
  // });
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


