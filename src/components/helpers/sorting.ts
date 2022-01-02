export function ByActive(a, b) {
    return a.active === b.active ? 0 : a.active ? -1 : 1;
}

export function MarkerPackHasMap(mapid: string) {
    return function (a, b) {
        if (a.markers[mapid]) {
            return -1;
        }
        if (b.markers[mapid]) {
            return 1;
        }
        return 0;
    }    
}

export function CompoundSort(sortfunctions:{(a, b): number}[]): {(a, b): number} {
    return function (a, b) {
        for (let i = 0; i < sortfunctions.length; i++) {
            let result = sortfunctions[i](a, b);
            if (result !== 0) {
                return result;
            }
        }
        return 0;
    };
}

export function ByActiveMap(mapid: string) {
    console.log("Active map: " + mapid);
    return (a, b) => {
        if (a === mapid) {
            return -1;
        }
        if (b === mapid) {
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
