export interface FirestoreFilter {
  field: string;
  operator: FirestoreOperator;
  value: any;
}

type FirestoreOperator =
  | '=='
  | '!='
  | '<'
  | '<='
  | '>'
  | '>='
  | 'array-contains'
  | 'array-contains-any'
  | 'in'
  | 'not-in';
