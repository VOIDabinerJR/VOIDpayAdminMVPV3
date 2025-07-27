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
  IconCalendarStats,
  IconShield,
  IconBuildingBank,
  IconUserCheck,
  IconUserX,
  IconAlertCircle,
  IconLock,
  IconSettings,
  IconChartBar,
  IconListDetails
} from '@tabler/icons-react';
import React from 'react';

export default function SuperAdminOverViewLayout({
  adminStats,
  gatewayStats,
  activityLog,
  recentAdmins,
  suspiciousActivity
}: {
  adminStats: React.ReactNode;
  gatewayStats: React.ReactNode;
  activityLog: React.ReactNode;
  recentAdmins: React.ReactNode;
  suspiciousActivity: React.ReactNode;
}) {
  const userName = 'SuperAdmin VoidPay';
  const notifications = [
    { id: 1, text: 'Novo administrador cadastrado', time: '15 min atrás' },
    { id: 2, text: 'Alteração crítica de configuração', time: '2 horas atrás' }
  ];

  return (
    <PageContainer>
      <div className='flex flex-1 flex-col space-y-4'>
        {/* Cabeçalho com saudação e notificações */}
        <div className='flex items-center justify-between'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>
              Painel de Controle, {userName} 
            </h2>
            <p className='text-muted-foreground'>
              Visão geral da plataforma e administradores
            </p>
          </div>
          <div className='flex items-center gap-2'>
            <button className='relative rounded-full p-2 hover:bg-gray-100'>
              <IconBell className='text-primary' />
              <span className='absolute right-0 top-0 h-2 w-2 rounded-full bg-red-500'></span>
            </button>
          </div>
        </div>

        {/* Estatísticas principais - Foco em Administradores */}
        <div className='*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs md:grid-cols-2 lg:grid-cols-4'>
          <Card className='@container/card'>
            <CardHeader>
              <div className='flex items-center gap-2'>
                <IconShield className='text-primary' />
                <CardDescription>Administradores Totais</CardDescription>
              </div>
              <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
                48
              </CardTitle>
              <CardAction>
                <Badge variant='outline'>
                  <IconTrendingUp />
                  +8.3%
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className='flex-col items-start gap-1.5 text-sm'>
              <div className='line-clamp-1 flex gap-2 font-medium'>
                Novos administradores <IconTrendingUp className='size-4' />
              </div>
              <div className='text-muted-foreground'>
                4 novos este mês
              </div>
            </CardFooter>
          </Card>

          <Card className='@container/card'>
            <CardHeader>
              <div className='flex items-center gap-2'>
                <IconBuildingBank className='text-primary' />
                <CardDescription>Gateways Ativos</CardDescription>
              </div>
              <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
                12
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
                Gateways configurados <IconTrendingUp className='size-4' />
              </div>
              <div className='text-muted-foreground'>
                1 novo gateway este mês
              </div>
            </CardFooter>
          </Card>

          <Card className='@container/card'>
            <CardHeader>
              <div className='flex items-center gap-2'>
                <IconUserCheck className='text-primary' />
                <CardDescription>Admins Ativos</CardDescription>
              </div>
              <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
                42
              </CardTitle>
              <CardAction>
                <Badge variant='outline'>
                  <IconTrendingUp />
                  +5.0%
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className='flex-col items-start gap-1.5 text-sm'>
              <div className='line-clamp-1 flex gap-2 font-medium'>
                Atividade recente <IconTrendingUp className='size-4' />
              </div>
              <div className='text-muted-foreground'>Últimas 24 horas</div>
            </CardFooter>
          </Card>

          <Card className='@container/card'>
            <CardHeader>
              <div className='flex items-center gap-2'>
                <IconUserX className='text-primary' />
                <CardDescription>Admins Suspensos</CardDescription>
              </div>
              <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
                3
              </CardTitle>
              <CardAction>
                <Badge variant='outline'>
                  <IconTrendingDown />
                  -25%
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className='flex-col items-start gap-1.5 text-sm'>
              <div className='line-clamp-1 flex gap-2 font-medium'>
                Comparado ao mês passado <IconTrendingDown className='size-4' />
              </div>
              <div className='text-muted-foreground'>
                1 suspensão este mês
              </div>
            </CardFooter>
          </Card>
        </div>

        {/* Segunda linha de estatísticas - Segurança e Configurações */}
        <div className='*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs md:grid-cols-2 lg:grid-cols-4'>
          <Card className='@container/card'>
            <CardHeader>
              <div className='flex items-center gap-2'>
                <IconLock className='text-primary' />
                <CardDescription>Autenticação 2FA</CardDescription>
              </div>
              <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
                92%
              </CardTitle>
              <CardAction>
                <Badge variant='outline'>
                  <IconTrendingUp />
                  +7.2%
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className='flex-col items-start gap-1.5 text-sm'>
              <div className='line-clamp-1 flex gap-2 font-medium'>
                Adoção de segurança <IconTrendingUp className='size-4' />
              </div>
              <div className='text-muted-foreground'>
                4 admins sem 2FA ativado
              </div>
            </CardFooter>
          </Card>

          <Card className='@container/card'>
            <CardHeader>
              <div className='flex items-center gap-2'>
                <IconAlertCircle className='text-primary' />
                <CardDescription>Alertas de Segurança</CardDescription>
              </div>
              <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
                5
              </CardTitle>
              <CardAction>
                <Badge variant='outline' className='bg-red-100 text-red-800'>
                  <IconTrendingUp />
                  +66%
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className='flex-col items-start gap-1.5 text-sm'>
              <div className='line-clamp-1 flex gap-2 font-medium text-red-600'>
                Necessidade de atenção <IconTrendingUp className='size-4' />
              </div>
              <div className='text-muted-foreground'>
                3 críticos, 2 avisos
              </div>
            </CardFooter>
          </Card>

          <Card className='@container/card'>
            <CardHeader>
              <div className='flex items-center gap-2'>
                <IconSettings className='text-primary' />
                <CardDescription>Configurações Alteradas</CardDescription>
              </div>
              <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
                28
              </CardTitle>
              <CardAction>
                <Badge variant='outline'>
                  <IconTrendingDown />
                  -12%
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className='flex-col items-start gap-1.5 text-sm'>
              <div className='line-clamp-1 flex gap-2 font-medium'>
                Este mês <IconTrendingDown className='size-4' />
              </div>
              <div className='text-muted-foreground'>5 alterações críticas</div>
            </CardFooter>
          </Card>

          <Card className='@container/card'>
            <CardHeader>
              <div className='flex items-center gap-2'>
                <IconActivity className='text-primary' />
                <CardDescription>Logs de Auditoria</CardDescription>
              </div>
              <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
                1,428
              </CardTitle>
              <CardAction>
                <Badge variant='outline'>
                  <IconTrendingUp />
                  +22.7%
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className='flex-col items-start gap-1.5 text-sm'>
              <div className='line-clamp-1 flex gap-2 font-medium'>
                Últimos 7 dias <IconTrendingUp className='size-4' />
              </div>
              <div className='text-muted-foreground'>
                Média de 204 logs/dia
              </div>
            </CardFooter>
          </Card>
        </div>

        {/* Gráficos e tabelas */}
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7'>
          <div className='col-span-4'>
            <Card>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                  <IconChartBar className='text-primary' />
                  Atividade dos Administradores
                </CardTitle>
                <CardDescription>Ações realizadas nos últimos 30 dias</CardDescription>
              </CardHeader>
              {adminStats}
            </Card>
          </div>

          <div className='col-span-4 md:col-span-3'>
            <Card>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                  <IconBuildingBank className='text-primary' />
                  Status dos Gateways
                </CardTitle>
                <CardDescription>Distribuição por status e tipo</CardDescription>
              </CardHeader>
              {gatewayStats}
            </Card>
          </div>

          <div className='col-span-4'>
            <Card>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                  <IconListDetails className='text-primary' />
                  Log de Atividades Recentes
                </CardTitle>
                <CardDescription>Últimas ações críticas</CardDescription>
              </CardHeader>
              {activityLog}
            </Card>
          </div>

          <div className='col-span-4 md:col-span-3'>
            <Card>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                  <IconUsers className='text-primary' />
                  Novos Administradores
                </CardTitle>
                <CardDescription>Cadastrados nos últimos 15 dias</CardDescription>
              </CardHeader>
              {recentAdmins}
            </Card>
          </div>
        </div>

        {suspiciousActivity}

        {/* Área de informações úteis */}
        <Card className='mt-4'>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <IconInfoCircle className='size-5' /> Insights e Ações Prioritárias
            </CardTitle>
          </CardHeader>
          <div className='grid grid-cols-1 gap-4 px-6 pb-4 md:grid-cols-2 lg:grid-cols-3'>
            <div className='rounded-lg border p-4'>
              <h3 className='mb-2 flex items-center gap-2 font-medium'>
                <IconAlertCircle className='text-yellow-600' /> Alertas de Segurança
              </h3>
              <p className='text-muted-foreground text-sm'>
                3 administradores com permissões elevadas sem 2FA ativado. Recomendado revisão imediata.
              </p>
            </div>
            <div className='rounded-lg border p-4'>
              <h3 className='mb-2 flex items-center gap-2 font-medium'>
                <IconUserX className='text-red-600' /> Suspensões Pendentes
              </h3>
              <p className='text-muted-foreground text-sm'>
                1 administrador com múltiplas tentativas de acesso falhas. Ação recomendada: suspensão temporária.
              </p>
            </div>
            <div className='rounded-lg border p-4'>
              <h3 className='mb-2 flex items-center gap-2 font-medium'>
                <IconSettings className='text-blue-600' /> Atualizações Pendentes
              </h3>
              <p className='text-muted-foreground text-sm'>
                Nova versão do painel de controle disponível (v2.3.1). Contém correções críticas de segurança.
              </p>
            </div>
          </div>
        </Card>

        {/* Ações rápidas */}
        <div className='grid grid-cols-1 gap-4 md:grid-cols-4'>
          <Card className='hover:border-primary hover:shadow-md transition-all cursor-pointer'>
            <CardHeader className='flex flex-row items-center gap-4'>
              <div className='bg-primary/10 p-3 rounded-full'>
                <IconUserCheck className='text-primary' />
              </div>
              <div>
                <CardTitle className='text-lg'>Aprovar Novos Admins</CardTitle>
                <CardDescription>3 solicitações pendentes</CardDescription>
              </div>
            </CardHeader>
          </Card>
          <Card className='hover:border-primary hover:shadow-md transition-all cursor-pointer'>
            <CardHeader className='flex flex-row items-center gap-4'>
              <div className='bg-primary/10 p-3 rounded-full'>
                <IconLock className='text-primary' />
              </div>
              <div>
                <CardTitle className='text-lg'>Auditar Permissões</CardTitle>
                <CardDescription>5 admins com permissões excessivas</CardDescription>
              </div>
            </CardHeader>
          </Card>
          <Card className='hover:border-primary hover:shadow-md transition-all cursor-pointer'>
            <CardHeader className='flex flex-row items-center gap-4'>
              <div className='bg-primary/10 p-3 rounded-full'>
                <IconAlertCircle className='text-primary' />
              </div>
              <div>
                <CardTitle className='text-lg'>Resolver Alertas</CardTitle>
                <CardDescription>5 alertas não resolvidos</CardDescription>
              </div>
            </CardHeader>
          </Card>
          <Card className='hover:border-primary hover:shadow-md transition-all cursor-pointer'>
            <CardHeader className='flex flex-row items-center gap-4'>
              <div className='bg-primary/10 p-3 rounded-full'>
                <IconSettings className='text-primary' />
              </div>
              <div>
                <CardTitle className='text-lg'>Atualizar Sistema</CardTitle>
                <CardDescription>1 atualização disponível</CardDescription>
              </div>
            </CardHeader>
          </Card>
        </div>
      </div>
    </PageContainer>
  );
}