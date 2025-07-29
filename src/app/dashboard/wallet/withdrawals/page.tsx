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
  Search,
  MoreHorizontal,
  ArrowDownUp,
  Clock,
  CheckCircle,
  XCircle,
  DollarSign,
  AlertCircle,
  Filter,
  Download,
  Printer,
  Mail,
  User,
  Calendar,
  Banknote,
  Wallet,
  Building2,
  List,
  BarChart3,
  Eye,
  RefreshCw,
  FileText
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Textarea } from '@/components/ui/textarea';
import PageContainer from '@/components/layout/page-container';

// Tipos para os saques
type Withdrawal = {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  userType: 'customer' | 'merchant' | 'admin';
  amount: number;
  fee: number;
  netAmount: number;
  method: 'PIX' | 'TED' | 'DOC' | 'Boleto';
  accountNumber: string;
  bankName: string;
  bankCode: string;
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'canceled';
  requestedAt: string;
  processedAt: string | null;
  completedAt: string | null;
  failureReason?: string;
  documents?: {
    id: string;
    type: string;
    url: string;
  }[];
  ipAddress: string;
  device: string;
};

// Dados de exemplo mais completos
const withdrawals: Withdrawal[] = [
  {
    id: 'WDL001',
    userId: 'USR001',
    userName: 'John Doe',
    userEmail: 'john.doe@example.com',
    userType: 'merchant',
    amount: 1500.0,
    fee: 7.5,
    netAmount: 1492.5,
    method: 'TED',
    accountNumber: '12345-6',
    bankName: 'Banco do Brasil',
    bankCode: '001',
    status: 'pending',
    requestedAt: '2024-01-15 09:30:00',
    processedAt: null,
    completedAt: null,
    ipAddress: '189.45.210.101',
    device: 'iPhone 13 (iOS 16.5)',
    documents: [
      {
        id: 'DOC001',
        type: 'Comprovante de residência',
        url: '#'
      }
    ]
  },
  {
    id: 'WDL002',
    userId: 'USR002',
    userName: 'Jane Smith',
    userEmail: 'jane.smith@example.com',
    userType: 'customer',
    amount: 250.0,
    fee: 1.25,
    netAmount: 248.75,
    method: 'PIX',
    accountNumber: 'jane.smith@example.com',
    bankName: 'PIX',
    bankCode: 'PIX',
    status: 'completed',
    requestedAt: '2024-01-14 14:15:22',
    processedAt: '2024-01-14 15:30:00',
    completedAt: '2024-01-14 16:30:45',
    ipAddress: '177.220.18.65',
    device: 'Samsung Galaxy S22 (Android 13)'
  },
  {
    id: 'WDL003',
    userId: 'USR003',
    userName: 'Mike Wilson',
    userEmail: 'mike.wilson@example.com',
    userType: 'merchant',
    amount: 500.0,
    fee: 2.5,
    netAmount: 497.5,
    method: 'TED',
    accountNumber: '54321-0',
    bankName: 'Itaú',
    bankCode: '341',
    status: 'failed',
    requestedAt: '2024-01-13 11:20:33',
    processedAt: '2024-01-13 11:25:10',
    completedAt: null,
    failureReason: 'Saldo insuficiente',
    ipAddress: '201.30.152.88',
    device: 'Windows 10 (Chrome 120)'
  },
  {
    id: 'WDL004',
    userId: 'USR001',
    userName: 'John Doe',
    userEmail: 'john.doe@example.com',
    userType: 'merchant',
    amount: 1000.0,
    fee: 5.0,
    netAmount: 995.0,
    method: 'PIX',
    accountNumber: 'john.doe@example.com',
    bankName: 'PIX',
    bankCode: 'PIX',
    status: 'processing',
    requestedAt: '2024-01-15 10:45:12',
    processedAt: '2024-01-15 10:50:00',
    completedAt: null,
    ipAddress: '189.45.210.101',
    device: 'iPhone 13 (iOS 16.5)'
  },
  {
    id: 'WDL005',
    userId: 'USR004',
    userName: 'Sarah Johnson',
    userEmail: 'sarah.johnson@example.com',
    userType: 'customer',
    amount: 750.0,
    fee: 3.75,
    netAmount: 746.25,
    method: 'DOC',
    accountNumber: '98765-4',
    bankName: 'Santander',
    bankCode: '033',
    status: 'completed',
    requestedAt: '2024-01-15 08:15:00',
    processedAt: '2024-01-15 08:30:00',
    completedAt: '2024-01-15 10:30:00',
    ipAddress: '170.245.36.72',
    device: 'MacBook Pro (Safari 16)'
  },
  {
    id: 'WDL006',
    userId: 'USR005',
    userName: 'Carlos Silva',
    userEmail: 'carlos.silva@example.com',
    userType: 'merchant',
    amount: 3200.0,
    fee: 16.0,
    netAmount: 3184.0,
    method: 'Boleto',
    accountNumber: 'N/A',
    bankName: 'Bradesco',
    bankCode: '237',
    status: 'canceled',
    requestedAt: '2024-01-12 16:20:00',
    processedAt: null,
    completedAt: null,
    failureReason: 'Cancelado pelo usuário',
    ipAddress: '187.112.45.90',
    device: 'Android 12 (App Mobile)'
  }
];

