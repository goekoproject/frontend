export interface DocumentType {
  code: string;
  label: string;
  description: string;
  fieldOrder: number;
}

export interface ClassificationDocument {
  parentCode: string;
  label: string;
  description: string;
  documentTypes: DocumentType[];
}
