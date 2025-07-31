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
  Link as LinkIcon,
  DollarSign,
  PlusCircle,
  Search,
  MoreHorizontal,
  CheckCircle2,
  XCircle,
  Settings,
  Copy,
  Calendar,
  Clock,
  User
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import PageContainer from '@/components/layout/page-container';

const paymentLinks = [
  {
    id: 'LNK001',
    merchantId: 'USR001',
    merchantName: 'John Doe',
    title: 'Pagamento de Consultoria',
    description: 'Link para pagamento de serviços de consultoria técnica',
    amount: 250.0,
    currency: 'BRL',
    status: 'active',
    createdAt: '2024-01-10',
    expiresAt: '2024-02-10',
    lastUsed: '2024-01-15 14:30:25',
    url: 'https://gateway.com/pay/LNK001',
    usageCount: 12,
    totalCollected: 3000.0
  },
  {
    id: 'LNK002',
    merchantId: 'USR002',
    merchantName: 'Jane Smith',
    title: 'Doação para Projeto Social',
    description: 'Link para doações ao projeto de educação infantil',
    amount: null,
    currency: 'BRL',
    status: 'active',
    createdAt: '2024-01-12',
    expiresAt: null,
    lastUsed: '2024-01-14 13:45:10',
    url: 'https://gateway.com/pay/LNK002',
    usageCount: 45,
    totalCollected: 6750.0
  },
  {
    id: 'LNK003',
    merchantId: 'USR003',
    merchantName: 'Mike Wilson',
    title: 'Pagamento de Mensalidade',
    description: 'Link para pagamento da mensalidade do clube',
    amount: 120.0,
    currency: 'BRL',
    status: 'expired',
    createdAt: '2024-01-08',
    expiresAt: '2024-01-31',
    lastUsed: '2024-01-30 12:20:45',
    url: 'https://gateway.com/pay/LNK003',
    usageCount: 28,
    totalCollected: 3360.0
  },
  {
    id: 'LNK004',
    merchantId: 'USR001',
    merchantName: 'John Doe',
    title: 'Pagamento de Curso',
    description: 'Link para pagamento do curso de programação',
    amount: 499.9,
    currency: 'BRL',
    status: 'suspended',
    createdAt: '2024-01-05',
    expiresAt: '2024-03-05',
    lastUsed: '2024-01-09 11:15:30',
    url: 'https://gateway.com/pay/LNK004',
    usageCount: 3,
    totalCollected: 1499.7
  },
  {
    id: 'LNK005',
    merchantId: 'USR003',
    merchantName: 'Mike Wilson',
    title: 'Pagamento de Serviço',
    description: 'Link para pagamento de serviços diversos',
    amount: null,
    currency: 'USD',
    status: 'active',
    createdAt: '2024-01-03',
    expiresAt: null,
    lastUsed: '2024-01-15 10:05:12',
    url: 'https://gateway.com/pay/LNK005',
    usageCount: 7,
    totalCollected: 850.0
  }
];

const statusLabels: Record<string, string> = {
  active: 'Ativo',
  expired: 'Expirado',
  suspended: 'Suspenso'
};

const statusColors: Record<string, string> = {
  active: 'default',
  expired: 'secondary',
  suspended: 'destructive'
};

