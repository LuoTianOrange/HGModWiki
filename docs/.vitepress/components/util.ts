export interface dict {
  [propName: string]: any;
}

export function isEmpty(s: any) {
  if (s === undefined || s === null || s === '') {
    return true;
  }
  return false;
}

export function isNumber(s: any) {
  if (typeof s === 'number') {
    return true;
  }
  return false;
}

export function isString(s: any) {
  if (typeof s === 'string') {
    return true;
  }
  return false;
}

export function http_build_query(obj: dict): string {
  let res = '';
  for (const k in obj) {
    res += `${k}=${obj[k]}`;
  }
  return res;
}
