import React, { useState } from 'react'
import { Plus, Search, Filter, Edit, Trash, Calendar, Star, Clock, CheckSquare } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { Card, CardContent } from '../components/ui/Card'
import { Input } from '../components/ui/Input'

interface Task {
  id: number
  title: string
  description: string
  completed: boolean
  priority: 'low' | 'medium' | 'high'
  dueDate: string
  category: string
  createdAt: string
}

const TasksPage = () => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: 'Terminer le rapport mensuel',
      description: 'Finaliser le rapport de performance du mois de janvier',
      completed: false,
      priority: 'high',
      dueDate: '2024-01-15',
      category: 'Travail',
      createdAt: '2024-01-10'
    },
    {
      id: 2,
      title: 'Appeler le dentiste',
      description: 'Prendre rendez-vous pour le contrôle annuel',
      completed: false,
      priority: 'medium',
      dueDate: '2024-01-14',
      category: 'Personnel',
      createdAt: '2024-01-09'
    },
    {
      id: 3,
      title: 'Acheter des courses',
      description: 'Lait, pain, fruits, légumes pour la semaine',
      completed: true,
      priority: 'low',
      dueDate: '2024-01-13',
      category: 'Maison',
      createdAt: '2024-01-12'
    },
    {
      id: 4,
      title: 'Préparer la présentation',
      description: 'Slides pour la réunion client de vendredi',
      completed: false,
      priority: 'high',
      dueDate: '2024-01-16',
      category: 'Travail',
      createdAt: '2024-01-08'
    },
    {
      id: 5,
      title: 'Faire du sport',
      description: 'Séance de running 30 minutes',
      completed: false,
      priority: 'medium',
      dueDate: '2024-01-17',
      category: 'Santé',
      createdAt: '2024-01-11'
    },
    {
      id: 6,
      title: 'Réviser pour l\'examen',
      description: 'Chapitres 5 à 8 du manuel de mathématiques',
      completed: false,
      priority: 'high',
      dueDate: '2024-01-20',
      category: 'Études',
      createdAt: '2024-01-07'
    },
    {
      id: 7,
      title: 'Nettoyer la voiture',
      description: 'Lavage complet intérieur et extérieur',
      completed: true,
      priority: 'low',
      dueDate: '2024-01-12',
      category: 'Maison',
      createdAt: '2024-01-10'
    },
    {
      id: 8,
      title: 'Organiser l\'anniversaire',
      description: 'Réserver le restaurant et inviter les amis',
      completed: false,
      priority: 'medium',
      dueDate: '2024-01-25',
      category: 'Personnel',
      createdAt: '2024-01-06'
    }
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'completed'>('all')
  const [filterPriority, setFilterPriority] = useState<'all' | 'low' | 'medium' | 'high'>('all')
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'medium' as 'low' | 'medium' | 'high',
    dueDate: '',
    category: ''
  })

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || 
                         (filterStatus === 'completed' && task.completed) ||
                         (filterStatus === 'pending' && !task.completed)
    const matchesPriority = filterPriority === 'all' || task.priority === filterPriority
    
    return matchesSearch && matchesStatus && matchesPriority
  })

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }

  const deleteTask = (id: number) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette tâche ?')) {
      setTasks(tasks.filter(task => task.id !== id))
    }
  }

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault()
    if (newTask.title && newTask.dueDate && newTask.category) {
      const task: Task = {
        id: Math.max(...tasks.map(t => t.id)) + 1,
        title: newTask.title,
        description: newTask.description,
        completed: false,
        priority: newTask.priority,
        dueDate: newTask.dueDate,
        category: newTask.category,
        createdAt: new Date().toISOString().split('T')[0]
      }
      setTasks([...tasks, task])
      setNewTask({ title: '', description: '', priority: 'medium', dueDate: '', category: '' })
      setShowAddForm(false)
    }
  }

  const handleEditTask = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingTask && newTask.title && newTask.dueDate && newTask.category) {
      setTasks(tasks.map(task => 
        task.id === editingTask.id 
          ? { ...task, title: newTask.title, description: newTask.description, priority: newTask.priority, dueDate: newTask.dueDate, category: newTask.category }
          : task
      ))
      setEditingTask(null)
      setNewTask({ title: '', description: '', priority: 'medium', dueDate: '', category: '' })
    }
  }

  const startEdit = (task: Task) => {
    setEditingTask(task)
    setNewTask({
      title: task.title,
      description: task.description,
      priority: task.priority,
      dueDate: task.dueDate,
      category: task.category
    })
    setShowAddForm(true)
  }

  const cancelEdit = () => {
    setEditingTask(null)
    setNewTask({ title: '', description: '', priority: 'medium', dueDate: '', category: '' })
    setShowAddForm(false)
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200'
      case 'medium': return 'text-orange-600 bg-orange-50 border-orange-200'
      case 'low': return 'text-green-600 bg-green-50 border-green-200'
      default: return 'text-gray-600 bg-gray-50 border-gray-200'
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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Mes Tâches</h1>
          <p className="text-muted-foreground">Gérez et organisez toutes vos tâches</p>
        </div>
        <Button 
          onClick={() => setShowAddForm(true)}
          className="flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Nouvelle tâche</span>
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Rechercher des tâches..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <select 
                value={filterStatus} 
                onChange={(e) => setFilterStatus(e.target.value as any)}
                className="px-3 py-2 border rounded-md bg-background"
              >
                <option value="all">Toutes</option>
                <option value="pending">En attente</option>
                <option value="completed">Terminées</option>
              </select>
              <select 
                value={filterPriority} 
                onChange={(e) => setFilterPriority(e.target.value as any)}
                className="px-3 py-2 border rounded-md bg-background"
              >
                <option value="all">Toutes priorités</option>
                <option value="high">Élevée</option>
                <option value="medium">Moyenne</option>
                <option value="low">Faible</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Add/Edit Form */}
      {showAddForm && (
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              {editingTask ? 'Modifier la tâche' : 'Nouvelle tâche'}
            </h3>
            <form onSubmit={editingTask ? handleEditTask : handleAddTask} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Titre *</label>
                  <Input
                    value={newTask.title}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                    placeholder="Titre de la tâche"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Catégorie *</label>
                  <Input
                    value={newTask.category}
                    onChange={(e) => setNewTask({ ...newTask, category: e.target.value })}
                    placeholder="ex: Travail, Personnel"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  value={newTask.description}
                  onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                  placeholder="Description de la tâche"
                  className="w-full px-3 py-2 border rounded-md bg-background min-h-[80px]"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Priorité</label>
                  <select
                    value={newTask.priority}
                    onChange={(e) => setNewTask({ ...newTask, priority: e.target.value as any })}
                    className="w-full px-3 py-2 border rounded-md bg-background"
                  >
                    <option value="low">Faible</option>
                    <option value="medium">Moyenne</option>
                    <option value="high">Élevée</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Date d'échéance *</label>
                  <Input
                    type="date"
                    value={newTask.dueDate}
                    onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button type="submit">
                  {editingTask ? 'Modifier' : 'Créer'}
                </Button>
                <Button type="button" variant="outline" onClick={cancelEdit}>
                  Annuler
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Tasks List */}
      <div className="space-y-4">
        {filteredTasks.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-muted-foreground">Aucune tâche trouvée</p>
            </CardContent>
          </Card>
        ) : (
          filteredTasks.map((task) => (
            <Card key={task.id} className={task.completed ? 'opacity-75' : ''}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 flex-1">
                    <button
                      onClick={() => toggleTask(task.id)}
                      className={`mt-1 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                        task.completed 
                          ? 'bg-primary border-primary' 
                          : 'border-gray-300 hover:border-primary'
                      }`}
                    >
                      {task.completed && (
                        <CheckSquare className="h-3 w-3 text-white" />
                      )}
                    </button>
                    <div className="flex-1">
                      <h3 className={`font-medium text-lg ${
                        task.completed ? 'line-through text-muted-foreground' : ''
                      }`}>
                        {task.title}
                      </h3>
                      <p className={`text-sm mt-1 ${
                        task.completed ? 'text-muted-foreground' : 'text-gray-600'
                      }`}>
                        {task.description}
                      </p>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                        <span className="flex items-center space-x-1">
                          <Calendar className="h-3 w-3" />
                          <span>{new Date(task.dueDate).toLocaleDateString('fr-FR')}</span>
                        </span>
                        <span className="bg-gray-100 px-2 py-1 rounded text-xs">
                          {task.category}
                        </span>
                        <span className={`px-2 py-1 rounded text-xs font-medium border ${
                          getPriorityColor(task.priority)
                        }`}>
                          {getPriorityLabel(task.priority)}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 ml-4">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => startEdit(task)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="destructive"
                      onClick={() => deleteTask(task.id)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}

export default TasksPage