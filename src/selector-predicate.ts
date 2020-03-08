import { HTTP_OPTION_PREFIX } from './constants';

export function selectorPredicate(selector: string[]): (key: string) => boolean {
  return key => Array.isArray(selector)
    ? selector.map(sel => `${HTTP_OPTION_PREFIX}${sel}`).includes(key)
    : true;
}
