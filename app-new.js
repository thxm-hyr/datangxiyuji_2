// 主应用逻辑 - 增强版
class TangWesternRegionApp {
    constructor() {
        this.modal = document.getElementById('detailModal');
        this.countryList = document.getElementById('countryList');
        this.searchInput = document.getElementById('searchCountry');
        this.originalContentMap = new Map();
        
        this.init();
    }
    
    async init() {
        await this.loadOriginalContent();
        this.renderCountryList();
        this.bindEvents();
    }
    
    // 加载所有原文内容
    async loadOriginalContent() {
        console.log('开始加载原文内容...');
        
        // 定义国家与文件的对应关系（根据实际文件名）
        const countryFileMap = {
            '阿耆尼国': '1阿耆尼国.txt',
            '屈支国': '2屈支国.txt', 
            '跋禄迦国': '3跋禄迦国.txt',
            '素叶水城': '4素叶水城.txt',
            '呾逻私城': '5呾逻私城.txt',
            '白水城': '6白水城.txt',
            '恭御城': '7恭御城.txt',
            '笯赤建国': '8笯赤建国.txt',
            '赭时国': '9赭时国.txt',
            '㤄捍国': '10㤄捍国.txt',
            '窣堵利瑟那国': '11窣堵利瑟那国.txt',
            '飒秣建国': '12飒秣建国.txt',
            '弭秣贺国': '13弭秣贺国.txt',
            '劫布呾那国': '14劫布呾那国.txt',
            '屈霜你迦国': '15屈霜你迦国.txt',
            '喝捍国': '16喝捍国.txt',
            '捕喝国': '17捕喝国.txt',
            '伐地国': '18伐地国.txt',
            '货利习弥伽国': '19货利习弥伽国.txt',
            '羯霜那国': '20羯霜那国.txt',
            '睹货逻国': '21睹货逻国.txt',
            '呾蜜国': '22呾蜜国.txt',
            '赤鄂衍那国': '23赤鄂衍那国.txt',
            '忽露摩国': '24忽露摩国.txt',
            '愉漫国': '25愉漫国.txt',
            '鞠和衍那国': '26鞠和衍那国.txt',
            '镬沙国': '27镬沙国.txt',
            '拘谜陀国': '28拘谜陀国.txt',
            '䌸伽浪国': '29䌸伽浪国.txt',
            '纥露悉泯健国': '30纥露悉泯健国.txt',
            '忽懔国': '31忽懔国.txt',
            '缚喝国': '32䌸喝国.txt',
            '锐秣陀国': '33锐秣陀国.txt',
            '胡实健国': '34胡实健国.txt',
            '呾剌健国': '35呾剌健国.txt',
            '揭职国': '36揭职国.txt',
            '梵衍那国': '37梵衍那国.txt',
            '迦毕试国': '38迦毕试国.txt'
        };
        
        // 尝试加载每个国家的原文内容
        for (const [countryName, fileName] of Object.entries(countryFileMap)) {
            try {
                const response = await fetch(`网页/原文分段/${fileName}`);
                if (response.ok) {
                    const content = await response.text();
                    this.originalContentMap.set(countryName, content);
                    console.log(`已加载: ${countryName}`);
                } else {
                    console.warn(`文件不存在: ${fileName}`);
                    // 使用备用内容
                    this.originalContentMap.set(countryName, this.getDefaultContent(countryName));
                }
            } catch (error) {
                console.warn(`加载失败: ${fileName}`, error);
                // 使用备用内容
                this.originalContentMap.set(countryName, this.getDefaultContent(countryName));
            }
        }
        
        console.log(`完成加载 ${this.originalContentMap.size} 个国家的原文内容`);
    }
    
    // 渲染国家列表
    renderCountryList() {
        const countries = sortedCountries;
        
        this.countryList.innerHTML = countries.map((country, index) => `
            <div class="country-item" data-country="${country.name}">
                <div class="country-name chinese-font">${country.name}</div>
                <div class="country-modern">${country.modernName}, ${country.country}</div>
                <div class="country-index">第${index + 1}站</div>
            </div>
        `).join('');
    }
    
    // 绑定事件
    bindEvents() {
        // 国家列表点击事件
        this.countryList.addEventListener('click', (e) => {
            const countryItem = e.target.closest('.country-item');
            if (countryItem) {
                const countryName = countryItem.dataset.country;
                this.showCountryDetail(countryName);
                
                // 高亮选中的国家
                document.querySelectorAll('.country-item').forEach(item => {
                    item.classList.remove('active');
                });
                countryItem.classList.add('active');
            }
        });
        
        // 搜索功能
        this.searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const countryItems = this.countryList.querySelectorAll('.country-item');
            
            countryItems.forEach(item => {
                const countryName = item.querySelector('.country-name').textContent;
                const modernName = item.querySelector('.country-modern').textContent;
                
                if (countryName.toLowerCase().includes(searchTerm) || 
                    modernName.toLowerCase().includes(searchTerm)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
        
        // 模态框关闭事件
        const closeBtn = this.modal.querySelector('.close');
        closeBtn.addEventListener('click', () => {
            this.closeModal();
        });
        
        // 点击模态框外部关闭
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.closeModal();
            }
        });
        
        // ESC键关闭模态框
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.style.display === 'block') {
                this.closeModal();
            }
        });
    }
    
    // 显示国家详情
    showCountryDetail(countryName) {
        const country = sortedCountries.find(c => c.name === countryName);
        if (!country) return;
        
        // 更新模态框内容
        document.getElementById('modalTitle').textContent = country.name;
        document.getElementById('modernLocation').textContent = country.modernLocation;
        
        // 渲染图片
        this.renderImages(country);
        
        // 加载原文和翻译内容
        this.loadCountryContent(country.name);
        
        // 显示模态框
        this.modal.style.display = 'block';
        
        // 高亮地图上的标记
        if (window.tangMap) {
            window.tangMap.highlightCountry(countryName);
        }
    }
    
    // 渲染图片
    renderImages(country) {
        const gallery = document.getElementById('imageGallery');
        
        if (country.images && country.images.length > 0) {
            gallery.innerHTML = country.images.map(image => `
                <div class="image-item">
                    <img src="图片/${image}" alt="${country.name}" 
                         onerror="this.src='image1.jpeg'"
                         onclick="openImageModal('图片/${image}')">
                </div>
            `).join('');
        } else {
            gallery.innerHTML = `
                <div style="text-align: center; padding: 2rem; color: #666;">
                    <p>暂无相关图片</p>
                    <img src="miaojinben.jpeg" alt="默认图片" style="max-width: 200px; opacity: 0.5;">
                </div>
            `;
        }
    }
    
    // 加载原文和翻译内容（合并显示）
    async loadCountryContent(countryName) {
        const contentDiv = document.getElementById('originalContent');
        const translationDiv = document.getElementById('translationContent');
        
        // 隐藏翻译div，只在原文div中显示合并内容
        translationDiv.style.display = 'none';
        contentDiv.innerHTML = '<div class="loading"><div class="spinner"></div><p>加载内容...</p></div>';
        
        try {
            // 获取原文内容
            const originalContent = this.originalContentMap.get(countryName) || 
                this.getDefaultContent(countryName);
            
            // 合并显示原文和翻译（一句原文一句翻译）
            contentDiv.innerHTML = this.formatCombinedContent(originalContent);
            
        } catch (error) {
            console.error('加载内容失败:', error);
            contentDiv.innerHTML = '<p style="color: #e74c3c;">加载内容失败</p>';
        }
    }
    
    // 合并显示原文和翻译（一句原文一句翻译）
    formatCombinedContent(content) {
        if (!content) return '<p>暂无内容</p>';
        
        // 解析原文和翻译内容
        const lines = content.split('\n').filter(line => line.trim());
        let combinedText = '';
        
        for (let i = 0; i < lines.length; i += 2) {
            const originalLine = lines[i] ? lines[i].trim() : '';
            const translationLine = lines[i + 1] ? lines[i + 1].trim() : '';
            
            if (originalLine || translationLine) {
                combinedText += `
                    <div class="combined-line">
                        <div class="original-line chinese-font">${originalLine}</div>
                        <div class="translation-line">${translationLine}</div>
                    </div>
                `;
            }
        }
        
        return combinedText || '<p>暂无内容</p>';
    }
    
    // 获取默认内容
    getDefaultContent(countryName) {
        const mockContents = {
            '阿耆尼国': `出高昌故地，自近者始，曰阿耆尼国，阿耆尼国，东西六百余里，南北四百余里。
国大都城周六七里，四面据山，道险易守。
泉流交带，引水为田。
土宜糜、黍、宿麦、香枣、蒲萄、梨、柰诸果。`,
            '屈支国': `屈支国，东西千余里，南北六百余里。国大都城周十七八里。
宜糜、麦，有粳稻，出蒲萄、石榴，多梨、柰、桃、杏。
土产黄金、铜、铁、铅、锡。气序和，风俗质。`,
            '迦毕试国': `迦毕试国，周四千余里。北背雪山，三垂黑岭。
国大都城周十余里。异方奇货，多聚此国。
气候风寒，人性暴犷，言辞鄙亵，婚姻杂乱。`
        };
        
        return mockContents[countryName] || 
            `<p>《大唐西域记》关于 ${countryName} 的记载：</p>
             <p>此处应显示《大唐西域记》中关于 ${countryName} 的详细原文记载。</p>
             <p>原文内容正在整理中...</p>`;
    }
    
    // 关闭模态框
    closeModal() {
        this.modal.style.display = 'none';
        
        // 移除国家列表高亮
        document.querySelectorAll('.country-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // 移除地图高亮
        if (window.tangMap) {
            window.tangMap.resetView();
        }
    }
}

// 图片模态框功能
function openImageModal(imageSrc) {
    const modal = document.createElement('div');
    modal.className = 'image-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.9);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 2000;
        cursor: pointer;
    `;
    
    modal.innerHTML = `
        <div style="max-width: 90%; max-height: 90%;">
            <img src="${imageSrc}" alt="放大图片" style="max-width: 100%; max-height: 100%; object-fit: contain;">
        </div>
        <button style="position: absolute; top: 20px; right: 20px; background: none; border: none; color: white; font-size: 2rem; cursor: pointer;">&times;</button>
    `;
    
    document.body.appendChild(modal);
    
    // 关闭事件
    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.tagName === 'BUTTON') {
            document.body.removeChild(modal);
        }
    });
    
    // ESC键关闭
    document.addEventListener('keydown', function closeOnEsc(e) {
        if (e.key === 'Escape') {
            document.body.removeChild(modal);
            document.removeEventListener('keydown', closeOnEsc);
        }
    });
}

// 全局函数，供地图点击调用
function showCountryDetail(countryName) {
    if (window.tangApp) {
        window.tangApp.showCountryDetail(countryName);
    }
}

// 初始化应用
document.addEventListener('DOMContentLoaded', function() {
    window.tangApp = new TangWesternRegionApp();
    
    // 更新路线信息
    const routeLength = document.getElementById('routeLength');
    const totalDistance = document.getElementById('totalDistance');
    
    if (routeLength) {
        routeLength.textContent = `${sortedCountries.length}个国家/城市`;
    }
    
    if (totalDistance) {
        // 简单估算总距离（实际应计算各点间距离之和）
        totalDistance.textContent = '约12,000公里';
    }
});

// 添加一些工具函数
function formatDistance(distance) {
    if (distance < 1000) {
        return distance + '米';
    } else {
        return (distance / 1000).toFixed(1) + '公里';
    }
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}