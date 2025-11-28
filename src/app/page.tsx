'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { 
  Heart, 
  Book, 
  Calendar, 
  Users, 
  Target, 
  Music, 
  MapPin, 
  DollarSign, 
  PenTool, 
  MessageCircle, 
  User, 
  Bell, 
  Settings, 
  Home,
  BookOpen,
  HandHeart,
  Clock,
  Award,
  TrendingUp,
  Star,
  CheckCircle,
  Plus,
  ArrowRight,
  Flame,
  Trophy,
  Gift,
  Share2,
  ChevronRight,
  Play,
  Headphones,
  Search,
  Filter,
  MoreHorizontal,
  Edit3,
  Send,
  ThumbsUp,
  MessageSquare,
  BarChart3,
  Calendar as CalendarIcon,
  Clock3,
  Zap,
  Sparkles,
  Crown,
  Shield,
  Compass,
  Save,
  Trash2,
  BookMarked,
  Sunrise,
  Sun,
  Sunset,
  Moon,
  Check,
  X,
  Camera,
  Edit,
  CreditCard,
  Smartphone,
  Download,
  LogOut
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Dados mock
const mockVerses = [
  {
    text: "Porque eu bem sei os pensamentos que tenho a vosso respeito, diz o Senhor; pensamentos de paz e não de mal, para vos dar o fim que esperais.",
    reference: "Jeremias 29:11",
    theme: "Esperança"
  },
  {
    text: "Tudo posso naquele que me fortalece.",
    reference: "Filipenses 4:13",
    theme: "Força"
  },
  {
    text: "O Senhor é o meu pastor; nada me faltará.",
    reference: "Salmos 23:1",
    theme: "Confiança"
  }
]

const mockPrayerRequests = [
  { id: 1, user: "Maria Silva", request: "Oração pela saúde da minha mãe", prayers: 23, time: "2h" },
  { id: 2, user: "João Santos", request: "Sabedoria para decisões importantes no trabalho", prayers: 15, time: "4h" },
  { id: 3, user: "Ana Costa", request: "Paz familiar e reconciliação", prayers: 31, time: "1d" }
]

const mockReadingPlans = [
  { id: 1, title: "Bíblia em 1 Ano", progress: 65, days: 365, current: "Salmos 45" },
  { id: 2, title: "Novo Testamento", progress: 23, days: 90, current: "Mateus 12" },
  { id: 3, title: "Provérbios", progress: 87, days: 31, current: "Provérbios 27" }
]

const mockHabits = [
  { name: "Oração Matinal", streak: 12, completed: true, icon: HandHeart },
  { name: "Leitura Bíblica", streak: 8, completed: true, icon: BookOpen },
  { name: "Gratidão", streak: 15, completed: false, icon: Heart },
  { name: "Jejum", streak: 3, completed: false, icon: Clock }
]

// Notificações mock
const mockNotifications = [
  {
    id: 1,
    type: 'prayer',
    title: 'Hora de Orar',
    message: 'É hora da Oração da Tarde - 18:00',
    time: '5 min',
    icon: HandHeart,
    color: 'from-amber-500 to-orange-600',
    unread: true
  },
  {
    id: 2,
    type: 'achievement',
    title: 'Nova Conquista!',
    message: 'Você completou 7 dias seguidos de oração',
    time: '1h',
    icon: Trophy,
    color: 'from-emerald-500 to-teal-600',
    unread: true
  },
  {
    id: 3,
    type: 'community',
    title: 'Pedido de Oração',
    message: 'Maria Silva pediu oração pela saúde da mãe',
    time: '2h',
    icon: Users,
    color: 'from-indigo-500 to-purple-600',
    unread: false
  },
  {
    id: 4,
    type: 'verse',
    title: 'Versículo do Dia',
    message: 'Novo versículo disponível para reflexão',
    time: '1d',
    icon: Sparkles,
    color: 'from-purple-500 to-pink-600',
    unread: false
  }
]

// Horários de oração bíblicos
const prayerTimes = [
  { time: "06:00", name: "Oração da Manhã", icon: Sunrise, verse: "De manhã, Senhor, ouves a minha voz", reference: "Salmos 5:3" },
  { time: "12:00", name: "Oração do Meio-Dia", icon: Sun, verse: "Três vezes no dia me ponho de joelhos", reference: "Daniel 6:10" },
  { time: "15:00", name: "Hora Nona", icon: Sun, verse: "À hora nona, Jesus clamou em alta voz", reference: "Marcos 15:34" },
  { time: "18:00", name: "Oração da Tarde", icon: Sunset, verse: "Levanto as minhas mãos como sacrifício da tarde", reference: "Salmos 141:2" },
  { time: "21:00", name: "Oração da Noite", icon: Moon, verse: "De noite está comigo a sua canção", reference: "Salmos 42:8" }
]

// Guia de oração
const prayerGuide = [
  {
    step: "1. Adoração",
    description: "Comece reconhecendo quem Deus é",
    example: "Senhor, Tu és santo, poderoso e digno de toda honra...",
    icon: Crown
  },
  {
    step: "2. Confissão",
    description: "Confesse seus pecados e peça perdão",
    example: "Pai, reconheço que pequei em... Perdoa-me...",
    icon: Heart
  },
  {
    step: "3. Gratidão",
    description: "Agradeça pelas bênçãos recebidas",
    example: "Obrigado Senhor por... Sou grato por...",
    icon: Gift
  },
  {
    step: "4. Súplica",
    description: "Apresente seus pedidos a Deus",
    example: "Senhor, eu preciso de... Peço por...",
    icon: HandHeart
  },
  {
    step: "5. Intercessão",
    description: "Ore por outras pessoas",
    example: "Pai, oro por [nome], que Tu...",
    icon: Users
  }
]

