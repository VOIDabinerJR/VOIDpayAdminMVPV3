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
  CreditCard,
  DollarSign,
  PlusCircle,
  Search,
  MoreHorizontal,
  CheckCircle2,
  XCircle,
  Link,
  Settings,
  Copy
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

const paymentButtons = [
  {
    id: 'BTN001',
    merchantId: 'USR001',
    merchantName: 'John Doe',
    name: 'Doação para ONG',
    description: 'Botão para doações mensais',
    amount: 50.0,
    currency: 'BRL',
    status: 'active',
    createdAt: '2024-01-10',
    lastUsed: '2024-01-15 14:30:25',
    url: 'https://gateway.com/pay/BTN001'
  },
  {
    id: 'BTN002',
    merchantId: 'USR001',
    merchantName: 'John Doe',
    name: 'Pagamento de Serviço',
    description: 'Pagamento por consultoria técnica',
    amount: 150.0,
    currency: 'USD',
    status: 'active',
    createdAt: '2024-01-12',
    lastUsed: '2024-01-14 13:45:10',
    url: 'https://gateway.com/pay/BTN002'
  },
  {
    id: 'BTN003',
    merchantId: 'USR003',
    merchantName: 'Mike Wilson',
    name: 'Assinatura Premium',
    description: 'Assinatura mensal do serviço premium',
    amount: 29.99,
    currency: 'BRL',
    status: 'inactive',
    createdAt: '2024-01-08',
    lastUsed: '2024-01-10 12:20:45',
    url: 'https://gateway.com/pay/BTN003'
  },
  {
    id: 'BTN004',
    merchantId: 'USR002',
    merchantName: 'Jane Smith',
    name: 'Pagamento de Produto',
    description: 'Pagamento para o produto X',
    amount: 89.9,
    currency: 'BRL',
    status: 'suspended',
    createdAt: '2024-01-05',
    lastUsed: '2024-01-09 11:15:30',
    url: 'https://gateway.com/pay/BTN004'
  },
  {
    id: 'BTN005',
    merchantId: 'USR003',
    merchantName: 'Mike Wilson',
    name: 'Doação Única',
    description: 'Apoie nosso projeto com uma doação única',
    amount: null,
    currency: 'BRL',
    status: 'active',
    createdAt: '2024-01-03',
    lastUsed: '2024-01-15 10:05:12',
    url: 'https://gateway.com/pay/BTN005'
  }
];

const statusLabels: Record<string, string> = {
  active: 'Ativo',
  inactive: 'Inativo',
  suspended: 'Suspenso'
};

const statusColors: Record<string, string> = {
  active: 'default',
  inactive: 'secondary',
  suspended: 'destructive'
};