// Configurações visuais
const statusBadgeVariants: Record<string, string> = {
  pending: 'secondary',
  processing: 'default',
  completed: 'success',
  failed: 'destructive',
  canceled: 'outline'
};

const statusIcons: Record<string, React.ReactNode> = {
  pending: <Clock className='h-4 w-4' />,
  processing: <ArrowDownUp className='h-4 w-4' />,
  completed: <CheckCircle className='h-4 w-4' />,
  failed: <XCircle className='h-4 w-4' />,
  canceled: <AlertCircle className='h-4 w-4' />
};

const statusLabels: Record<string, string> = {
  pending: 'Pendente',
  processing: 'Processando',
  completed: 'Concluído',
  failed: 'Falhou',
  canceled: 'Cancelado'
};

const userTypeLabels: Record<string, string> = {
  customer: 'Cliente',
  merchant: 'Comerciante',
  admin: 'Administrador'
};

const methodIcons: Record<string, React.ReactNode> = {
  PIX: <Wallet className='h-4 w-4' />,
  TED: <Building2 className='h-4 w-4' />,
  DOC: <Banknote className='h-4 w-4' />,
  Boleto: <DollarSign className='h-4 w-4' />
};

export default function WithdrawalManagement() {
  const [selectedWithdrawal, setSelectedWithdrawal] =
    useState<Withdrawal | null>(null);
  const [actionType, setActionType] = useState<
    'approve' | 'reject' | 'retry' | 'cancel' | null
  >(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [methodFilter, setMethodFilter] = useState('all');
  const [userTypeFilter, setUserTypeFilter] = useState('all');
  const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date }>({});
  const [viewMode, setViewMode] = useState<'list' | 'analytics'>('list');
  const { toast } = useToast();

  const handleWithdrawalAction = (
    withdrawal: Withdrawal,
    action: 'approve' | 'reject' | 'retry' | 'cancel'
  ) => {
    setSelectedWithdrawal(withdrawal);
    setActionType(action);
  };

  const confirmAction = () => {
    if (!selectedWithdrawal || !actionType) return;

    let message = '';
    switch (actionType) {
      case 'approve':
        message = `Saque de R$ ${selectedWithdrawal.amount.toFixed(2)} aprovado com sucesso.`;
        break;
      case 'reject':
        message = `Saque de R$ ${selectedWithdrawal.amount.toFixed(2)} rejeitado.`;
        break;
      case 'retry':
        message = `Tentativa de saque de R$ ${selectedWithdrawal.amount.toFixed(2)} reiniciada.`;
        break;
      case 'cancel':
        message = `Saque de R$ ${selectedWithdrawal.amount.toFixed(2)} cancelado.`;
        break;
    }

    toast({
      title:
        actionType === 'approve'
          ? 'Saque Aprovado'
          : actionType === 'reject'
            ? 'Saque Rejeitado'
            : actionType === 'retry'
              ? 'Tentativa Reiniciada'
              : 'Saque Cancelado',
      description: message
    });

    setSelectedWithdrawal(null);
    setActionType(null);
  };

  const filteredWithdrawals = withdrawals.filter((withdrawal) => {
    const matchesSearch =
      withdrawal.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      withdrawal.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      withdrawal.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      withdrawal.accountNumber.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === 'all' || withdrawal.status === statusFilter;
    const matchesMethod =
      methodFilter === 'all' || withdrawal.method === methodFilter;
    const matchesUserType =
      userTypeFilter === 'all' || withdrawal.userType === userTypeFilter;

    const matchesDate =
      (!dateRange.from || new Date(withdrawal.requestedAt) >= dateRange.from) &&
      (!dateRange.to || new Date(withdrawal.requestedAt) <= dateRange.to);

    return (
      matchesSearch &&
      matchesStatus &&
      matchesMethod &&
      matchesUserType &&
      matchesDate
    );
  });

  // Estatísticas
  const pendingWithdrawals = withdrawals.filter(
    (w) => w.status === 'pending'
  ).length;
  const processingWithdrawals = withdrawals.filter(
    (w) => w.status === 'processing'
  ).length;
  const totalWithdrawals = withdrawals.length;
  const totalAmount = withdrawals.reduce((sum, w) => sum + w.amount, 0);
  const totalFees = withdrawals.reduce((sum, w) => sum + w.fee, 0);
  const completedWithdrawals = withdrawals.filter(
    (w) => w.status === 'completed'
  ).length;
  const failedWithdrawals = withdrawals.filter(
    (w) => w.status === 'failed'
  ).length;

  // Métricas para analytics
  const withdrawalsByMethod = withdrawals.reduce(
    (acc, w) => {
      acc[w.method] = (acc[w.method] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  const withdrawalsByStatus = withdrawals.reduce(
    (acc, w) => {
      acc[w.status] = (acc[w.status] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  const withdrawalsByUserType = withdrawals.reduce(
    (acc, w) => {
      acc[w.userType] = (acc[w.userType] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  return (
    <PageContainer>
      <div className='flex flex-col'>
        <header className='flex h-16 shrink-0 items-center gap-2 border-b px-4'>
          <div className='flex-1'>
            <h1 className='text-lg font-semibold'>Gestão de Saques</h1>
            <p className='text-muted-foreground text-sm'>
              Gerenciar solicitações de saque dos usuários e relatórios
              financeiros
            </p>
          </div>
          <div className='flex items-center gap-2'>
            <Button variant='outline' size='sm'>
              <Download className='mr-2 h-4 w-4' />
              Exportar
            </Button>
          </div>
        </header>

        <main className='flex-1 space-y-6 p-6'>
          {/* Tabs para alternar entre visualizações */}
          <Tabs
            value={viewMode}
            onValueChange={(value) =>
              setViewMode(value as 'list' | 'analytics')
            }
          >
            <TabsList>
              <TabsTrigger value='list'>
                <List className='mr-2 h-4 w-4' />
                Lista de Saques
              </TabsTrigger>
              <TabsTrigger value='analytics'>
                <BarChart3 className='mr-2 h-4 w-4' />
                Análises
              </TabsTrigger>
            </TabsList>
          </Tabs>

          {viewMode === 'list' ? (
            <>
              {/* Estatísticas */}
              <div className='grid gap-4 md:grid-cols-4'>
                <Card>
                  <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                    <CardTitle className='text-sm font-medium'>
                      Total de Saques
                    </CardTitle>
                    <ArrowDownUp className='text-muted-foreground h-4 w-4' />
                  </CardHeader>
                  <CardContent>
                    <div className='text-2xl font-bold'>{totalWithdrawals}</div>
                    <p className='text-muted-foreground text-xs'>
                      Solicitações totais
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                    <CardTitle className='text-sm font-medium'>
                      Valor Total
                    </CardTitle>
                    <DollarSign className='text-muted-foreground h-4 w-4' />
                  </CardHeader>
                  <CardContent>
                    <div className='text-2xl font-bold'>
                      R$ {totalAmount.toFixed(2)}
                    </div>
                    <p className='text-muted-foreground text-xs'>
                      {totalFees.toFixed(2)} em taxas
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                    <CardTitle className='text-sm font-medium'>
                      Pendentes
                    </CardTitle>
                    <Clock className='text-muted-foreground h-4 w-4' />
                  </CardHeader>
                  <CardContent>
                    <div className='text-2xl font-bold'>
                      {pendingWithdrawals}
                    </div>
                    <Progress
                      value={(pendingWithdrawals / totalWithdrawals) * 100}
                      className='mt-2 h-2'
                    />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                    <CardTitle className='text-sm font-medium'>
                      Processando
                    </CardTitle>
                    <ArrowDownUp className='text-muted-foreground h-4 w-4' />
                  </CardHeader>
                  <CardContent>
                    <div className='text-2xl font-bold'>
                      {processingWithdrawals}
                    </div>
                    <Progress
                      value={(processingWithdrawals / totalWithdrawals) * 100}
                      className='mt-2 h-2'
                    />
                  </CardContent>
                </Card>
              </div>

              {/* Filtros avançados */}
              <Card>
                <CardHeader>
                  <div className='flex items-center justify-between'>
                    <div>
                      <CardTitle>Filtros Avançados</CardTitle>
                      <CardDescription>
                        Filtre os saques por diversos critérios
                      </CardDescription>
                    </div>
                    <Button variant='ghost' size='sm'>
                      <Filter className='mr-2 h-4 w-4' />
                      Filtros
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className='grid grid-cols-1 gap-4 md:grid-cols-4'>
                    <div className='space-y-2'>
                      <label className='text-sm font-medium'>Período</label>
                      <div className='flex gap-2'>
                        <Input
                          type='date'
                          placeholder='Data inicial'
                          className='w-full'
                          onChange={(e) =>
                            setDateRange((prev) => ({
                              ...prev,
                              from: e.target.value
                                ? new Date(e.target.value)
                                : undefined
                            }))
                          }
                        />
                        <Input
                          type='date'
                          placeholder='Data final'
                          className='w-full'
                          onChange={(e) =>
                            setDateRange((prev) => ({
                              ...prev,
                              to: e.target.value
                                ? new Date(e.target.value)
                                : undefined
                            }))
                          }
                        />
                      </div>
                    </div>
                    <div className='space-y-2'>
                      <label className='text-sm font-medium'>Status</label>
                      <Select
                        value={statusFilter}
                        onValueChange={setStatusFilter}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder='Todos status' />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value='all'>Todos status</SelectItem>
                          <SelectItem value='pending'>Pendente</SelectItem>
                          <SelectItem value='processing'>
                            Processando
                          </SelectItem>
                          <SelectItem value='completed'>Concluído</SelectItem>
                          <SelectItem value='failed'>Falhou</SelectItem>
                          <SelectItem value='canceled'>Cancelado</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className='space-y-2'>
                      <label className='text-sm font-medium'>Método</label>
                      <Select
                        value={methodFilter}
                        onValueChange={setMethodFilter}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder='Todos métodos' />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value='all'>Todos métodos</SelectItem>
                          <SelectItem value='PIX'>PIX</SelectItem>
                          <SelectItem value='TED'>TED</SelectItem>
                          <SelectItem value='DOC'>DOC</SelectItem>
                          <SelectItem value='Boleto'>Boleto</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className='space-y-2'>
                      <label className='text-sm font-medium'>
                        Tipo de Usuário
                      </label>
                      <Select
                        value={userTypeFilter}
                        onValueChange={setUserTypeFilter}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder='Todos os tipos' />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value='all'>Todos os tipos</SelectItem>
                          <SelectItem value='customer'>Cliente</SelectItem>
                          <SelectItem value='merchant'>Comerciante</SelectItem>
                          <SelectItem value='admin'>Administrador</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Tabela de Saques */}
              <Card>
                <CardHeader>
                  <div className='flex items-center justify-between'>
                    <div>
                      <CardTitle>Solicitações de Saque</CardTitle>
                      <CardDescription>
                        {filteredWithdrawals.length} saques encontrados
                      </CardDescription>
                    </div>
                    <div className='flex gap-2'>
                      <Button variant='outline' size='sm'>
                        <Download className='mr-2 h-4 w-4' />
                        Exportar
                      </Button>
                      <Button variant='outline' size='sm'>
                        <Printer className='mr-2 h-4 w-4' />
                        Imprimir
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className='mb-6'>
                    <div className='relative flex-1'>
                      <Search className='text-muted-foreground absolute top-2.5 left-2 h-4 w-4' />
                      <Input
                        placeholder='Buscar saques por ID, nome, email ou conta...'
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className='pl-8'
                      />
                    </div>
                  </div>

                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Usuário</TableHead>
                        <TableHead>Valor</TableHead>
                        <TableHead>Método</TableHead>
                        <TableHead>Conta</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Solicitado em</TableHead>
                        <TableHead>Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredWithdrawals.map((withdrawal) => (
                        <TableRow key={withdrawal.id}>
                          <TableCell className='font-medium'>
                            {withdrawal.id}
                          </TableCell>
                          <TableCell>
                            <div className='flex flex-col'>
                              <span>{withdrawal.userName}</span>
                              <span className='text-muted-foreground flex items-center text-sm'>
                                <User className='mr-1 h-3 w-3' />
                                {userTypeLabels[withdrawal.userType]}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className='flex flex-col'>
                              <span className='font-medium'>
                                R$ {withdrawal.amount.toFixed(2)}
                              </span>
                              <span className='text-muted-foreground text-xs'>
                                Líquido: R$ {withdrawal.netAmount.toFixed(2)}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant='outline'
                              className='flex items-center gap-1'
                            >
                              {methodIcons[withdrawal.method]}
                              {withdrawal.method}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className='flex flex-col'>
                              <span>{withdrawal.bankName}</span>
                              <span className='text-muted-foreground text-sm'>
                                {withdrawal.accountNumber}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                statusBadgeVariants[withdrawal.status] as any
                              }
                              className='flex items-center gap-1'
                            >
                              {statusIcons[withdrawal.status]}
                              {statusLabels[withdrawal.status]}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className='flex flex-col'>
                              <span>
                                {new Date(
                                  withdrawal.requestedAt
                                ).toLocaleDateString()}
                              </span>
                              <span className='text-muted-foreground text-xs'>
                                {new Date(
                                  withdrawal.requestedAt
                                ).toLocaleTimeString()}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant='ghost' className='h-8 w-8 p-0'>
                                  <MoreHorizontal className='h-4 w-4' />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align='end'>
                                <DropdownMenuItem>
                                  <Eye className='mr-2 h-4 w-4' />
                                  Ver detalhes
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Mail className='mr-2 h-4 w-4' />
                                  Contatar usuário
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                {withdrawal.status === 'pending' && (
                                  <>
                                    <DropdownMenuItem
                                      onClick={() =>
                                        handleWithdrawalAction(
                                          withdrawal,
                                          'approve'
                                        )
                                      }
                                      className='text-green-600'
                                    >
                                      <CheckCircle className='mr-2 h-4 w-4' />
                                      Aprovar saque
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                      onClick={() =>
                                        handleWithdrawalAction(
                                          withdrawal,
                                          'reject'
                                        )
                                      }
                                      className='text-red-600'
                                    >
                                      <XCircle className='mr-2 h-4 w-4' />
                                      Rejeitar saque
                                    </DropdownMenuItem>
                                  </>
                                )}
                                {withdrawal.status === 'failed' && (
                                  <DropdownMenuItem
                                    onClick={() =>
                                      handleWithdrawalAction(
                                        withdrawal,
                                        'retry'
                                      )
                                    }
                                    className='text-yellow-600'
                                  >
                                    <RefreshCw className='mr-2 h-4 w-4' />
                                    Tentar novamente
                                  </DropdownMenuItem>
                                )}
                                {(withdrawal.status === 'pending' ||
                                  withdrawal.status === 'processing') && (
                                  <DropdownMenuItem
                                    onClick={() =>
                                      handleWithdrawalAction(
                                        withdrawal,
                                        'cancel'
                                      )
                                    }
                                    className='text-orange-600'
                                  >
                                    <AlertCircle className='mr-2 h-4 w-4' />
                                    Cancelar saque
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
            </>
          ) : (
            <div className='grid gap-4 md:grid-cols-2'>
              {/* Gráfico de Métodos de Saque */}
              <Card>
                <CardHeader>
                  <CardTitle>Distribuição por Método</CardTitle>
                  <CardDescription>
                    Métodos de saque mais utilizados
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className='space-y-4'>
                    {Object.entries(withdrawalsByMethod).map(
                      ([method, count]) => (
                        <div key={method} className='flex items-center'>
                          <div className='flex w-24 items-center'>
                            {methodIcons[method]}
                            <span className='ml-2'>{method}</span>
                          </div>
                          <Progress
                            value={(count / totalWithdrawals) * 100}
                            className='h-2 flex-1'
                          />
                          <span className='ml-2 w-10 text-right'>{count}</span>
                        </div>
                      )
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Gráfico de Status */}
              <Card>
                <CardHeader>
                  <CardTitle>Distribuição por Status</CardTitle>
                  <CardDescription>Status atual dos saques</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className='space-y-4'>
                    {Object.entries(withdrawalsByStatus).map(
                      ([status, count]) => (
                        <div key={status} className='flex items-center'>
                          <div className='flex w-24 items-center'>
                            {statusIcons[status]}
                            <span className='ml-2'>{statusLabels[status]}</span>
                          </div>
                          <Progress
                            value={(count / totalWithdrawals) * 100}
                            className='h-2 flex-1'
                          />
                          <span className='ml-2 w-10 text-right'>{count}</span>
                        </div>
                      )
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Gráfico por Tipo de Usuário */}
              <Card>
                <CardHeader>
                  <CardTitle>Distribuição por Tipo de Usuário</CardTitle>
                  <CardDescription>
                    Quem está solicitando saques
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className='space-y-4'>
                    {Object.entries(withdrawalsByUserType).map(
                      ([userType, count]) => (
                        <div key={userType} className='flex items-center'>
                          <div className='flex w-24 items-center'>
                            <User className='h-4 w-4' />
                            <span className='ml-2'>
                              {userTypeLabels[userType]}
                            </span>
                          </div>
                          <Progress
                            value={(count / totalWithdrawals) * 100}
                            className='h-2 flex-1'
                          />
                          <span className='ml-2 w-10 text-right'>{count}</span>
                        </div>
                      )
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Últimos Saques Concluídos */}
              <Card className='md:col-span-2'>
                <CardHeader>
                  <CardTitle>Últimos Saques Concluídos</CardTitle>
                  <CardDescription>
                    Os 5 saques mais recentes concluídos com sucesso
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Usuário</TableHead>
                        <TableHead>Valor</TableHead>
                        <TableHead>Método</TableHead>
                        <TableHead>Banco</TableHead>
                        <TableHead>Concluído em</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {withdrawals
                        .filter((w) => w.status === 'completed')
                        .sort(
                          (a, b) =>
                            new Date(b.completedAt!).getTime() -
                            new Date(a.completedAt!).getTime()
                        )
                        .slice(0, 5)
                        .map((withdrawal) => (
                          <TableRow key={withdrawal.id}>
                            <TableCell>
                              <div className='flex items-center'>
                                <Avatar className='mr-2 h-8 w-8'>
                                  <AvatarFallback>
                                    {withdrawal.userName.charAt(0)}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <div>{withdrawal.userName}</div>
                                  <div className='text-muted-foreground text-sm'>
                                    {withdrawal.userEmail}
                                  </div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell className='font-medium'>
                              R$ {withdrawal.amount.toFixed(2)}
                            </TableCell>
                            <TableCell>
                              <Badge variant='outline'>
                                {withdrawal.method}
                              </Badge>
                            </TableCell>
                            <TableCell>{withdrawal.bankName}</TableCell>
                            <TableCell>
                              {new Date(
                                withdrawal.completedAt!
                              ).toLocaleString()}
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Diálogo de Ação */}
          <Dialog
            open={!!selectedWithdrawal}
            onOpenChange={() => setSelectedWithdrawal(null)}
          >
            <DialogContent className='sm:max-w-[600px]'>
              <DialogHeader>
                <DialogTitle>
                  {actionType === 'approve'
                    ? 'Aprovar Saque'
                    : actionType === 'reject'
                      ? 'Rejeitar Saque'
                      : actionType === 'retry'
                        ? 'Tentar Novamente'
                        : 'Cancelar Saque'}
                </DialogTitle>
                <DialogDescription>
                  {actionType === 'approve'
                    ? 'Confirme os detalhes antes de aprovar este saque:'
                    : actionType === 'reject'
                      ? 'Tem certeza que deseja rejeitar este saque?'
                      : actionType === 'retry'
                        ? 'Deseja tentar processar este saque novamente?'
                        : 'Tem certeza que deseja cancelar este saque?'}
                </DialogDescription>
              </DialogHeader>

              {selectedWithdrawal && (
                <div className='grid gap-4 py-4'>
                  <div className='grid grid-cols-2 gap-4'>
                    <div className='space-y-1'>
                      <Label>Usuário</Label>
                      <div className='flex items-center'>
                        <Avatar className='mr-2 h-8 w-8'>
                          <AvatarFallback>
                            {selectedWithdrawal.userName.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div>{selectedWithdrawal.userName}</div>
                          <div className='text-muted-foreground text-sm'>
                            {selectedWithdrawal.userEmail}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='space-y-1'>
                      <Label>Tipo de Usuário</Label>
                      <div>{userTypeLabels[selectedWithdrawal.userType]}</div>
                    </div>
                  </div>

                  <div className='grid grid-cols-2 gap-4'>
                    <div className='space-y-1'>
                      <Label>Valor do Saque</Label>
                      <div className='text-xl font-semibold'>
                        R$ {selectedWithdrawal.amount.toFixed(2)}
                      </div>
                      <div className='text-muted-foreground text-sm'>
                        Taxa: R$ {selectedWithdrawal.fee.toFixed(2)} | Líquido:
                        R$ {selectedWithdrawal.netAmount.toFixed(2)}
                      </div>
                    </div>
                    <div className='space-y-1'>
                      <Label>Método</Label>
                      <div className='flex items-center'>
                        {methodIcons[selectedWithdrawal.method]}
                        <span className='ml-2'>
                          {selectedWithdrawal.method} -{' '}
                          {selectedWithdrawal.bankName}
                        </span>
                      </div>
                      <div className='text-muted-foreground text-sm'>
                        Conta: {selectedWithdrawal.accountNumber}
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className='grid grid-cols-2 gap-4'>
                    <div className='space-y-1'>
                      <Label>Solicitado em</Label>
                      <div>
                        {new Date(
                          selectedWithdrawal.requestedAt
                        ).toLocaleString()}
                      </div>
                    </div>
                    <div className='space-y-1'>
                      <Label>Status Atual</Label>
                      <Badge
                        variant={
                          statusBadgeVariants[selectedWithdrawal.status] as any
                        }
                        className='flex items-center gap-1'
                      >
                        {statusIcons[selectedWithdrawal.status]}
                        {statusLabels[selectedWithdrawal.status]}
                      </Badge>
                    </div>
                  </div>

                  {selectedWithdrawal.failureReason && (
                    <div className='space-y-1'>
                      <Label>Motivo da Falha</Label>
                      <Alert variant='destructive'>
                        <AlertCircle className='h-4 w-4' />
                        <AlertTitle>Erro no processamento</AlertTitle>
                        <AlertDescription>
                          {selectedWithdrawal.failureReason}
                        </AlertDescription>
                      </Alert>
                    </div>
                  )}

                  {selectedWithdrawal.documents &&
                    selectedWithdrawal.documents.length > 0 && (
                      <div className='space-y-1'>
                        <Label>Documentos Anexados</Label>
                        <div className='flex flex-wrap gap-2'>
                          {selectedWithdrawal.documents.map((doc) => (
                            <Button key={doc.id} variant='outline' size='sm'>
                              <FileText className='mr-2 h-4 w-4' />
                              {doc.type}
                            </Button>
                          ))}
                        </div>
                      </div>
                    )}

                  <div className='grid grid-cols-2 gap-4'>
                    <div className='space-y-1'>
                      <Label>Dispositivo</Label>
                      <div>{selectedWithdrawal.device}</div>
                    </div>
                    <div className='space-y-1'>
                      <Label>Endereço IP</Label>
                      <div>{selectedWithdrawal.ipAddress}</div>
                    </div>
                  </div>

                  {actionType === 'reject' && (
                    <div className='space-y-1'>
                      <Label htmlFor='reason'>Motivo da Rejeição</Label>
                      <Textarea
                        id='reason'
                        placeholder='Informe o motivo da rejeição (opcional)'
                        className='min-h-[100px]'
                      />
                    </div>
                  )}
                </div>
              )}

              <DialogFooter>
                <Button
                  variant='outline'
                  onClick={() => setSelectedWithdrawal(null)}
                >
                  Cancelar
                </Button>
                <Button
                  onClick={confirmAction}
                  variant={
                    actionType === 'approve'
                      ? 'default'
                      : actionType === 'reject'
                        ? 'destructive'
                        : actionType === 'retry'
                          ? 'secondary'
                          : 'outline'
                  }
                >
                  {actionType === 'approve'
                    ? 'Confirmar Aprovação'
                    : actionType === 'reject'
                      ? 'Confirmar Rejeição'
                      : actionType === 'retry'
                        ? 'Tentar Novamente'
                        : 'Confirmar Cancelamento'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </main>
      </div>
    </PageContainer>
  );
}
