"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Users, UserCheck, Search, MoreHorizontal, Shield } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const users = [
  {
    id: "USR001",
    name: "John Doe",
    email: "john.doe@example.com",
    type: "merchant",
    status: "active",
    joinDate: "2024-01-10",
    lastLogin: "2024-01-15 14:30:25",
    walletBalance: 2500.0,
  },
  {
    id: "USR002",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    type: "customer",
    status: "active",
    joinDate: "2024-01-12",
    lastLogin: "2024-01-15 13:45:10",
    walletBalance: 150.0,
  },
  {
    id: "USR003",
    name: "Mike Wilson",
    email: "mike.wilson@example.com",
    type: "merchant",
    status: "suspended",
    joinDate: "2024-01-08",
    lastLogin: "2024-01-14 12:20:45",
    walletBalance: 750.5,
  },
  {
    id: "USR004",
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    type: "customer",
    status: "inactive",
    joinDate: "2024-01-05",
    lastLogin: "2024-01-13 11:15:30",
    walletBalance: 0.0,
  },
]

export default function UserManagement() {
  const [selectedUser, setSelectedUser] = useState<any>(null)
  const [actionType, setActionType] = useState<"activate" | "deactivate" | "suspend" | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const { toast } = useToast()

  const handleUserAction = (user: any, action: "activate" | "deactivate" | "suspend") => {
    setSelectedUser(user)
    setActionType(action)
  }

  const confirmAction = () => {
    if (!selectedUser || !actionType) return

    toast({
      title: `User ${actionType}d`,
      description: `User ${selectedUser.email} has been ${actionType}d successfully.`,
    })

    setSelectedUser(null)
    setActionType(null)
  }

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || user.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const activeUsers = users.filter((u) => u.status === "active").length
  const totalUsers = users.length
  const merchantUsers = users.filter((u) => u.type === "merchant").length

  return (
    <div className="flex flex-col">
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <div className="flex-1">
          <h1 className="text-lg font-semibold">Gestão de Usuários</h1>
          <p className="text-sm text-muted-foreground">Gerenciar contas de usuário e permissões</p>
        </div>
      </header>

      <main className="flex-1 space-y-6 p-6">
        {/* User Stats */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Usuários</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalUsers}</div>
              <p className="text-xs text-muted-foreground">Usuários registrados</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Usuários Ativos</CardTitle>
              <UserCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeUsers}</div>
              <p className="text-xs text-muted-foreground">Atualmente ativos</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Comerciantes</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{merchantUsers}</div>
              <p className="text-xs text-muted-foreground">Contas empresariais</p>
            </CardContent>
          </Card>
        </div>

        {/* User Management Table */}
        <Card>
          <CardHeader>
            <CardTitle>Contas de Usuário</CardTitle>
            <CardDescription>Visualizar e gerenciar todas as contas de usuário</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Filters */}
            <div className="flex gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar usuários..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID do Usuário</TableHead>
                  <TableHead>Nome</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Saldo da Carteira</TableHead>
                  <TableHead>Último Login</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.id}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Badge variant={user.type === "merchant" ? "default" : "secondary"}>{user.type}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          user.status === "active"
                            ? "default"
                            : user.status === "suspended"
                              ? "destructive"
                              : "secondary"
                        }
                      >
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell>${user.walletBalance.toFixed(2)}</TableCell>
                    <TableCell>{user.lastLogin}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>View Transactions</DropdownMenuItem>
                          {user.status === "active" ? (
                            <>
                              <DropdownMenuItem
                                onClick={() => handleUserAction(user, "suspend")}
                                className="text-yellow-600"
                              >
                                Suspend Account
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleUserAction(user, "deactivate")}
                                className="text-red-600"
                              >
                                Deactivate Account
                              </DropdownMenuItem>
                            </>
                          ) : (
                            <DropdownMenuItem
                              onClick={() => handleUserAction(user, "activate")}
                              className="text-green-600"
                            >
                              Activate Account
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Action Dialog */}
        <Dialog open={!!selectedUser} onOpenChange={() => setSelectedUser(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {actionType === "activate" ? "Activate" : actionType === "deactivate" ? "Deactivate" : "Suspend"} User
                Account
              </DialogTitle>
              <DialogDescription>
                Are you sure you want to {actionType} this user account? This action will affect their access to the
                platform.
              </DialogDescription>
            </DialogHeader>

            {selectedUser && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <strong>User ID:</strong> {selectedUser.id}
                  </div>
                  <div>
                    <strong>Name:</strong> {selectedUser.name}
                  </div>
                  <div>
                    <strong>Email:</strong> {selectedUser.email}
                  </div>
                  <div>
                    <strong>Current Status:</strong> {selectedUser.status}
                  </div>
                </div>
              </div>
            )}

            <DialogFooter>
              <Button variant="outline" onClick={() => setSelectedUser(null)}>
                Cancel
              </Button>
              <Button onClick={confirmAction} variant={actionType === "activate" ? "default" : "destructive"}>
                {actionType === "activate" ? "Activate" : actionType === "deactivate" ? "Deactivate" : "Suspend"} User
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  )
}
