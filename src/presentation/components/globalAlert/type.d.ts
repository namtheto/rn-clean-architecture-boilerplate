export type GlobalAlertType = 'success' | 'error' | 'warn' | 'info';

export interface GlobalAlertData {
  title?: string;
  titleOptions?: any;
  msg: string;
  msgOptions?: any;
  duration?: number;
  type: GlobalAlertType;
}
