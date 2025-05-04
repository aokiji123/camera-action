import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { SignUp } from "./pages/SignUp";
import { NotFound } from "./pages/NotFound";
import { Footer } from "./shared/components/Footer";
import { Films } from "./pages/Films";
import { Series } from "./pages/Series";
import { MyList } from "./pages/MyList";
import { Payment } from "./pages/Payment";
import { History } from "./pages/History";
import { ProtectedRoute, GuestRoute } from "./shared/components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={
            <GuestRoute>
              <Login />
            </GuestRoute>
          }
        />
        <Route
          path="/sign-up"
          element={
            <GuestRoute>
              <SignUp />
            </GuestRoute>
          }
        />
        <Route
          path="/films"
          element={
            <ProtectedRoute>
              <Films />
            </ProtectedRoute>
          }
        />
        <Route
          path="/series"
          element={
            <ProtectedRoute>
              <Series />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-list"
          element={
            <ProtectedRoute>
              <MyList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/payment"
          element={
            <ProtectedRoute>
              <Payment />
            </ProtectedRoute>
          }
        />
        <Route
          path="/history"
          element={
            <ProtectedRoute>
              <History />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
