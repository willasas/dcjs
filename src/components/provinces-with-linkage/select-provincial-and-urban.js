/**
 * 城市三级联动以及联合获取地区行政编码
 * 所使用的数据是city.js中的cityList
*/
const addrForm = document.createElement('form');
addrForm.setAttribute('class', 'addr-form');
addrForm.setAttribute('id', 'addr-form');
addrForm.setAttribute('action', '#');
document.body.appendChild(addrForm);
// 创建省级下拉菜单
const prov_el = document.createElement('div');
prov_el.setAttribute('class', 'prov-el');
prov_el.setAttribute('id', 'prov-el');
const prov_label = document.createElement('label');
prov_label.setAttribute('class', 'prov-label');
prov_label.setAttribute('id', 'prov-label');
prov_label.innerText = '请选择省份:';
const prov_number = document.createElement('select');
prov_number.setAttribute('class', 'prov-number');
prov_number.setAttribute('id', 'prov-number');
const prov_number_option = document.createElement('option');
prov_number_option.innerText = '请选择省份';
prov_number_option.setAttribute('value', 0);
prov_number.appendChild(prov_number_option);
prov_el.append(prov_label, prov_number);
// 创建市级下拉菜单
const city_el = document.createElement('div');
city_el.setAttribute('class', 'city-el');
city_el.setAttribute('id', 'city-el');
const city_label = document.createElement('label');
city_label.setAttribute('class', 'city-label');
city_label.setAttribute('id', 'city-label');
city_label.innerText = '请选择城市:';
const city_number = document.createElement('select');
city_number.setAttribute('class', 'prov-number');
city_number.setAttribute('id', 'prov-number');
const city_number_option = document.createElement('option');
city_number_option.innerText = '请选择城市';
city_number_option.setAttribute('value', 0);
city_number.appendChild(city_number_option);
city_el.append(city_label, city_number);
// 创建区县下拉菜单
const country_el = document.createElement('div');
country_el.setAttribute('class', 'country-el');
country_el.setAttribute('id', 'country-el');
const country_label = document.createElement('label');
country_label.setAttribute('class', 'country-label');
country_label.setAttribute('id', 'country-label');
country_label.innerText = '请选择县区:';
const country_number = document.createElement('select');
country_number.setAttribute('class', 'prov-number');
country_number.setAttribute('id', 'prov-number');
const country_number_option = document.createElement('option');
country_number_option.innerText = '请选择县区';
country_number_option.setAttribute('value', 0);
country_number.appendChild(country_number_option);
country_el.append(country_label, country_number);
// 创建input用于完整的省市区显示
const full_el = document.createElement('div');
full_el.setAttribute('class', 'full-el');
full_el.setAttribute('id', 'full-el');
const full_label = document.createElement('label');
full_label.setAttribute('class', 'full-label');
full_label.setAttribute('id', 'full-label');
full_label.innerText = '总地址:';
const full_addr = document.createElement('input');
full_addr.setAttribute('class', 'full-addr');
full_addr.setAttribute('id', 'full-addr');
full_el.append(full_label, full_addr);
// 将创建的所有元素添加到form表单中
addrForm.append(prov_el, city_el, country_el, full_el);

/*用于保存当前所选的省市区名字*/
let current = {
  prov_number: '',
  city_number: '',
  country_number: ''
};


/*自动加载省份列表*/
(function showProv() {
  for (let key in cityList) {
      let provOpt = document.createElement('option');
      provOpt.innerText = provOpt.value = key;
      prov_number.appendChild(provOpt);
  }
})();

/*根据所选的省份来显示城市列表*/
function showCity(obj) {
  let val = obj.options[obj.selectedIndex].value;
  if (val != current.prov_number) {
    current.prov_number = val;
    full_addr.innerHTML = full_addr.value = '';
    city_number.length = 1;
    country_number.length = 1;
  }

  if (val != '') {
    for (let key in cityList[current.prov_number]['city']) {
      let cityOpt = document.createElement('option');
      cityOpt.innerText = cityOpt.value = key;
      city_number.appendChild(cityOpt);
    }
  }
}

/*根据所选的城市来显示县区列表*/
function showCountry(obj) {
  let val = obj.options[obj.selectedIndex].value;
  if (val != current.city_number) {
    current.city_number = val;
    full_addr.innerHTML = full_addr.value = '';
    country_number.length = 1; //清空之前的内容只留第一个默认选项
  }
  if (val != '') {
    for (const key in cityList[current.prov_number]['city'][current.city_number]['country']) {
      const countryOpt = document.createElement('option');
      countryOpt.innerText = countryOpt.value = key
      country_number.appendChild(countryOpt);
    }
  }
}

// 下拉选择触发onchange事件（1.内容改变，2.失去焦点）
prov_number.onchange = function(e){
  showCity(this);
  prov_number.setAttribute('value', e.target.value);
}

city_number.onchange = function(e){
  showCountry(this);
  city_number.setAttribute('value', e.target.value);
}

country_number.onchange = function(e){
  selectCountry(this);
  country_number.setAttribute('value', e.target.value);
}

/*选择县区之后的处理函数*/
function selectCountry(obj) {
  current.country_number = obj.options[obj.selectedIndex].value;
  if (current.prov_number != '' && current.city_number != '' && current.country_number != '') {
    // 将结果赋值给input输入框
    full_addr.innerHTML = full_addr.value = current.prov_number + '-' + current.city_number + '-' + current.country_number + '-' + cityList[current.prov_number]['city'][current.city_number]['country'][current.country_number]['code'];
    full_addr.setAttribute('value', full_addr.innerHTML);
  }
}