export function ByActive(a, b) {
  return a.active === b.active ? 0 : a.active ? -1 : 1;
}

export function ByActiveMap(mapid: string) {
    return (a, b) => {
        if (a.mapid === mapid) {
        return -1;
        }
        if (b.mapid === mapid) {
        return 1;
        }
        return 0;
    };
}

export function SortArray(array, sortBy) {
    if (array === undefined || array.length === 0) {
        return array;
    }
    let a = array.slice();
    return a.sort(sortBy);
  }
