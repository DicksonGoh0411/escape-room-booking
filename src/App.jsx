import Login from "./pages/Login";
import Homepage from "./pages/Homepage";
import './App.css';
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "./components/AuthProvider";
import BookingList from "./pages/BookingList";
import AddBooking from "./pages/AddBooking";
import EditBooking from "./pages/EditBooking";
import ProfilePage from "./pages/ProfilePage";
import NavigationBar from "./components/NavigationBar";


function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </BrowserRouter>
  );
}

function AppContent() {
  const location = useLocation();

  // Conditionally render the NavigationBar for all routes except '/login'
  const showNavbar = location.pathname !== "/login";

  return (
    <>
      {showNavbar && <NavigationBar />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Homepage />} />
        <Route path="/bookings" element={<BookingList />} />
        <Route path="/create" element={<AddBooking />} />
        <Route path="/edit/:id" element={<EditBooking />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="*" element={<Homepage />} />
      </Routes>
    </>
  );
}

export default App;