export default function PaymentButtons() {
  const [selectedButton, setSelectedButton] = useState<any>(null);
  const [actionType, setActionType] = useState<
    'activate' | 'deactivate' | 'suspend' | 'copy' | null
  >(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [merchantFilter, setMerchantFilter] = useState('all');
  const { toast } = useToast();

  const handleButtonAction = (
    button: any,
    action: 'activate' | 'deactivate' | 'suspend' | 'copy'
  ) => {
    setSelectedButton(button);
    setActionType(action);

    if (action === 'copy') {
      navigator.clipboard.writeText(button.url);
      toast({
        title: 'Link copiado!',
        description:
          'O link do botão de pagamento foi copiado para a área de transferência.'
      });
      setSelectedButton(null);
      setActionType(null);
    }
  };

  const confirmAction = () => {
    if (!selectedButton || !actionType || actionType === 'copy') return;

    toast({
      title: `Botão ${actionType === 'activate' ? 'ativado' : actionType === 'deactivate' ? 'desativado' : 'suspenso'}`,
      description: `O botão de pagamento "${selectedButton.name}" foi ${actionType === 'activate' ? 'ativado' : actionType === 'deactivate' ? 'desativado' : 'suspenso'} com sucesso.`
    });

    setSelectedButton(null);
    setActionType(null);
  };

  const filteredButtons = paymentButtons.filter((button) => {
    const matchesSearch =
      button.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      button.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      button.merchantName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === 'all' || button.status === statusFilter;
    const matchesMerchant =
      merchantFilter === 'all' || button.merchantId === merchantFilter;
    return matchesSearch && matchesStatus && matchesMerchant;
  });

  const activeButtons = paymentButtons.filter(
    (b) => b.status === 'active'
  ).length;
  const totalButtons = paymentButtons.length;
  const fixedAmountButtons = paymentButtons.filter(
    (b) => b.amount !== null
  ).length;
  const variableAmountButtons = paymentButtons.filter(
    (b) => b.amount === null
  ).length;

  return (
    <div className='flex flex-col'>
      <header className='flex h-16 shrink-0 items-center gap-2 border-b px-4'>
        <SidebarTrigger className='-ml-1' />
        <div className='flex-1'>
          <h1 className='text-lg font-semibold'>Botões de Pagamento</h1>
          <p className='text-muted-foreground text-sm'>
            Gerenciar todos os botões de pagamento do gateway
          </p>
        </div>
      </header>

      <main className='flex-1 space-y-6 p-6'>
        {/* Stats */}
        <div className='grid gap-4 md:grid-cols-4'>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Total de Botões
              </CardTitle>
              <CreditCard className='text-muted-foreground h-4 w-4' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>{totalButtons}</div>
              <p className='text-muted-foreground text-xs'>Todos os botões</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Botões Ativos
              </CardTitle>
              <CheckCircle2 className='text-muted-foreground h-4 w-4' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>{activeButtons}</div>
              <p className='text-muted-foreground text-xs'>
                Disponíveis para uso
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>Valor Fixo</CardTitle>
              <DollarSign className='text-muted-foreground h-4 w-4' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>{fixedAmountButtons}</div>
              <p className='text-muted-foreground text-xs'>
                Botões com valor pré-definido
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Valor Variável
              </CardTitle>
              <Settings className='text-muted-foreground h-4 w-4' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>{variableAmountButtons}</div>
              <p className='text-muted-foreground text-xs'>
                O cliente define o valor
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Buttons Table */}
        <Card>
          <CardHeader>
            <div className='flex items-center justify-between'>
              <div>
                <CardTitle>Botões de Pagamento</CardTitle>
                <CardDescription>
                  Visualizar e gerenciar todos os botões de pagamento criados
                </CardDescription>
              </div>
              <Button>
                <PlusCircle className='mr-2 h-4 w-4' />
                Criar Botão
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {/* Filters */}
            <div className='mb-6 flex flex-col gap-4 md:flex-row'>
              <div className='relative flex-1'>
                <Search className='text-muted-foreground absolute top-2.5 left-2 h-4 w-4' />
                <Input
                  placeholder='Buscar botões...'
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
                      new Set(paymentButtons.map((b) => b.merchantId))
                    ).map((id) => {
                      const merchant = paymentButtons.find(
                        (b) => b.merchantId === id
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

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Nome</TableHead>
                  <TableHead>Comerciante</TableHead>
                  <TableHead>Descrição</TableHead>
                  <TableHead>Valor</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Criado em</TableHead>
                  <TableHead>Último Uso</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredButtons.map((button) => (
                  <TableRow key={button.id}>
                    <TableCell className='font-medium'>{button.id}</TableCell>
                    <TableCell className='font-medium'>{button.name}</TableCell>
                    <TableCell>
                      <Badge variant='secondary'>
                        {button.merchantName} ({button.merchantId})
                      </Badge>
                    </TableCell>
                    <TableCell className='text-muted-foreground'>
                      {button.description}
                    </TableCell>
                    <TableCell>
                      {button.amount !== null ? (
                        <div className='flex items-center'>
                          {button.currency === 'BRL' ? 'R$' : '$'}
                          {button.amount.toFixed(2)}
                        </div>
                      ) : (
                        <Badge variant='outline'>Variável</Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge variant={statusColors[button.status] as any}>
                        {statusLabels[button.status]}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {new Date(button.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      {new Date(button.lastUsed).toLocaleString()}
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
                            onClick={() => handleButtonAction(button, 'copy')}
                          >
                            <Copy className='mr-2 h-4 w-4' />
                            Copiar Link
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Link className='mr-2 h-4 w-4' />
                            Ver Transações
                          </DropdownMenuItem>
                          {button.status === 'active' ? (
                            <>
                              <DropdownMenuItem
                                onClick={() =>
                                  handleButtonAction(button, 'suspend')
                                }
                                className='text-yellow-600'
                              >
                                <XCircle className='mr-2 h-4 w-4' />
                                Suspender
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() =>
                                  handleButtonAction(button, 'deactivate')
                                }
                                className='text-red-600'
                              >
                                <XCircle className='mr-2 h-4 w-4' />
                                Desativar
                              </DropdownMenuItem>
                            </>
                          ) : (
                            <DropdownMenuItem
                              onClick={() =>
                                handleButtonAction(button, 'activate')
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
          </CardContent>
        </Card>

        {/* Action Dialog */}
        <Dialog
          open={!!selectedButton && actionType !== 'copy'}
          onOpenChange={() => setSelectedButton(null)}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {actionType === 'activate'
                  ? 'Ativar'
                  : actionType === 'deactivate'
                    ? 'Desativar'
                    : 'Suspender'}{' '}
                Botão de Pagamento
              </DialogTitle>
              <DialogDescription>
                Tem certeza que deseja{' '}
                {actionType === 'activate'
                  ? 'ativar'
                  : actionType === 'deactivate'
                    ? 'desativar'
                    : 'suspender'}{' '}
                este botão de pagamento? Esta ação afetará sua disponibilidade
                para os clientes.
              </DialogDescription>
            </DialogHeader>

            {selectedButton && (
              <div className='space-y-4'>
                <div className='grid grid-cols-2 gap-4 text-sm'>
                  <div>
                    <strong>ID do Botão:</strong> {selectedButton.id}
                  </div>
                  <div>
                    <strong>Nome:</strong> {selectedButton.name}
                  </div>
                  <div>
                    <strong>Comerciante:</strong> {selectedButton.merchantName}{' '}
                    ({selectedButton.merchantId})
                  </div>
                  <div>
                    <strong>Valor:</strong>{' '}
                    {selectedButton.amount !== null
                      ? `${selectedButton.currency === 'BRL' ? 'R$' : '$'}${selectedButton.amount.toFixed(2)}`
                      : 'Variável (definido pelo cliente)'}
                  </div>
                  <div>
                    <strong>Status Atual:</strong>{' '}
                    {statusLabels[selectedButton.status]}
                  </div>
                  <div>
                    <strong>URL:</strong>
                    <a
                      href={selectedButton.url}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='ml-1 text-blue-500 hover:underline'
                    >
                      {selectedButton.url.substring(0, 20)}...
                    </a>
                  </div>
                </div>
              </div>
            )}

            <DialogFooter>
              <Button variant='outline' onClick={() => setSelectedButton(null)}>
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
