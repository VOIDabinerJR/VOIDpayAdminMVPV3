"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { Settings, Smartphone, Globe, Shield, Search, MoreHorizontal, Key } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const applications = [
  {
    id: "APP001",
    name: "E-commerce Store",
    developer: "john.doe@example.com",
    type: "web",
    status: "active",
    apiKey: "vp_live_1234567890abcdef",
    lastUsed: "2024-01-15 14:30:25",
    requests: 15420,
    permissions: ["payments", "webhooks", "refunds"],
  },
    {
    id: "APP003",
    name: "Subscription Service",
    developer: "mike.wilson@example.com",
    type: "web",
    status: "suspended",
    apiKey: "vp_live_567890abcdef1234",
    lastUsed: "2024-01-14 12:20:45",
    requests: 2340,
    permissions: ["payments", "subscriptions", "webhooks"],
  },
  {
    id: "APP004",
    name: "Point of Sale System",
    developer: "sarah.johnson@example.com",
    type: "desktop",
    status: "inactive",
    apiKey: "vp_live_def1234567890abc",
    lastUsed: "2024-01-13 11:15:30",
    requests: 890,
    permissions: ["payments"],
  },
  // ... (rest of your applications data remains the same)
]

export default function ApplicationManagement() {
  const [selectedApp, setSelectedApp] = useState<any>(null)
  const [actionType, setActionType] = useState<"enable" | "disable" | "suspend" | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const { toast } = useToast()

  const handleAppAction = (app: any, action: "enable" | "disable" | "suspend") => {
    setSelectedApp(app)
    setActionType(action)
  }

  const confirmAction = () => {
    if (!selectedApp || !actionType) return

    toast({
      title: `Application ${actionType}d`,
      description: `Application ${selectedApp.name} has been ${actionType}d successfully.`,
    })

    setSelectedApp(null)
    setActionType(null)
  }

  const handleToggleStatus = (appId: string, currentStatus: string) => {
    const newStatus = currentStatus === "active" ? "inactive" : "active"
    toast({
      title: "Application Updated",
      description: `Application ${appId} has been ${newStatus}.`,
    })
  }

  const filteredApps = applications.filter(
    (app) =>
      app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.developer.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const activeApps = applications.filter((app) => app.status === "active").length
  const totalRequests = applications.reduce((sum, app) => sum + app.requests, 0)
  const suspendedApps = applications.filter((app) => app.status === "suspended").length

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "mobile":
        return <Smartphone className="h-4 w-4" />
      case "web":
        return <Globe className="h-4 w-4" />
      case "desktop":
        return <Settings className="h-4 w-4" />
      default:
        return <Settings className="h-4 w-4" />
    }
  }

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <div className="flex-1">
          <h1 className="text-lg font-semibold">Gestão de Aplicações</h1>
          <p className="text-sm text-muted-foreground">Gerenciar aplicações conectadas e integrações</p>
        </div>
      </header>

      <main className="flex-1 overflow-auto p-4 md:p-6">
        {/* Application Stats */}
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Apps Ativos</CardTitle>
              <Settings className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeApps}</div>
              <p className="text-xs text-muted-foreground">Atualmente ativos</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Requisições de API</CardTitle>
              <Key className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalRequests.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Total de requisições</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Apps Suspensos</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{suspendedApps}</div>
              <p className="text-xs text-muted-foreground">Requerem atenção</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Apps</CardTitle>
              <Globe className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{applications.length}</div>
              <p className="text-xs text-muted-foreground">Apps registrados</p>
            </CardContent>
          </Card>
        </div>

        {/* Applications Table */}
        <Card className="overflow-hidden">
          <CardHeader>
            <CardTitle>Aplicações Conectadas</CardTitle>
            <CardDescription>Gerenciar aplicações e suas permissões de acesso</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Search */}
            <div className="flex gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar aplicações..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <Table className="min-w-[900px] md:min-w-full">
                <TableHeader>
                  <TableRow>
                    <TableHead>App ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Developer</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>API Requests</TableHead>
                    <TableHead>Last Used</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredApps.map((app) => (
                    <TableRow key={app.id}>
                      <TableCell className="font-medium">{app.id}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getTypeIcon(app.type)}
                          {app.name}
                        </div>
                      </TableCell>
                      <TableCell>{app.developer}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="capitalize">
                          {app.type}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            app.status === "active" ? "default" : app.status === "suspended" ? "destructive" : "secondary"
                          }
                        >
                          {app.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{app.requests.toLocaleString()}</TableCell>
                      <TableCell>{app.lastUsed}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Switch
                            checked={app.status === "active"}
                            onCheckedChange={() => handleToggleStatus(app.id, app.status)}
                            disabled={app.status === "suspended"}
                          />
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>View Details</DropdownMenuItem>
                              <DropdownMenuItem>View API Logs</DropdownMenuItem>
                              <DropdownMenuItem>Regenerate API Key</DropdownMenuItem>
                              {app.status === "active" && (
                                <DropdownMenuItem
                                  onClick={() => handleAppAction(app, "suspend")}
                                  className="text-yellow-600"
                                >
                                  Suspend App
                                </DropdownMenuItem>
                              )}
                              {app.status === "suspended" && (
                                <DropdownMenuItem
                                  onClick={() => handleAppAction(app, "enable")}
                                  className="text-green-600"
                                >
                                  Enable App
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuItem onClick={() => handleAppAction(app, "disable")} className="text-red-600">
                                Disable App
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Action Dialog */}
        <Dialog open={!!selectedApp} onOpenChange={() => setSelectedApp(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {actionType === "enable" ? "Enable" : actionType === "disable" ? "Disable" : "Suspend"} Application
              </DialogTitle>
              <DialogDescription>
                Are you sure you want to {actionType} this application? This will affect its access to the Voidpay API.
              </DialogDescription>
            </DialogHeader>

            {selectedApp && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <strong>App ID:</strong> {selectedApp.id}
                  </div>
                  <div>
                    <strong>Name:</strong> {selectedApp.name}
                  </div>
                  <div>
                    <strong>Developer:</strong> {selectedApp.developer}
                  </div>
                  <div>
                    <strong>Current Status:</strong> {selectedApp.status}
                  </div>
                </div>
                <div className="text-sm">
                  <strong>Permissions:</strong>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {selectedApp.permissions.map((permission: string) => (
                      <Badge key={permission} variant="outline" className="text-xs">
                        {permission}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <DialogFooter>
              <Button variant="outline" onClick={() => setSelectedApp(null)}>
                Cancel
              </Button>
              <Button onClick={confirmAction} variant={actionType === "enable" ? "default" : "destructive"}>
                {actionType === "enable" ? "Enable" : actionType === "disable" ? "Disable" : "Suspend"} Application
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  )
}