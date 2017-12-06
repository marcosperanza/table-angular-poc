export enum Type {
  OUTPUT_RECORD_FETCHED = 'OUTPUT_RECORD_FETCHED',
  STATE_UPDATED = 'STATE_UPDATED'
}
export interface ServerEvent {
  type: Type;
}
