// Leaflet地图交互功能 - 增强版
class TangWesternRegionMap {
    constructor() {
        this.map = null;
        this.markers = [];
        this.routeLine = null;
        this.currentCountry = null;
        this.routeVisible = true;
        this.markersVisible = true;
        this.baseLayers = {};
        this.currentLayer = 'street';
        
        this.init();
    }
    
    init() {
        // 检查是否已经存在地图实例
        if (document.getElementById('map')._leaflet_id) {
            console.warn('地图已经初始化，跳过重复创建');
            return;
        }
        
        // 初始化地图
        this.map = L.map('map', {
            zoomControl: false,
            attributionControl: false
        }).setView([35, 75], 4);
        
        // 添加地图图层
        this.createBaseLayers();
        
        // 添加缩放控件
        L.control.zoom({
            position: 'topright'
        }).addTo(this.map);
        
        // 添加比例尺
        L.control.scale({
            imperial: false,
            position: 'bottomleft'
        }).addTo(this.map);
        
        // 创建自定义标记图标
        this.createCustomIcons();
        
        // 添加国家和路线
        this.addCountries();
        this.addRoute();
        
        // 绑定事件
        this.bindEvents();
    }
    
    createBaseLayers() {
        // 街道地图
        this.baseLayers.street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        });
        
        // 卫星图
        this.baseLayers.satellite = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
            attribution: '&copy; <a href="https://www.esri.com/">Esri</a>'
        });
        
        // 地形图
        this.baseLayers.terrain = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://opentopomap.org/">OpenTopoMap</a>'
        });
        
        // 默认使用街道地图
        this.baseLayers.street.addTo(this.map);
    }
    
    switchLayer(layerType) {
        // 移除当前图层
        Object.values(this.baseLayers).forEach(layer => {
            this.map.removeLayer(layer);
        });
        
        // 添加新图层
        if (this.baseLayers[layerType]) {
            this.baseLayers[layerType].addTo(this.map);
            this.currentLayer = layerType;
        }
        
        // 更新按钮状态
        this.updateLayerButtons();
    }
    
    updateLayerButtons() {
        const buttons = document.querySelectorAll('.btn-layer');
        buttons.forEach(btn => {
            if (btn.dataset.layer === this.currentLayer) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }
    
    createCustomIcons() {
        // 这个方法现在为空，因为我们使用圆形标记而不是图标
    }
    
    addCountries() {
        // 这个方法现在为空，因为标记点已经在addRoute中添加了
        console.log('国家标记点已在路线中添加');
    }
    
    addRoute() {
        // 创建有向箭头路线，按顺序连接每个国家
        this.routeLines = [];
        
        // 为每两个相邻国家创建有向箭头线段
        for (let i = 0; i < sortedCountries.length - 1; i++) {
            const currentCountry = sortedCountries[i];
            const nextCountry = sortedCountries[i + 1];
            
            // 创建两点之间的线段
            const segment = L.polyline([
                [currentCountry.lat, currentCountry.lng],
                [nextCountry.lat, nextCountry.lng]
            ], {
                color: '#8b4513',
                weight: 6,
                opacity: 0.8,
                className: 'route-line',
                smoothFactor: 0,
                dashArray: '5, 10', // 虚线效果，更清晰显示方向
                lineCap: 'round',
                lineJoin: 'round'
            }).addTo(this.map);
            
            // 添加箭头标记
            this.addArrowToSegment(currentCountry, nextCountry, segment);
            
            this.routeLines.push(segment);
        }
        
        // 在路线节点位置添加可点击的圆形标记（与路线融为一体）
        sortedCountries.forEach((country, index) => {
            // 创建与路线颜色一致的圆形节点
            const nodeCircle = L.circleMarker([country.lat, country.lng], {
                radius: 12, // 节点大小
                fillColor: '#8b4513',
                color: '#fff',
                weight: 2,
                opacity: 1,
                fillOpacity: 0.8
            }).addTo(this.map);
            
            // 直接绑定弹出窗口，悬停时显示
            const popupContent = `
                <div class="popup-content">
                    <h3 class="chinese-font">${country.name}</h3>
                    <p><strong>现代位置:</strong> ${country.modernName}, ${country.country}</p>
                    <p><strong>描述:</strong> ${country.description}</p>
                    <button class="btn btn-primary" onclick="showCountryDetail('${country.name}')">查看详情</button>
                </div>
            `;
            
            nodeCircle.bindPopup(popupContent, {
                maxWidth: 300,
                className: 'custom-popup',
                closeOnClick: false,
                autoClose: false
            });
            
            // 鼠标悬停时显示卡片
            nodeCircle.on('mouseover', function() {
                this.openPopup();
            });
            
            // 使用延迟关闭，避免移动到按钮时立即关闭
            nodeCircle.on('mouseout', function(e) {
                // 检查鼠标是否移动到弹出窗口上
                const popup = this.getPopup();
                if (popup && popup.getElement()) {
                    const popupElement = popup.getElement();
                    const relatedTarget = e.originalEvent.relatedTarget;
                    
                    // 如果鼠标移动到弹出窗口上，不关闭
                    if (popupElement.contains(relatedTarget)) {
                        return;
                    }
                }
                
                // 延迟关闭，给用户时间移动到按钮上
                setTimeout(() => {
                    if (!this._isMouseOverPopup) {
                        this.closePopup();
                    }
                }, 300);
            });
            
            // 监听弹出窗口的鼠标事件
            nodeCircle.on('popupopen', function() {
                const popup = this.getPopup();
                if (popup && popup.getElement()) {
                    const popupElement = popup.getElement();
                    
                    popupElement.addEventListener('mouseenter', () => {
                        this._isMouseOverPopup = true;
                    });
                    
                    popupElement.addEventListener('mouseleave', () => {
                        this._isMouseOverPopup = false;
                        setTimeout(() => {
                            if (!this._isMouseOverPopup) {
                                this.closePopup();
                            }
                        }, 200);
                    });
                }
            });
            
            // 点击事件
            nodeCircle.on('click', () => {
                this.highlightCountry(country.name);
                showCountryDetail(country.name);
            });
            
            // 存储节点信息
            this.markers.push({
                marker: nodeCircle,
                country: country,
                index: index
            });
        });
    }
    
    // 为线段添加箭头标记
    addArrowToSegment(startCountry, endCountry, segment) {
        // 计算线段中点位置
        const midLat = (startCountry.lat + endCountry.lat) / 2;
        const midLng = (startCountry.lng + endCountry.lng) / 2;
        
        // 计算箭头方向角度
        const dx = endCountry.lng - startCountry.lng;
        const dy = endCountry.lat - startCountry.lat;
        const angle = Math.atan2(dy, dx) * 180 / Math.PI;
        
        // 创建箭头标记
        const arrowIcon = L.divIcon({
            className: 'route-arrow',
            html: `
                <div style="
                    width: 0; 
                    height: 0; 
                    border-left: 8px solid transparent;
                    border-right: 8px solid transparent;
                    border-bottom: 12px solid #8b4513;
                    transform: rotate(${angle}deg);
                    position: relative;
                    top: -6px;
                "></div>
            `,
            iconSize: [16, 16],
            iconAnchor: [8, 8]
        });
        
        const arrowMarker = L.marker([midLat, midLng], {
            icon: arrowIcon,
            interactive: false // 箭头不可交互
        }).addTo(this.map);
        
        this.routeLines.push(arrowMarker);
    }
    
    highlightCountry(countryName) {
        // 移除之前的高亮
        this.markers.forEach(item => {
            item.marker.setStyle({
                fillColor: '#8b4513',
                color: '#fff',
                weight: 2
            });
        });
        
        // 高亮当前国家
        const targetMarker = this.markers.find(item => item.country.name === countryName);
        if (targetMarker) {
            targetMarker.marker.setStyle({
                fillColor: '#daa520',
                color: '#fff',
                weight: 3,
                radius: 14
            });
            this.currentCountry = countryName;
            
            // 平滑移动到该标记
            this.map.panTo([targetMarker.country.lat, targetMarker.country.lng], {
                animate: true,
                duration: 1
            });
        }
    }
    
    toggleRoute() {
        this.routeVisible = !this.routeVisible;
        this.routeLines.forEach(line => {
            if (this.routeVisible) {
                this.map.addLayer(line);
            } else {
                this.map.removeLayer(line);
            }
        });
    }
    
    clearMarkers() {
        // 移除所有现有标记
        this.markers.forEach(item => {
            this.map.removeLayer(item.marker);
        });
        this.markers = [];
    }
    
    toggleMarkers() {
        this.markersVisible = !this.markersVisible;
        this.markers.forEach(item => {
            if (this.markersVisible) {
                this.map.addLayer(item.marker);
            } else {
                this.map.removeLayer(item.marker);
            }
        });
    }
    
    resetView() {
        this.map.setView([35, 75], 4, {
            animate: true,
            duration: 1
        });
        
        // 移除高亮
        this.markers.forEach(item => {
            item.marker.setIcon(this.markerIcon);
        });
        
        this.currentCountry = null;
    }
    
    bindEvents() {
        // 绑定按钮事件
        document.getElementById('toggleRoute').addEventListener('click', () => {
            this.toggleRoute();
        });
        
        document.getElementById('toggleMarkers').addEventListener('click', () => {
            this.toggleMarkers();
        });
        
        document.getElementById('resetView').addEventListener('click', () => {
            this.resetView();
        });
        
        // 绑定图层切换事件
        document.getElementById('layerStreet').addEventListener('click', () => {
            this.switchLayer('street');
        });
        
        document.getElementById('layerSatellite').addEventListener('click', () => {
            this.switchLayer('satellite');
        });
        
        document.getElementById('layerTerrain').addEventListener('click', () => {
            this.switchLayer('terrain');
        });
    }
    
    // 根据国家名获取国家数据
    getCountryByName(name) {
        return sortedCountries.find(country => country.name === name);
    }
    
    // 获取所有国家数据
    getAllCountries() {
        return sortedCountries;
    }
}

// 全局地图实例
let tangMap = null;

// 初始化地图
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOMContentLoaded事件触发，开始初始化地图');
    
    // 防止重复初始化
    if (!tangMap) {
        console.log('创建新的地图实例');
        tangMap = new TangWesternRegionMap();
    } else {
        console.log('地图实例已存在，跳过初始化');
    }
});