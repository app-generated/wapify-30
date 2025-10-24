import React from 'react'
import { CheckSquare } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col items-center justify-between space-y-4 sm:flex-row sm:space-y-0">
          <div className="flex items-center space-x-2">
            <CheckSquare className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium">TaskMaster</span>
          </div>
          
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <span>© 2024 TaskMaster. Tous droits réservés.</span>
          </div>
          
          <div className="text-sm text-muted-foreground">
            Organisez vos tâches efficacement
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer