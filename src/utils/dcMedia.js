/**
 * 媒体工具类
 */
class dcMedia {
    constructor() {}

    /**
     * 渐进式加载图片
     */
    static graduallyLoadImg() {
        const images = document.querySelectorAll('img[data-src]');
        const config = {
            rootMargin: '50px 0px',
            threshold: 0.01
        };

        let observer = new IntersectionObserver((entries, self) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    dcMedia.preloadImage(entry.target);
                    self.unobserve(entry.target);
                }
            });
        }, config);

        images.forEach(image => {
            observer.observe(image);
        });
    }

    /**
     * 预加载图片
     * @param {HTMLImageElement} img - 图片元素
     */
    static preloadImage(img) {
        const src = img.dataset.src;
        if (!src) return;

        img.src = src;
        img.style.opacity = 0;
        img.onload = () => {
            img.style.transition = 'opacity 0.5s ease-in';
            img.style.opacity = 1;
            delete img.dataset.src;
        };
    }

    /**
     * 显示所有图片
     */
    static showImages() {
        const images = document.querySelectorAll('img[data-src]');
        let imageCount = images.length;
        let loadedCount = 0;

        const fadeIn = (img) => {
            img.style.opacity = 0;
            requestAnimationFrame(() => {
                img.style.transition = 'opacity 0.5s ease-in';
                img.style.opacity = 1;
            });
        };

        images.forEach(img => {
            if (img.complete) {
                fadeIn(img);
                loadedCount++;
            } else {
                img.addEventListener('load', () => {
                    fadeIn(img);
                    loadedCount++;
                    if (loadedCount === imageCount) {
                        console.log('所有图片加载完成');
                    }
                });
            }
            const src = img.dataset.src;
            if (src) {
                img.src = src;
                delete img.dataset.src;
            }
        });
    }

    /**
     * 初始化图片懒加载
     */
    static initLazyLoading() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        dcMedia.loadLazyImage(img);
                        observer.unobserve(img);
                    }
                });
            });

            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        } else {
            // Fallback for browsers that don't support IntersectionObserver
            dcMedia.loadAllImages();
        }
    }

    /**
     * 加载懒加载图片
     * @param {HTMLImageElement} img - 图片元素
     */
    static loadLazyImage(img) {
        const src = img.dataset.src;
        if (src) {
            img.src = src;
            img.style.opacity = 0;
            img.onload = () => {
                img.style.transition = 'opacity 0.3s ease-in';
                img.style.opacity = 1;
                delete img.dataset.src;
            };
        }
    }

    /**
     * 加载所有图片
     */
    static loadAllImages() {
        document.querySelectorAll('img[data-src]').forEach(img => {
            dcMedia.loadLazyImage(img);
        });
    }

    /**
     * 获取媒体流
     * @param {Object} constraints - 媒体约束
     * @returns {Promise<MediaStream>} 媒体流
     */
    static async getMediaStream(constraints = { video: true, audio: true }) {
        try {
            return await navigator.mediaDevices.getUserMedia(constraints);
        } catch (error) {
            console.error('获取媒体流失败:', error);
            throw error;
        }
    }

    /**
     * 获取屏幕共享流
     * @param {Object} options - 屏幕共享选项
     * @returns {Promise<MediaStream>} 屏幕共享流
     */
    static async getDisplayMedia(options = { video: true }) {
        try {
            return await navigator.mediaDevices.getDisplayMedia(options);
        } catch (error) {
            console.error('获取屏幕共享流失败:', error);
            throw error;
        }
    }

    /**
     * 录制媒体流
     * @param {MediaStream} stream - 媒体流
     * @param {Object} options - 录制选项
     * @returns {Promise<Blob>} 录制的数据
     */
    static async recordStream(stream, options = {
        mimeType: 'video/webm;codecs=vp8,opus'
    }) {
        return new Promise((resolve, reject) => {
            try {
                const mediaRecorder = new MediaRecorder(stream, options);
                const chunks = [];

                mediaRecorder.ondataavailable = (e) => {
                    if (e.data.size > 0) {
                        chunks.push(e.data);
                    }
                };

                mediaRecorder.onstop = () => {
                    const blob = new Blob(chunks, { type: options.mimeType });
                    resolve(blob);
                };

                mediaRecorder.onerror = (error) => {
                    reject(error);
                };

                mediaRecorder.start();

                return mediaRecorder;
            } catch (error) {
                reject(error);
            }
        });
    }

    /**
     * 从视频中提取音频
     * @param {HTMLVideoElement} video - 视频元素
     * @returns {MediaStream} 音频流
     */
    static extractAudio(video) {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const source = audioContext.createMediaElementSource(video);
        const destination = audioContext.createMediaStreamDestination();
        source.connect(destination);
        return destination.stream;
    }

    /**
     * 调整音量
     * @param {MediaStream} stream - 媒体流
     * @param {number} volume - 音量值（0-1）
     * @returns {MediaStream} 调整后的媒体流
     */
    static adjustVolume(stream, volume) {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const source = audioContext.createMediaStreamSource(stream);
        const gainNode = audioContext.createGain();
        
        gainNode.gain.value = volume;
        source.connect(gainNode);
        
        const destination = audioContext.createMediaStreamDestination();
        gainNode.connect(destination);
        
        return destination.stream;
    }

    /**
     * 应用音频效果
     * @param {MediaStream} stream - 媒体流
     * @param {Function} effectCallback - 效果回调函数
     * @returns {MediaStream} 处理后的媒体流
     */
    static applyAudioEffect(stream, effectCallback) {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const source = audioContext.createMediaStreamSource(stream);
        const destination = audioContext.createMediaStreamDestination();

        effectCallback(audioContext, source, destination);

        return destination.stream;
    }

    /**
     * 截取视频帧
     * @param {HTMLVideoElement} video - 视频元素
     * @returns {string} 图片的Data URL
     */
    static captureVideoFrame(video) {
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        
        const ctx = canvas.getContext('2d');
        ctx.drawImage(video, 0, 0);
        
        return canvas.toDataURL('image/png');
    }

    /**
     * 检查媒体设备
     * @returns {Promise<Object>} 设备信息
     */
    static async getMediaDevices() {
        try {
            const devices = await navigator.mediaDevices.enumerateDevices();
            return {
                audioInputs: devices.filter(device => device.kind === 'audioinput'),
                audioOutputs: devices.filter(device => device.kind === 'audiooutput'),
                videoInputs: devices.filter(device => device.kind === 'videoinput')
            };
        } catch (error) {
            console.error('获取媒体设备失败:', error);
            throw error;
        }
    }

    /**
     * 创建音频可视化
     * @param {MediaStream} stream - 音频流
     * @param {string} type - 可视化类型（'waveform' 或 'frequency'）
     * @param {HTMLCanvasElement} canvas - 画布元素
     * @returns {Function} 停止可视化的函数
     */
    static createAudioVisualization(stream, type, canvas) {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const source = audioContext.createMediaStreamSource(stream);
        const analyser = audioContext.createAnalyser();
        
        source.connect(analyser);
        analyser.fftSize = 2048;
        
        const bufferLength = type === 'frequency' ? 
            analyser.frequencyBinCount : analyser.fftSize;
        const dataArray = new Uint8Array(bufferLength);
        
        const ctx = canvas.getContext('2d');
        let animationId;
        
        function draw() {
            animationId = requestAnimationFrame(draw);
            
            if (type === 'frequency') {
                analyser.getByteFrequencyData(dataArray);
            } else {
                analyser.getByteTimeDomainData(dataArray);
            }
            
            ctx.fillStyle = 'rgb(0, 0, 0)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            const barWidth = canvas.width / bufferLength;
            let x = 0;
            
            for (let i = 0; i < bufferLength; i++) {
                const barHeight = type === 'frequency' ?
                    dataArray[i] / 255 * canvas.height :
                    (dataArray[i] / 128.0 * canvas.height) / 2;
                
                ctx.fillStyle = `rgb(${barHeight + 100},50,50)`;
                ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
                
                x += barWidth;
            }
        }
        
        draw();
        
        return () => {
            cancelAnimationFrame(animationId);
            source.disconnect();
            analyser.disconnect();
        };
    }

    /**
     * 应用视频滤镜
     * @param {HTMLVideoElement} video - 视频元素
     * @param {HTMLCanvasElement} canvas - 画布元素
     * @param {Function} filterCallback - 滤镜回调函数
     * @returns {Function} 停止滤镜的函数
     */
    static applyVideoFilter(video, canvas, filterCallback) {
        const ctx = canvas.getContext('2d');
        let animationId;
        
        function draw() {
            animationId = requestAnimationFrame(draw);
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            filterCallback(imageData.data);
            ctx.putImageData(imageData, 0, 0);
        }
        
        draw();
        
        return () => cancelAnimationFrame(animationId);
    }

    /**
     * 创建音频混音器
     * @param {MediaStream[]} streams - 音频流数组
     * @returns {MediaStream} 混音后的流
     */
    static mixAudioStreams(streams) {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const destination = audioContext.createMediaStreamDestination();
        
        streams.forEach(stream => {
            const source = audioContext.createMediaStreamSource(stream);
            source.connect(destination);
        });
        
        return destination.stream;
    }

    /**
     * 检测音频音量
     * @param {MediaStream} stream - 音频流
     * @param {Function} callback - 音量回调函数
     * @returns {Function} 停止检测的函数
     */
    static detectAudioLevel(stream, callback) {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const source = audioContext.createMediaStreamSource(stream);
        const analyser = audioContext.createAnalyser();
        const dataArray = new Uint8Array(analyser.frequencyBinCount);
        
        source.connect(analyser);
        
        function checkVolume() {
            analyser.getByteFrequencyData(dataArray);
            const volume = dataArray.reduce((acc, val) => acc + val) / dataArray.length;
            callback(volume / 255);
            requestAnimationFrame(checkVolume);
        }
        
        checkVolume();
        
        return () => {
            source.disconnect();
            analyser.disconnect();
        };
    }

    /**
     * 保存媒体流
     * @param {MediaStream} stream - 媒体流
     * @param {string} filename - 文件名
     * @returns {Promise<void>} Promise对象
     */
    static async saveMediaStream(stream, filename) {
        const blob = await this.recordStream(stream);
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();
        URL.revokeObjectURL(url);
    }

    /**
     * 转换视频格式
     * @param {Blob} videoBlob - 视频Blob
     * @param {string} targetFormat - 目标格式
     * @returns {Promise<Blob>} 转换后的视频Blob
     */
    static async convertVideoFormat(videoBlob, targetFormat) {
        return new Promise((resolve, reject) => {
            const video = document.createElement('video');
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            
            video.src = URL.createObjectURL(videoBlob);
            
            video.onloadedmetadata = () => {
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                
                video.play();
                
                const chunks = [];
                const stream = canvas.captureStream();
                const mediaRecorder = new MediaRecorder(stream, {
                    mimeType: `video/${targetFormat}`
                });
                
                mediaRecorder.ondataavailable = e => {
                    if (e.data.size > 0) {
                        chunks.push(e.data);
                    }
                };
                
                mediaRecorder.onstop = () => {
                    const blob = new Blob(chunks, { type: `video/${targetFormat}` });
                    resolve(blob);
                };
                
                function drawFrame() {
                    if (video.ended) {
                        mediaRecorder.stop();
                        return;
                    }
                    
                    ctx.drawImage(video, 0, 0);
                    requestAnimationFrame(drawFrame);
                }
                
                mediaRecorder.start();
                drawFrame();
            };
            
            video.onerror = reject;
        });
    }
}
window.dcMedia = new dcMedia();