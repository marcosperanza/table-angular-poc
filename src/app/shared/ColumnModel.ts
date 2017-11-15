export enum SortOrder {
  ASC = 'ASC',
  DESC = 'ASC',
  NONE = 'NONE'
}

export enum ColumnType {
  AbsoluteTimeType,
  BitSequenceType,
  BitmaskType,
  BooleanType,
  BytePatternType,
  ByteSequenceType,
  CharSequenceType,
  DigitSequenceType,
  EnumeratedType,
  FixedPointType,
  FloatingPointType,
  IPv4Type,
  IPv6Type,
  MtpType,
  NumericType,
  OctetType,
  PCapType,
  RelativeTimeType,
  SummaryType
}

export interface ColumnModel {

  order: SortOrder;
  name: string;
  fieldIndex: number;
  identifier: string;
  columnType: ColumnType;
  schemaId: string;
}
