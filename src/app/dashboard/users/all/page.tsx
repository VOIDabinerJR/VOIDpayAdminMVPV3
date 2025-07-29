'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import {
  Users,
  UserCheck,
  Search,
  MoreHorizontal,
  Shield,
  User,
  UserCog
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

const users = [
  {
    id: 'USR001',
    name: 'John Doe',
    email: 'john.doe@example.com',
    type: 'merchant',
    status: 'active',
    joinDate: '2024-01-10',
    lastLogin: '2024-01-15 14:30:25',
    walletBalance: 2500.0
  },
  {
    id: 'USR002',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    type: 'customer',
    status: 'active',
    joinDate: '2024-01-12',
    lastLogin: '2024-01-15 13:45:10',
    walletBalance: 150.0
  },
  {
    id: 'USR003',
    name: 'Mike Wilson',
    email: 'mike.wilson@example.com',
    type: 'merchant',
    status: 'suspended',
    joinDate: '2024-01-08',
    lastLogin: '2024-01-14 12:20:45',
    walletBalance: 750.5
  },
  {
    id: 'USR004',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@example.com',
    type: 'customer',
    status: 'inactive',
    joinDate: '2024-01-05',
    lastLogin: '2024-01-13 11:15:30',
    walletBalance: 0.0
  },
  {
    id: 'USR005',
    name: 'Admin User',
    email: 'admin@example.com',
    type: 'admin',
    status: 'active',
    joinDate: '2024-01-01',
    lastLogin: '2024-01-15 10:05:12',
    walletBalance: 0.0
  },
  {
    id: 'USR006',
    name: 'Support Agent',
    email: 'support@example.com',
    type: 'support',
    status: 'active',
    joinDate: '2024-01-03',
    lastLogin: '2024-01-15 09:30:00',
    walletBalance: 0.0
  }
];

const userTypeLabels: Record<string, string> = {
  admin: 'Administrador',
  merchant: 'Comerciante',
  customer: 'Cliente',
  support: 'Suporte'
};

const userTypeIcons: Record<string, React.ReactNode> = {
  admin: <UserCog className='h-4 w-4' />,
  merchant: <Shield className='h-4 w-4' />,
  customer: <User className='h-4 w-4' />,
  support: <UserCheck className='h-4 w-4' />
};

