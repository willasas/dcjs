/**
* 下载一个链接
*/
function download(link, name) {
  // 如果没有提供名字，从给的Link中截取最后一坨
  if (!name){
    name = link.slice(link.lastIndexOf('/') + 1);
  }
  let elelink = document.createElement('a');
  elelink.download = name;
  elelink.style.display = 'none';
  elelink.href = link;
  document.body.appendChild(elelink);
  elelink.click();
  document.body.removeChild(elelink);
}

/*调用，如下载execel、word、ppt等浏览器不会默认执行预览的文档,也可以用于下载后端接口返回的流数据*/
// download('http://111.229.224.13/file/1.xlsx');
// download('http://111.229.14.189/gk-api/util/download?file=1.jpg')
// download('http://111.229.14.189/gk-api/util/download?file=1.mp4')

/**
* 浏览器下载静态文件（DOM、json文件等）
* 
* @param {String} name 文件名
* @param {String} content 文件内容
*/
function downloadFile(name, content){
  if(typeof name == 'undefined'){
    throw new Error('The first parameter name is a must');
  }
  if(typeof content == 'undefined'){
    throw new Error('The second parameter content is a must')
  }
  if(!(content instanceof Blob)){
    content = new Blob([content]);
  }
  const link = URL.createObjectURL(content);
  download(link, name);
}

/*调用，如下载DOM、json文件等*/
// downloadFile('1.json', JSON.stringify({name: 'haha'}));
// downloadFile('1.txt', 'hahall');

/**
* 提供一个图片链接，点击下载
* 图片、pdf等文件，浏览器会默认执行预览，不能调用download方法进行下载，需要先把图片、pdf等文件转成blob，再调用download方法进行下载，转换的方式是使用axios请求对应的链接
*
* 注意：会有同源策略的限制，需要配置转发
*/
// import axios from 'axios';
// function downloadByLink(link, fileName){
//   axios.request({
//     url: link,
//     responseType: 'blob' //让axios把响应改成blob
//   }).then(res => {
//     const link  = URL.createObjectURL(res.data);
//     download(link, fileName)
//   })
// }

