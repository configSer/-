var selection = {
  arr: [
    "province",
    "city",
  ],
  obj: {
    province: "",
    city: "",
  },
  init: function (el, callback, defaultValue) {
    let e = document.querySelector(el);
    selection.arr.forEach(item => {
      let s = document.createElement("select");
      s.name = s.id = item;
      s.className = "select_style";
      let o = document.createElement("option");
      o.innerHTML = "请选择" + (item === "province" ? "省" : item === "city" ? "市" : item === "area" ? "区/县" : '');
      s.appendChild(o);
      e.appendChild(s);
    });
    callback ? selection.province("#province", callback) : selection.province("#province");
    defaultValue && selection.setDefaultValue(defaultValue, callback)
  },
  province: function (el, callback) {
    let a = document.querySelector(el);
    let obj = data["100000"];
    for (let temp in obj) {
      let opt = document.createElement("option");
      opt.innerHTML = obj[temp];
      opt['value'] = temp;
      a.appendChild(opt);
    }
    a.onchange = function (evt) {
      evt.preventDefault();
      let code = evt.target.value;
      selection.obj.province = {[code]: data["100000"][code]};
      callback ? selection.city("#city", evt.target.value, callback) : selection.city("#city", evt.target.value);
    }
  },
  city: function (el, provinceCode, callback) {
    let a = document.querySelector(el);
    a.innerHTML = "";
    let o = document.createElement("option");
    o.innerHTML = "请选择市";
    a.appendChild(o);
    let obj = data[provinceCode];
    if (Object.keys(obj).length === 1) {
      o.innerHTML = "请选择区/县";
      let d = data[Object.keys(obj)[0]];
      for (let temp in d) {
        let opt = document.createElement("option");
        opt.innerHTML = d[temp];
        opt['value'] = temp;
        a.appendChild(opt);
      }
      a.onchange = function (evt) {
        evt.preventDefault();
        let code = evt.target.value;
        selection.obj.city = {[code]: d[code]};
        callback && callback(selection.obj)
      }
    } else {
      o.innerHTML = "请选择市";
      for (let temp in obj) {
        let opt = document.createElement("option");
        opt.innerHTML = obj[temp];
        opt['value'] = temp;
        a.appendChild(opt);
      }
      a.onchange = function (evt) {
        evt.preventDefault();
        let code = evt.target.value;
        selection.obj.city = {[code]: data[provinceCode][code]};
        callback && callback(selection.obj)
      }
    }
  },
  
  setDefaultValue: function (value, callback) {
    if (value && typeof value === 'string') {
      let province = data["100000"], city = [], area = [];
      Object.entries(province).forEach((item, provIndex) => {
        if (value.indexOf(item[1]) !== -1) {
          document.querySelector("#province").querySelectorAll("option")[provIndex + 1].selected = true;
          selection.obj.province = {[item[0]]: item[1]};
          selection.city("#city", item[0], callback);
          Object.entries(data[item[0]]).forEach((temp, cityIndex) => {
            if (value.indexOf(temp[1]) !== -1) {
              document.querySelector("#city").querySelectorAll("option")[cityIndex + 1].selected = true;
              selection.obj.city = {[temp[0]]: temp[1]};
              callback && callback(selection.obj)
            }
          })
        }
      })
    }
  },
  
};

