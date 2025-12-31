# SnapDOM 截图功能

- ![SnapDOM](https://snapdom.dev/) 是一款下一代 DOM 采集引擎——超高速、模块化且可扩展。 它能将任何DOM子树转换为自包含的表示，通过插件导出为SVG、PNG、JPG、WEBP、Canvas、Blob或任何自定义格式。

## 快速开始

- 以下是一个简单的示例，展示如何使用 SnapDOM 截取页面中的特定区域并生成 PNG 图片：

```html
<!DOCTYPE html>
<html lang="zh-CN">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SnapDOM 截图功能</title>
    <style>
        #captureArea {
            background: #13a08b;
            padding: 40px;
            margin: 20px0;
            box-shadow: 05px15pxrgba(0, 0, 0, 0.2);
        }

        #captureAreah1,
        #captureAreap {
            color: white;
            text-align: center;
        }

        #captureAreah1 {
            margin-bottom: 20px;
            font-size: 32px;
            text-shadow: 2px2px4pxrgba(0, 0, 0, 0.3);
        }

        #captureAreap {
            font-size: 18px;
            margin-bottom: 15px;
        }

        .stats {
            display: flex;
            margin-top: 30px;
            gap: 20px;
        }

        .stat-item {
            flex: 1;
            text-align: center;
            background: rgba(255, 255, 255, 0.15);
            border-radius: 8px;
            padding: 40px20px;
            border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .stat-item.number {
            font-size: 48px;
            font-weight: bold;
            display: block;
            color: white;
        }

        .stat-item.label {
            font-size: 20px;
            margin-top: 10px;
        }

        #captureBtn {
            background: #ff1212;
            color: white;
            border: none;
            padding: 10px20px;
            border-radius: 8px;
            cursor: pointer;
            display: block;
            margin: 0 auto;
        }
    </style>
</head>

<body>
    <div id="captureArea">
        <h1>前端标题</h1>
        <p>这是一个内容丰富的前端技术分享公众号</p>

        <div class="stats">
            <div class="stat-item">
                <span class="number">1000+</span>
                <span class="label">用户使用</span>
            </div>
            <div class="stat-item">
                <span class="number">99%</span>
                <span class="label">满意度</span>
            </div>
            <div class="stat-item">
                <span class="number">24/7</span>
                <span class="label">在线服务</span>
            </div>
        </div>
    </div>

    <button id="captureBtn">点击截图</button>

    <div id="preview"></div>

    <!-- 在线引入 SnapDOM 库 -->
    <script src="https://cdn.jsdelivr.net/npm/@zumer/snapdom/dist/snapdom.min.js"></script>
    <script>
        document.getElementById('captureBtn').onclick = function () {
            const element = document.getElementById('captureArea');
            snapdom(element).then(res => {
                res.toPng().then(img => {
                    document.getElementById('preview').appendChild(img);
                });
            });
        };
    </script>
</body>

</html>
```