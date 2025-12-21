# 部署指南

## GitHub Pages 部署步骤

### 1. 创建GitHub仓库

1. 在GitHub上创建新仓库，名称建议为：`tang-western-regions`
2. 将本地项目文件上传到仓库

### 2. 启用GitHub Pages

1. 进入仓库设置 (Settings)
2. 左侧菜单选择 "Pages"
3. 在 "Source" 部分选择 "GitHub Actions"
4. 保存设置

### 3. 推送代码

```bash
# 初始化Git仓库
git init
git add .
git commit -m "初始提交：大唐西域记数字人文可视化项目"

# 添加远程仓库
git remote add origin https://github.com/你的用户名/tang-western-regions.git

# 推送代码
git branch -M main
git push -u origin main
```

### 4. 访问网站

部署完成后，访问：`https://你的用户名.github.io/tang-western-regions`

## 自定义域名（可选）

如需使用自定义域名：

1. 在仓库根目录创建 `CNAME` 文件，内容为你的域名
2. 在域名服务商处添加CNAME记录指向GitHub Pages

## 本地测试

### 使用Python内置服务器
```bash
cd 项目目录
python -m http.server 8000
# 访问 http://localhost:8000
```

### 使用Node.js http-server
```bash
npm install -g http-server
http-server -p 8000
# 访问 http://localhost:8000
```

## 文件说明

- `index.html` - 主页面
- `styles.css` - 样式文件
- `data.js` - 国家地理数据
- `map.js` - 地图交互逻辑
- `app.js` - 应用主逻辑
- `图片/` - 各国历史图片
- `网页/` - 原文和地理信息文件
- `.github/workflows/deploy.yml` - GitHub Actions部署配置

## 注意事项

1. 确保所有图片文件路径正确
2. 检查地图坐标数据的准确性
3. 测试移动端响应式效果
4. 验证所有交互功能正常工作

## 故障排除

### 地图不显示
- 检查网络连接
- 确认Leaflet CDN链接有效
- 查看浏览器控制台错误信息

### 图片加载失败
- 检查图片文件路径
- 确认文件名大小写一致
- 验证图片格式支持

### 部署失败
- 检查GitHub Actions日志
- 确认文件结构正确
- 验证GitHub Pages设置