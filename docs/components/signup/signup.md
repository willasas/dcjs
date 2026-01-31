# DC Signup 组件文档

## 1. 组件介绍

DC Signup 是一个功能完整的注册表单组件，支持邮箱/手机号验证、密码强度检测、出生日期选择、地址联动选择等功能。该组件提供了丰富的配置选项，可根据不同需求进行自定义。

### 主要特性

- 支持邮箱和手机号格式验证
- 实时密码强度检测和反馈
- 出生日期选择器（年/月/日）
- 地址联动选择（国家/省份/城市）
- 表单验证和错误提示
- 支持自定义配置和回调函数
- 响应式设计，适配不同屏幕尺寸

## 2. 快速开始

### 安装

将组件文件引入到您的项目中：

```html
<!-- 引入样式文件 -->
<link rel="stylesheet" href="path/to/dcsignup.css">

<!-- 引入脚本文件 -->
<script src="path/to/dcsignup.js"></script>
```

### 基本使用

```html
<!-- HTML 结构 -->
<form id="signup-form">
    <div class="form-group">
        <label for="email">邮箱/手机号</label>
        <input type="text" id="email" name="email" placeholder="请输入邮箱或手机号">
        <div class="error-message" id="email-error"></div>
    </div>
    
    <div class="form-group">
        <label for="nickname">昵称</label>
        <input type="text" id="nickname" name="nickname" placeholder="请输入昵称">
        <div class="error-message" id="nickname-error"></div>
    </div>
    
    <div class="form-group">
        <label for="username">用户名</label>
        <input type="text" id="username" name="username" placeholder="请输入用户名">
        <div class="error-message" id="username-error"></div>
    </div>
    
    <div class="form-group">
        <label for="password">密码</label>
        <input type="password" id="password" name="password" placeholder="请输入密码">
        <div class="password-strength" id="password-strength"></div>
        <div class="error-message" id="password-error"></div>
    </div>
    
    <div class="form-group">
        <label for="confirmPassword">确认密码</label>
        <input type="password" id="confirmPassword" name="confirmPassword" placeholder="请确认密码">
        <div class="error-message" id="confirmPassword-error"></div>
    </div>
    
    <div class="form-group">
        <label>出生日期</label>
        <div class="form-row">
            <div class="form-group">
                <select id="year" name="year">
                    <option value="">年</option>
                </select>
            </div>
            <div class="form-group">
                <select id="month" name="month">
                    <option value="">月</option>
                </select>
            </div>
            <div class="form-group">
                <select id="day" name="day">
                    <option value="">日</option>
                </select>
            </div>
        </div>
        <div class="error-message" id="dob-error"></div>
    </div>
    
    <div class="form-group">
        <label for="country">国家/地区</label>
        <select id="country" name="country">
            <option value="">请选择国家/地区</option>
            <option value="CN">中国</option>
            <option value="US">美国</option>
            <option value="JP">日本</option>
            <option value="UK">英国</option>
        </select>
        <div class="error-message" id="country-error"></div>
    </div>
    
    <div class="form-group">
        <label for="province">省份/州</label>
        <select id="province" name="province">
            <option value="">请选择省份/州</option>
        </select>
        <div class="error-message" id="province-error"></div>
    </div>
    
    <div class="form-group">
        <label for="city">城市</label>
        <select id="city" name="city">
            <option value="">请选择城市</option>
        </select>
        <div class="error-message" id="city-error"></div>
    </div>
    
    <div class="form-group subscribe-group">
        <input type="checkbox" id="subscribe" name="subscribe">
        <label for="subscribe">订阅我们的新闻和更新</label>
    </div>
    
    <button type="submit" class="submit-btn">注册</button>
    <div class="success-message" id="success"></div>
</form>

<script>
// 初始化注册表单组件
const signupForm = new DC.Signup('signup-form', {
    onSubmit: function(data) {
        console.log('表单提交数据:', data);
        // 这里可以处理表单提交逻辑，如发送AJAX请求
        return true;
    },
    onError: function(errors) {
        console.log('表单验证错误:', errors);
        // 这里可以处理验证错误逻辑
    }
});
</script>
```

## 3. API 参考

### 构造函数

```javascript
new DC.Signup(formId, options)
```

#### 参数

- `formId` (String): 表单元素的ID
- `options` (Object): 配置选项

#### 配置选项

| 选项 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `emailField` | String | 'email' | 邮箱/手机号字段的name属性 |
| `nicknameField` | String | 'nickname' | 昵称字段的name属性 |
| `usernameField` | String | 'username' | 用户名字段的name属性 |
| `passwordField` | String | 'password' | 密码字段的name属性 |
| `confirmPasswordField` | String | 'confirmPassword' | 确认密码字段的name属性 |
| `dobFields` | Object | {year: 'year', month: 'month', day: 'day'} | 出生日期字段的name属性 |
| `addressFields` | Object | {country: 'country', province: 'province', city: 'city'} | 地址字段的name属性 |
| `subscribeField` | String | 'subscribe' | 订阅字段的name属性 |
| `onSubmit` | Function | function(data) { console.log('Form submitted:', data); return true; } | 表单提交回调函数 |
| `onError` | Function | function(errors) { console.log('Form errors:', errors); } | 表单验证错误回调函数 |

