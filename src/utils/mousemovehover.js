/**
 * 常量定义部分：
 * OFFSET: 使用常量代替魔法数字69，为鼠标移动时元素偏移的固定距离。
 * ANGLES: 存储角度数组，用于计算元素位置。
 */

const OFFSET = 69;
const ANGLES = [];

// 初始化ANGLES数组，包含0到360度每45度的角度值，转换为弧度。
for (let i = 0; i <= 360; i += 45) {
  ANGLES.push((i * Math.PI) / 180);
}

let nearBy = [];

/**
 * 清除nearBy数组中元素的样式。
 * 遍历数组，将元素的borderImage样式重置为null，然后清空数组。
 */
function clearNearBy() {
  nearBy.forEach((e) => (e.style.borderImage = null));
  nearBy = [];
}

/**
 * 设置元素的背景和边框样式。
 * @param {HTMLElement} element - 需要设置样式的元素。
 * @param {number} x - 元素相对于鼠标的x坐标偏移。
 * @param {number} y - 元素相对于鼠标的y坐标偏移。
 */
function setElementStyle(element, x, y) {
  element.style.background = `radial-gradient(circle at ${x}px ${y}px , rgba(255,255,255,0.25),rgba(255,255,255,0) )`;
  element.style.borderImage = `radial-gradient(20% 65% at ${x}px ${y}px ,rgba(255,255,255,0.7),rgba(255,255,255,0.7),rgba(255,255,255,0.1) ) 9 / 2px / 0px stretch `;
}

/**
 * 鼠标移动时的处理函数。
 * 根据鼠标位置，计算并设置附近按钮的样式。
 * @param {MouseEvent} e - 鼠标事件对象。
 */
const handleMouseMove = (e) => {
  clearNearBy(); // 清除之前的样式

  const x = e.clientX;
  const y = e.clientY;

  // 根据角度数组计算鼠标周围元素的位置，并设置样式
  nearBy = ANGLES.reduce((acc, rad) => {
    const cx = Math.floor(x + Math.cos(rad) * OFFSET);
    const cy = Math.floor(y + Math.sin(rad) * OFFSET);

    const element = document.elementFromPoint(cx, cy);
    if (element && element.className === "li-btn" && acc.indexOf(element) === -1) {
      const { left, top } = element.getBoundingClientRect();
      setElementStyle(element, x - left, y - top);
      return [...acc, element];
    }
    return acc;
  }, []);
};

/**
 * 鼠标离开区域时的处理函数。
 * 清除所有元素的样式。
 */
const handleMouseLeave = () => {
  clearNearBy();
};

/**
 * 为按钮设置事件监听。
 * @param {NodeList} buttons - 需要设置事件的按钮元素列表。
 */
const setupButtonEvents = (buttons) => {
  buttons.forEach((button) => {
    // 鼠标离开按钮时的样式重置
    button.onmouseleave = (e) => {
      e.target.style.background = "#ccc";
      e.target.style.borderImage = null;
      e.target.style.border = "1px solid transparent";
    };

    // 鼠标进入按钮时清除附近按钮的样式
    button.onmouseenter = clearNearBy;

    // 鼠标在按钮上移动时设置按钮样式
    button.addEventListener("mousemove", (e) => {
      const { left, top } = e.target.getBoundingClientRect();
      setElementStyle(e.target, e.clientX - left, e.clientY - top);
    });
  });
};

const faContainer = document.querySelector(".ul-grid");
const buttons = document.querySelectorAll(".li-btn");

// 如果存在按钮元素，设置按钮事件并监听容器的鼠标移动和离开事件
if (buttons.length > 0) {
  setupButtonEvents(buttons);

  if(faContainer){
    faContainer.addEventListener("mousemove", handleMouseMove);
    faContainer.onmouseleave = handleMouseLeave;
  } else {
    console.error("body element not found with class 'win-grid'");
  }
}

// dom如下：
/* <div class="ul-grid">
  <button class="li-btn">btn 1</button>
  <button class="li-btn">btn 2</button>
  <button class="li-btn">btn 3</button>
  <button class="li-btn">btn 4</button>
  <button class="li-btn">btn 5</button>
</div> */