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
  const [selectedTrip, setSelectedTrip] = useState(null)
  const [selectedCard, setSelectedCard] = useState(null)
  const [cardSource, setCardSource] = useState(null)

  const navigateToCard = (card, source) => {
    setSelectedCard(card)
    setCardSource(source)
    setCurrentPage('cardDetail')
  }

  const navigateToTrip = (trip) => {
    setSelectedTrip(trip)
    setCurrentPage('tripDetail')
  }

  return (
    <div className="app">
      {currentPage === 'splash' && <SplashScreen onEnter={() => setCurrentPage('home')} />}
      {currentPage !== 'splash' && (
        <>
          <TopNav currentPage={currentPage} setCurrentPage={setCurrentPage} selectedTrip={selectedTrip} />
          <div className="page-content">
            {currentPage === 'home' && <HomePage setCurrentPage={setCurrentPage} />}
            {currentPage === 'profile' && <ProfilePage setCurrentPage={setCurrentPage} />}
            {currentPage === 'trips' && <TripsPage setCurrentPage={setCurrentPage} navigateToTrip={navigateToTrip} />}
            {currentPage === 'tripDetail' && <TripDetailPage trip={selectedTrip} setCurrentPage={setCurrentPage} navigateToCard={navigateToCard} />}
            {currentPage === 'cardDetail' && <CardDetailPage card={selectedCard} source={cardSource} setCurrentPage={setCurrentPage} />}
            {currentPage === 'create' && <CreatePage setCurrentPage={setCurrentPage} />}
            {currentPage === 'browse' && <BrowsePage navigateToCard={navigateToCard} />}
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

function TopNav({ currentPage, setCurrentPage, selectedTrip }) {
  const titles = {
    home: 'Home',
    trips: 'My Trip Boards',
    tripDetail: selectedTrip ? selectedTrip.title : 'Trip Detail',
    cardDetail: 'Card Detail',
    create: 'Create a New Board',
    browse: 'Browse',
    profile: 'Profile / Settings',
  }

  return (
    <div className="top-nav">
      <button className="back-btn" onClick={() => setCurrentPage('home')}>
        <ChevronLeft size={22} color="#1a1a1a" />
      </button>
      <h2 className="page-title">{titles[currentPage]}</h2>
      <button className="profile-btn" onClick={() => setCurrentPage('profile')}>
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

function ProfilePage({ setCurrentPage }) {
  const [notifications, setNotifications] = useState(true)
  const [darkMode, setDarkMode] = useState(false)

  return (
    <div className="page profile-page">
      <div className="profile-header-card">
        <div className="profile-avatar">J</div>
        <div className="profile-info">
          <h3 className="profile-name">Julia Hof</h3>
          <p className="profile-email">jhof1@live.maryville.edu</p>
        </div>
      </div>

      <div className="settings-section">
        <div className="settings-row">
          <p className="settings-label">Notifications</p>
          <div className="toggle-wrapper">
            <div
              className={`toggle ${notifications ? 'toggle-on' : ''}`}
              onClick={() => setNotifications(!notifications)}
            >
              <div className="toggle-knob" />
            </div>
            <p className="toggle-label">{notifications ? 'On' : 'Off'}</p>
          </div>
        </div>

        <div className="settings-group">
          <p className="settings-label">Privacy & Data</p>
          <p className="settings-link">FAQ</p>
          <p className="settings-link">Contact Form</p>
        </div>

        <div className="settings-group">
          <p className="settings-label">About TripBliss</p>
          <p className="settings-subtext">Version 1.0.0 — Built with ❤️ by Julia Hof</p>
        </div>

        <div className="settings-row">
          <p className="settings-label">App Theme</p>
          <div className="toggle-wrapper">
            <div
              className={`toggle ${darkMode ? 'toggle-on' : ''}`}
              onClick={() => setDarkMode(!darkMode)}
            >
              <div className="toggle-knob" />
            </div>
            <p className="toggle-label">{darkMode ? 'Dark Mode' : 'Light Mode'}</p>
          </div>
        </div>
      </div>

      <button className="btn-create-trip" onClick={() => setCurrentPage('home')}>
        Log Out
      </button>
    </div>
  )
}

function TripsPage({ setCurrentPage }) {
const trips = [
    {
      id: 1,
      title: "Bali, Indonesia",
      photos: [
        "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400",
        "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=400",
        "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=400",
        "https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=400",
        "https://images.unsplash.com/photo-1573790387438-4da905039392?w=400",
        "https://images.unsplash.com/photo-1554931670-4ebfabf6e7a9?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?w=400",
        "https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?w=400",
        "https://images.unsplash.com/photo-1546484475-7f7bd55792da?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?w=400",
        "https://images.unsplash.com/photo-1667992403195-d2241a40ca2d?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?w=400",
        "https://images.unsplash.com/photo-1616484173745-07f25fd0547f?q=80&w=627&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?w=400",
        "https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?w=400",
        "https://images.unsplash.com/photo-1541681474356-5c6ad40c7990?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?w=400",
      ]
    },
    {
      id: 2,
      title: "Kauai, Hawaii",
      photos: [
        "https://images.unsplash.com/photo-1542259009477-d625272157b7?w=400",
        "https://images.unsplash.com/photo-1505852679233-d9fd70aff56d?w=400",
        "https://images.unsplash.com/photo-1506953823976-52e1fdc0149a?w=400",
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400",
        "https://images.unsplash.com/photo-1505852817199-55498f0255f7?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?w=800",
        "https://images.unsplash.com/photo-1598135753163-6167c1a1ad65?w=400",
        "https://images.unsplash.com/photo-1717355126082-7ea629bda963?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?w=800",
        "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=400",
        "https://images.unsplash.com/photo-1471922694854-ff1b63b20054?w=400",
        "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?w=400",
        "https://images.unsplash.com/photo-1687548710957-216cb1f2823f?q=80&w=1329&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?w=400",
        "https://images.unsplash.com/photo-1691252719867-59b4808bb11b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?w=400",
      ]
    },
    {
      id: 3,
      title: "Tahiti, French Polynesia",
      photos: [
        "https://images.unsplash.com/photo-1589197331516-4d84b72ebde3?w=400",
        "https://images.unsplash.com/photo-1559494007-9f5847c49d94?w=400",
        "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400",
        "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=400",
        "https://images.unsplash.com/photo-1513415563383-4e580ed27a46?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?w=400",
        "https://images.unsplash.com/photo-1703549008444-a60559aa2c07?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?w=400",
        "https://images.unsplash.com/photo-1703549068359-49d854524ddd?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?w=400",
        "https://images.unsplash.com/photo-1730286855206-3ff94c2fd211?q=80&w=1122&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?w=400",
        "https://images.unsplash.com/photo-1468413253725-0d5181091126?w=400",
        "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=400",
        "https://images.unsplash.com/photo-1662732766358-baeccaf64fee?q=80&w=627&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?w=400",
        "https://images.unsplash.com/photo-1698551007683-7226dc6f4e85?q=80&w=1032&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?w=400",
      ]
    },
  ]

  return (
    <div className="page trips-page">
      {trips.map(trip => (
        <TripBoard key={trip.id} trip={trip} />
      ))}
      <button className="btn-create-trip" onClick={() => setCurrentPage('create')}>
        Create A New Trip
      </button>
    </div>
  )
}

function TripBoard({ trip }) {
  const [page, setPage] = useState(0)
  const photosPerPage = 6

  const totalPages = Math.ceil(trip.photos.length / photosPerPage)
  const visiblePhotos = trip.photos.slice(page * photosPerPage, (page + 1) * photosPerPage)

  const prev = () => setPage(p => (p === 0 ? totalPages - 1 : p - 1))
  const next = () => setPage(p => (p === totalPages - 1 ? 0 : p + 1))

  return (
    <div className="trip-board">
      <p className="trip-board-title">{trip.title}</p>
      <div className="trip-board-nav">
        <button className="arrow-btn" onClick={prev}>‹</button>
        <div className="photo-grid">
          {visiblePhotos.map((photo, index) => (
            <img key={index} src={photo} alt={`${trip.title} ${index + 1}`} className="photo-tile" />
          ))}
        </div>
        <button className="arrow-btn" onClick={next}>›</button>
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