### 方法

#### `validate()`

验证表单数据，返回错误信息对象。

**返回值**: Object - 包含错误信息的对象

```javascript
const errors = signupForm.validate();
if (Object.keys(errors).length === 0) {
    console.log('表单验证通过');
} else {
    console.log('表单验证失败:', errors);
}
```

#### `handleSubmit()`

处理表单提交，包括验证和回调。

**返回值**: Boolean - 表单提交是否成功

```javascript
const result = signupForm.handleSubmit();
console.log('表单提交结果:', result);
```

#### `collectFormData()`

收集表单数据，返回格式化后的数据对象。

**返回值**: Object - 包含表单数据的对象

```javascript
const formData = signupForm.collectFormData();
console.log('表单数据:', formData);
```

#### `reset()`

重置表单数据和状态。

```javascript
signupForm.reset();
```

#### `fill(data)`

填充表单数据。

**参数**: Object - 要填充的表单数据

```javascript
signupForm.fill({
    email: 'example@test.com',
    nickname: '测试用户',
    username: 'testuser123',
    password: 'Password123',
    confirmPassword: 'Password123',
    subscribe: true,
    dob: {
        year: '1990',
        month: '1',
        day: '1'
    },
    address: {
        country: 'CN',
        province: '广东',
        city: '深圳'
    }
});
```

## 4. 事件处理

### 内置事件

组件会自动绑定以下事件：

- **密码输入事件**: 实时检测密码强度
- **表单提交事件**: 阻止默认提交，执行验证和回调
- **国家选择事件**: 联动更新省份选项
- **省份选择事件**: 联动更新城市选项

### 自定义事件处理

您可以通过配置选项中的 `onSubmit` 和 `onError` 回调函数来自定义事件处理逻辑：

```javascript
const signupForm = new DC.Signup('signup-form', {
    onSubmit: function(data) {
        // 自定义提交逻辑
        return new Promise((resolve) => {
            // 模拟AJAX请求
            setTimeout(() => {
                console.log('模拟API请求成功');
                resolve(true);
            }, 1000);
        });
    },
    onError: function(errors) {
        // 自定义错误处理
        Object.keys(errors).forEach(field => {
            const errorElement = document.getElementById(`${field}-error`);
            if (errorElement) {
                errorElement.textContent = errors[field];
                errorElement.style.color = 'red';
            }
        });
    }
});
```

## 5. 样式指南

### CSS 类名

| 类名 | 描述 |
|------|------|
| `.form-group` | 表单组容器 |
| `.error-message` | 错误信息容器 |
| `.password-strength` | 密码强度指示器 |
| `.password-strength.weak` | 弱密码样式 |
| `.password-strength.medium` | 中等密码样式 |
| `.password-strength.strong` | 强密码样式 |
| `.submit-btn` | 提交按钮 |
| `.success-message` | 成功信息容器 |
| `.subscribe-group` | 订阅选项组 |
| `.form-row` | 表单行容器（用于并排字段） |

### 自定义样式

您可以通过覆盖默认CSS类来自定义组件样式：

```css
/* 自定义表单组样式 */
.form-group {
    margin-bottom: 20px;
}

/* 自定义错误信息样式 */
.error-message {
    color: #dc3545;
    font-size: 14px;
    margin-top: 5px;
}

/* 自定义密码强度样式 */
.password-strength {
    font-size: 14px;
    margin-top: 5px;
}

.password-strength.weak {
    color: #dc3545;
}

.password-strength.medium {
    color: #ffc107;
}

.password-strength.strong {
    color: #28a745;
}

/* 自定义提交按钮样式 */
.submit-btn {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
}

.submit-btn:hover {
    background-color: #0069d9;
}

.submit-btn:disabled {
    background-color: #6c757d;
    cursor: not-allowed;
}
```

## 6. 表单验证规则

### 邮箱/手机号验证

- 不能为空
- 必须是有效的邮箱格式或手机号格式

### 昵称验证

- 不能为空
- 长度至少为2个字符

### 用户名验证

- 不能为空
- 长度至少为3个字符

### 密码验证

- 不能为空
- 长度至少为6个字符
- 与确认密码必须一致

### 出生日期验证

- 年、月、日都必须选择

### 地址验证

- 国家/地区必须选择

## 7. 示例代码

### 示例1: 基本注册表单

```html
<form id="basic-signup-form">
    <!-- 表单字段 -->
</form>

<script>
const basicSignup = new DC.Signup('basic-signup-form', {
    onSubmit: function(data) {
        console.log('基本表单提交:', data);
        alert('注册成功！');
        return true;
    }
});
</script>
```

