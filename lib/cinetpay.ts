import type {
  CheckTransactionResponse,
  InitiatePaymentResponse,
  NotifyUrlResponse,
  PaymentData,
} from './types';

const CINETPAY_PAYMENT_BASE_URL =
  'https://api-checkout.cinetpay.com/v2/payment';

class Cinetpay {
  apiKey: string;
  siteId: string;
  static enableDebug: boolean = true;

  constructor(apiKey: string, siteId: string) {
    console.log('\x1b[32m', '[LOG]: initialisation de Cinetpay');
    if (!apiKey || !siteId) {
      throw new Error("L'API key et le site ID sont obligatoires");
    }

    if (typeof apiKey !== 'string' || typeof siteId !== 'string') {
      throw new Error(
        "L'API key et le site ID doivent être des chaînes de caractères"
      );
    }

    this.apiKey = apiKey;
    this.siteId = siteId;
  }

  async initiatePayment(params: PaymentData) {
    if (Cinetpay.enableDebug) {
      console.log(
        '\x1b[32m',
        '[LOG]: Initialisation du paiement : ',
        params.transaction_id
      );
    }

    const response = await this.request<InitiatePaymentResponse>('', params);

    if (!('data' in response)) {
      throw new Error(
        `Impossible d'initialiser le paiement [${response.message}] [${response.description}]`
      );
    }

    return response;
  }

  async checkTransaction(transactionId: string) {
    if (Cinetpay.enableDebug) {
      console.log(
        '\x1b[32m',
        '[LOG]: Vérification du statut du paiement : ',
        transactionId
      );
    }

    const response = await this.request<CheckTransactionResponse>('/check', {
      apiKey: this.apiKey,
      site_id: this.siteId,
      transaction_id: transactionId,
    });

    return response;
  }

  static async verifyHMACToken(
    token: string,
    secretKey: string,
    data: NotifyUrlResponse
  ) {
    const { createHmac } = await import('crypto');
    const {
      cpm_site_id,
      cpm_trans_id,
      cpm_trans_date,
      cpm_amount,
      cpm_currency,
      signature,
      payment_method,
      cel_phone_num,
      cpm_phone_prefixe,
      cpm_language,
      cpm_version,
      cpm_payment_config,
      cpm_page_action,
      cpm_custom,
      cpm_designation,
      cpm_error_message,
    } = data;

    const hmac = createHmac('sha256', secretKey);

    const dataString =
      cpm_site_id +
      cpm_trans_id +
      cpm_trans_date +
      cpm_amount +
      cpm_currency +
      signature +
      payment_method +
      cel_phone_num +
      cpm_phone_prefixe +
      cpm_language +
      cpm_version +
      cpm_payment_config +
      cpm_page_action +
      cpm_custom +
      cpm_designation +
      cpm_error_message;

    hmac.update(dataString);

    return hmac.digest('hex') === token;
  }

  async request<T = any>(url: string, data: Record<string, any>) {
    const response = await fetch(`${CINETPAY_PAYMENT_BASE_URL}${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...data,
        api_key: this.apiKey,
        site_id: this.siteId,
      }),
    });

    return (await response.json()) as T;
  }
}

export default Cinetpay;
