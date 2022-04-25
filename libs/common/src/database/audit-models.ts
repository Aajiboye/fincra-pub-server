export class AuditDataPersistence {
  createdBy?: string;
  lastModifiedBy?: string;

  createdAt: Date = new Date();
  updatedAt: Date = new Date();
}
