"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Search,
  Download,
  Shield,
  AlertTriangle,
  CheckCircle,
  XCircle,
  MapPin,
  Smartphone,
  Monitor,
  Globe,
  Clock,
} from "lucide-react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

const loginLogs = [
  {
    id: "LOG001",
    userId: "USR001",
    userName: "João Silva",
    userEmail: "joao.silva@exemplo.com",
    status: "success",
    timestamp: "2024-01-15 14:30:25",
    ipAddress: "192.168.1.100",
    device: "desktop",
    browser: "Chrome 120.0",
    os: "Windows 11",
    location: "São Paulo, SP",
    country: "Brasil",
    attempts: 1,
    sessionDuration: "2h 15m",
  },
  // ... (rest of your loginLogs data remains the same)
]

export default function LoginLogsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [deviceFilter, setDeviceFilter] = useState("all")
  const [locationFilter, setLocationFilter] = useState("all")

  const filteredLogs = loginLogs.filter((log) => {
    const matchesSearch =
      log.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.ipAddress.includes(searchTerm)
    const matchesStatus = statusFilter === "all" || log.status === statusFilter
    const matchesDevice = deviceFilter === "all" || log.device === deviceFilter
    const matchesLocation = locationFilter === "all" || log.country === locationFilter

    return matchesSearch && matchesStatus && matchesDevice && matchesLocation
  })

  const totalLogins = loginLogs.length
  const successfulLogins = loginLogs.filter((l) => l.status === "success").length
  const failedLogins = loginLogs.filter((l) => l.status === "failed").length
  const suspiciousLogins = loginLogs.filter((l) => l.status === "suspicious").length
  const blockedLogins = loginLogs.filter((l) => l.status === "blocked").length

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "failed":
        return <XCircle className="h-4 w-4 text-red-600" />
      case "blocked":
        return <Shield className="h-4 w-4 text-red-600" />
      case "suspicious":
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />
      case "logout":
        return <Clock className="h-4 w-4 text-blue-600" />
      default:
        return <Shield className="h-4 w-4 text-gray-600" />
    }
  }

  const getDeviceIcon = (device: string) => {
    switch (device) {
      case "desktop":
        return <Monitor className="h-4 w-4" />
      case "mobile":
        return <Smartphone className="h-4 w-4" />
      case "tablet":
        return <Globe className="h-4 w-4" />
      default:
        return <Monitor className="h-4 w-4" />
    }
  }

  const getStatusLabel = (status: string) => {
    const labels = {
      success: "Sucesso",
      failed: "Falhou",
      blocked: "Bloqueado",
      suspicious: "Suspeito",
      logout: "Logout",
    }
    return labels[status as keyof typeof labels] || status
  }

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <div className="flex-1">
          <h1 className="text-lg font-semibold">Logs de Login</h1>
          <p className="text-sm text-muted-foreground">Monitorar tentativas de login e atividades suspeitas</p>
        </div>
        <Button variant="outline" className="gap-2 bg-transparent">
          <Download className="h-4 w-4" />
          Exportar
        </Button>
      </header>

      <main className="flex-1 overflow-auto p-4 md:p-6">
        {/* Login Stats */}
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Logins</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalLogins}</div>
              <p className="text-xs text-muted-foreground">Tentativas registradas</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Logins Bem-sucedidos</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{successfulLogins}</div>
              <p className="text-xs text-muted-foreground">
                {((successfulLogins / totalLogins) * 100).toFixed(1)}% do total
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Logins Falhados</CardTitle>
              <XCircle className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{failedLogins}</div>
              <p className="text-xs text-muted-foreground">
                {((failedLogins / totalLogins) * 100).toFixed(1)}% do total
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Atividade Suspeita</CardTitle>
              <AlertTriangle className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{suspiciousLogins}</div>
              <p className="text-xs text-muted-foreground">Requer atenção</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Contas Bloqueadas</CardTitle>
              <Shield className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{blockedLogins}</div>
              <p className="text-xs text-muted-foreground">Por segurança</p>
            </CardContent>
          </Card>
        </div>

        {/* Login Logs Table */}
        <Card className="overflow-hidden">
          <CardHeader>
            <CardTitle>Histórico de Logins</CardTitle>
            <CardDescription>Registro detalhado de todas as tentativas de login</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Filters */}
            <div className="grid gap-4 mb-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-5">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar logs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os Status</SelectItem>
                  <SelectItem value="success">Sucesso</SelectItem>
                  <SelectItem value="failed">Falhou</SelectItem>
                  <SelectItem value="blocked">Bloqueado</SelectItem>
                  <SelectItem value="suspicious">Suspeito</SelectItem>
                  <SelectItem value="logout">Logout</SelectItem>
                </SelectContent>
              </Select>

              <Select value={deviceFilter} onValueChange={setDeviceFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Dispositivo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os Dispositivos</SelectItem>
                  <SelectItem value="desktop">Desktop</SelectItem>
                  <SelectItem value="mobile">Mobile</SelectItem>
                  <SelectItem value="tablet">Tablet</SelectItem>
                </SelectContent>
              </Select>

              <Select value={locationFilter} onValueChange={setLocationFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="País" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os Países</SelectItem>
                  <SelectItem value="Brasil">Brasil</SelectItem>
                  <SelectItem value="Estados Unidos">Estados Unidos</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="overflow-x-auto">
              <Table className="min-w-[1000px] md:min-w-full">
                <TableHeader>
                  <TableRow>
                    <TableHead>Usuário</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Dispositivo</TableHead>
                    <TableHead>Localização</TableHead>
                    <TableHead>IP</TableHead>
                    <TableHead>Tentativas</TableHead>
                    <TableHead>Duração</TableHead>
                    <TableHead>Data/Hora</TableHead>
                    <TableHead>Detalhes</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLogs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={`/placeholder.svg?height=32&width=32&text=${log.userName.charAt(0)}`} />
                            <AvatarFallback>{log.userName.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-sm">{log.userName}</p>
                            <p className="text-xs text-muted-foreground">{log.userEmail}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(log.status)}
                          <Badge
                            variant={
                              log.status === "success"
                                ? "default"
                                : log.status === "failed" || log.status === "blocked"
                                  ? "destructive"
                                  : log.status === "suspicious"
                                    ? "secondary"
                                    : "outline"
                            }
                          >
                            {getStatusLabel(log.status)}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getDeviceIcon(log.device)}
                          <div>
                            <p className="text-sm capitalize">{log.device}</p>
                            <p className="text-xs text-muted-foreground">{log.browser}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3 text-muted-foreground" />
                          <div>
                            <p className="text-sm">{log.location}</p>
                            <p className="text-xs text-muted-foreground">{log.country}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="font-mono text-xs">{log.ipAddress}</TableCell>
                      <TableCell>
                        <Badge variant={log.attempts > 1 ? "destructive" : "outline"}>{log.attempts}x</Badge>
                      </TableCell>
                      <TableCell className="text-sm">{log.sessionDuration || "-"}</TableCell>
                      <TableCell className="text-sm">
                        {format(new Date(log.timestamp), "dd/MM/yyyy HH:mm", { locale: ptBR })}
                      </TableCell>
                      <TableCell className="text-sm">{log.failureReason || log.suspiciousReason || "-"}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}