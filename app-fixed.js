// 主应用逻辑 - 修复版
class TangWesternRegionApp {
    constructor() {
        this.modal = document.getElementById('detailModal');
        this.countryList = document.getElementById('countryList');
        this.searchInput = document.getElementById('searchCountry');
        this.originalContentMap = new Map();
        this.buddhistTerms = new Map(); // 存储佛教词汇及其释义
        
        this.init();
    }
    
    async init() {
        await this.loadBuddhistTerms(); // 先加载佛教词汇
        this.renderCountryList();
        this.bindEvents();
    }
    
    // 加载佛教词汇CSV文件
    async loadBuddhistTerms() {
        try {
            const response = await fetch('./buddhist_concept.csv');
            if (!response.ok) throw new Error('CSV文件加载失败');
            
            const csvText = await response.text();
            const lines = csvText.split('\n').filter(line => line.trim());
            
            // 跳过标题行，从第2行开始解析
            for (let i = 1; i < lines.length; i++) {
                const line = lines[i];
                const [term, explanation] = line.split(',');
                if (term && explanation) {
                    this.buddhistTerms.set(term.trim(), explanation.trim());
                }
            }
            
            console.log(`加载了 ${this.buddhistTerms.size} 个佛教词汇`);
        } catch (error) {
            console.warn('加载佛教词汇失败:', error);
        }
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
        
        // 佛教词汇点击事件委托
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('buddhist-term')) {
                e.preventDefault();
                this.showBuddhistTermExplanation(e.target.dataset.term, e.target.dataset.explanation);
            }
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
    async showCountryDetail(countryName) {
        const country = sortedCountries.find(c => c.name === countryName);
        if (!country) return;
        
        // 更新模态框内容
        document.getElementById('modalTitle').textContent = country.name;
        document.getElementById('modernLocation').textContent = country.modernLocation;
        
        // 渲染图片
        this.renderImages(country);
        
        // 加载原文和翻译内容
        await this.loadCountryContent(countryName);
        
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
        
        contentDiv.innerHTML = '<div style="text-align: center; padding: 1rem;"><div class="spinner"></div><p>加载内容...</p></div>';
        
        try {
            // 直接加载对应国家的原文文件
            const content = await this.loadOriginalFile(countryName);
            
            if (content) {
                // 解析原文和翻译内容（合并显示）
                const { originalText } = this.parseContent(content);
                
                // 显示合并后的内容
                contentDiv.innerHTML = originalText || '<p>暂无内容</p>';
            } else {
                // 使用默认内容
                const defaultContent = this.getDefaultContent(countryName);
                contentDiv.innerHTML = defaultContent;
            }
            
        } catch (error) {
            console.error('加载内容失败:', error);
            contentDiv.innerHTML = '<p style="color: #e74c3c;">加载内容失败</p>';
        }
    }
    
    // 加载原文文件
    async loadOriginalFile(countryName) {
        console.log(`开始加载 ${countryName} 的原文文件...`);
        
        // 国家名称与文件名的映射
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
        
        const fileName = countryFileMap[countryName];
        if (!fileName) {
            console.warn(`未找到 ${countryName} 的原文文件映射`);
            return null;
        }
        
        // 使用正确的相对路径
        const filePath = `./网页/原文分段/${fileName}`;
        console.log(`尝试加载文件: ${filePath}`);
        
        try {
            const response = await fetch(filePath);
            console.log(`响应状态: ${response.status} ${response.statusText}`);
            
            if (response.ok) {
                const content = await response.text();
                console.log(`成功加载 ${fileName}，内容长度: ${content.length}`);
                return content;
            } else {
                console.warn(`文件不存在或无法访问: ${filePath}`);
                
                // 如果当前路径失败，尝试直接读取文件内容
                return await this.fallbackLoadContent(countryName);
            }
        } catch (error) {
            console.warn(`加载失败: ${filePath}`, error);
            
            // 使用备用方法
            return await this.fallbackLoadContent(countryName);
        }
    }
    
    // 将原文中的佛教词汇转换为超链接
    addBuddhistTermLinks(text) {
        if (!text || this.buddhistTerms.size === 0) return text;
        
        let processedText = text;
        
        // 按词汇长度从长到短排序，避免短词汇被长词汇包含
        const sortedTerms = Array.from(this.buddhistTerms.keys()).sort((a, b) => b.length - a.length);
        
        sortedTerms.forEach(term => {
            const explanation = this.buddhistTerms.get(term);
            const regex = new RegExp(`(${term})(?![^<]*>)(?![^<]*</a>)`, 'g');
            
            processedText = processedText.replace(regex, 
                `<a href="#" class="buddhist-term" data-term="${term}" data-explanation="${explanation}" title="${explanation}">$1</a>`
            );
        });
        
        return processedText;
    }