export default function PaymentLinks() {
  const [selectedLink, setSelectedLink] = useState<any>(null);
  const [actionType, setActionType] = useState<
    'activate' | 'deactivate' | 'suspend' | 'copy' | 'extend' | null
  >(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [merchantFilter, setMerchantFilter] = useState('all');
  const { toast } = useToast();

  const handleLinkAction = (
    link: any,
    action: 'activate' | 'deactivate' | 'suspend' | 'copy' | 'extend'
  ) => {
    setSelectedLink(link);
    setActionType(action);

    if (action === 'copy') {
      navigator.clipboard.writeText(link.url);
      toast({
        title: 'Link copiado!',
        description:
          'O link de pagamento foi copiado para a área de transferência.'
      });
      setSelectedLink(null);
      setActionType(null);
    }
  };

  const confirmAction = () => {
    if (!selectedLink || !actionType || actionType === 'copy') return;

    let message = '';
    if (actionType === 'extend') {
      message = `O link de pagamento "${selectedLink.title}" foi extendido com sucesso.`;
    } else {
      message = `O link de pagamento "${selectedLink.title}" foi ${actionType === 'activate' ? 'ativado' : actionType === 'deactivate' ? 'desativado' : 'suspenso'} com sucesso.`;
    }

    toast({
      title: `Link ${actionType === 'activate' ? 'ativado' : actionType === 'deactivate' ? 'desativado' : actionType === 'suspend' ? 'suspenso' : 'extendido'}`,
      description: message
    });

    setSelectedLink(null);
    setActionType(null);
  };

  const filteredLinks = paymentLinks.filter((link) => {
    const matchesSearch =
      link.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      link.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      link.merchantName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === 'all' || link.status === statusFilter;
    const matchesMerchant =
      merchantFilter === 'all' || link.merchantId === merchantFilter;
    return matchesSearch && matchesStatus && matchesMerchant;
  });

  const activeLinks = paymentLinks.filter((l) => l.status === 'active').length;
  const totalLinks = paymentLinks.length;
  const fixedAmountLinks = paymentLinks.filter((l) => l.amount !== null).length;
  const expiredLinks = paymentLinks.filter(
    (l) => l.status === 'expired'
  ).length;

  return (
    <PageContainer>
      <div className='flex flex-col'>
        <header className='flex h-16 shrink-0 items-center gap-2 border-b px-4'>
          <SidebarTrigger className='-ml-1' />
          <div className='flex-1'>
            <h1 className='text-lg font-semibold'>Links de Pagamento</h1>
            <p className='text-muted-foreground text-sm'>
              Gerenciar todos os links de pagamento do gateway
            </p>
          </div>
        </header>

        <main className='flex-1 space-y-6 p-6'>
          {/* Stats */}
          <div className='grid gap-4 md:grid-cols-4'>
            <Card>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium'>
                  Total de Links
                </CardTitle>
                <LinkIcon className='text-muted-foreground h-4 w-4' />
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>{totalLinks}</div>
                <p className='text-muted-foreground text-xs'>Todos os links</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium'>
                  Links Ativos
                </CardTitle>
                <CheckCircle2 className='text-muted-foreground h-4 w-4' />
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>{activeLinks}</div>
                <p className='text-muted-foreground text-xs'>
                  Disponíveis para uso
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium'>
                  Valor Fixo
                </CardTitle>
                <DollarSign className='text-muted-foreground h-4 w-4' />
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>{fixedAmountLinks}</div>
                <p className='text-muted-foreground text-xs'>
                  Links com valor pré-definido
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium'>Expirados</CardTitle>
                <Clock className='text-muted-foreground h-4 w-4' />
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>{expiredLinks}</div>
                <p className='text-muted-foreground text-xs'>
                  Links com validade vencida
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Links Table */}
          <Card>
            <CardHeader>
              <div className='flex items-center justify-between'>
                <div>
                  <CardTitle>Links de Pagamento</CardTitle>
                  <CardDescription>
                    Visualizar e gerenciar todos os links de pagamento criados
                  </CardDescription>
                </div>
                <Button>
                  <PlusCircle className='mr-2 h-4 w-4' />
                  Criar Link
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {/* Filters */}
              <div className='mb-6 flex flex-col gap-4 md:flex-row'>
                <div className='relative flex-1'>
                  <Search className='text-muted-foreground absolute top-2.5 left-2 h-4 w-4' />
                  <Input
                    placeholder='Buscar links...'
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
                      <SelectItem value='expired'>Expirado</SelectItem>
                      <SelectItem value='suspended'>Suspenso</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select
                    value={merchantFilter}
                    onValueChange={setMerchantFilter}
                  >
                    <SelectTrigger className='w-[180px]'>
                      <SelectValue placeholder='Filtrar por comerciante' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='all'>Todos comerciantes</SelectItem>
                      {Array.from(
                        new Set(paymentLinks.map((l) => l.merchantId))
                      ).map((id) => {
                        const merchant = paymentLinks.find(
                          (l) => l.merchantId === id
                        );
                        return (
                          <SelectItem key={id} value={id}>
                            {merchant?.merchantName} ({id})
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className='overflow-x-auto'>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className='w-20'>ID</TableHead>
                      <TableHead className='w-48'>Título</TableHead>
                      <TableHead className='w-40'>Comerciante</TableHead>
                      <TableHead className='w-64'>Descrição</TableHead>
                      <TableHead className='w-24'>Valor</TableHead>
                      <TableHead className='w-24'>Status</TableHead>
                      <TableHead className='w-32'>Expiração</TableHead>
                      <TableHead className='w-28'>Uso/Total</TableHead>
                      <TableHead className='w-40'>Último Uso</TableHead>
                      <TableHead className='w-16'>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredLinks.map((link) => (
                      <TableRow key={link.id}>
                        <TableCell className='text-xs font-medium'>
                          {link.id}
                        </TableCell>
                        <TableCell className='font-medium'>
                          <div className='max-w-44 truncate' title={link.title}>
                            {link.title}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div
                            className='max-w-36 truncate'
                            title={`${link.merchantName} (${link.merchantId})`}
                          >
                            <Badge variant='secondary' className='text-xs'>
                              {link.merchantName} ({link.merchantId})
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell className='text-muted-foreground'>
                          <div
                            className='max-w-60 truncate'
                            title={link.description}
                          >
                            {link.description}
                          </div>
                        </TableCell>
                        <TableCell>
                          {link.amount !== null ? (
                            <div className='flex items-center text-sm'>
                              {link.currency === 'BRL' ? 'R$' : '$'}
                              {link.amount.toFixed(2)}
                            </div>
                          ) : (
                            <Badge variant='outline' className='text-xs'>
                              Variável
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={statusColors[link.status] as any}
                            className='text-xs'
                          >
                            {statusLabels[link.status]}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {link.expiresAt ? (
                            <div className='flex items-center gap-1 text-sm'>
                              <Calendar className='h-3 w-3' />
                              <span
                                className='max-w-24 truncate'
                                title={new Date(
                                  link.expiresAt
                                ).toLocaleDateString()}
                              >
                                {new Date(link.expiresAt).toLocaleDateString()}
                              </span>
                            </div>
                          ) : (
                            <Badge variant='outline' className='text-xs'>
                              Sem expiração
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className='flex flex-col text-sm'>
                            <span>{link.usageCount} usos</span>
                            <span className='text-muted-foreground text-xs'>
                              {link.currency === 'BRL' ? 'R$' : '$'}
                              {link.totalCollected.toFixed(2)}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div
                            className='max-w-36 truncate text-sm'
                            title={new Date(link.lastUsed).toLocaleString()}
                          >
                            {new Date(link.lastUsed).toLocaleString()}
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
                              <DropdownMenuItem
                                onClick={() => handleLinkAction(link, 'copy')}
                              >
                                <Copy className='mr-2 h-4 w-4' />
                                Copiar Link
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <User className='mr-2 h-4 w-4' />
                                Ver Clientes
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <DollarSign className='mr-2 h-4 w-4' />
                                Ver Transações
                              </DropdownMenuItem>
                              {link.status === 'active' ? (
                                <>
                                  <DropdownMenuItem
                                    onClick={() =>
                                      handleLinkAction(link, 'suspend')
                                    }
                                    className='text-yellow-600'
                                  >
                                    <XCircle className='mr-2 h-4 w-4' />
                                    Suspender
                                  </DropdownMenuItem>
                                  {link.expiresAt && (
                                    <DropdownMenuItem
                                      onClick={() =>
                                        handleLinkAction(link, 'extend')
                                      }
                                      className='text-blue-600'
                                    >
                                      <Calendar className='mr-2 h-4 w-4' />
                                      Extender Validade
                                    </DropdownMenuItem>
                                  )}
                                </>
                              ) : link.status === 'expired' ? (
                                <>
                                  <DropdownMenuItem
                                    onClick={() =>
                                      handleLinkAction(link, 'activate')
                                    }
                                    className='text-green-600'
                                  >
                                    <CheckCircle2 className='mr-2 h-4 w-4' />
                                    Reativar
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={() =>
                                      handleLinkAction(link, 'extend')
                                    }
                                    className='text-blue-600'
                                  >
                                    <Calendar className='mr-2 h-4 w-4' />
                                    Extender Validade
                                  </DropdownMenuItem>
                                </>
                              ) : (
                                <DropdownMenuItem
                                  onClick={() =>
                                    handleLinkAction(link, 'activate')
                                  }
                                  className='text-green-600'
                                >
                                  <CheckCircle2 className='mr-2 h-4 w-4' />
                                  Ativar
                                </DropdownMenuItem>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Action Dialog */}
          <Dialog
            open={!!selectedLink && actionType !== 'copy'}
            onOpenChange={() => setSelectedLink(null)}
          >
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {actionType === 'activate'
                    ? 'Ativar'
                    : actionType === 'deactivate'
                      ? 'Desativar'
                      : actionType === 'suspend'
                        ? 'Suspender'
                        : 'Extender'}{' '}
                  Link de Pagamento
                </DialogTitle>
                <DialogDescription>
                  {actionType === 'extend'
                    ? 'Tem certeza que deseja extender a validade deste link de pagamento?'
                    : `Tem certeza que deseja ${
                        actionType === 'activate'
                          ? 'ativar'
                          : actionType === 'deactivate'
                            ? 'desativar'
                            : 'suspender'
                      } este link de pagamento? Esta ação afetará sua disponibilidade para os clientes.`}
                </DialogDescription>
              </DialogHeader>

              {selectedLink && (
                <div className='space-y-4'>
                  <div className='grid grid-cols-2 gap-4 text-sm'>
                    <div>
                      <strong>ID do Link:</strong> {selectedLink.id}
                    </div>
                    <div>
                      <strong>Título:</strong> {selectedLink.title}
                    </div>
                    <div>
                      <strong>Comerciante:</strong> {selectedLink.merchantName}{' '}
                      ({selectedLink.merchantId})
                    </div>
                    <div>
                      <strong>Valor:</strong>{' '}
                      {selectedLink.amount !== null
                        ? `${selectedLink.currency === 'BRL' ? 'R$' : '$'}${selectedLink.amount.toFixed(2)}`
                        : 'Variável (definido pelo cliente)'}
                    </div>
                    <div>
                      <strong>Status Atual:</strong>{' '}
                      {statusLabels[selectedLink.status]}
                    </div>
                    <div>
                      <strong>Total Arrecadado:</strong>{' '}
                      {selectedLink.currency === 'BRL' ? 'R$' : '$'}
                      {selectedLink.totalCollected.toFixed(2)} (
                      {selectedLink.usageCount} usos)
                    </div>
                    <div>
                      <strong>URL:</strong>
                      <a
                        href={selectedLink.url}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='ml-1 text-blue-500 hover:underline'
                      >
                        {selectedLink.url.substring(0, 20)}...
                      </a>
                    </div>
                    {selectedLink.expiresAt && (
                      <div>
                        <strong>Data de Expiração:</strong>{' '}
                        {new Date(selectedLink.expiresAt).toLocaleDateString()}
                      </div>
                    )}
                  </div>

                  {actionType === 'extend' && (
                    <div className='pt-4'>
                      <label className='mb-2 block text-sm font-medium'>
                        Nova data de expiração
                      </label>
                      <Input type='date' className='w-full' />
                    </div>
                  )}
                </div>
              )}

              <DialogFooter>
                <Button variant='outline' onClick={() => setSelectedLink(null)}>
                  Cancelar
                </Button>
                <Button
                  onClick={confirmAction}
                  variant={
                    actionType === 'activate'
                      ? 'default'
                      : actionType === 'extend'
                        ? 'secondary'
                        : 'destructive'
                  }
                >
                  {actionType === 'activate'
                    ? 'Ativar'
                    : actionType === 'deactivate'
                      ? 'Desativar'
                      : actionType === 'suspend'
                        ? 'Suspender'
                        : 'Extender'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </main>
      </div>
    </PageContainer>
  );
}
