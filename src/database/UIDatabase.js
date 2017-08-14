export class UIDatabase {

  constructor(database) {
    this.database = database;
  }

  objects(type) {
    let results = this.database.objects(translateToCoreDatabaseType(type));
    switch (type) {
      case 'Customer':
        results = results.filtered('isVisible == true AND isCustomer == true');
        break;
      case 'Supplier':
        results = results.filtered('isVisible == true AND isSupplier == true');
        break;
      case 'InternalSupplier':
        results = results.filtered('isVisible == true AND isSupplier == true AND type == "store"');
        break;
      case 'ExternalSupplier':
        results = results.filtered(
          "isVisible == true AND isSupplier == true AND type == 'facility'"
        );
        break;
      case 'Item':
        results = results.filtered('isVisible == true');
        break;
      case 'Requisition':
      // Hide Requisitions that have not been updated with a serialNumber in postSync
        results = results.filtered('serialNumber != "-1"');
        break;
      default:
        break;
    }
    return results;
  }

  addListener(...args) { return this.database.addListener(...args); }
  removeListener(...args) { return this.database.removeListener(...args); }
  alertListeners(...args) { return this.database.alertListeners(...args); }
  create(...args) { return this.database.create(...args); }
  delete(...args) { return this.database.delete(...args); }
  deleteAll(...args) { return this.database.deleteAll(...args); }
  save(...args) { return this.database.save(...args); }
  update(...args) { return this.database.update(...args); }
  write(...args) { return this.database.write(...args); }

}

function translateToCoreDatabaseType(type) {
  switch (type) {
    case 'Customer':
    case 'Supplier':
    case 'InternalSupplier':
    case 'ExternalSupplier':
      return 'Name';
    default:
      return type;
  }
}
