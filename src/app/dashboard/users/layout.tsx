import PageContainer from '@/components/layout/page-container';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from '@/components/ui/card';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
  IconSearch,
  IconPlus,
  IconFilter,
  IconDotsVertical,
  IconEdit,
  IconTrash,
  IconUserCheck,
  IconUserX,
  IconShield,
  IconLock,
  IconRefresh,
  IconDownload,
  IconEye,
  IconMail,
  IconKey,
  IconAlertCircle
} from '@tabler/icons-react';
import React from 'react';

export default function UserManagementPage() {
  // Tipagem para status de usuário
  type UserStatus = 'active' | 'pending' | 'suspended';
  
  // Tipagem para usuário administrador
  type AdminUser = {
    id: number;
    name: string;
    email: string;
    role: string;
    status: UserStatus;
    lastActive: string;
    permissions: string;
    _2fa: boolean;
  };
  
    // Dados simulados de usuários administradores
    const adminUsers: AdminUser[] = [
      {
        id: 1,
        name: 'Carlos Silva',
        email: 'carlos@voidpay.com',
        role: 'Super Admin',
        status: 'active',
        lastActive: '10 minutos atrás',
        permissions: 'Full Access',
        _2fa: true
      },
      {
        id: 2,
        name: 'Ana Oliveira',
        email: 'ana@voidpay.com',
        role: 'Gateway Manager',
        status: 'active',
        lastActive: '1 hora atrás',
        permissions: 'Gateway Configuration',
        _2fa: true
      },
      {
        id: 3,
        name: 'Pedro Santos',
        email: 'pedro@voidpay.com',
        role: 'Support Admin',
        status: 'pending',
        lastActive: 'Nunca',
        permissions: 'User Support',
        _2fa: false
      },
      {
        id: 4,
        name: 'Mariana Costa',
        email: 'mariana@voidpay.com',
        role: 'Financial Admin',
        status: 'active',
        lastActive: '30 minutos atrás',
        permissions: 'Transactions, Reports',
        _2fa: true
      },
      {
        id: 5,
        name: 'Ricardo Almeida',
        email: 'ricardo@voidpay.com',
        role: 'Auditor',
        status: 'suspended',
        lastActive: '5 dias atrás',
        permissions: 'Read Only',
        _2fa: false
      },
      {
        id: 6,
        name: 'Fernanda Lima',
        email: 'fernanda@voidpay.com',
        role: 'Gateway Manager',
        status: 'active',
        lastActive: '2 horas atrás',
        permissions: 'Gateway Configuration',
        _2fa: true
      },
      {
        id: 7,
        name: 'Gustavo Pereira',
        email: 'gustavo@voidpay.com',
        role: 'Support Admin',
        status: 'active',
        lastActive: '45 minutos atrás',
        permissions: 'User Support',
        _2fa: false
      }
    ];
  
    const statusVariant: Record<UserStatus, "default" | "secondary" | "destructive" | "outline"> = {
      active: "default",
      pending: "secondary",
      suspended: "destructive"
    };

  return (
    <PageContainer>
      <div className="flex flex-1 flex-col space-y-4">
        {/* Cabeçalho com título e ações */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Gestão de Usuários Administrativos</h2>
            <p className="text-muted-foreground">
              Controle total sobre administradores e suas permissões
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline">
              <IconRefresh className="mr-2 h-4 w-4" />
              Atualizar
            </Button>
            <Button>
              <IconPlus className="mr-2 h-4 w-4" />
              Novo Administrador
            </Button>
          </div>
        </div>

        {/* Filtros e busca */}
        <Card>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
              <div className="md:col-span-2">
                <div className="relative">
                  <IconSearch className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Pesquisar administradores..."
                    className="pl-10"
                  />
                </div>
              </div>
              <div>
                <Button variant="outline" className="w-full">
                  <IconFilter className="mr-2 h-4 w-4" />
                  Filtrar
                </Button>
              </div>
              <div>
                <Button variant="outline" className="w-full">
                  <IconDownload className="mr-2 h-4 w-4" />
                  Exportar
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabela de usuários */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Administradores</CardTitle>
                <CardDescription>
                  {adminUsers.length} usuários administrativos encontrados
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <IconEye className="mr-2 h-4 w-4" />
                  Visualização
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Cargo</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Última Atividade</TableHead>
                  <TableHead>Permissões</TableHead>
                  <TableHead>2FA</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {adminUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                          <IconShield className="text-primary" />
                        </div>
                        {user.name}
                      </div>
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>
                      <Badge variant={statusVariant[user.status]}>
                        {user.status === 'active' && 'Ativo'}
                        {user.status === 'pending' && 'Pendente'}
                        {user.status === 'suspended' && 'Suspenso'}
                      </Badge>
                    </TableCell>
                    <TableCell>{user.lastActive}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="max-w-[200px] truncate">
                        {user.permissions}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {user._2fa ? (
                        <Badge variant="secondary">Ativado</Badge>
                      ) : (
                        <Badge variant="destructive">Desativado</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <IconDotsVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <IconEye className="mr-2 h-4 w-4" />
                            Visualizar
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <IconEdit className="mr-2 h-4 w-4" />
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <IconMail className="mr-2 h-4 w-4" />
                            Reenviar Convite
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <IconKey className="mr-2 h-4 w-4" />
                            Redefinir Senha
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          {user.status === 'active' ? (
                            <DropdownMenuItem className="text-red-600">
                              <IconUserX className="mr-2 h-4 w-4" />
                              Suspender
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem className="text-green-600">
                              <IconUserCheck className="mr-2 h-4 w-4" />
                              Ativar
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">
                            <IconTrash className="mr-2 h-4 w-4" />
                            Remover
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter>
            <div className="flex w-full items-center justify-between">
              <div className="text-sm text-muted-foreground">
                Mostrando 1 a {adminUsers.length} de {adminUsers.length} administradores
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  Anterior
                </Button>
                <Button variant="outline" size="sm">
                  Próximo
                </Button>
              </div>
            </div>
          </CardFooter>
        </Card>

        {/* Cartões de resumo */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Administradores Ativos
              </CardTitle>
              <IconUserCheck className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {adminUsers.filter(u => u.status === 'active').length}
              </div>
              <p className="text-muted-foreground text-xs">
                +12.1% em relação ao mês passado
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Pendências de Aprovação
              </CardTitle>
              <IconAlertCircle className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {adminUsers.filter(u => u.status === 'pending').length}
              </div>
              <p className="text-muted-foreground text-xs">
                {adminUsers.filter(u => u.status === 'pending').length > 0 ? 
                 'Necessária ação imediata' : 'Nenhuma pendência'}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                2FA Desativado
              </CardTitle>
              <IconLock className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {adminUsers.filter(u => !u._2fa).length}
              </div>
              <p className="text-muted-foreground text-xs">
                {adminUsers.filter(u => !u._2fa).length > 0 ? 
                 'Risco de segurança' : 'Todos protegidos'}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Ações em massa */}
        <Card>
          <CardHeader>
            <CardTitle>Ações em Massa</CardTitle>
            <CardDescription>
              Operações aplicáveis a múltiplos usuários selecionados
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline">
                <IconMail className="mr-2 h-4 w-4" />
                Enviar Email
              </Button>
              <Button variant="outline">
                <IconUserCheck className="mr-2 h-4 w-4" />
                Ativar Selecionados
              </Button>
              <Button variant="outline">
                <IconUserX className="mr-2 h-4 w-4" />
                Suspender Selecionados
              </Button>
              <Button variant="outline">
                <IconKey className="mr-2 h-4 w-4" />
                Forçar 2FA
              </Button>
              <Button variant="destructive" className="ml-auto">
                <IconTrash className="mr-2 h-4 w-4" />
                Remover Selecionados
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
}