### 示例2: 带自定义验证的注册表单

```html
<form id="custom-validation-form">
    <!-- 表单字段 -->
</form>

<script>
const customSignup = new DC.Signup('custom-validation-form', {
    onSubmit: function(data) {
        // 自定义验证逻辑
        if (data.username.includes('admin')) {
            alert('用户名不能包含"admin"');
            return false;
        }
        console.log('自定义表单提交:', data);
        alert('注册成功！');
        return true;
    },
    onError: function(errors) {
        console.log('验证错误:', errors);
        alert('请检查表单输入');
    }
});
</script>
```

### 示例3: 带AJAX提交的注册表单

```html
<form id="ajax-signup-form">
    <!-- 表单字段 -->
</form>

<script>
const ajaxSignup = new DC.Signup('ajax-signup-form', {
    onSubmit: async function(data) {
        try {
            const response = await fetch('/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            
            const result = await response.json();
            
            if (result.success) {
                alert('注册成功！');
                return true;
            } else {
                alert('注册失败：' + result.message);
                return false;
            }
        } catch (error) {
            alert('网络错误，请稍后重试');
            return false;
        }
    }
});
</script>
```

## 8. 浏览器兼容性

| 浏览器 | 版本 | 支持情况 |
|--------|------|----------|
| Chrome | 60+ | ✅ 完全支持 |
| Firefox | 55+ | ✅ 完全支持 |
| Safari | 12+ | ✅ 完全支持 |
| Edge | 79+ | ✅ 完全支持 |
| IE | 11 | ⚠️ 部分支持（需要polyfill） |

## 9. 常见问题

### Q: 如何自定义密码强度检测规则？

A: 您可以通过扩展 `DC.FormValidator.validatePasswordStrength` 方法来自定义密码强度检测规则：

```javascript
// 自定义密码强度检测规则
DC.FormValidator.validatePasswordStrength = function(password) {
    let strength = 0;
    
    // 长度检查
    if (password.length >= 8) strength++;
    
    // 包含数字
    if (//.test(password)) strength++;
    
    // 包含小写字母
    if (/[a-z]/.test(password)) strength++;
    
    // 包含大写字母
    if (/[A-Z]/.test(password)) strength++;
    
    // 包含特殊字符
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    
    if (strength < 2) return 'weak';
    if (strength < 4) return 'medium';
    return 'strong';
};
```

### Q: 如何添加自定义表单字段？

A: 您可以在HTML中添加自定义字段，然后在提交回调中处理这些字段：

```html
<form id="custom-fields-form">
    <!-- 现有字段 -->
    
    <!-- 自定义字段 -->
    <div class="form-group">
        <label for="interest">兴趣爱好</label>
        <input type="text" id="interest" name="interest" placeholder="请输入兴趣爱好">
    </div>
</form>

<script>
const customForm = new DC.Signup('custom-fields-form', {
    onSubmit: function(data) {
        // 获取自定义字段值
        const interest = document.getElementById('interest').value;
        
        // 添加到提交数据中
        data.interest = interest;
        
        console.log('包含自定义字段的提交数据:', data);
        return true;
    }
});
</script>
```

### Q: 如何实现表单数据的预填充？

A: 您可以使用 `fill` 方法来预填充表单数据：

```javascript
// 预填充表单数据
signupForm.fill({
    email: 'user@example.com',
    nickname: '测试用户',
    username: 'testuser',
    // 其他字段...
});
```

## 10. 总结

DC Signup 组件是一个功能完整、易于使用的注册表单解决方案，它提供了以下核心功能：

- 完整的表单验证逻辑
- 实时密码强度检测
- 出生日期和地址选择
- 灵活的配置选项
- 丰富的回调函数
- 响应式设计

通过使用本组件，您可以快速构建专业的注册表单，提升用户注册体验，同时减少开发工作量。

## 11. 版本历史

| 版本 | 日期 | 变更内容 |
|------|------|----------|
| 1.0.0 | 2024-01-01 | 初始版本 |
| 1.0.1 | 2024-01-15 | 修复密码强度检测bug |
| 1.1.0 | 2024-02-01 | 添加地址联动选择功能 |
| 1.1.1 | 2024-02-15 | 优化表单验证逻辑 |

## 12. 贡献指南

如果您发现任何问题或有改进建议，请随时提交 issue 或 pull request。

### 开发环境设置

1. 克隆仓库
2. 安装依赖：`npm install`
3. 运行开发服务器：`npm run dev`
4. 运行测试：`npm run test`

### 代码规范

- 遵循 ES6 语法规范
- 使用 2 空格缩进
- 文件名使用小写字母，单词之间用连字符连接
- 类名使用 PascalCase 命名规范
- 方法和变量名使用 camelCase 命名规范

## 13. 许可证

本组件采用 MIT 许可证，详情请查看 LICENSE 文件。