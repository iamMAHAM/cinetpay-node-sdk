import Cinetpay from './lib/cinetpay';

export { generateTransactionId } from './lib/utils';

export {
  CheckTransactionResponse,
  InitiatePaymentResponse,
  NotifyUrlResponse,
  PaymentData,
} from './lib/types';

export default Cinetpay;
