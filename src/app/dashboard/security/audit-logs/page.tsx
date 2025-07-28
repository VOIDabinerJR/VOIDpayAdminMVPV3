"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"
import { Shield, Eye, AlertTriangle, CheckCircle, Search, Calendar } from "lucide-react"

const auditLogs = [
  {
    id: "AUD001",
    timestamp: "2024-01-15 14:30:25",
    admin: "super.admin@voidpay.com",
    action: "withdrawal_approved",
    target: "WTH001",
    details: "Approved withdrawal request for $2,500.00",
    severity: "medium",
    ipAddress: "192.168.1.100",
  },
  {
    id: "AUD002",
    timestamp: "2024-01-15 14:25:10",
    admin: "super.admin@voidpay.com",
    action: "user_suspended",
    target: "USR003",
    details: "Suspended user account mike.wilson@example.com",
    severity: "high",
    ipAddress: "192.168.1.100",
  },
  {
    id: "AUD003",
    timestamp: "2024-01-15 14:20:45",
    admin: "super.admin@voidpay.com",
    action: "payment_link_disabled",
    target: "PL001",
    details: "Disabled payment link due to suspicious activity",
    severity: "high",
    ipAddress: "192.168.1.100",
  },
  {
    id: "AUD004",
    timestamp: "2024-01-15 14:15:30",
    admin: "super.admin@voidpay.com",
    action: "wallet_activated",
    target: "USR005",
    details: "Activated wallet for new user registration",
    severity: "low",
    ipAddress: "192.168.1.100",
  },
  {
    id: "AUD005",
    timestamp: "2024-01-15 14:10:15",
    admin: "super.admin@voidpay.com",
    action: "withdrawal_declined",
    target: "WTH004",
    details: "Declined withdrawal request for $3,200.00 - Insufficient verification",
    severity: "medium",
    ipAddress: "192.168.1.100",
  },
]

export default function AuditLogs() {
  const [searchTerm, setSearchTerm] = useState("")
  const [severityFilter, setSeverityFilter] = useState("all")
  const [actionFilter, setActionFilter] = useState("all")

  const filteredLogs = auditLogs.filter((log) => {
    const matchesSearch =
      log.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.admin.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.target.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSeverity = severityFilter === "all" || log.severity === severityFilter
    const matchesAction = actionFilter === "all" || log.action === actionFilter
    return matchesSearch && matchesSeverity && matchesAction
  })

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "high":
        return <AlertTriangle className="h-4 w-4 text-red-600" />
      case "medium":
        return <Eye className="h-4 w-4 text-yellow-600" />
      case "low":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      default:
        return <Shield className="h-4 w-4 text-gray-600" />
    }
  }

  const highSeverityCount = auditLogs.filter((log) => log.severity === "high").length
  const todayLogsCount = auditLogs.length // Assuming all logs are from today for demo
  const uniqueAdmins = new Set(auditLogs.map((log) => log.admin)).size

  return (
    <div className="flex flex-col">
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <div className="flex-1">
          <h1 className="text-lg font-semibold">Logs de Auditoria</h1>
          <p className="text-sm text-muted-foreground">Monitorar ações administrativas e mudanças do sistema</p>
        </div>
      </header>

      <main className="flex-1 space-y-6 p-6">
        {/* Audit Stats */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Eventos de Alta Severidade</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{highSeverityCount}</div>
              <p className="text-xs text-muted-foreground">Requerendo atenção</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ações de Hoje</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{todayLogsCount}</div>
              <p className="text-xs text-muted-foreground">Ações administrativas</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Admins Ativos</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{uniqueAdmins}</div>
              <p className="text-xs text-muted-foreground">Realizaram ações hoje</p>
            </CardContent>
          </Card>
        </div>

        {/* Audit Logs Table */}
        <Card>
          <CardHeader>
            <CardTitle>Ações Administrativas</CardTitle>
            <CardDescription>Log completo de todas as ações administrativas e mudanças do sistema</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Filters */}
            <div className="flex gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar logs de auditoria..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
              <Select value={severityFilter} onValueChange={setSeverityFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Severity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Severity</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
              <Select value={actionFilter} onValueChange={setActionFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Action Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Actions</SelectItem>
                  <SelectItem value="withdrawal_approved">Withdrawal Approved</SelectItem>
                  <SelectItem value="withdrawal_declined">Withdrawal Declined</SelectItem>
                  <SelectItem value="user_suspended">User Suspended</SelectItem>
                  <SelectItem value="payment_link_disabled">Payment Link Disabled</SelectItem>
                  <SelectItem value="wallet_activated">Wallet Activated</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>Admin</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>Target</TableHead>
                  <TableHead>Details</TableHead>
                  <TableHead>Severity</TableHead>
                  <TableHead>IP Address</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLogs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell className="font-medium">{log.timestamp}</TableCell>
                    <TableCell>{log.admin}</TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {log.action.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium">{log.target}</TableCell>
                    <TableCell className="max-w-xs truncate">{log.details}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getSeverityIcon(log.severity)}
                        <Badge
                          variant={
                            log.severity === "high"
                              ? "destructive"
                              : log.severity === "medium"
                                ? "secondary"
                                : "default"
                          }
                        >
                          {log.severity}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-sm">{log.ipAddress}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
