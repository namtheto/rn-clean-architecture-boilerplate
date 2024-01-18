type TypesBase =
  | 'bigint'
  | 'boolean'
  | 'function'
  | 'number'
  | 'object'
  | 'string'
  | 'symbol'
  | 'undefined';

export const onCheckType = (
  source: any,
  type: TypesBase,
): source is TypesBase => {
  return typeof source === type;
};

export const execFunc = <Fn extends (...args: any[]) => any>(
  func?: Fn,
  ...args: Parameters<Fn>
): ReturnType<Fn> => {
  if (onCheckType(func, 'function')) {
    return func(...args);
  }
  return undefined as ReturnType<Fn>;
};

export const getBearerToken = (token?: string | null) => {
  return token ? `Bearer ${token}` : '';
};

export const replaceAll = (source = '', textReplace = '', textInstead = '') => {
  return source.split(textReplace).join(textInstead);
};
