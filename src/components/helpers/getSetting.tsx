var objectPath = require("object-path");

function getSetting(settings: any, name: string, path: string, defaultval?: any) {
    var v= {
      name,
      path,
      value: objectPath.get(settings, path, defaultval)
    }
    return v;
  }

export default getSetting;