import React, { useState } from 'react'
import { Settings, User, Bell, Shield, Palette, Database, Download, Upload } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { Card, CardContent } from '../components/ui/Card'
import { Input } from '../components/ui/Input'

interface UserSettings {
  name: string
  email: string
  notifications: {
    taskReminders: boolean
    dailyDigest: boolean
    weeklyReport: boolean
    emailNotifications: boolean
  }
  preferences: {
    theme: 'light' | 'dark' | 'system'
    language: string
    dateFormat: string
    defaultPriority: 'low' | 'medium' | 'high'
  }
  privacy: {
    profileVisibility: 'public' | 'private'
    dataSharing: boolean
    analytics: boolean
  }
}

const SettingsPage = () => {
  const [settings, setSettings] = useState<UserSettings>({
    name: 'Jean Dupont',
    email: 'jean.dupont@example.com',
    notifications: {
      taskReminders: true,
      dailyDigest: false,
      weeklyReport: true,
      emailNotifications: true
    },
    preferences: {
      theme: 'light',
      language: 'fr',
      dateFormat: 'DD/MM/YYYY',
      defaultPriority: 'medium'
    },
    privacy: {
      profileVisibility: 'private',
      dataSharing: false,
      analytics: true
    }
  })

  const [activeTab, setActiveTab] = useState<'profile' | 'notifications' | 'preferences' | 'privacy' | 'data'>('profile')
  const [showSaveConfirmation, setShowSaveConfirmation] = useState(false)

  const handleSave = () => {
    // Simulation de sauvegarde
    setShowSaveConfirmation(true)
    setTimeout(() => setShowSaveConfirmation(false), 3000)
  }

  const handleExportData = () => {
    // Simulation d'export des données
    const dataToExport = {
      settings,
      exportDate: new Date().toISOString(),
      version: '1.0'
    }
    const blob = new Blob([JSON.stringify(dataToExport, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'taskmaster-settings.json'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const handleImportData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const importedData = JSON.parse(e.target?.result as string)
          if (importedData.settings) {
            setSettings(importedData.settings)
            alert('Paramètres importés avec succès !')
          }
        } catch (error) {
          alert('Erreur lors de l\'importation du fichier')
        }
      }
      reader.readAsText(file)
    }
  }

  const tabs = [
    { id: 'profile', name: 'Profil', icon: User },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'preferences', name: 'Préférences', icon: Palette },
    { id: 'privacy', name: 'Confidentialité', icon: Shield },
    { id: 'data', name: 'Données', icon: Database }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold flex items-center space-x-2">
          <Settings className="h-8 w-8" />
          <span>Paramètres</span>
        </h1>
        <p className="text-muted-foreground">Personnalisez votre expérience TaskMaster</p>
      </div>

      {/* Save Confirmation */}
      {showSaveConfirmation && (
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-4">
            <p className="text-green-700 font-medium">✓ Paramètres sauvegardés avec succès !</p>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-4">
              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`w-full flex items-center space-x-2 px-3 py-2 rounded-lg text-left transition-colors ${
                        activeTab === tab.id
                          ? 'bg-primary text-primary-foreground'
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{tab.name}</span>
                    </button>
                  )
                })}
              </nav>
            </CardContent>
          </Card>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          {/* Profil */}
          {activeTab === 'profile' && (
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Informations du profil</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Nom complet</label>
                    <Input
                      value={settings.name}
                      onChange={(e) => setSettings({ ...settings, name: e.target.value })}
                      placeholder="Votre nom complet"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Adresse email</label>
                    <Input
                      type="email"
                      value={settings.email}
                      onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                      placeholder="votre@email.com"
                    />
                  </div>
                  <div className="pt-4">
                    <Button onClick={handleSave}>Sauvegarder les modifications</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Notifications */}
          {activeTab === 'notifications' && (
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Préférences de notifications</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Rappels de tâches</p>
                      <p className="text-sm text-muted-foreground">Recevoir des rappels pour les tâches à venir</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.notifications.taskReminders}
                        onChange={(e) => setSettings({
                          ...settings,
                          notifications: { ...settings.notifications, taskReminders: e.target.checked }
                        })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Résumé quotidien</p>
                      <p className="text-sm text-muted-foreground">Recevoir un résumé quotidien de vos tâches</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.notifications.dailyDigest}
                        onChange={(e) => setSettings({
                          ...settings,
                          notifications: { ...settings.notifications, dailyDigest: e.target.checked }
                        })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Rapport hebdomadaire</p>
                      <p className="text-sm text-muted-foreground">Recevoir un rapport hebdomadaire de productivité</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.notifications.weeklyReport}
                        onChange={(e) => setSettings({
                          ...settings,
                          notifications: { ...settings.notifications, weeklyReport: e.target.checked }
                        })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Notifications par email</p>
                      <p className="text-sm text-muted-foreground">Recevoir des notifications par email</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.notifications.emailNotifications}
                        onChange={(e) => setSettings({
                          ...settings,
                          notifications: { ...settings.notifications, emailNotifications: e.target.checked }
                        })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>

                  <div className="pt-4">
                    <Button onClick={handleSave}>Sauvegarder les préférences</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Préférences */}
          {activeTab === 'preferences' && (
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Préférences d'affichage</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Thème</label>
                    <select
                      value={settings.preferences.theme}
                      onChange={(e) => setSettings({
                        ...settings,
                        preferences: { ...settings.preferences, theme: e.target.value as any }
                      })}
                      className="w-full px-3 py-2 border rounded-md bg-background"
                    >
                      <option value="light">Clair</option>
                      <option value="dark">Sombre</option>
                      <option value="system">Système</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Langue</label>
                    <select
                      value={settings.preferences.language}
                      onChange={(e) => setSettings({
                        ...settings,
                        preferences: { ...settings.preferences, language: e.target.value }
                      })}
                      className="w-full px-3 py-2 border rounded-md bg-background"
                    >
                      <option value="fr">Français</option>
                      <option value="en">English</option>
                      <option value="es">Español</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Format de date</label>
                    <select
                      value={settings.preferences.dateFormat}
                      onChange={(e) => setSettings({
                        ...settings,
                        preferences: { ...settings.preferences, dateFormat: e.target.value }
                      })}
                      className="w-full px-3 py-2 border rounded-md bg-background"
                    >
                      <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                      <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                      <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Priorité par défaut</label>
                    <select
                      value={settings.preferences.defaultPriority}
                      onChange={(e) => setSettings({
                        ...settings,
                        preferences: { ...settings.preferences, defaultPriority: e.target.value as any }
                      })}
                      className="w-full px-3 py-2 border rounded-md bg-background"
                    >
                      <option value="low">Faible</option>
                      <option value="medium">Moyenne</option>
                      <option value="high">Élevée</option>
                    </select>
                  </div>

                  <div className="pt-4">
                    <Button onClick={handleSave}>Sauvegarder les préférences</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Confidentialité */}
          {activeTab === 'privacy' && (
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Paramètres de confidentialité</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Visibilité du profil</label>
                    <select
                      value={settings.privacy.profileVisibility}
                      onChange={(e) => setSettings({
                        ...settings,
                        privacy: { ...settings.privacy, profileVisibility: e.target.value as any }
                      })}
                      className="w-full px-3 py-2 border rounded-md bg-background"
                    >
                      <option value="public">Public</option>
                      <option value="private">Privé</option>
                    </select>
                    <p className="text-sm text-muted-foreground mt-1">
                      Contrôlez qui peut voir vos informations de profil
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Partage de données</p>
                      <p className="text-sm text-muted-foreground">Autoriser le partage de données anonymes pour améliorer le service</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.privacy.dataSharing}
                        onChange={(e) => setSettings({
                          ...settings,
                          privacy: { ...settings.privacy, dataSharing: e.target.checked }
                        })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Analytiques</p>
                      <p className="text-sm text-muted-foreground">Autoriser la collecte de données d'utilisation</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.privacy.analytics}
                        onChange={(e) => setSettings({
                          ...settings,
                          privacy: { ...settings.privacy, analytics: e.target.checked }
                        })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>

                  <div className="pt-4">
                    <Button onClick={handleSave}>Sauvegarder les paramètres</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Données */}
          {activeTab === 'data' && (
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Gestion des données</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-2">Exporter vos données</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Téléchargez une copie de toutes vos données TaskMaster
                    </p>
                    <Button 
                      onClick={handleExportData}
                      variant="outline" 
                      className="flex items-center space-x-2"
                    >
                      <Download className="h-4 w-4" />
                      <span>Exporter les données</span>
                    </Button>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Importer vos données</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Restaurez vos paramètres à partir d'un fichier de sauvegarde
                    </p>
                    <div className="flex items-center space-x-2">
                      <input
                        type="file"
                        accept=".json"
                        onChange={handleImportData}
                        className="hidden"
                        id="import-file"
                      />
                      <label htmlFor="import-file">
                        <Button 
                          variant="outline" 
                          className="flex items-center space-x-2 cursor-pointer"
                          type="button"
                        >
                          <Upload className="h-4 w-4" />
                          <span>Importer les données</span>
                        </Button>
                      </label>
                    </div>
                  </div>

                  <div className="border-t pt-6">
                    <h3 className="font-medium mb-2 text-red-600">Zone de danger</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Ces actions sont irréversibles. Procédez avec prudence.
                    </p>
                    <div className="space-y-2">
                      <Button 
                        variant="destructive" 
                        onClick={() => {
                          if (window.confirm('Êtes-vous sûr de vouloir supprimer toutes vos tâches ? Cette action est irréversible.')) {
                            alert('Fonctionnalité non implémentée dans cette démo')
                          }
                        }}
                      >
                        Supprimer toutes les tâches
                      </Button>
                      <Button 
                        variant="destructive" 
                        onClick={() => {
                          if (window.confirm('Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.')) {
                            alert('Fonctionnalité non implémentée dans cette démo')
                          }
                        }}
                      >
                        Supprimer le compte
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

export default SettingsPage