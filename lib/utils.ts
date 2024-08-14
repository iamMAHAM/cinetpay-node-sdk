export const generateTransactionId = ({
  prefix = 'CINETPAY',
}: {
  prefix?: string;
}) => {
  return `${prefix}_${Date.now()}`;
};
