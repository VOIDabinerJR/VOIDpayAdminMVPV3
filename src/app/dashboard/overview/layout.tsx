import PageContainer from '@/components/layout/page-container';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardFooter
} from '@/components/ui/card';
import {
  IconTrendingDown,
  IconTrendingUp,
  IconBell,
  IconInfoCircle,
  IconUsers,
  IconSubscript,
  IconActivity,
  IconShoppingCart,
  IconCoin,
  IconCalendarStats
} from '@tabler/icons-react';
import React from 'react';

export default function OverViewLayout({
  sales,
  pie_stats,
  bar_stats,
  area_stats,
  last_payments
}: {
  sales: React.ReactNode;
  pie_stats: React.ReactNode;
  bar_stats: React.ReactNode;
  area_stats: React.ReactNode;
  last_payments: React.ReactNode;
}) {
  // Simulando dados do usuário (substitua pelos dados reais)
  const userName = 'Abiner Maleiane';
  const notifications = [
    { id: 1, text: 'Novo pedido recebido', time: '10 min atrás' },
    { id: 2, text: 'Pagamento confirmado', time: '1 hora atrás' }
  ];

  return (
    <PageContainer>
      <div className='flex flex-1 flex-col space-y-4'>
        {/* Cabeçalho com saudação e notificações */}
        <div className='flex items-center justify-between'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>
              Olá, {userName} 👋
            </h2>
            <p className='text-muted-foreground'>
              Aqui está o resumo da sua plataforma
            </p>
          </div>
        </div>

        {/* Estatísticas principais */}
        <div className='*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs md:grid-cols-2 lg:grid-cols-4'>
          <Card className='@container/card'>
            <CardHeader>
              <div className='flex items-center gap-2'>
                <IconUsers className='text-primary' />
                <CardDescription>Total de Usuários</CardDescription>
              </div>
              <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
                1,248
              </CardTitle>
              <CardAction>
                <Badge variant='outline'>
                  <IconTrendingUp />
                  +12.3%
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className='flex-col items-start gap-1.5 text-sm'>
              <div className='line-clamp-1 flex gap-2 font-medium'>
                Novos usuários este mês <IconTrendingUp className='size-4' />
              </div>
              <div className='text-muted-foreground'>
                142 novos usuários registrados
              </div>
            </CardFooter>
          </Card>

          <Card className='@container/card'>
            <CardHeader>
              <div className='flex items-center gap-2'>
                <IconSubscript className='text-primary' />
                <CardDescription>Assinantes Ativos</CardDescription>
              </div>
              <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
                856
              </CardTitle>
              <CardAction>
                <Badge variant='outline'>
                  <IconTrendingUp />
                  +5.7%
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className='flex-col items-start gap-1.5 text-sm'>
              <div className='line-clamp-1 flex gap-2 font-medium'>
                Crescimento de assinaturas <IconTrendingUp className='size-4' />
              </div>
              <div className='text-muted-foreground'>
                48 novas assinaturas este mês
              </div>
            </CardFooter>
          </Card>

          <Card className='@container/card'>
            <CardHeader>
              <div className='flex items-center gap-2'>
                <IconActivity className='text-primary' />
                <CardDescription>Atividade Recente</CardDescription>
              </div>
              <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
                324
              </CardTitle>
              <CardAction>
                <Badge variant='outline'>
                  <IconTrendingUp />
                  +18.2%
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className='flex-col items-start gap-1.5 text-sm'>
              <div className='line-clamp-1 flex gap-2 font-medium'>
                Ações na plataforma <IconTrendingUp className='size-4' />
              </div>
              <div className='text-muted-foreground'>Últimas 24 horas</div>
            </CardFooter>
          </Card>

          <Card className='@container/card'>
            <CardHeader>
              <div className='flex items-center gap-2'>
                <IconShoppingCart className='text-primary' />
                <CardDescription>Pedidos Hoje</CardDescription>
              </div>
              <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
                42
              </CardTitle>
              <CardAction>
                <Badge variant='outline'>
                  <IconTrendingDown />
                  -3.4%
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className='flex-col items-start gap-1.5 text-sm'>
              <div className='line-clamp-1 flex gap-2 font-medium'>
                Comparado com ontem <IconTrendingDown className='size-4' />
              </div>
              <div className='text-muted-foreground'>
                Total de R$ 8,540 em vendas
              </div>
            </CardFooter>
          </Card>
        </div>

        {/* Segunda linha de estatísticas */}
        <div className='*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs md:grid-cols-2 lg:grid-cols-4'>
          <Card className='@container/card'>
            <CardHeader>
              <div className='flex items-center gap-2'>
                <IconCoin className='text-primary' />
                <CardDescription>Receita Mensal</CardDescription>
              </div>
              <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
                R$ 25,480
              </CardTitle>
              <CardAction>
                <Badge variant='outline'>
                  <IconTrendingUp />
                  +8.5%
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className='flex-col items-start gap-1.5 text-sm'>
              <div className='line-clamp-1 flex gap-2 font-medium'>
                Meta mensal: R$ 30,000 (85%)
              </div>
              <div className='text-muted-foreground'>
                Comparado ao mês anterior
              </div>
            </CardFooter>
          </Card>

          <Card className='@container/card'>
            <CardHeader>
              <div className='flex items-center gap-2'>
                <IconCalendarStats className='text-primary' />
                <CardDescription>Retenção Mensal</CardDescription>
              </div>
              <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
                78.5%
              </CardTitle>
              <CardAction>
                <Badge variant='outline'>
                  <IconTrendingUp />
                  +2.1%
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className='flex-col items-start gap-1.5 text-sm'>
              <div className='line-clamp-1 flex gap-2 font-medium'>
                Taxa de retenção <IconTrendingUp className='size-4' />
              </div>
              <div className='text-muted-foreground'>
                Melhor que a média do setor
              </div>
            </CardFooter>
          </Card>

          <Card className='@container/card'>
            <CardHeader>
              <div className='flex items-center gap-2'>
                <IconSubscript className='text-primary' />
                <CardDescription>Assinaturas Canceladas</CardDescription>
              </div>
              <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
                24
              </CardTitle>
              <CardAction>
                <Badge variant='outline'>
                  <IconTrendingDown />
                  -15%
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className='flex-col items-start gap-1.5 text-sm'>
              <div className='line-clamp-1 flex gap-2 font-medium'>
                Redução em cancelamentos <IconTrendingDown className='size-4' />
              </div>
              <div className='text-muted-foreground'>Taxa de churn: 2.8%</div>
            </CardFooter>
          </Card>

          <Card className='@container/card'>
            <CardHeader>
              <div className='flex items-center gap-2'>
                <IconUsers className='text-primary' />
                <CardDescription>Usuários Inativos</CardDescription>
              </div>
              <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
                192
              </CardTitle>
              <CardAction>
                <Badge variant='outline'>
                  <IconTrendingDown />
                  -7.2%
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className='flex-col items-start gap-1.5 text-sm'>
              <div className='line-clamp-1 flex gap-2 font-medium'>
                Últimos 30 dias <IconTrendingDown className='size-4' />
              </div>
              <div className='text-muted-foreground'>
                Campanhas de reativação em andamento
              </div>
            </CardFooter>
          </Card>
        </div>

        {/* Gráficos e tabelas */}
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7'>
          <div className='col-span-4'>
            <Card>
              <CardHeader>
                <CardTitle>Visão Geral dos Ganhos</CardTitle>
              </CardHeader>
              {bar_stats}
            </Card>
          </div>

          <div className='col-span-4 md:col-span-3'>
            <Card>
              <CardHeader>
                <CardTitle>Distribuição de Usuários</CardTitle>
                <CardDescription>Por tipo de assinatura</CardDescription>
              </CardHeader>
              {pie_stats}
            </Card>
          </div>

          <div className='col-span-4'>
            <Card>
              <CardHeader>
                <CardTitle>Histórico de Atividades</CardTitle>
                <CardDescription>Últimos 30 dias</CardDescription>
              </CardHeader>
              {area_stats}
            </Card>
          </div>

          <div className='col-span-4 md:col-span-3'>
            <Card>
              <CardHeader>
                <CardTitle>Transações Recentes</CardTitle>
                <CardDescription>Últimos 15 pedidos</CardDescription>
              </CardHeader>
              {sales}
            </Card>
          </div>
        </div>

        {last_payments}

        {/* Área de informações úteis */}
        <Card className='mt-4'>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <IconInfoCircle className='size-5' /> Insights e Ações
            </CardTitle>
          </CardHeader>
          <div className='grid grid-cols-1 gap-4 px-6 pb-4 md:grid-cols-2 lg:grid-cols-3'>
            <div className='rounded-lg border p-4'>
              <h3 className='mb-2 font-medium'>Oportunidades</h3>
              <p className='text-muted-foreground text-sm'>
                342 usuários inativos podem ser reativados com campanhas
                direcionadas.
              </p>
            </div>
            <div className='rounded-lg border p-4'>
              <h3 className='mb-2 font-medium'>Alertas</h3>
              <p className='text-muted-foreground text-sm'>
                5 assinaturas irão vencer nos próximos 3 dias. Enviar lembretes.
              </p>
            </div>
            <div className='rounded-lg border p-4'>
              <h3 className='mb-2 font-medium'>Desempenho</h3>
              <p className='text-muted-foreground text-sm'>
                Sua taxa de conversão está 12% acima da média do setor.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </PageContainer>
  );
}
