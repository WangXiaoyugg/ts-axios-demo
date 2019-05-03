const o = {
  method: "get",
  url: '/base/get#hash?password=100',
  params: {
    foo: ['bar', 'baz'],
    name:['garen', 'wang'],
    age: [undefined, null],
    a: 1,
    b:2,
    c: "mike",
    man: {
      sex:'man',
      age: 30
    },
    date: new Date(),
    baz: "@:$, "
  }
}

function genUrl(o) {
  let url = "";
  if(o.url) {
    if(o.url.indexOf('#') > -1 && o.url.indexOf('?') === -1) {
      let index = o.url.indexOf("#")
      o.url = o.url.slice(0, index);
    }
    if(o.url.indexOf('#') > -1 && o.url.indexOf('?') > -1) {
      let start = o.url.indexOf("#")
      let end = o.url.indexOf('?');
      o.url = o.url.slice(0, start) + o.url.slice(end) + "&";
    }


    url += o.url;
  }

  if(o.params) {
    url += url.indexOf("?") > -1 ? '' : "?"
    Object.entries(o.params).map((kv) => {
      let [key, val] = kv;
      if(val === undefined || val === null) return;
      if(typeof val === 'string' || typeof val === 'number' || typeof val === 'boolean') {
        val = typeof val === 'string' ? val.replace(" ", "+") : val;
        url += `${key}=${val}&`
      }
      if( key && Array.isArray(val) && val.length) {
        //数组里也有可能递归
        val.forEach(item => {
          if(item === undefined || item === null) return;
          url += `${key}[]=${item}&`
        })

      }
      if(Object.prototype.toString.call(val) === '[object Object]') {
        // 不支持递归
        try {
          val = encodeURIComponent(JSON.stringify(val))
          url += `${key}=${val}&`;
        }catch (e) {
          console.log(e)
        }
      }

      if(Object.prototype.toString.call(val) === "[object Date]") {
        url += `${key}=${val.toISOString()}&`
      }
    })
  }
  url = url.slice(0, -1);
  return url
}

let r1 = genUrl(o)
console.log(r1);
