import { NavItem } from '@/types';

// @/constants/data.ts
export interface PaymentButton {
  id: string;
  name: string;
  buttonToken: string;
  destination: string | null;
  appId: number;
  createdAt: string;
  status: 'active' | 'inactive' | 'pending';
  needsActivation?: boolean;
  webhookUrl?: string;
  clientSecret?: string;
  transactionsCount?: number;
  lastUsedAt?: string | null;
  reference?: string;
  metadata?: Record<string, any>;
}

export type Product = {
  photo_url: string;
  name: string;
  description: string;
  created_at: string;
  price: number;
  id: number;
  category: string;
  updated_at: string;
};

export interface App {
  id: string;
  name: string;
  description: string;
  client_id: string;
  // client_secret?: string; // Opcional para segurança
  status: 'active' | 'inactive' | 'suspended';
  environment: 'sandbox' | 'production';
  created_at: string;
  updated_at: string;
  last_used?: string;
  webhook_url?: string;
  ip_restrictions?: string[];
  permissions: string[];
}

export interface Refund {
  id: string;
  transaction_id: string;
  amount: number;
  currency: string;
  type: 'full' | 'partial';
  status:
    | 'pending_approval'
    | 'processing'
    | 'completed'
    | 'failed'
    | 'cancelled';
  payment_method:
    | 'credit_card'
    | 'debit_card'
    | 'pix'
    | 'bank_transfer'
    | 'wallet';
  reason?: string;
  created_at: string;
  processed_at?: string;
  approved_by?: string;
  approved_at?: string;
  customer: {
    id: string;
    name: string;
    email: string;
  };
  original_transaction: {
    id: string;
    amount: number;
    reference: string;
    date: string;
  };
  metadata?: {
    admin_notes?: string;
    customer_notes?: string;
    attachments?: string[];
  };
}

// Tipo para a resposta da API de listagem de reembolsos
export interface RefundsResponse {
  total_refunds: number;
  total_amount: number;
  refunds: Refund[];
  page: number;
  limit: number;
}

export interface Withdrawal {
  id: string;
  amount: number;
  method: 'mpesa' | 'bank' | 'pix' | 'emola' | string;
  destination: string;
  destination_name?: string;
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'reversed';
  created_at: string | Date;
  reference?: string;
  fee?: number;
  net_amount?: number;
  user_id?: string;
  account_id?: string;
  processed_at?: string | Date;
  receipt_url?: string;
}

export interface WithdrawalAccount {
  id: string;
  name: string;
  type: 'mpesa' | 'bank' | 'pix' | 'emola';
  details: {
    phone?: string;
    bank_name?: string;
    branch?: string;
    account_number?: string;
    pix_key?: string;
    pix_type?: 'cpf' | 'cnpj' | 'email' | 'phone' | 'random';
  };
  is_default?: boolean;
  created_at: string | Date;
}

// Tipos auxiliares
export type WithdrawalStatus = Withdrawal['status'];
export type WithdrawalMethod = Withdrawal['method'];

// Response da API
export interface WithdrawalsResponse {
  data: Withdrawal[];
  meta: {
    total: number;
    page: number;
    limit: number;
    total_pages: number;
  };
}

// Parâmetros para filtro
export interface WithdrawalFilters {
  status?: WithdrawalStatus;
  method?: WithdrawalMethod;
  min_amount?: number;
  max_amount?: number;
  start_date?: string;
  end_date?: string;
  search?: string;
}

// Payload para criação de saque
export interface CreateWithdrawalPayload {
  amount: number;
  method: WithdrawalMethod;
  account_id: string;
  reference?: string;
}

//Info: The following data is used for the sidebar navigation and Cmd K bar.
export const navItems: NavItem[] = [
  {
    title: 'Gestão de Carteira',
    url: '#',
    icon: 'wallet',
    isActive: false,
    items: [
      {
        title: 'Visão Geral',
        url: '/dashboard/overview',
        icon: 'eye',
        isActive: false
      },
      {
        title: 'Transações',
        url: '/dashboard/wallet/transactions',
        icon: 'exchange',
        isActive: true
      },
      {
        title: 'Saques',
        url: '/dashboard/wallet/withdrawals',
        icon: 'dollarSign',
        isActive: false
      }
    ]
  },
  {
    title: 'Gestão de Usuários',
    url: '#',
    icon: 'users',
    isActive: false,
    items: [
      {
        title: 'Todos os Usuários',
        url: '/dashboard/users/all',
        icon: 'user',
        isActive: true
      },
      {
        title: 'Atividade de Usuários',
        url: '/dashboard/users/activity',
        icon: 'activity',
        isActive: true
      }
    ]
  },
  {
    title: 'Segurança e Auditoria',
    url: '#',
    icon: 'shield',
    isActive: false,
    items: [
      {
        title: 'Logs de Auditoria',
        url: '/dashboard/security/audit-logs',
        icon: 'fileText',
        isActive: true
      },
      {
        title: 'Logs de Login',
        url: '/dashboard/security/login-logs',
        icon: 'login',
        isActive: false
      }
    ]
  },
  {
    title: 'Links de Pagamento',
    url: '#',
    icon: 'link',
    isActive: false,
    items: [
      {
        title: 'Todos os Links',
        url: '/dashboard/payment-links/all',
        icon: 'list',
        isActive: true
      },
      {
        title: 'Botões de Pagamento',
        url: '/dashboard/payment-links/buttons',
        icon: 'mousePointer',
        isActive: true
      }
    ]
  },
  {
    title: 'Aplicações',
    url: '/dashboard/applications',
    icon: 'apps',
    isActive: false,
    items: []
  }
];
export interface SaleUser {
  id: number;
  name: string;
  email: string;
  amount: string;
  image: string;
  initials: string;
}

export const recentSalesData: SaleUser[] = [
  {
    id: 1,
    name: 'Olivia Martin',
    email: 'olivia.martin@email.com',
    amount: '+$1,999.00',
    image: 'https://api.slingacademy.com/public/sample-users/1.png',
    initials: 'OM'
  },
  {
    id: 2,
    name: 'Jackson Lee',
    email: 'jackson.lee@email.com',
    amount: '+$39.00',
    image: 'https://api.slingacademy.com/public/sample-users/2.png',
    initials: 'JL'
  },
  {
    id: 3,
    name: 'Isabella Nguyen',
    email: 'isabella.nguyen@email.com',
    amount: '+$299.00',
    image: 'https://api.slingacademy.com/public/sample-users/3.png',
    initials: 'IN'
  },
  {
    id: 4,
    name: 'William Kim',
    email: 'will@email.com',
    amount: '+$99.00',
    image: 'https://api.slingacademy.com/public/sample-users/4.png',
    initials: 'WK'
  },
  {
    id: 5,
    name: 'Sofia Davis',
    email: 'sofia.davis@email.com',
    amount: '+$39.00',
    image: 'https://api.slingacademy.com/public/sample-users/5.png',
    initials: 'SD'
  }
];
