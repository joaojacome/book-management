export interface FlashMessage {
  title: string,
  type: FlashMessageType;
  message: string
}

export enum FlashMessageType {
  Success,
  Error,
  Info,
  Warning
}
