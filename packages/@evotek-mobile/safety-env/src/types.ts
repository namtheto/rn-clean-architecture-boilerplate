export interface IGetEnv {
  getEnv: (key: string) => string;
  getAllEnv: () => { [key: string]: string };
}
