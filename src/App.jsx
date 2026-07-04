import { Routes, Route } from "react-router-dom";
import MainLayout from "./components/shared/MainLayout";
import DashboardLayout from "./components/shared/DashboardLayout";
import PrivateRoute from "./routes/PrivateRoute";

// Main pages
import Home from "./pages/main/Home";
import AllPets from "./pages/main/AllPets";
import PetDetails from "./pages/main/PetDetails";
import Login from "./pages/main/Login";
import Register from "./pages/main/Register";
import NotFound from "./pages/main/NotFound";
import MyRequests from "./pages/main/MyRequests";
import Profile from "./pages/main/Profile";

// Dashboard pages
import AddPet from "./pages/dashboard/AddPet";
import MyListings from "./pages/dashboard/MyListings";
import UpdatePet from "./pages/dashboard/UpdatePet";

function App() {
  return (
    <Routes>
      {/* Main Layout */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/all-pets" element={<AllPets />} />
        <Route
          path="/pets/:id"
          element={
            <PrivateRoute>
              <PetDetails />
            </PrivateRoute>
          }
        />
        <Route
          path="/my-requests"
          element={
            <PrivateRoute>
              <MyRequests />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* Dashboard Layout */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <DashboardLayout />
          </PrivateRoute>
        }
      >
        <Route path="add-pet" element={<AddPet />} />
        <Route path="my-listings" element={<MyListings />} />
        <Route path="update-pet/:id" element={<UpdatePet />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
