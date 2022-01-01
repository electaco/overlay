export function ByActive(a, b) {
  return a.active === b.active ? 0 : a.active ? -1 : 1;
}

export function SortArray(array, sortBy) {
    if (array === undefined || array.length === 0) {
        return array;
    }
    let a = array.slice();
    return a.sort(sortBy);
  }
