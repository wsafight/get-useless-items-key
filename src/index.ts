type UniqueKey = 'string' | 'number';

interface Options {
  keyName?: string;
  valName?: string;
  getOrder?: 'front' | 'back';
}

const DEFAULT_OPTIONS: Options = {
  keyName: 'id',
  valName: 'value',
  getOrder: 'front',
};

/**
 * 获取无用的 item key
 */
const getUselessItemKey = (
  data: Record<string, any>[],
  opts: Options = {
    ...DEFAULT_OPTIONS,
  },
): UniqueKey[] => {
  const finalOpts: Options = { ...DEFAULT_OPTIONS, ...opts };

  const { keyName = 'id', valName = 'value', getOrder = 'front' } = finalOpts;

  const keysByVal: Map<string, UniqueKey[]> = new Map<string, UniqueKey[]>();

  data.forEach(item => {
    const key: UniqueKey = item[keyName!];
    const val = item[valName!];
    if (!key || !val) {
      return;
    }
    const current = keysByVal.get(val);
    if (!current) {
      keysByVal.set(val, [key]);
    } else {
      current.push(key);
    }
  });

  const uselessKeys: UniqueKey[] = [];

  keysByVal.forEach((keys: UniqueKey[]) => {
    const count = keys.length;
    if (count === 1) {
      return;
    }
    if (getOrder === 'front') {
      for (let i = 0; i < count - 1; i++) {
        uselessKeys.push(keys[i]);
      }
    } else {
      for (let i = count - 1; i > 0; i--) {
        uselessKeys.push(keys[i]);
      }
    }
  });

  return uselessKeys;
};

export type {
  Options,
  UniqueKey,
};

export {
  getUselessItemKey,
}

export default getUselessItemKey;
