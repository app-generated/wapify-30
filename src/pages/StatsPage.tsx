import React, { useState } from 'react'
import { BarChart, TrendingUp, Calendar, CheckSquare, Clock, Star, Target, Award } from 'lucide-react'
import { Card, CardContent } from '../components/ui/Card'

interface Task {
  id: number
  title: string
  completed: boolean
  priority: 'low' | 'medium' | 'high'
  dueDate: string
  category: string
  createdAt: string
}

const StatsPage = () => {
  const [tasks] = useState<Task[]>([
    {
      id: 1,
      title: 'Terminer le rapport mensuel',
      completed: false,
      priority: 'high',
      dueDate: '2024-01-15',
      category: 'Travail',
      createdAt: '2024-01-10'
    },
    {
      id: 2,
      title: 'Appeler le dentiste',
      completed: false,
      priority: 'medium',
      dueDate: '2024-01-14',
      category: 'Personnel',
      createdAt: '2024-01-09'
    },
    {
      id: 3,
      title: 'Acheter des courses',
      completed: true,
      priority: 'low',
      dueDate: '2024-01-13',
      category: 'Maison',
      createdAt: '2024-01-12'
    },
    {
      id: 4,
      title: 'Préparer la présentation',
      completed: false,
      priority: 'high',
      dueDate: '2024-01-16',
      category: 'Travail',
      createdAt: '2024-01-08'
    },
    {
      id: 5,
      title: 'Faire du sport',
      completed: true,
      priority: 'medium',
      dueDate: '2024-01-17',
      category: 'Santé',
      createdAt: '2024-01-11'
    },
    {
      id: 6,
      title: 'Réviser pour l\'examen',
      completed: false,
      priority: 'high',
      dueDate: '2024-01-20',
      category: 'Études',
      createdAt: '2024-01-07'
    },
    {
      id: 7,
      title: 'Nettoyer la voiture',
      completed: true,
      priority: 'low',
      dueDate: '2024-01-12',
      category: 'Maison',
      createdAt: '2024-01-10'
    },
    {
      id: 8,
      title: 'Organiser l\'anniversaire',
      completed: true,
      priority: 'medium',
      dueDate: '2024-01-25',
      category: 'Personnel',
      createdAt: '2024-01-06'
    }
  ])

  // Calculs des statistiques
  const totalTasks = tasks.length
  const completedTasks = tasks.filter(task => task.completed).length
  const pendingTasks = totalTasks - completedTasks
  const completionRate = Math.round((completedTasks / totalTasks) * 100)

  // Statistiques par priorité
  const highPriorityTasks = tasks.filter(task => task.priority === 'high').length
  const mediumPriorityTasks = tasks.filter(task => task.priority === 'medium').length
  const lowPriorityTasks = tasks.filter(task => task.priority === 'low').length

  const completedHighPriority = tasks.filter(task => task.priority === 'high' && task.completed).length
  const completedMediumPriority = tasks.filter(task => task.priority === 'medium' && task.completed).length
  const completedLowPriority = tasks.filter(task => task.priority === 'low' && task.completed).length

  // Statistiques par catégorie
  const categories = [...new Set(tasks.map(task => task.category))]
  const categoryStats = categories.map(category => {
    const categoryTasks = tasks.filter(task => task.category === category)
    const completed = categoryTasks.filter(task => task.completed).length
    return {
      name: category,
      total: categoryTasks.length,
      completed,
      rate: Math.round((completed / categoryTasks.length) * 100)
    }
  })

  // Tâches en retard
  const today = new Date().toISOString().split('T')[0]
  const overdueTasks = tasks.filter(task => !task.completed && task.dueDate < today).length

  // Tâches à venir (7 prochains jours)
  const nextWeek = new Date()
  nextWeek.setDate(nextWeek.getDate() + 7)
  const upcomingTasks = tasks.filter(task => 
    !task.completed && 
    task.dueDate >= today && 
    task.dueDate <= nextWeek.toISOString().split('T')[0]
  ).length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Statistiques</h1>
        <p className="text-muted-foreground">Analysez vos performances et votre productivité</p>
      </div>

      {/* Stats principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
              <TrendingUp className="h-8 w-8 text-blue-500" />
              <div>
                <p className="text-2xl font-bold">{completionRate}%</p>
                <p className="text-sm text-muted-foreground">Taux de réussite</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alertes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-red-200">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2 mb-2">
              <Calendar className="h-6 w-6 text-red-500" />
              <h3 className="text-lg font-semibold text-red-700">Tâches en retard</h3>
            </div>
            <p className="text-3xl font-bold text-red-600">{overdueTasks}</p>
            <p className="text-sm text-red-600">Nécessitent une attention immédiate</p>
          </CardContent>
        </Card>
        
        <Card className="border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2 mb-2">
              <Target className="h-6 w-6 text-blue-500" />
              <h3 className="text-lg font-semibold text-blue-700">À venir (7 jours)</h3>
            </div>
            <p className="text-3xl font-bold text-blue-600">{upcomingTasks}</p>
            <p className="text-sm text-blue-600">Tâches à planifier</p>
          </CardContent>
        </Card>
      </div>

      {/* Statistiques par priorité */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
            <Award className="h-5 w-5" />
            <span>Répartition par priorité</span>
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 bg-red-500 rounded"></div>
                <span className="font-medium">Priorité élevée</span>
              </div>
              <div className="text-right">
                <p className="font-bold">{completedHighPriority}/{highPriorityTasks}</p>
                <p className="text-sm text-muted-foreground">
                  {highPriorityTasks > 0 ? Math.round((completedHighPriority / highPriorityTasks) * 100) : 0}% terminées
                </p>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 bg-orange-500 rounded"></div>
                <span className="font-medium">Priorité moyenne</span>
              </div>
              <div className="text-right">
                <p className="font-bold">{completedMediumPriority}/{mediumPriorityTasks}</p>
                <p className="text-sm text-muted-foreground">
                  {mediumPriorityTasks > 0 ? Math.round((completedMediumPriority / mediumPriorityTasks) * 100) : 0}% terminées
                </p>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 bg-green-500 rounded"></div>
                <span className="font-medium">Priorité faible</span>
              </div>
              <div className="text-right">
                <p className="font-bold">{completedLowPriority}/{lowPriorityTasks}</p>
                <p className="text-sm text-muted-foreground">
                  {lowPriorityTasks > 0 ? Math.round((completedLowPriority / lowPriorityTasks) * 100) : 0}% terminées
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Statistiques par catégorie */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
            <BarChart className="h-5 w-5" />
            <span>Performance par catégorie</span>
          </h3>
          <div className="space-y-4">
            {categoryStats.map((category) => (
              <div key={category.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{category.name}</span>
                  <span className="text-sm text-muted-foreground">
                    {category.completed}/{category.total} ({category.rate}%)
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-300" 
                    style={{ width: `${category.rate}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Résumé mensuel */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Résumé du mois</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <p className="text-2xl font-bold text-blue-600">{totalTasks}</p>
              <p className="text-sm text-blue-600">Tâches créées</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <p className="text-2xl font-bold text-green-600">{completedTasks}</p>
              <p className="text-sm text-green-600">Tâches terminées</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <p className="text-2xl font-bold text-purple-600">{completionRate}%</p>
              <p className="text-sm text-purple-600">Efficacité moyenne</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default StatsPage