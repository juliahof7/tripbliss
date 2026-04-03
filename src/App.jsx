import { useState, useEffect } from 'react'
import splashBg from './assets/splash-bg.png'
import { Home, Map, PlusCircle, Search, User, ChevronLeft } from 'lucide-react'
import cardMyTrips from './assets/card-mytrips.png'
import cardCreate from './assets/card-create.png'
import cardBrowse from './assets/card-browse.png'
import logoHeader from './assets/logo-header.png'
import logoFloat from './assets/logo-float.png'
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState('splash')

  return (
    <div className="app">
      {currentPage === 'splash' && <SplashScreen onEnter={() => setCurrentPage('home')} />}
      {currentPage !== 'splash' && (
        <>
          <TopNav currentPage={currentPage} setCurrentPage={setCurrentPage} />
          <div className="page-content">
            {currentPage === 'home' && <HomePage setCurrentPage={setCurrentPage} />}
            {currentPage === 'trips' && <TripsPage />}
            {currentPage === 'create' && <CreatePage />}
            {currentPage === 'browse' && <BrowsePage />}
          </div>
          <div className="float-logo" onClick={() => setCurrentPage('home')}>
            <img src={logoFloat} alt="tb" className="float-logo-img" />
          </div>
          <BottomNav currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </>
      )}
    </div>
  )
}

function SplashScreen({ onEnter }) {
  useEffect(() => {
    const timer = setTimeout(onEnter, 3000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="splash" onClick={onEnter}>
      <img src={splashBg} alt="TripBliss" className="splash-bg" />
    </div>
  )
}

function TopNav({ currentPage, setCurrentPage }) {
  const titles = {
    home: 'Home',
    trips: 'My Trips',
    create: 'Create',
    browse: 'Browse',
  }

  return (
    <div className="top-nav">
      <button className="back-btn" onClick={() => setCurrentPage('home')}>
        <ChevronLeft size={22} color="#1a1a1a" />
      </button>
      <h2 className="page-title">{titles[currentPage]}</h2>
      <button className="profile-btn">
        <User size={22} color="#1a1a1a" />
      </button>
    </div>
  )
}

function BottomNav({ currentPage, setCurrentPage }) {
  const tabs = [
    { id: 'home', label: 'Home', icon: <Home size={22} /> },
    { id: 'trips', label: 'Trips', icon: <Map size={22} /> },
    { id: 'create', label: 'Create', icon: <PlusCircle size={22} /> },
    { id: 'browse', label: 'Browse', icon: <Search size={22} /> },
  ]

  return (
    <div className="bottom-nav">
      {tabs.map(tab => (
        <button
          key={tab.id}
          className={`nav-tab ${currentPage === tab.id ? 'active' : ''}`}
          onClick={() => setCurrentPage(tab.id)}
        >
          {currentPage === tab.id && <div className="active-bar" />}
          {tab.icon}
          <span>{tab.label}</span>
        </button>
      ))}
    </div>
  )
}

function HomePage({ setCurrentPage }) {
  return (
    <div className="page home-page">
      <div className="home-header">
        <img src={logoHeader} alt="TripBliss" className="header-logo" />
        <p className="welcome-text">Welcome, Julia</p>
      </div>

      <div className="home-grid">
        <div className="home-card-wrapper">
          <p className="card-label">My Trips</p>
          <div className="home-card" onClick={() => setCurrentPage('trips')}>
            <img src={cardMyTrips} alt="My Trips" className="home-card-img" />
          </div>
        </div>

        <div className="home-card-wrapper">
          <p className="card-label">Create New Trip</p>
          <div className="home-card" onClick={() => setCurrentPage('create')}>
            <img src={cardCreate} alt="Create" className="home-card-img" />
          </div>
        </div>

        <div className="home-card-wrapper center">
          <p className="card-label">Browse Templates</p>
          <div className="home-card" onClick={() => setCurrentPage('browse')}>
            <img src={cardBrowse} alt="Browse" className="home-card-img" />
          </div>
        </div>
      </div>
    </div>
  )
}

function TripsPage() {
  const trips = [
    { id: 1, title: "Bali, Indonesia", dates: "Mar 2025", img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400" },
    { id: 2, title: "Paris, France", dates: "Jun 2025", img: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400" },
    { id: 3, title: "Amalfi Coast, Italy", dates: "Aug 2025", img: "https://images.unsplash.com/photo-1612698093158-e07ac200d44e?w=400" },
    { id: 4, title: "Kyoto, Japan", dates: "Oct 2025", img: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400" },
    { id: 5, title: "Santorini, Greece", dates: "Dec 2025", img: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=400" },
    { id: 6, title: "New York, USA", dates: "Jan 2026", img: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400" },
  ]

  return (
    <div className="page">
      <h3 className="section-title">My Trips</h3>
      <div className="trip-grid">
        {trips.map(trip => (
          <div className="trip-card" key={trip.id}>
            <img src={trip.img} alt={trip.title} className="card-img" />
            <div className="card-info">
              <h4>{trip.title}</h4>
              <p>{trip.dates}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function CreatePage() {
  return (
    <div className="page">
      <h3 className="section-title">Create a Trip</h3>
      <p>Coming soon...</p>
    </div>
  )
}

function BrowsePage() {
  return (
    <div className="page">
      <h3 className="section-title">Browse</h3>
      <p>Coming soon...</p>
    </div>
  )
}

export default App