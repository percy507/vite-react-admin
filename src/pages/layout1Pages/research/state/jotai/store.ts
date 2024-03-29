import { atom } from 'jotai';
import { atomWithReset, atomWithStorage } from 'jotai/utils';

interface ObjType {
  v1: string;
  v2: string;
  count: number;
}

const atomInnerObj = atom<ObjType>({} as ObjType);
atomInnerObj.onMount = (set) => {
  // The onMount function is called when the atom is first used in a provider
  set({ v1: 'init', v2: 'init', count: 1000 });
};

export const atomObj = atom<ObjType, Partial<ObjType>>(
  (get) => get(atomInnerObj),
  /** support update config partly */
  (get, set, partVal) => {
    const val = { ...get(atomInnerObj), ...partVal } as ObjType;
    set(atomInnerObj, val);
  },
);

export const atomV1 = atom((get) => get(atomObj).v1);

export const atomCount = atom(
  (get) => get(atomObj).count,
  (get, set, update) => {
    set(atomObj, {
      count: typeof update === 'function' ? update(get(atomCount)) : update,
    });
  },
);

export const atomVal1 = atomWithReset('init_value1');
export const atomVal2 = atomWithStorage('localstorage_key_val2', 'init_value2');
