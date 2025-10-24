import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { CheckSquare, Plus, Calendar, TrendingUp, Clock, Star } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { Card, CardContent } from '../components/ui/Card'

interface Task {
  id: number
  title: string
  completed: boolean
  priority: 'low' | 'medium' | 'high'
  dueDate: string
  category: string
}

const HomePage = () => {
  const [recentTasks] = useState<Task[]>([
    {
      id: 1,
      title: 'Terminer le rapport mensuel',
      completed: false,
      priority: 'high',
      dueDate: '2024-01-15',
      category: 'Travail'
    },
    {
      id: 2,
      title: 'Appeler le dentiste',
      completed: false,
      priority: 'medium',
      dueDate: '2024-01-14',
      category: 'Personnel'
    },
    {
      id: 3,
      title: 'Acheter des courses',
      completed: true,
      priority: 'low',
      dueDate: '2024-01-13',
      category: 'Maison'
    },
    {
      id: 4,
      title: 'Préparer la présentation',
      completed: false,
      priority: 'high',
      dueDate: '2024-01-16',
      category: 'Travail'
    }
  ])

  const completedTasks = recentTasks.filter(task => task.completed).length
  const totalTasks = recentTasks.length
  const pendingTasks = totalTasks - completedTasks
  const completionRate = Math.round((completedTasks / totalTasks) * 100)

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50'
      case 'medium': return 'text-orange-600 bg-orange-50'
      case 'low': return 'text-green-600 bg-green-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'high': return 'Élevée'
      case 'medium': return 'Moyenne'
      case 'low': return 'Faible'
      default: return priority
    }
  }

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">
          Bienvenue dans <span className="text-primary">TaskMaster</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Organisez vos tâches, suivez vos progrès et atteignez vos objectifs avec notre gestionnaire de tâches intuitif.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link to="/tasks">
            <Button size="lg" className="flex items-center space-x-2">
              <Plus className="h-5 w-5" />
              <span>Créer une tâche</span>
            </Button>
          </Link>
          <Link to="/stats">
            <Button variant="outline" size="lg" className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5" />
              <span>Voir les statistiques</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <CheckSquare className="h-8 w-8 text-primary" />
              <div>
                <p className="text-2xl font-bold">{totalTasks}</p>
                <p className="text-sm text-muted-foreground">Total des tâches</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Clock className="h-8 w-8 text-orange-500" />
              <div>
                <p className="text-2xl font-bold">{pendingTasks}</p>
                <p className="text-sm text-muted-foreground">En attente</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Star className="h-8 w-8 text-green-500" />
              <div>
                <p className="text-2xl font-bold">{completedTasks}</p>
                <p className="text-sm text-muted-foreground">Terminées</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-8 w-8 text-blue-500" />
              <div>
                <p className="text-2xl font-bold">{completionRate}%</p>
                <p className="text-sm text-muted-foreground">Taux de réussite</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Tasks */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Tâches récentes</h2>
          <Link to="/tasks">
            <Button variant="outline">Voir toutes les tâches</Button>
          </Link>
        </div>
        
        <div className="grid gap-4">
          {recentTasks.map((task) => (
            <Card key={task.id} className={task.completed ? 'opacity-75' : ''}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                      task.completed 
                        ? 'bg-primary border-primary' 
                        : 'border-gray-300'
                    }`}>
                      {task.completed && (
                        <CheckSquare className="h-3 w-3 text-white" />
                      )}
                    </div>
                    <div>
                      <h3 className={`font-medium ${
                        task.completed ? 'line-through text-muted-foreground' : ''
                      }`}>
                        {task.title}
                      </h3>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span className="flex items-center space-x-1">
                          <Calendar className="h-3 w-3" />
                          <span>{new Date(task.dueDate).toLocaleDateString('fr-FR')}</span>
                        </span>
                        <span className="bg-gray-100 px-2 py-1 rounded text-xs">
                          {task.category}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className={`px-2 py-1 rounded text-xs font-medium ${
                    getPriorityColor(task.priority)
                  }`}>
                    {getPriorityLabel(task.priority)}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4">Actions rapides</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link to="/tasks">
              <Button variant="outline" className="w-full flex items-center space-x-2 h-12">
                <Plus className="h-5 w-5" />
                <span>Nouvelle tâche</span>
              </Button>
            </Link>
            <Link to="/stats">
              <Button variant="outline" className="w-full flex items-center space-x-2 h-12">
                <BarChart className="h-5 w-5" />
                <span>Voir les stats</span>
              </Button>
            </Link>
            <Link to="/settings">
              <Button variant="outline" className="w-full flex items-center space-x-2 h-12">
                <Settings className="h-5 w-5" />
                <span>Paramètres</span>
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default HomePage