    // 解析原文和翻译内容（合并显示）
    parseContent(content) {
        if (!content) return { originalText: '', translationText: '' };
        
        const lines = content.split('\n').filter(line => line.trim());
        let combinedText = '';
        
        for (let i = 0; i < lines.length; i += 2) {
            const originalLine = lines[i] ? lines[i].trim() : '';
            const translationLine = lines[i + 1] ? lines[i + 1].trim() : '';
            
            if (originalLine || translationLine) {
                // 对原文行添加佛教词汇超链接
                const processedOriginalLine = this.addBuddhistTermLinks(originalLine);
                
                combinedText += `
                    <div class="combined-line">
                        <div class="original-line chinese-font">${processedOriginalLine}</div>
                        <div class="translation-line">${translationLine}</div>
                    </div>
                `;
            }
        }
        
        return {
            originalText: combinedText || '<p>暂无内容</p>',
            translationText: ''  // 翻译内容置空，因为已经合并显示了
        };
    }
    
    // 获取默认内容
    getDefaultContent(countryName) {
        return `
            <p>《大唐西域记》关于 ${countryName} 的记载：</p>
            <p>此处应显示《大唐西域记》中关于 ${countryName} 的详细原文记载。</p>
            <p>原文内容正在整理中...</p>
        `;
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
    
    // 显示佛教词汇解释
    showBuddhistTermExplanation(term, explanation) {
        // 创建词汇解释模态框
        const termModal = document.createElement('div');
        termModal.className = 'term-modal';
        termModal.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.3);
            z-index: 1000;
            max-width: 500px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
        `;
        
        termModal.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
                <h3 class="chinese-font" style="margin: 0; color: #8B4513;">${term}</h3>
                <button class="close-term" style="background: none; border: none; font-size: 20px; cursor: pointer;">&times;</button>
            </div>
            <div class="term-explanation" style="line-height: 1.6; color: #333;">
                <p><strong>释义：</strong>${explanation}</p>
            </div>
        `;
        
        // 添加到页面
        document.body.appendChild(termModal);
        
        // 关闭按钮事件
        const closeBtn = termModal.querySelector('.close-term');
        closeBtn.addEventListener('click', () => {
            document.body.removeChild(termModal);
        });
        
        // 点击外部关闭
        termModal.addEventListener('click', (e) => {
            if (e.target === termModal) {
                document.body.removeChild(termModal);
            }
        });
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
// 加载地点信息文件
async function loadLocationInfo(countryName) {
    console.log(`开始加载 ${countryName} 的地点信息文件...`);
    
    // 国家名称与地点信息文件名的映射
    const countryLocationMap = {
        '阿耆尼国': '1阿耆尼国信息.txt',
        '屈支国': '2屈支国信息.txt', 
        '跋禄迦国': '3跋禄迦国信息.txt',
        '素叶水城': '4素叶水城信息.txt',
        '呾逻私城': '5呾逻私城信息.txt',
        '白水城': '6白水城信息.txt',
        '恭御城': '7恭御城信息.txt',
        '笯赤建国': '8笯赤建国信息.txt',
        '赭时国': '9赭时国信息.txt',
        '㤄捍国': '10㤄捍国信息.txt',
        '窣堵利瑟那国': '11窣堵利瑟那国信息.txt',
        '飒秣建国': '12飒秣建国信息.txt',
        '弭秣贺国': '13弭秣贺国信息.txt',
        '劫布呾那国': '14劫布呾那国信息.txt',
        '屈霜你迦国': '15屈霜你迦国信息.txt',
        '喝捍国': '16喝捍国信息.txt',
        '捕喝国': '17捕喝国信息.txt',
        '伐地国': '18伐地国信息.txt',
        '货利习弥伽国': '19货利习弥伽国信息.txt',
        '羯霜那国': '20羯霜那国信息.txt',
        '睹货逻国': '21睹货逻国信息.txt',
        '呾蜜国': '22呾蜜国信息.txt',
        '赤鄂衍那国': '23赤鄂衍那国信息.txt',
        '忽露摩国': '24忽露摩国信息.txt',
        '愉漫国': '25愉漫国信息.txt',
        '鞠和衍那国': '26鞠和衍那国信息.txt',
        '镬沙国': '27镬沙国信息.txt',
        '拘谜陀国': '28拘谜陀国信息.txt',
        '䌸伽浪国': '29䌸伽浪国信息.txt',
        '纥露悉泯健国': '30纥露悉泯健国信息.txt',
        '忽懔国': '31忽懔国信息.txt',
        '缚喝国': '32缚喝国信息.txt',
        '锐秣陀国': '33锐秣陀国信息.txt',
        '胡实健国': '34胡实健国信息.txt',
        '呾剌健国': '35呾剌健国信息.txt',
        '揭职国': '36揭职国信息.txt',
        '梵衍那国': '37梵衍那国信息.txt',
        '迦毕试国': '38迦毕试国信息.txt'
    };
    
    const fileName = countryLocationMap[countryName];
    if (!fileName) {
        console.warn(`未找到 ${countryName} 的地点信息文件映射`);
        return null;
    }
    
    // 使用正确的相对路径
    const filePath = `./网页/地点信息/${fileName}`;
    console.log(`尝试加载文件: ${filePath}`);
    
    try {
        const response = await fetch(filePath);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        
        const content = await response.text();
        console.log(`成功加载 ${countryName} 的地点信息文件`);
        return content;
    } catch (error) {
        console.error(`加载 ${countryName} 地点信息文件失败:`, error);
        return null;
    }
}

// 格式化地点信息内容
function formatLocationInfo(content) {
    if (!content) return '<p>地点信息加载失败</p>';
    
    // 按段落分割并格式化
    const sections = content.split('\n\n');
    let html = '';
    
    sections.forEach(section => {
        if (section.trim()) {
            // 检查是否是标题段落（包含数字和、等）
            if (section.match(/^[一二三四五六七八九十]、/)) {
                html += `<h4 style="color: #8b4513; margin: 1.5rem 0 0.5rem 0; border-bottom: 2px solid #d4bc8a; padding-bottom: 0.3rem;">${section}</h4>`;
            } else {
                html += `<p style="margin: 0.5rem 0; line-height: 1.6; text-indent: 2em;">${section}</p>`;
            }
        }
    });
    
    return html;
}

// 修改showCountryDetail函数以包含地点信息
function showCountryDetail(countryName) {
    if (window.tangApp) {
        window.tangApp.showCountryDetail(countryName);
    }
}

// 为TangWesternRegionApp类添加地点信息功能
TangWesternRegionApp.prototype.loadAndShowLocationInfo = async function(countryName) {
    const locationContent = await loadLocationInfo(countryName);
    const formattedContent = formatLocationInfo(locationContent);
    
    // 在详情模态框中添加地点信息部分
    const modalBody = document.querySelector('.modal-body');
    if (modalBody) {
        // 查找或创建地点信息部分
        let locationSection = modalBody.querySelector('.location-details-section');
        if (!locationSection) {
            locationSection = document.createElement('div');
            locationSection.className = 'location-details-section';
            locationSection.innerHTML = `
                <h3>地点详细信息</h3>
                <div class="location-content" style="max-height: 300px; overflow-y: auto; background: #fff5e6; padding: 1rem; border-radius: 8px; border: 2px solid #d4bc8a;">
                    ${formattedContent}
                </div>
            `;
            
            // 插入到现代位置信息之后
            const locationInfo = modalBody.querySelector('.location-info');
            if (locationInfo) {
                locationInfo.parentNode.insertBefore(locationSection, locationInfo.nextSibling);
            }
        } else {
            // 更新现有内容
            const locationContentDiv = locationSection.querySelector('.location-content');
            if (locationContentDiv) {
                locationContentDiv.innerHTML = formattedContent;
            }
        }
    }
};

// 修改原有的showCountryDetail方法以包含地点信息
const originalShowCountryDetail = TangWesternRegionApp.prototype.showCountryDetail;
TangWesternRegionApp.prototype.showCountryDetail = async function(countryName) {
    // 先调用原始方法
    await originalShowCountryDetail.call(this, countryName);
    
    // 然后加载并显示地点信息
    await this.loadAndShowLocationInfo(countryName);
};

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
        totalDistance.textContent = '约12,000公里';
    }
});