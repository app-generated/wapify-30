import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { CheckSquare, Home, BarChart, Settings } from 'lucide-react'
import { Button } from './ui/Button'

const Header = () => {
  const location = useLocation()

  const navigation = [
    { name: 'Accueil', href: '/', icon: Home },
    { name: 'Mes Tâches', href: '/tasks', icon: CheckSquare },
    { name: 'Statistiques', href: '/stats', icon: BarChart },
    { name: 'Paramètres', href: '/settings', icon: Settings },
  ]

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <CheckSquare className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold text-primary">TaskMaster</span>
          </Link>
          
          <nav className="flex items-center space-x-1">
            {navigation.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.href
              
              return (
                <Link key={item.name} to={item.href}>
                  <Button 
                    variant={isActive ? 'default' : 'ghost'} 
                    size="sm"
                    className="flex items-center space-x-2"
                  >
                    <Icon className="h-4 w-4" />
                    <span className="hidden sm:inline">{item.name}</span>
                  </Button>
                </Link>
              )
            })}
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header