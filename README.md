# Cinetpay Node SDK

Ce SDK permet d'intégrer facilement le service de paiement Cinetpay dans vos applications Node.js et TypeScript. Il fournit des fonctions pour initier et vérifier des paiements, et pour vérifier des jetons HMAC.

## Installation

Vous pouvez installer le package via npm :

```bash
npm install cinetpay-node-sdk
```

ou via yarn :

```bash
yarn add cinetpay-node-sdk
```

## Configuration

Avant d'utiliser le SDK, vous devez disposer d'une clé API et d'un ID de site que vous pouvez obtenir auprès de Cinetpay.

## Utilisation

### Importation

Commencez par importer le SDK dans votre fichier TypeScript :

```typescript
import Cinetpay from 'cinetpay-node-sdk';
```

### Initialisation

Vous pouvez initialiser le SDK avec votre clé API et l'ID de votre site :

```typescript
const cinetpay = new Cinetpay('YOUR_API_KEY', 'YOUR_SITE_ID');
```

### Initiation d'un paiement

Pour initier un paiement, utilisez la fonction `initiatePayment` avec les données de paiement requises :
en fonction du moyen de paiement choisi les paramètres devront être ajustés [pourquoi ?](https://docs.cinetpay.com/api/1.0-fr/checkout/initialisation#lien-paiement)

```typescript
const paymentData = {
  transaction_id: '123456789',
  amount: 1000,
  currency: 'XOF',
  description: 'Achat de produits',
  notify_url: 'https://votresite.com/notify',
  return_url: 'https://votresite.com/return',
  customer_name: 'John Doe',
  customer_surname: 'Doe',
  customer_phone_number: '+123456789',
  customer_email: 'john.doe@example.com',
  customer_address: '123 Rue Exemple',
  customer_city: 'Abidjan',
  customer_country: 'CI',
  customer_state: 'État',
  customer_zip_code: '00000',
  channels: 'ALL', // ou 'CREDIT_CARD', 'MOBILE_MONEY', 'WALLET'
};

cinetpay
  .initiatePayment(paymentData)
  .then((response) => {
    console.log('URL de paiement :', response.data.payment_url);
  })
  .catch((error) => {
    console.error('Erreur lors de l’initiation du paiement :', error.message);
  });
```

### Vérification d'une transaction

Pour vérifier l'état d'une transaction, utilisez la fonction `checkTransaction` :

```typescript
cinetpay
  .checkTransaction('123456789')
  .then((response) => {
    console.log('Statut de la transaction :', response.data.status);
  })
  .catch((error) => {
    console.error(
      'Erreur lors de la vérification de la transaction :',
      error.message
    );
  });
```

### Vérification du jeton HMAC

Pour vérifier un jeton HMAC reçu dans la notification de paiement :

[Plus d'informations ici](https://docs.cinetpay.com/api/1.0-fr/checkout/hmac)

```typescript
// webhook.ts

const body = req.body;
const token = req.headers.get('x-token');
const secret = process.env.CINETPAY_SECRET_KEY;

const isValid = await Cinetpay.verifyHMACToken(token, secret, body);

console.log('Jeton HMAC valide :', isValid); // true ou false
```

## Personnalisation

Vous pouvez utiliser une fonction interne pour généer `l'ID de la transaction` et personnaliser le préfixe avec la fonction `generateTransactionId` :

```typescript
import { generateTransactionId } from 'cinetpay-node-sdk';

const transactionId = generateTransactionId({ prefix: 'MY_PREFIX' });
console.log('ID de transaction :', transactionId); // MY_PREFIX_188838287667287383
```

## Debugging

Le mode debug est activé par défaut. Pour le désactiver :

```typescript
Cinetpay.enableDebug = false;
```

## Contribuer

Les contributions sont les bienvenues ! Veuillez soumettre vos modifications via une demande de fusion (pull request).

## Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](/LICENCE.md) pour plus de détails.
