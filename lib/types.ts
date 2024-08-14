export type PaymentData = (
  | {
      channels: 'CREDIT_CARD';
      customer_id?: string;
      customer_name: string;
      customer_surname: string;
      customer_phone_number: string;
      customer_email: string;
      customer_address: string;
      customer_city: string;
      customer_country: string;
      customer_state: string;
      customer_zip_code: string;
    }
  | {
      channels: 'MOBILE_MONEY' | 'WALLET';
    }
  | {
      channels: 'ALL';
      customer_id?: string;
      customer_name?: string;
      customer_surname?: string;
      customer_phone_number?: string;
      customer_email?: string;
      customer_address?: string;
      customer_city?: string;
      customer_country?: string;
      customer_state?: string;
      customer_zip_code?: string;
    }
) & {
  transaction_id: string;
  amount: number;
  currency: 'XOF' | 'XAF' | 'CDF' | 'GNF' | 'USD';
  description: string;
  notify_url: string;
  return_url: string;
  lang?: 'fr' | 'en';
  metadata?: Record<string, any>;
  invoice_data?: Record<string, any>;
  lock_phone_number?: boolean;
};

type Common = {
  code: string;
  message: string;
  description: string;
  api_response_id: string;
};

export type InitiatePaymentResponse =
  | Common
  | (Common & {
      data: {
        payment_token: string;
        payment_url: string;
      };
    });

export type CheckTransactionResponse = Omit<Common, 'description'> & {
  data: {
    amount: string;
    currency: string;
    status: 'ACCEPTED' | 'PENDING' | 'REFUSED';
    payment_method: string;
    description: string;
    metadata: Record<string, any> | null;
    operator_id: string | null;
    payment_date: string;
    fund_availability_date: string;
  };
};

export type NotifyUrlResponse = {
  cpm_site_id: string;
  cpm_trans_id: string;
  cpm_trans_date: string;
  cpm_amount: number;
  cpm_currency: string;
  signature: string;
  payment_method: string;
  cel_phone_num: string;
  cpm_phone_prefixe: string;
  cpm_language: string;
  cpm_version: string;
  cpm_payment_config: string;
  cpm_page_action: string;
  cpm_custom: object;
  cpm_designation: string;
  cpm_error_message: string;
};
