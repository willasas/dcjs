// server.ts

import express from 'express';
import multer from 'multer';
import sharp from 'sharp';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 设置Multer存储引擎
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// 图片上传路由
app.post('/upload', upload.single('image'), async (req, res) => {
  try {
    const { file } = req;
    if (!file) return res.status(400).send('No image provided');

    // 使用sharp进行图片压缩
    const compressedImage = await sharp(file.path)
      .resize(800, 600, { fit: 'inside' })
      .jpeg({ quality: 80 }) // 或者.png()等其他格式
      .toBuffer();

    // 假设我们保存压缩后的图片到服务器
    await sharp(compressedImage).toFile(`uploads/${file.filename}-compressed.jpg`);

    // 返回压缩后的图片URL供前端预览
    const imageUrl = `http://your-server-url/uploads/${file.filename}-compressed.jpg`;
    res.json({ success: true, imageUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to process the image.' });
  }
});

// 启动服务器
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});