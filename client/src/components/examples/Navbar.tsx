import { useState } from 'react'
import Navbar from '../Navbar'

export default function NavbarExample() {
  const [isDark, setIsDark] = useState(false)
  
  return (
    <Navbar
      user={{
        name: "John Doe",
        email: "john.doe@example.com"
      }}
      onLogout={() => console.log('Logout triggered')}
      isDark={isDark}
      onToggleTheme={() => setIsDark(!isDark)}
    />
  )
}