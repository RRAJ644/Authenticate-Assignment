import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { navLinks, siteName } from '../constants/constants.js'

const AppLayout = () => {
  return (
    <>
      <main className='min-h-screen flex flex-col justify-between  items-center overflow-hidden xl:px-16 lg:px-10 md:px-6 max-sm:px-5 sm:px-6 py-4'>
        <Navbar data={navLinks} siteName={siteName} />
        <Outlet />
        <Footer />
      </main>
    </>
  )
}

export default AppLayout
