import { generateUUID } from '../database';
import { formatDateAndTime } from '../utilities';

export function createCustomerInvoice(database, customer) {
  const invoice = database.create('Transaction', {
    id: generateUUID(),
    serialNumber: '1',
    entryDate: new Date(),
    type: 'customer_invoice',
    status: 'confirmed', // Customer invoices always confirmed in mobile for easy stock tracking
    comment: '',
    otherParty: customer,
  });
  if (customer.useMasterList) invoice.addItemsFromMasterList(database);
  database.save('Transaction', invoice);
  customer.addTransaction(invoice);
  database.save('Name', customer);
  return invoice;
}

export function createStocktake(database, user) {
  const date = new Date();
  const stocktake = database.create('Stocktake', {
    id: generateUUID(),
    name: `Stocktake ${formatDateAndTime(date, 'slashes')}`,
    createdDate: date,
    status: 'new',
    comment: '',
    createdBy: user,
    serialNumber: '1337',
  });
  return stocktake;
}

// Creates a stocktakeItem and adds it to the stocktake.
export function createStocktakeItem(database, stocktake, item) {
  const stocktakeItem = database.create('StocktakeItem', {
    id: generateUUID(),
    item: item,
    stocktake: stocktake,
  });
  stocktake.items.push(stocktakeItem);
  database.save('Stocktake', stocktake);
  return stocktakeItem;
}