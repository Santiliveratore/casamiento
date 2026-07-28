import React, { useState, useEffect, useRef } from 'react'
import RSVPForm from './RSVPForm'

// Mapeo de apartados con sus imágenes
const APARTADOS = [
  { id: 1, title: 'Apartado 1', image: '/Diseno/Apartados/ALOJAMIENTO.webp' },
  { id: 2, title: 'Apartado 2', image: '/Diseno/Apartados/COMIDA.webp' },
  { id: 3, title: 'Apartado 3', image: '/Diseno/Apartados/HELADERIAS.webp' },
  { id: 4, title: 'Apartado 4', image: '/Diseno/Apartados/LOGISTICA.webp' },
  { id: 5, title: 'Apartado 5', image: '/Diseno/Apartados/PELUQUERIA.webp' },
  { id: 6, title: 'Apartado 6', image: '/Diseno/Apartados/TURISMO.webp' },
]

export default function App() {
  const headerRef = useRef(null)
  const assetBase = import.meta.env.BASE_URL
  const [headerHeight, setHeaderHeight] = useState(0)
  const [currentPage, setCurrentPage] = useState('home') // 'home' o id del apartado
  const [showSplash, setShowSplash] = useState(true)
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  const assetPath = (path) => `${assetBase}${path.replace(/^\/+/, '')}`

  const openApartado = (id) => {
    const url = new URL(window.location.href)
    url.searchParams.set('apartado', String(id))
    window.open(url.toString(), '_blank', 'noopener,noreferrer')
  }

  const navLinks = [
    { key: 'inicio', label: 'Inicio', pct: 0 },
    { key: 'horario', label: 'Horario', pct: 0.22 },
    { key: 'invitacion', label: 'Invitacion', pct: 0.443 },
    { key: 'regalos', label: 'Regalos', pct: 0.653 },
    { key: 'info', label: 'Info', pct: 0.832 },
    { key: 'turista', label: 'Modo Turista', pct: 1.3 },
  ]

  const getApartadoImage = (image) => {
    if (!isMobile) {
      return image
    }

    return image.replace(/\.webp$/i, '2.webp')
  }

  const scrollToPercent = (pct) => {
  if (currentPage !== 'home') {
    const url = new URL(window.location.origin + window.location.pathname)
    url.searchParams.set('scroll', pct)
    window.location.href = url.toString()
    return
  }

  const maxScroll = document.documentElement.scrollHeight - window.innerHeight
  let target = Math.round(maxScroll * pct)
  target = Math.max(0, target - headerHeight)
  window.scrollTo({ top: target, behavior: 'smooth' })
}

  const openDrawer = () => setDrawerOpen(true)
  const closeDrawer = () => setDrawerOpen(false)
  const handleDrawerNav = (pct) => {
    scrollToPercent(pct)
    closeDrawer()
  }

  const updateCountdown = () => {
    // 22/11/2026 15:45 en Argentina = 18:45 UTC
    const weddingDateUtc = new Date(Date.UTC(2026, 10, 22, 18, 45, 0))
    const now = new Date()
    const diffMs = weddingDateUtc.getTime() - now.getTime()

    if (diffMs <= 0) {
      setCountdown({ days: 0, hours: 0, minutes: 0 , seconds: 0 })
      return
    }

    const totalMinutes = Math.floor(diffMs / 60000)
    const days = Math.floor(totalMinutes / (60 * 24))
    const hours = Math.floor((totalMinutes % (60 * 24)) / 60)
    const minutes = totalMinutes % 60
    const seconds = Math.floor((diffMs % 60000) / 1000)

    setCountdown({ days, hours, minutes, seconds })
  }

  // Medimos la altura real del header al cargar y cuando cambia el tamaño de la pantalla
  useEffect(() => {
    const handleResize = () => {
      if (headerRef.current) {
        setHeaderHeight(headerRef.current.offsetHeight)
      }

      setIsMobile(window.innerWidth <= 599)
    }

    const handleInitialRoute = () => {
      const params = new URLSearchParams(window.location.search)
      if (params.has("scroll")) {
  setShowSplash(false);
} else {
  const splashTimer = setTimeout(() => {
    setShowSplash(false);
  }, 2200);

  // Guardá el timer para limpiarlo luego
}
      const apartado = params.get('apartado')

      if (apartado && APARTADOS.some((item) => String(item.id) === apartado)) {
        setCurrentPage(Number(apartado))
      }
    }

    const scroll = Number(new URLSearchParams(window.location.search).get('scroll'))

if (!isNaN(scroll)) {
  setTimeout(() => {
    scrollToPercent(scroll)

    // Limpia la URL
    const url = new URL(window.location.href)
    url.searchParams.delete('scroll')
    window.history.replaceState({}, '', url)
  }, 300)
}

    // Un pequeño delay para asegurar que la imagen del header ya cargó y tiene dimensiones
    const timer = setTimeout(handleResize, 100)
    handleInitialRoute()

    const splashTimer = setTimeout(() => {
      setShowSplash(false)
    }, 2200)

    updateCountdown()
    const countdownTimer = setInterval(updateCountdown, 1000)

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
      clearTimeout(timer)
      clearTimeout(splashTimer)
      clearInterval(countdownTimer)
    }
  }, [])
  const copiarAlias = async () => {
  try {
    await navigator.clipboard.writeText("carliyfacu");
    alert("¡Alias copiado!");
  } catch (err) {
    alert("No se pudo copiar el alias.");
  }
};

  return (
    <>
      {showSplash && currentPage === 'home' && (
        <div className="splash-screen" aria-hidden="true">
          <picture className="splash-picture">
            <source media="(max-width: 599px)" srcSet={assetPath('/Diseno/portadacelu.webp')} />
            <img
              src={assetPath('/Diseno/portadapc.webp')}
              alt="Portada inicial"
              className="splash-image"
            />
          </picture>
        </div>
      )}

      {/* Header - siempre visible */}
      <header className="header-stage" id="header-root" ref={headerRef}>
        {/* Zona táctil izquierda para abrir drawer (visible en móvil) */}
        <button
          className="header-handle"
          aria-label="Abrir menú"
          onClick={openDrawer}
        />
        <picture>
          <source media="(max-width: 599px)" srcSet={assetPath('/Diseno/headercelu.webp')} />
          <img
            src={assetPath('/Diseno/headerpc.webp')}
            alt="Header del sitio"
            className="header-image"
            onLoad={() => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.offsetHeight)
    }
  }}
          />
        </picture>
        {/* Navegación del header (alineada izquierda->derecha) */}
        <nav className="header-nav" aria-label="Navegación principal">
          {navLinks.map((link) => (
            <button
              key={link.key}
              className="header-nav-link"
              onClick={() => scrollToPercent(link.pct)}
            >
              {link.label}
            </button>
          ))}
        </nav>
        <div className="header-countdown" aria-label="Cuenta regresiva para el casamiento">
          
          <span className="header-countdown-value">
            {countdown.days} : {countdown.hours} : {countdown.minutes} : {countdown.seconds}
          </span>
        </div>
        
      </header>

      {/* Drawer móvil */}
      <div className={`drawer ${drawerOpen ? 'open' : ''}`} aria-hidden={!drawerOpen}>
        <div className="drawer-bg" style={{ '--drawer-bg': `url(${assetPath('/Diseno/DESPLEGABLE.webp')})` }} />
        <nav className="drawer-nav">
          {navLinks.map((link) => (
            <button
              key={link.key}
              className="drawer-nav-link"
              onClick={() => handleDrawerNav(link.pct)}
            >
              {link.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Backdrop para cerrar el drawer */}
      {drawerOpen && <div className="drawer-backdrop" onClick={closeDrawer} />}

      {/* Contenido principal */}
      {currentPage === 'home' ? (
        <main 
          className="stage" 
          id="stage-root" 
          style={{ marginTop: `${headerHeight - 20}px` }}
        >
          <picture>
            {/* versión móvil */}
            <source media="(max-width: 599px)" srcSet={assetPath('/Diseno/celular.webp')} />
            {/* versión PC/tablet */}
            <source media="(min-width: 600px)" srcSet={assetPath('/Diseno/pc.webp')} />
            {/* fallback */}
            <img
              src={assetPath('/Diseno/pc.webp')}
              alt="Diseño completo del sitio"
              className="hero-image"
            />
          </picture>

          {/* Links a los 6 apartados */}
          {APARTADOS.map((apartado) => (
            <a
              key={apartado.id}
              href={`?apartado=${apartado.id}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(event) => {
                event.preventDefault()
                openApartado(apartado.id)
              }}
              className={`overlay nav-link nav-link-${apartado.id}`}
              title={apartado.title}
              aria-label={`Ir a ${apartado.title}`}
            />
          ))}
        <a className='overlay mapa' href="https://maps.app.goo.gl/QCsM195XtaETGa2P6" target="_blank"></a>
        <button
           className="overlay alias" title="Presionar para copiar alias"
          onClick={copiarAlias}
        >
</button>
          {/* Formulario RSVP */}
          <div className="rsvp-container">
            <RSVPForm />
          </div>
        </main>
      ) : (
        /* Secciones de apartados */
        APARTADOS.map((apartado) => (
          currentPage === apartado.id && (
            <section 
              key={apartado.id}
              className="stage apartado-section"
              style={{ marginTop: `${headerHeight - 20}px` }}
            >
              <picture>
                <img
                  src={assetPath(getApartadoImage(apartado.image))}
                  alt={apartado.title}
                  className="hero-image"
                />
              </picture>
              {/* Placeholder para elementos superpuestos en apartados */}
              <div className="overlay placeholder" aria-hidden="true"></div>
              {apartado.id === 1 && (
  <iframe className="overlay mapaalojamiento" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26785.33284574064!2d-60.666732513499376!3d-32.946610459930994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95b7ab15def14419%3A0x97324161fb3ed066!2sCentro%2C%20S2000%20Rosario%2C%20Santa%20Fe!5e0!3m2!1ses!2sar!4v1785197304476!5m2!1ses!2sar"   loading="lazy" allowFullScreen
  referrerPolicy="no-referrer-when-downgrade"
  title="Mapa del alojamiento"></iframe>
)}
            </section>
          )
        ))
      )}
    </>
  )
}