export default function ChristianApp() {
  const router = useRouter()
  const [currentScreen, setCurrentScreen] = useState('onboarding')
  const [currentStep, setCurrentStep] = useState(0)
  const [userName, setUserName] = useState('')
  const [dailyVerse, setDailyVerse] = useState(mockVerses[0])
  const [prayerText, setPrayerText] = useState('')
  const [diaryEntry, setDiaryEntry] = useState('')
  
  // Estados para o perfil
  const [profilePhoto, setProfilePhoto] = useState('')
  const [coverPhoto, setCoverPhoto] = useState('')
  const [editProfileOpen, setEditProfileOpen] = useState(false)
  const [tempProfilePhoto, setTempProfilePhoto] = useState('')
  const [tempCoverPhoto, setTempCoverPhoto] = useState('')
  const [tempUserName, setTempUserName] = useState('')
  
  // Estados para o diário espiritual
  const [diaryEntries, setDiaryEntries] = useState<Array<{
    id: number
    date: string
    type: 'gratitude' | 'request' | 'reflection'
    content: string
  }>>([])
  const [currentDiaryType, setCurrentDiaryType] = useState<'gratitude' | 'request' | 'reflection'>('gratitude')
  
  // Estados para notificações de oração
  const [prayerNotifications, setPrayerNotifications] = useState(true)
  const [nextPrayerTime, setNextPrayerTime] = useState<typeof prayerTimes[0] | null>(null)

  // Estados para tela de bloqueio
  const [lockScreenEnabled, setLockScreenEnabled] = useState(false)
  const [showLockScreenDialog, setShowLockScreenDialog] = useState(false)

  // Estados para notificações
  const [notifications, setNotifications] = useState(mockNotifications)
  const [unreadCount, setUnreadCount] = useState(mockNotifications.filter(n => n.unread).length)

  // Verificar próximo horário de oração
  useEffect(() => {
    const checkPrayerTime = () => {
      const now = new Date()
      const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`
      
      // Encontrar próximo horário
      const next = prayerTimes.find(pt => pt.time > currentTime) || prayerTimes[0]
      setNextPrayerTime(next)
    }
    
    checkPrayerTime()
    const interval = setInterval(checkPrayerTime, 60000) // Verificar a cada minuto
    
    return () => clearInterval(interval)
  }, [])

  // Função para gerar imagem do versículo para tela de bloqueio
  const generateLockScreenImage = () => {
    const canvas = document.createElement('canvas')
    canvas.width = 1080
    canvas.height = 1920
    const ctx = canvas.getContext('2d')
    
    if (!ctx) return
    
    // Fundo gradiente
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
    gradient.addColorStop(0, '#4F46E5')
    gradient.addColorStop(0.5, '#7C3AED')
    gradient.addColorStop(1, '#4F46E5')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    
    // Texto do versículo
    ctx.fillStyle = '#FFFFFF'
    ctx.font = 'bold 60px serif'
    ctx.textAlign = 'center'
    
    // Quebrar texto em linhas
    const words = dailyVerse.text.split(' ')
    let line = ''
    let y = 800
    const maxWidth = 900
    const lineHeight = 80
    
    words.forEach((word) => {
      const testLine = line + word + ' '
      const metrics = ctx.measureText(testLine)
      
      if (metrics.width > maxWidth && line !== '') {
        ctx.fillText(line, canvas.width / 2, y)
        line = word + ' '
        y += lineHeight
      } else {
        line = testLine
      }
    })
    ctx.fillText(line, canvas.width / 2, y)
    
    // Referência
    ctx.font = '48px sans-serif'
    ctx.fillStyle = '#E0E7FF'
    ctx.fillText(dailyVerse.reference, canvas.width / 2, y + 120)
    
    // Converter para blob e baixar
    canvas.toBlob((blob) => {
      if (!blob) return
      
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `versiculo-${new Date().toISOString().split('T')[0]}.png`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
      
      setLockScreenEnabled(true)
      setShowLockScreenDialog(false)
    }, 'image/png')
  }

  const markNotificationAsRead = (id: number) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, unread: false } : n
    ))
    setUnreadCount(notifications.filter(n => n.unread && n.id !== id).length)
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, unread: false })))
    setUnreadCount(0)
  }

  // Onboarding steps
  const onboardingSteps = [
    {
      title: "Bem-vindo à sua jornada espiritual",
      subtitle: "Conecte-se com Deus de forma mais profunda",
      icon: Heart,
      color: "#6366F1"
    },
    {
      title: "Cresça na Palavra",
      subtitle: "Planos de leitura personalizados para você",
      icon: BookOpen,
      color: "#10B981"
    },
    {
      title: "Ore sem cessar",
      subtitle: "Lembretes de oração em horários bíblicos",
      icon: HandHeart,
      color: "#F59E0B"
    },
    {
      title: "Vamos começar?",
      subtitle: "Como podemos te chamar?",
      icon: User,
      color: "#6366F1"
    }
  ]

  const handleOnboardingNext = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else if (userName.trim()) {
      setCurrentScreen('home')
    }
  }

  const saveDiaryEntry = () => {
    if (diaryEntry.trim()) {
      const newEntry = {
        id: Date.now(),
        date: new Date().toISOString(),
        type: currentDiaryType,
        content: diaryEntry
      }
      setDiaryEntries([newEntry, ...diaryEntries])
      setDiaryEntry('')
    }
  }

  const deleteDiaryEntry = (id: number) => {
    setDiaryEntries(diaryEntries.filter(entry => entry.id !== id))
  }

  const handleEditProfile = () => {
    setTempUserName(userName)
    setTempProfilePhoto(profilePhoto)
    setTempCoverPhoto(coverPhoto)
    setEditProfileOpen(true)
  }

  const handleSaveProfile = () => {
    setUserName(tempUserName)
    setProfilePhoto(tempProfilePhoto)
    setCoverPhoto(tempCoverPhoto)
    setEditProfileOpen(false)
  }

  const handleProfilePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setTempProfilePhoto(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleCoverPhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setTempCoverPhoto(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const renderOnboarding = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md text-center">
        <div className="mb-8">
          <div 
            className="w-28 h-28 mx-auto mb-8 rounded-3xl flex items-center justify-center shadow-2xl backdrop-blur-sm"
            style={{ 
              background: `linear-gradient(135deg, ${onboardingSteps[currentStep].color}20, ${onboardingSteps[currentStep].color}10)`,
              border: `2px solid ${onboardingSteps[currentStep].color}30`
            }}
          >
            {(() => {
              const IconComponent = onboardingSteps[currentStep].icon;
              return <IconComponent 
                size={48} 
                style={{ color: onboardingSteps[currentStep].color }}
              />;
            })()}
          </div>
          <h1 className="font-serif text-4xl font-bold text-gray-900 mb-6 leading-tight">
            {onboardingSteps[currentStep].title}
          </h1>
          <p className="font-inter text-gray-600 text-xl leading-relaxed">
            {onboardingSteps[currentStep].subtitle}
          </p>
        </div>

        {currentStep === onboardingSteps.length - 1 && (
          <div className="mb-8">
            <Input
              placeholder="Seu nome"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="text-center text-xl py-8 font-inter border-2 border-gray-200 rounded-2xl shadow-lg focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300"
            />
          </div>
        )}

        <div className="flex justify-center mb-10">
          {onboardingSteps.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full mx-1 transition-all duration-500 ${
                index === currentStep 
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-600 w-12 shadow-lg' 
                  : 'bg-gray-300 w-2'
              }`}
            />
          ))}
        </div>

        <Button
          onClick={handleOnboardingNext}
          className="w-full py-8 text-xl font-inter bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 rounded-2xl shadow-2xl hover:shadow-indigo-500/25 hover:scale-105 transform"
          disabled={currentStep === onboardingSteps.length - 1 && !userName.trim()}
        >
          {currentStep === onboardingSteps.length - 1 ? 'Começar Jornada' : 'Continuar'}
          <ArrowRight className="ml-3" size={24} />
        </Button>
      </div>
    </div>
  )

  const renderHome = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50">
      {/* Header Premium */}
      <div className="bg-white/80 backdrop-blur-xl shadow-xl border-b border-gray-100/50 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-serif text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Olá, {userName || 'Amigo'}! 
            </h1>
            <p className="font-inter text-gray-600 text-lg mt-1">Que Deus abençoe seu dia</p>
          </div>
          <div className="flex items-center space-x-4">
            {/* Dropdown Menu de Notificações */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="relative hover:bg-indigo-50 rounded-2xl transition-all duration-300"
                  data-tutorial="notifications"
                >
                  <Bell size={22} className="text-gray-700" />
                  {unreadCount > 0 && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">{unreadCount}</span>
                    </div>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-96 bg-white/95 backdrop-blur-xl border-gray-200 shadow-2xl rounded-2xl p-2" align="end">
                <DropdownMenuLabel className="font-inter font-semibold text-gray-900 px-3 py-2 flex items-center justify-between">
                  <span>Notificações</span>
                  {unreadCount > 0 && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={markAllAsRead}
                      className="text-xs text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 rounded-lg"
                    >
                      Marcar todas como lidas
                    </Button>
                  )}
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-gray-200" />
                <div className="max-h-96 overflow-y-auto">
                  {notifications.map((notification) => (
                    <DropdownMenuItem 
                      key={notification.id}
                      onClick={() => markNotificationAsRead(notification.id)}
                      className={`font-inter cursor-pointer rounded-xl px-3 py-3 mb-1 focus:bg-gray-50 ${
                        notification.unread ? 'bg-indigo-50/50' : ''
                      }`}
                    >
                      <div className="flex items-start space-x-3 w-full">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 bg-gradient-to-br ${notification.color}`}>
                          <notification.icon className="text-white" size={20} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-1">
                            <p className="font-semibold text-gray-900 text-sm">{notification.title}</p>
                            <span className="text-xs text-gray-500 ml-2">{notification.time}</span>
                          </div>
                          <p className="text-gray-600 text-sm leading-relaxed">{notification.message}</p>
                          {notification.unread && (
                            <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2"></div>
                          )}
                        </div>
                      </div>
                    </DropdownMenuItem>
                  ))}
                </div>
                {notifications.length === 0 && (
                  <div className="text-center py-8">
                    <Bell className="mx-auto text-gray-400 mb-2" size={32} />
                    <p className="font-inter text-gray-500">Nenhuma notificação</p>
                  </div>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
            
            {/* Dropdown Menu do Avatar */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar 
                  className="cursor-pointer w-12 h-12 ring-4 ring-indigo-100 hover:ring-indigo-200 transition-all duration-300"
                  data-tutorial="profile-menu"
                >
                  {profilePhoto ? (
                    <AvatarImage src={profilePhoto} alt={userName} />
                  ) : (
                    <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-inter text-lg font-bold">
                      {userName.charAt(0) || 'U'}
                    </AvatarFallback>
                  )}
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-white/95 backdrop-blur-xl border-gray-200 shadow-2xl rounded-2xl p-2" align="end">
                <DropdownMenuLabel className="font-inter font-semibold text-gray-900 px-3 py-2">
                  Minha Conta
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-gray-200" />
                <DropdownMenuItem 
                  onClick={() => setCurrentScreen('profile')}
                  className="font-inter cursor-pointer rounded-xl px-3 py-2.5 hover:bg-indigo-50 focus:bg-indigo-50"
                >
                  <User className="mr-3 h-4 w-4 text-indigo-600" />
                  <span className="text-gray-700">Ver Perfil</span>
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={handleEditProfile}
                  className="font-inter cursor-pointer rounded-xl px-3 py-2.5 hover:bg-indigo-50 focus:bg-indigo-50"
                >
                  <Edit className="mr-3 h-4 w-4 text-indigo-600" />
                  <span className="text-gray-700">Editar Perfil</span>
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => setCurrentScreen('subscriptions')}
                  className="font-inter cursor-pointer rounded-xl px-3 py-2.5 hover:bg-amber-50 focus:bg-amber-50"
                >
                  <Crown className="mr-3 h-4 w-4 text-amber-600" />
                  <span className="text-gray-700">Assinaturas</span>
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => setCurrentScreen('settings')}
                  className="font-inter cursor-pointer rounded-xl px-3 py-2.5 hover:bg-indigo-50 focus:bg-indigo-50"
                >
                  <Settings className="mr-3 h-4 w-4 text-indigo-600" />
                  <span className="text-gray-700">Configurações</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-gray-200" />
                <DropdownMenuItem 
                  onClick={() => setCurrentScreen('onboarding')}
                  className="font-inter cursor-pointer rounded-xl px-3 py-2.5 hover:bg-red-50 focus:bg-red-50"
                >
                  <LogOut className="mr-3 h-4 w-4 text-red-600" />
                  <span className="text-red-600">Sair</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-8 pb-32">
        {/* Próximo Horário de Oração */}
        {nextPrayerTime && prayerNotifications && (
          <Card className="bg-gradient-to-br from-amber-500 via-orange-500 to-amber-600 text-white border-0 shadow-2xl hover:shadow-amber-500/25 transition-all duration-500 hover:scale-[1.02] transform">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                    <nextPrayerTime.icon size={28} className="text-white" />
                  </div>
                  <div>
                    <p className="font-inter font-semibold text-lg">Próxima Oração</p>
                    <p className="font-serif text-2xl font-bold">{nextPrayerTime.time} - {nextPrayerTime.name}</p>
                  </div>
                </div>
                <Button 
                  onClick={() => setCurrentScreen('prayer-guide')}
                  className="bg-white text-amber-600 hover:bg-gray-100 font-inter font-semibold px-6 py-3 rounded-2xl shadow-lg"
                >
                  Orar Agora
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Versículo do Dia Premium */}
        <Card 
          className="bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-800 text-white border-0 shadow-2xl hover:shadow-indigo-500/25 transition-all duration-500 hover:scale-[1.02] transform"
          data-tutorial="daily-verse"
        >
          <CardContent className="p-8">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                  <Sparkles size={24} className="text-yellow-300" />
                </div>
                <span className="font-inter font-semibold text-xl">Versículo do Dia</span>
              </div>
              <div className="flex space-x-2">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setShowLockScreenDialog(true)}
                  className="text-white hover:bg-white/20 rounded-2xl"
                  title="Adicionar à tela de bloqueio"
                >
                  <Smartphone size={20} />
                </Button>
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 rounded-2xl">
                  <Share2 size={20} />
                </Button>
              </div>
            </div>
            <blockquote className="font-serif text-2xl mb-6 leading-relaxed text-white/95">
              "{dailyVerse.text}"
            </blockquote>
            <div className="flex items-center justify-between">
              <p className="font-inter text-indigo-100 text-lg">
                {dailyVerse.reference}
              </p>
              <Badge className="bg-white/20 text-white border-0 font-inter px-4 py-2 text-sm backdrop-blur-sm">
                {dailyVerse.theme}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats Premium */}
        <div className="grid grid-cols-2 gap-6">
          <Card className="bg-white/80 backdrop-blur-xl border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 transform">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-2xl">
                <Flame className="text-white" size={32} />
              </div>
              <p className="font-inter text-3xl font-bold text-gray-900 mb-2">12</p>
              <p className="font-inter text-gray-600 font-medium">Dias seguidos</p>
            </CardContent>
          </Card>
          <Card className="bg-white/80 backdrop-blur-xl border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 transform">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-2xl">
                <Trophy className="text-white" size={32} />
              </div>
              <p className="font-inter text-3xl font-bold text-gray-900 mb-2">8</p>
              <p className="font-inter text-gray-600 font-medium">Conquistas</p>
            </CardContent>
          </Card>
        </div>

        {/* Upgrade Banner */}
        <Card 
          className="bg-gradient-to-br from-amber-500 via-orange-500 to-amber-600 text-white border-0 shadow-2xl hover:shadow-amber-500/25 transition-all duration-500 hover:scale-[1.02] transform cursor-pointer"
          onClick={() => setCurrentScreen('subscriptions')}
          data-tutorial="subscriptions"
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                  <Crown size={28} className="text-white" />
                </div>
                <div>
                  <p className="font-inter font-semibold text-lg">Upgrade Premium</p>
                  <p className="font-serif text-xl font-bold">Desbloqueie todo o potencial</p>
                </div>
              </div>
              <Button 
                className="bg-white text-amber-600 hover:bg-gray-100 font-inter font-semibold px-6 py-3 rounded-2xl shadow-lg"
              >
                Ver Planos
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Ações Rápidas Premium */}
        <div className="grid grid-cols-2 gap-6">
          <Button 
            onClick={() => setCurrentScreen('diary')}
            className="h-24 bg-white/80 backdrop-blur-xl hover:bg-white border-2 border-gray-200/50 hover:border-purple-300 text-gray-900 flex-col space-y-3 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 transform rounded-3xl"
            variant="outline"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center">
              <PenTool size={28} className="text-white" />
            </div>
            <span className="font-inter font-semibold text-lg">Diário</span>
          </Button>
          <Button 
            onClick={() => setCurrentScreen('prayer-guide')}
            className="h-24 bg-white/80 backdrop-blur-xl hover:bg-white border-2 border-gray-200/50 hover:border-emerald-300 text-gray-900 flex-col space-y-3 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 transform rounded-3xl"
            variant="outline"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center">
              <HandHeart size={28} className="text-white" />
            </div>
            <span className="font-inter font-semibold text-lg">Como Orar</span>
          </Button>
        </div>

        {/* Consolidação do Dia */}
        <Card className="bg-white/80 backdrop-blur-xl border-0 shadow-xl hover:shadow-2xl transition-all duration-500">
          <CardHeader className="pb-4">
            <CardTitle className="font-serif text-2xl flex items-center">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mr-3">
                <CheckCircle className="text-white" size={24} />
              </div>
              <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">Consolidação do Dia</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockHabits.map((habit, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50/50 rounded-2xl">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    habit.completed ? 'bg-gradient-to-br from-emerald-500 to-teal-600' : 'bg-gray-200'
                  }`}>
                    {habit.completed ? (
                      <Check size={20} className="text-white" />
                    ) : (
                      <X size={20} className="text-gray-400" />
                    )}
                  </div>
                  <span className="font-inter font-semibold text-gray-900">{habit.name}</span>
                </div>
                <Badge className={habit.completed ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-600'}>
                  {habit.completed ? 'Completo' : 'Pendente'}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Bottom Navigation Premium */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-gray-200/50 px-2 sm:px-6 py-3 sm:py-4 shadow-2xl">
        <div className="flex justify-around items-center max-w-md mx-auto">
          {[
            { icon: Home, label: 'Início', screen: 'home' },
            { icon: BookOpen, label: 'Bíblia', screen: 'bible' },
            { icon: PenTool, label: 'Diário', screen: 'diary' },
            { icon: HandHeart, label: 'Oração', screen: 'prayer-guide' },
            { icon: User, label: 'Perfil', screen: 'profile' }
          ].map((item) => (
            <Button
              key={item.screen}
              variant="ghost"
              size="sm"
              onClick={() => setCurrentScreen(item.screen)}
              className={`flex-col space-y-1 h-auto py-2 px-2 sm:px-4 rounded-2xl transition-all duration-300 min-w-0 ${
                currentScreen === item.screen 
                  ? 'text-indigo-600 bg-indigo-50 shadow-lg' 
                  : 'text-gray-600 hover:text-indigo-600 hover:bg-indigo-50'
              }`}
            >
              <item.icon size={20} className="flex-shrink-0" />
              <span className="font-inter text-xs font-medium truncate">{item.label}</span>
            </Button>
          ))}
        </div>
      </div>

      {/* Dialog de Tela de Bloqueio */}
      <Dialog open={showLockScreenDialog} onOpenChange={setShowLockScreenDialog}>
        <DialogContent className="sm:max-w-md bg-white rounded-3xl">
          <DialogHeader>
            <DialogTitle className="font-serif text-2xl font-bold text-gray-900 flex items-center">
              <Smartphone className="mr-3 text-indigo-600" size={28} />
              Tela de Bloqueio
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-2xl">
              <p className="font-inter text-gray-700 text-lg leading-relaxed mb-4">
                Baixe o versículo do dia como imagem e defina como papel de parede da tela de bloqueio do seu celular.
              </p>
              <div className="flex items-start space-x-3 text-sm text-gray-600">
                <div className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check size={14} className="text-indigo-600" />
                </div>
                <p className="font-inter">Versículo atualizado diariamente</p>
              </div>
              <div className="flex items-start space-x-3 text-sm text-gray-600 mt-2">
                <div className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check size={14} className="text-indigo-600" />
                </div>
                <p className="font-inter">Design otimizado para celular</p>
              </div>
            </div>

            <div className="space-y-3">
              <Button
                onClick={generateLockScreenImage}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 font-inter font-semibold py-4 rounded-2xl shadow-xl"
              >
                <Download className="mr-3" size={20} />
                Baixar Imagem
              </Button>
              
              <div className="bg-amber-50 border-2 border-amber-200 p-4 rounded-2xl">
                <p className="font-inter text-amber-800 text-sm font-semibold mb-2">
                  📱 Como configurar:
                </p>
                <ol className="font-inter text-amber-700 text-sm space-y-1 list-decimal list-inside">
                  <li>Baixe a imagem acima</li>
                  <li>Abra as Configurações do celular</li>
                  <li>Vá em "Papel de Parede"</li>
                  <li>Selecione a imagem baixada</li>
                  <li>Defina como "Tela de Bloqueio"</li>
                </ol>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )

  const renderDiary = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50 pb-24">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-xl shadow-xl border-b border-gray-100/50 p-6">
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="icon" onClick={() => setCurrentScreen('home')} className="hover:bg-gray-100 rounded-2xl">
            <ArrowRight className="rotate-180" size={24} />
          </Button>
          <h1 className="font-serif text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">Diário Espiritual</h1>
          <div className="w-10" />
        </div>
      </div>

      <div className="p-6 space-y-8">
        {/* Nova Entrada */}
        <Card className="bg-white/80 backdrop-blur-xl border-0 shadow-xl hover:shadow-2xl transition-all duration-500">
          <CardHeader className="pb-4">
            <CardTitle className="font-serif text-2xl flex items-center">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mr-3">
                <PenTool className="text-white" size={24} />
              </div>
              <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">Nova Anotação</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <Tabs value={currentDiaryType} onValueChange={(v) => setCurrentDiaryType(v as any)}>
              <TabsList className="grid w-full grid-cols-3 mb-6 bg-gray-100 p-2 rounded-2xl">
                <TabsTrigger value="gratitude" className="font-inter font-semibold rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-teal-600 data-[state=active]:text-white">
                  Gratidão
                </TabsTrigger>
                <TabsTrigger value="request" className="font-inter font-semibold rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-orange-600 data-[state=active]:text-white">
                  Pedido
                </TabsTrigger>
                <TabsTrigger value="reflection" className="font-inter font-semibold rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-purple-600 data-[state=active]:text-white">
                  Reflexão
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <Textarea
              placeholder={
                currentDiaryType === 'gratitude' 
                  ? "Hoje sou grato(a) por..." 
                  : currentDiaryType === 'request'
                  ? "Senhor, eu preciso de..."
                  : "Hoje aprendi que..."
              }
              value={diaryEntry}
              onChange={(e) => setDiaryEntry(e.target.value)}
              className="min-h-[150px] font-inter text-lg border-2 border-gray-200 rounded-2xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-300"
            />

            <Button 
              onClick={saveDiaryEntry}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 font-inter font-semibold py-4 rounded-2xl shadow-xl hover:shadow-purple-500/25 transition-all duration-300"
            >
              <Save className="mr-3" size={20} />
              Salvar Anotação
            </Button>
          </CardContent>
        </Card>

        {/* Entradas Anteriores */}
        <div>
          <h3 className="font-serif text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-6">
            Minhas Anotações
          </h3>
          {diaryEntries.length === 0 ? (
            <Card className="bg-white/80 backdrop-blur-xl border-0 shadow-lg">
              <CardContent className="p-12 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
                  <BookMarked className="text-white" size={40} />
                </div>
                <p className="font-inter text-gray-600 text-lg">
                  Você ainda não tem anotações. Comece seu diário espiritual agora!
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {diaryEntries.map((entry) => (
                <Card key={entry.id} className="bg-white/80 backdrop-blur-xl border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <Badge className={
                          entry.type === 'gratitude' 
                            ? 'bg-emerald-100 text-emerald-700' 
                            : entry.type === 'request'
                            ? 'bg-amber-100 text-amber-700'
                            : 'bg-indigo-100 text-indigo-700'
                        }>
                          {entry.type === 'gratitude' ? 'Gratidão' : entry.type === 'request' ? 'Pedido' : 'Reflexão'}
                        </Badge>
                        <span className="font-inter text-gray-500 text-sm">
                          {new Date(entry.date).toLocaleDateString('pt-BR', { 
                            day: '2-digit', 
                            month: 'long', 
                            year: 'numeric' 
                          })}
                        </span>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => deleteDiaryEntry(entry.id)}
                        className="hover:bg-red-50 hover:text-red-600 rounded-xl"
                      >
                        <Trash2 size={18} />
                      </Button>
                    </div>
                    <p className="font-inter text-gray-700 text-lg leading-relaxed">
                      {entry.content}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )

  const renderPrayerGuide = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50 pb-24">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-xl shadow-xl border-b border-gray-100/50 p-6">
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="icon" onClick={() => setCurrentScreen('home')} className="hover:bg-gray-100 rounded-2xl">
            <ArrowRight className="rotate-180" size={24} />
          </Button>
          <h1 className="font-serif text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">Como Orar</h1>
          <div className="w-10" />
        </div>
      </div>

      <div className="p-6 space-y-8">
        {/* Introdução */}
        <Card className="bg-gradient-to-br from-emerald-600 via-teal-600 to-emerald-800 text-white border-0 shadow-2xl hover:shadow-emerald-500/25 transition-all duration-500">
          <CardContent className="p-8">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                <BookOpen size={32} className="text-white" />
              </div>
              <div>
                <h2 className="font-serif text-3xl font-bold">Aprenda a Orar</h2>
                <p className="font-inter text-emerald-100 text-lg">Método ACTS de Oração</p>
              </div>
            </div>
            <p className="font-inter text-white/90 text-lg leading-relaxed">
              A oração é uma conversa com Deus. Não existe uma fórmula mágica, mas podemos seguir um guia bíblico para tornar nossas orações mais profundas e significativas.
            </p>
          </CardContent>
        </Card>

        {/* Passos da Oração */}
        <div>
          <h3 className="font-serif text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-6">
            5 Passos para uma Oração Poderosa
          </h3>
          <div className="space-y-6">
            {prayerGuide.map((step, index) => (
              <Card key={index} className="bg-white/80 backdrop-blur-xl border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] transform">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0">
                      <step.icon size={28} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-inter font-bold text-gray-900 text-xl mb-2">{step.step}</h4>
                      <p className="font-inter text-gray-600 mb-3 text-lg">{step.description}</p>
                      <div className="bg-emerald-50 p-4 rounded-xl border-l-4 border-emerald-500">
                        <p className="font-inter text-emerald-800 italic">"{step.example}"</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Horários de Oração */}
        <div>
          <h3 className="font-serif text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-6">
            Horários Bíblicos de Oração
          </h3>
          <div className="space-y-4">
            {prayerTimes.map((time, index) => (
              <Card key={index} className="bg-white/80 backdrop-blur-xl border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-14 h-14 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
                        <time.icon size={28} className="text-white" />
                      </div>
                      <div>
                        <p className="font-inter font-bold text-gray-900 text-xl">{time.time} - {time.name}</p>
                        <p className="font-inter text-gray-600 italic">"{time.verse}"</p>
                        <p className="font-inter text-gray-500 text-sm">{time.reference}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Configurações de Notificação */}
        <Card className="bg-white/80 backdrop-blur-xl border-0 shadow-xl">
          <CardHeader>
            <CardTitle className="font-serif text-2xl flex items-center">
              <Bell className="mr-3 text-indigo-600" size={24} />
              <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">Lembretes de Oração</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
              <div>
                <p className="font-inter font-semibold text-gray-900 text-lg">Ativar Notificações</p>
                <p className="font-inter text-gray-600">Receba lembretes nos horários bíblicos</p>
              </div>
              <Switch 
                checked={prayerNotifications}
                onCheckedChange={setPrayerNotifications}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const renderBible = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50 pb-24">
      {/* Header Premium */}
      <div className="bg-white/80 backdrop-blur-xl shadow-xl border-b border-gray-100/50 p-6">
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="icon" onClick={() => setCurrentScreen('home')} className="hover:bg-gray-100 rounded-2xl">
            <ArrowRight className="rotate-180" size={24} />
          </Button>
          <h1 className="font-serif text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">Bíblia Sagrada</h1>
          <Button variant="ghost" size="icon" className="hover:bg-gray-100 rounded-2xl">
            <Search size={24} />
          </Button>
        </div>
      </div>

      <div className="p-6 space-y-8">
        {/* Leitura Atual Premium */}
        <Card className="bg-gradient-to-br from-emerald-600 via-teal-600 to-emerald-800 text-white border-0 shadow-2xl hover:shadow-emerald-500/25 transition-all duration-500 hover:scale-[1.02] transform">
          <CardContent className="p-8">
            <div className="flex items-center justify-between mb-6">
              <Badge className="bg-white/20 text-white border-0 font-inter px-4 py-2 backdrop-blur-sm">Leitura Atual</Badge>
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 rounded-2xl">
                <Play size={20} />
              </Button>
            </div>
            <h2 className="font-serif text-4xl font-bold mb-3">Salmos 23</h2>
            <p className="font-inter text-emerald-100 mb-6 text-xl">O Senhor é o meu pastor</p>
            <Button className="bg-white text-emerald-600 hover:bg-gray-100 font-inter font-semibold px-8 py-3 rounded-2xl shadow-lg">
              Continuar Leitura
            </Button>
          </CardContent>
        </Card>

        {/* Livros da Bíblia Premium */}
        <div>
          <h3 className="font-serif text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-6">Livros da Bíblia</h3>
          <Tabs defaultValue="old" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6 bg-white/80 backdrop-blur-xl p-2 rounded-2xl shadow-lg">
              <TabsTrigger value="old" className="font-inter font-semibold rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-purple-600 data-[state=active]:text-white">Antigo Testamento</TabsTrigger>
              <TabsTrigger value="new" className="font-inter font-semibold rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-purple-600 data-[state=active]:text-white">Novo Testamento</TabsTrigger>
            </TabsList>
            <TabsContent value="old" className="space-y-3">
              {['Gênesis', 'Êxodo', 'Levítico', 'Números', 'Deuteronômio', 'Josué'].map((book) => (
                <Card key={book} className="bg-white/80 backdrop-blur-xl border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] transform">
                  <CardContent className="p-5 flex items-center justify-between">
                    <span className="font-inter font-semibold text-gray-900 text-lg">{book}</span>
                    <ChevronRight size={20} className="text-gray-400" />
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
            <TabsContent value="new" className="space-y-3">
              {['Mateus', 'Marcos', 'Lucas', 'João', 'Atos', 'Romanos'].map((book) => (
                <Card key={book} className="bg-white/80 backdrop-blur-xl border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] transform">
                  <CardContent className="p-5 flex items-center justify-between">
                    <span className="font-inter font-semibold text-gray-900 text-lg">{book}</span>
                    <ChevronRight size={20} className="text-gray-400" />
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </div>

        {/* Planos de Leitura Premium */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-serif text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">Planos de Leitura</h3>
            <Button variant="ghost" size="sm" onClick={() => setCurrentScreen('reading-plans')} className="text-indigo-600 hover:bg-indigo-50 rounded-2xl">
              Ver todos
            </Button>
          </div>
          <div className="space-y-4">
            {mockReadingPlans.map((plan) => (
              <Card key={plan.id} className="bg-white/80 backdrop-blur-xl border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] transform">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-inter font-bold text-gray-900 text-lg">{plan.title}</span>
                    <Badge variant="outline" className="font-inter border-2 border-indigo-200 text-indigo-600 px-3 py-1">{plan.days} dias</Badge>
                  </div>
                  <Progress value={plan.progress} className="h-3 mb-3 bg-gray-200" />
                  <p className="font-inter text-gray-600 font-medium">{plan.progress}% completo</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  const renderProfile = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 pb-24">
      {/* Header Premium */}
      <div className="bg-white/80 backdrop-blur-xl shadow-xl border-b border-gray-100/50 p-6">
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="icon" onClick={() => setCurrentScreen('home')} className="hover:bg-gray-100 rounded-2xl">
            <ArrowRight className="rotate-180" size={24} />
          </Button>
          <h1 className="font-serif text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">Perfil</h1>
          <Button variant="ghost" size="icon" onClick={() => setCurrentScreen('settings')} className="hover:bg-gray-100 rounded-2xl">
            <Settings size={24} />
          </Button>
        </div>
      </div>

      <div className="space-y-8 pb-8">
        {/* Profile Header com Capa e Foto */}
        <div className="relative">
          {/* Foto de Capa */}
          <div className="relative h-48 bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-800 overflow-hidden">
            {coverPhoto ? (
              <img src={coverPhoto} alt="Capa" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-800" />
            )}
          </div>

          {/* Foto de Perfil */}
          <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
            <div className="relative">
              <Avatar className="w-32 h-32 ring-8 ring-white shadow-2xl">
                {profilePhoto ? (
                  <AvatarImage src={profilePhoto} alt={userName} />
                ) : (
                  <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white text-5xl font-inter font-bold">
                    {userName.charAt(0) || 'U'}
                  </AvatarFallback>
                )}
              </Avatar>
            </div>
          </div>
        </div>

        {/* Nome e Botão Editar */}
        <div className="pt-20 px-6 text-center">
          <h2 className="font-serif text-3xl font-bold text-gray-900 mb-2">{userName || 'Usuário'}</h2>
          <p className="font-inter text-gray-600 mb-6 text-lg">Membro há 3 meses</p>
          
          <Button 
            onClick={handleEditProfile}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 font-inter font-semibold px-8 py-3 rounded-2xl shadow-xl hover:shadow-indigo-500/25 transition-all duration-300"
          >
            <Edit className="mr-2" size={20} />
            Editar Perfil
          </Button>
        </div>

        {/* Stats */}
        <div className="px-6">
          <Card className="bg-white/80 backdrop-blur-xl border-0 shadow-xl">
            <CardContent className="p-6">
              <div className="flex justify-around">
                <div className="text-center">
                  <p className="font-inter text-3xl font-bold text-gray-900 mb-1">12</p>
                  <p className="font-inter text-gray-600 font-medium">Dias seguidos</p>
                </div>
                <div className="text-center">
                  <p className="font-inter text-3xl font-bold text-gray-900 mb-1">8</p>
                  <p className="font-inter text-gray-600 font-medium">Conquistas</p>
                </div>
                <div className="text-center">
                  <p className="font-inter text-3xl font-bold text-gray-900 mb-1">156</p>
                  <p className="font-inter text-gray-600 font-medium">Orações</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Conquistas Premium */}
        <div className="px-6">
          <h3 className="font-serif text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-6">Conquistas Recentes</h3>
          <div className="grid grid-cols-2 gap-6">
            <Card className="bg-white/80 backdrop-blur-xl border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 transform">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-2xl">
                  <Crown className="text-white" size={32} />
                </div>
                <p className="font-inter font-bold text-gray-900 text-lg">Guerreiro da Oração</p>
                <p className="font-inter text-gray-600 font-medium">7 dias seguidos</p>
              </CardContent>
            </Card>
            <Card className="bg-white/80 backdrop-blur-xl border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 transform">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-2xl">
                  <Shield className="text-white" size={32} />
                </div>
                <p className="font-inter font-bold text-gray-900 text-lg">Leitor Dedicado</p>
                <p className="font-inter text-gray-600 font-medium">50 capítulos</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Hábitos Premium */}
        <div className="px-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-serif text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">Hábitos Espirituais</h3>
          </div>
          <div className="space-y-4">
            {mockHabits.slice(0, 3).map((habit, index) => (
              <Card key={index} className="bg-white/80 backdrop-blur-xl border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg ${
                        habit.completed 
                          ? 'bg-gradient-to-br from-emerald-500 to-teal-600' 
                          : 'bg-gray-200'
                      }`}>
                        <habit.icon 
                          size={24} 
                          className={habit.completed ? 'text-white' : 'text-gray-400'} 
                        />
                      </div>
                      <div>
                        <p className="font-inter font-bold text-gray-900 text-lg">{habit.name}</p>
                        <p className="font-inter text-gray-600 font-medium">{habit.streak} dias seguidos</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
                        <Flame className="text-white" size={20} />
                      </div>
                      <span className="font-inter font-bold text-amber-600 text-xl">{habit.streak}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Modal de Edição de Perfil */}
      <Dialog open={editProfileOpen} onOpenChange={setEditProfileOpen}>
        <DialogContent className="sm:max-w-md bg-white rounded-3xl p-0 overflow-hidden">
          <DialogHeader className="p-6 pb-4 bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-800 text-white">
            <DialogTitle className="font-serif text-2xl font-bold">Editar Perfil</DialogTitle>
          </DialogHeader>
          <div className="p-6 space-y-6">
            {/* Upload de Foto de Capa */}
            <div>
              <Label className="font-inter font-semibold text-gray-900 mb-3 block">Foto de Capa</Label>
              <div className="relative h-32 bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-800 rounded-2xl overflow-hidden group cursor-pointer">
                {tempCoverPhoto ? (
                  <img src={tempCoverPhoto} alt="Capa" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-800" />
                )}
                <label className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                  <div className="text-center">
                    <Camera className="text-white mx-auto mb-2" size={32} />
                    <p className="font-inter text-white font-semibold">Alterar Capa</p>
                  </div>
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleCoverPhotoChange}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {/* Upload de Foto de Perfil */}
            <div>
              <Label className="font-inter font-semibold text-gray-900 mb-3 block">Foto de Perfil</Label>
              <div className="flex justify-center">
                <div className="relative group cursor-pointer">
                  <Avatar className="w-32 h-32 ring-4 ring-gray-200">
                    {tempProfilePhoto ? (
                      <AvatarImage src={tempProfilePhoto} alt={tempUserName} />
                    ) : (
                      <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white text-5xl font-inter font-bold">
                        {tempUserName.charAt(0) || 'U'}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <label className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                    <Camera className="text-white" size={32} />
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleProfilePhotoChange}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            </div>

            {/* Nome */}
            <div>
              <Label htmlFor="name" className="font-inter font-semibold text-gray-900 mb-3 block">Nome</Label>
              <Input
                id="name"
                value={tempUserName}
                onChange={(e) => setTempUserName(e.target.value)}
                placeholder="Seu nome"
                className="font-inter text-lg border-2 border-gray-200 rounded-2xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300"
              />
            </div>

            {/* Botões */}
            <div className="flex space-x-4 pt-4">
              <Button
                variant="outline"
                onClick={() => setEditProfileOpen(false)}
                className="flex-1 font-inter font-semibold py-3 rounded-2xl border-2 border-gray-200 hover:bg-gray-50"
              >
                Cancelar
              </Button>
              <Button
                onClick={handleSaveProfile}
                className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 font-inter font-semibold py-3 rounded-2xl shadow-xl"
              >
                Salvar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )

  // Render adicional para outras telas
  const renderOtherScreens = () => {
    const screens = {
      devotional: { title: 'Devocional', icon: Heart },
      'reading-plans': { title: 'Planos de Leitura', icon: BookOpen },
      habits: { title: 'Hábitos Espirituais', icon: Clock },
      challenges: { title: 'Desafios', icon: Target },
      sermons: { title: 'Sermões & Louvor', icon: Music },
      calendar: { title: 'Agenda', icon: Calendar },
      donations: { title: 'Doações', icon: DollarSign },
      mentorship: { title: 'Mentoria', icon: MessageCircle },
      notifications: { title: 'Notificações', icon: Bell },
      settings: { title: 'Configurações', icon: Settings },
      subscriptions: { title: 'Assinaturas', icon: Crown }
    }

    const screen = screens[currentScreen as keyof typeof screens]
    if (!screen) return null

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 pb-24">
        {/* Header Premium */}
        <div className="bg-white/80 backdrop-blur-xl shadow-xl border-b border-gray-100/50 p-6">
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="icon" onClick={() => setCurrentScreen('home')} className="hover:bg-gray-100 rounded-2xl">
              <ArrowRight className="rotate-180" size={24} />
            </Button>
            <h1 className="font-serif text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">{screen.title}</h1>
            <div className="w-10" />
          </div>
        </div>

        <div className="p-6">
          <Card className="bg-white/80 backdrop-blur-xl border-0 shadow-2xl hover:shadow-indigo-500/25 transition-all duration-500">
            <CardContent className="p-12 text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl">
                <screen.icon className="text-white" size={48} />
              </div>
              <h2 className="font-serif text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-4">{screen.title}</h2>
              <p className="font-inter text-gray-600 mb-8 text-xl leading-relaxed">
                Esta funcionalidade está sendo desenvolvida com muito carinho para você.
              </p>
              <Button 
                onClick={() => setCurrentScreen('home')}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 font-inter font-semibold px-8 py-4 rounded-2xl shadow-xl hover:shadow-indigo-500/25 transition-all duration-300 hover:scale-105 transform"
              >
                Voltar ao Início
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  // Main render
  if (currentScreen === 'onboarding') return renderOnboarding()
  if (currentScreen === 'home') return renderHome()
  if (currentScreen === 'bible') return renderBible()
  if (currentScreen === 'diary') return renderDiary()
  if (currentScreen === 'prayer-guide') return renderPrayerGuide()
  if (currentScreen === 'profile') return renderProfile()
  if (currentScreen === 'subscriptions') {
    router.push('/assinaturas')
    return null
  }
  
  return renderOtherScreens()
}
