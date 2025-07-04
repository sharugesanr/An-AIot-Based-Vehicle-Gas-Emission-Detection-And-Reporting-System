import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import FitnessCertificatePage from './pages/FitnessCertificatePage';
import MapLocationPage from './pages/MapLocationPage';
import FAQsPage from './pages/FAQsPage';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <Navbar />
      <main>
        <section id="home">
          <HomePage />
        </section>
        <section id="dashboard">
          <DashboardPage />
        </section>
        <section id="fitness-certificate">
          <FitnessCertificatePage />
        </section>
        <section id="map-location">
          <MapLocationPage />
        </section>
        <section id="faqs">
          <FAQsPage />
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default App;