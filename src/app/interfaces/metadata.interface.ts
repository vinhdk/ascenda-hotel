export interface IAscendaMetadata {
  id /* -- Hotel ID --*/ : number;
  price: number;
  competitors?: Record<string, number>;
  taxes_and_fees?: Partial<IAscendaMetadataTaxAndFee>;
}

export interface IAscendaMetadataTaxAndFee {
  tax: number;
  hotel_fees: number;
}