export default function UserManagement() {
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [actionType, setActionType] = useState<
    'activate' | 'deactivate' | 'suspend' | null
  >(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const { toast } = useToast();

  const handleUserAction = (
    user: any,
    action: 'activate' | 'deactivate' | 'suspend'
  ) => {
    setSelectedUser(user);
    setActionType(action);
  };

  const confirmAction = () => {
    if (!selectedUser || !actionType) return;

    toast({
      title: `Usuário ${actionType === 'activate' ? 'ativado' : actionType === 'deactivate' ? 'desativado' : 'suspenso'}`,
      description: `O usuário ${selectedUser.email} foi ${actionType === 'activate' ? 'ativado' : actionType === 'deactivate' ? 'desativado' : 'suspenso'} com sucesso.`
    });

    setSelectedUser(null);
    setActionType(null);
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === 'all' || user.status === statusFilter;
    const matchesType = typeFilter === 'all' || user.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const activeUsers = users.filter((u) => u.status === 'active').length;
  const totalUsers = users.length;
  const merchantUsers = users.filter((u) => u.type === 'merchant').length;
  const adminUsers = users.filter((u) => u.type === 'admin').length;

  return (
    <div className='flex flex-col'>
      <header className='flex h-16 shrink-0 items-center gap-2 border-b px-4'>
        <SidebarTrigger className='-ml-1' />
        <div className='flex-1'>
          <h1 className='text-lg font-semibold'>Gestão de Usuários</h1>
          <p className='text-muted-foreground text-sm'>
            Gerenciar todos os tipos de contas de usuário
          </p>
        </div>
      </header>

      <main className='flex-1 space-y-6 p-6'>
        {/* User Stats */}
        <div className='grid gap-4 md:grid-cols-4'>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Total de Usuários
              </CardTitle>
              <Users className='text-muted-foreground h-4 w-4' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>{totalUsers}</div>
              <p className='text-muted-foreground text-xs'>Todos os usuários</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Usuários Ativos
              </CardTitle>
              <UserCheck className='text-muted-foreground h-4 w-4' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>{activeUsers}</div>
              <p className='text-muted-foreground text-xs'>Atualmente ativos</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Comerciantes
              </CardTitle>
              <Shield className='text-muted-foreground h-4 w-4' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>{merchantUsers}</div>
              <p className='text-muted-foreground text-xs'>
                Contas de comerciantes
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Administradores
              </CardTitle>
              <UserCog className='text-muted-foreground h-4 w-4' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>{adminUsers}</div>
              <p className='text-muted-foreground text-xs'>
                Contas administrativas
              </p>
            </CardContent>
          </Card>
        </div>

        {/* User Management Table */}
        <Card>
          <CardHeader>
            <CardTitle>Contas de Usuário</CardTitle>
            <CardDescription>
              Visualizar e gerenciar todas as contas de usuário do sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Filters */}
            <div className='mb-6 flex flex-col gap-4 md:flex-row'>
              <div className='relative flex-1'>
                <Search className='text-muted-foreground absolute top-2.5 left-2 h-4 w-4' />
                <Input
                  placeholder='Buscar usuários...'
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className='pl-8'
                />
              </div>
              <div className='flex gap-4'>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className='w-[180px]'>
                    <SelectValue placeholder='Filtrar por status' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='all'>Todos status</SelectItem>
                    <SelectItem value='active'>Ativo</SelectItem>
                    <SelectItem value='inactive'>Inativo</SelectItem>
                    <SelectItem value='suspended'>Suspenso</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className='w-[180px]'>
                    <SelectValue placeholder='Filtrar por tipo' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='all'>Todos tipos</SelectItem>
                    <SelectItem value='admin'>Administrador</SelectItem>
                    <SelectItem value='merchant'>Comerciante</SelectItem>
                    <SelectItem value='customer'>Cliente</SelectItem>
                    <SelectItem value='support'>Suporte</SelectItem>
                  </SelectContent>
                </Select>
              </div>
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
                    <TableCell className='font-medium'>{user.id}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          user.type === 'admin'
                            ? 'default'
                            : user.type === 'merchant'
                              ? 'secondary'
                              : 'outline'
                        }
                        className='flex items-center gap-1'
                      >
                        {userTypeIcons[user.type]}
                        {userTypeLabels[user.type] || user.type}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          user.status === 'active'
                            ? 'default'
                            : user.status === 'suspended'
                              ? 'destructive'
                              : 'secondary'
                        }
                      >
                        {user.status === 'active'
                          ? 'Ativo'
                          : user.status === 'inactive'
                            ? 'Inativo'
                            : 'Suspenso'}
                      </Badge>
                    </TableCell>
                    <TableCell>${user.walletBalance.toFixed(2)}</TableCell>
                    <TableCell>
                      {new Date(user.lastLogin).toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant='ghost' className='h-8 w-8 p-0'>
                            <MoreHorizontal className='h-4 w-4' />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align='end'>
                          <DropdownMenuItem>Ver detalhes</DropdownMenuItem>
                          <DropdownMenuItem>Ver transações</DropdownMenuItem>
                          {user.status === 'active' ? (
                            <>
                              <DropdownMenuItem
                                onClick={() =>
                                  handleUserAction(user, 'suspend')
                                }
                                className='text-yellow-600'
                              >
                                Suspender conta
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() =>
                                  handleUserAction(user, 'deactivate')
                                }
                                className='text-red-600'
                              >
                                Desativar conta
                              </DropdownMenuItem>
                            </>
                          ) : (
                            <DropdownMenuItem
                              onClick={() => handleUserAction(user, 'activate')}
                              className='text-green-600'
                            >
                              Ativar conta
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
        <Dialog
          open={!!selectedUser}
          onOpenChange={() => setSelectedUser(null)}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {actionType === 'activate'
                  ? 'Ativar'
                  : actionType === 'deactivate'
                    ? 'Desativar'
                    : 'Suspender'}{' '}
                Conta de Usuário
              </DialogTitle>
              <DialogDescription>
                Tem certeza que deseja{' '}
                {actionType === 'activate'
                  ? 'ativar'
                  : actionType === 'deactivate'
                    ? 'desativar'
                    : 'suspender'}{' '}
                esta conta de usuário? Esta ação afetará o acesso ao sistema.
              </DialogDescription>
            </DialogHeader>

            {selectedUser && (
              <div className='space-y-4'>
                <div className='grid grid-cols-2 gap-4 text-sm'>
                  <div>
                    <strong>ID do Usuário:</strong> {selectedUser.id}
                  </div>
                  <div>
                    <strong>Nome:</strong> {selectedUser.name}
                  </div>
                  <div>
                    <strong>Email:</strong> {selectedUser.email}
                  </div>
                  <div>
                    <strong>Tipo:</strong>{' '}
                    {userTypeLabels[selectedUser.type] || selectedUser.type}
                  </div>
                  <div>
                    <strong>Status Atual:</strong>{' '}
                    {selectedUser.status === 'active'
                      ? 'Ativo'
                      : selectedUser.status === 'inactive'
                        ? 'Inativo'
                        : 'Suspenso'}
                  </div>
                </div>
              </div>
            )}

            <DialogFooter>
              <Button variant='outline' onClick={() => setSelectedUser(null)}>
                Cancelar
              </Button>
              <Button
                onClick={confirmAction}
                variant={actionType === 'activate' ? 'default' : 'destructive'}
              >
                {actionType === 'activate'
                  ? 'Ativar'
                  : actionType === 'deactivate'
                    ? 'Desativar'
                    : 'Suspender'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
}
