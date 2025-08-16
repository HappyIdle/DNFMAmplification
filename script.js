// DNF手游增幅模拟器 JavaScript

class DNFAmplificationSimulator {
    constructor() {
        // 初始化数据
        this.currentLevel = 0;
        this.maxLevel = 0;
        this.totalMaodun = 0;
        this.totalLucky = 0;
        this.totalAttempts = 0;
        this.equipmentType = 'weapon';
        this.isAutoAmplifying = false;
        
        // 增幅数据配置
        this.amplifyData = {
            1: { success: 100, fail: 0, destroy: 0, downgrade: 0, lucky: 0 },
            2: { success: 100, fail: 0, destroy: 0, downgrade: 0, lucky: 0 },
            3: { success: 100, fail: 0, destroy: 0, downgrade: 0, lucky: 0 },
            4: { success: 100, fail: 0, destroy: 0, downgrade: 0, lucky: 0 },
            5: { success: 85, fail: 15, destroy: 0, downgrade: 1, lucky: 1 },
            6: { success: 75, fail: 25, destroy: 0, downgrade: 1, lucky: 1 },
            7: { success: 65, fail: 35, destroy: 0, downgrade: 1, lucky: 1 },
            8: { success: 75, fail: 25, destroy: 0, downgrade: 3, lucky: 1 },
            9: { success: 65, fail: 35, destroy: 0, downgrade: 3, lucky: 1 },
            10: { success: 55, fail: 45, destroy: 0, downgrade: 3, lucky: 1 },
            11: { success: 45, fail: 0, destroy: 55, downgrade: 0, lucky: 2 },
            12: { success: 33, fail: 0, destroy: 67, downgrade: 0, lucky: 2 },
            13: { success: 22, fail: 0, destroy: 78, downgrade: 0, lucky: 4 },
            14: { success: 22, fail: 0, destroy: 78, downgrade: 0, lucky: 4 },
            15: { success: 22, fail: 0, destroy: 78, downgrade: 0, lucky: 4 },
            16: { success: 22, fail: 0, destroy: 78, downgrade: 0, lucky: 4 },
            17: { success: 22, fail: 0, destroy: 78, downgrade: 0, lucky: 8 },
            18: { success: 22, fail: 0, destroy: 78, downgrade: 0, lucky: 8 },
            19: { success: 22, fail: 0, destroy: 78, downgrade: 0, lucky: 8 },
            20: { success: 22, fail: 0, destroy: 78, downgrade: 0, lucky: 8 }
        };
        
        // 矛盾消耗数据
        this.maodunCost = {
            weapon: {
                2: 73, 3: 97, 4: 126, 5: 164, 6: 203, 7: 280, 8: 357, 9: 472, 10: 587, 11: 646,
                12: 700, 13: 750, 14: 800, 15: 850, 16: 900, 17: 950, 18: 1000, 19: 1050, 20: 1100
            },
            nonWeapon: {
                2: 54, 3: 72, 4: 94, 5: 123, 6: 152, 7: 210, 8: 280, 9: 350, 10: 420, 11: 490,
                12: 560, 13: 630, 14: 700, 15: 770, 16: 840, 17: 910, 18: 980, 19: 1050, 20: 1120
            }
        };
        
        this.initializeElements();
        this.attachEventListeners();
        this.updateUI();
    }
    
    initializeElements() {
        // 获取DOM元素
        this.elements = {
            // 基本元素
            currentLevel: document.getElementById('currentLevel'),
            equipmentType: document.getElementById('equipmentType'),
            amplifyBtn: document.getElementById('amplifyBtn'),
            autoAmplifyBtn: document.getElementById('autoAmplifyBtn'),
            stopAmplifyBtn: document.getElementById('stopAmplifyBtn'),
            targetLevel: document.getElementById('targetLevel'),
            resetBtn: document.getElementById('resetBtn'),
            clearLogBtn: document.getElementById('clearLogBtn'),
            weeklyMaodun: document.getElementById('weeklyMaodun'),
            maodunPrice: document.getElementById('maodunPrice'),
            
            // 快速信息显示
            successRate: document.getElementById('successRate'),
            requiredMaodun: document.getElementById('requiredMaodun'),
            requiredLucky: document.getElementById('requiredLucky'),
            
            // 统计信息
            totalMaodun: document.getElementById('totalMaodun'),
            totalLucky: document.getElementById('totalLucky'),
            totalTaila: document.getElementById('totalTaila'),
            totalRMB: document.getElementById('totalRMB'),
            maxLevel: document.getElementById('maxLevel'),
            totalAttempts: document.getElementById('totalAttempts'),
            logContainer: document.getElementById('logContainer'),
            
            // 弹窗相关
            settingsBtn: document.getElementById('settingsBtn'),
            infoBtn: document.getElementById('infoBtn'),
            settingsModal: document.getElementById('settingsModal'),
            infoModal: document.getElementById('infoModal'),
            closeSettings: document.getElementById('closeSettings'),
            closeInfo: document.getElementById('closeInfo'),
            
            // 详细信息显示
            detailSuccessRate: document.getElementById('detailSuccessRate'),
            detailFailRate: document.getElementById('detailFailRate'),
            detailDestroyRate: document.getElementById('detailDestroyRate'),
            detailDowngrade: document.getElementById('detailDowngrade'),
            detailMaodun: document.getElementById('detailMaodun'),
            detailLucky: document.getElementById('detailLucky'),
            detailSingleCost: document.getElementById('detailSingleCost'),
            detailSingleRMB: document.getElementById('detailSingleRMB')
        };
    }
    
    attachEventListeners() {
        // 绑定基本事件监听器
        this.elements.amplifyBtn.addEventListener('click', () => this.performAmplifyWithFeedback());
        this.elements.autoAmplifyBtn.addEventListener('click', () => this.startAutoAmplify());
        this.elements.stopAmplifyBtn.addEventListener('click', () => this.stopAutoAmplify());
        this.elements.resetBtn.addEventListener('click', () => this.resetAll());
        this.elements.clearLogBtn.addEventListener('click', () => this.clearLog());
        this.elements.equipmentType.addEventListener('change', () => this.updateUI());
        this.elements.weeklyMaodun.addEventListener('input', () => this.updateStatistics());
        this.elements.maodunPrice.addEventListener('input', () => this.updateStatistics());
        
        // 弹窗事件监听器
        this.elements.settingsBtn.addEventListener('click', () => this.openModal('settings'));
        this.elements.infoBtn.addEventListener('click', () => this.openModal('info'));
        this.elements.closeSettings.addEventListener('click', () => this.closeModal('settings'));
        this.elements.closeInfo.addEventListener('click', () => this.closeModal('info'));
        
        // 点击弹窗外部关闭
        this.elements.settingsModal.addEventListener('click', (e) => {
            if (e.target === this.elements.settingsModal) {
                this.closeModal('settings');
            }
        });
        
        this.elements.infoModal.addEventListener('click', (e) => {
            if (e.target === this.elements.infoModal) {
                this.closeModal('info');
            }
        });
        
        // ESC键关闭弹窗
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeModal('settings');
                this.closeModal('info');
            }
        });
    }
    
    getCurrentAmplifyInfo() {
        if (this.currentLevel >= 20) {
            return null; // 已达最高等级
        }
        
        const nextLevel = this.currentLevel + 1;
        const data = this.amplifyData[nextLevel];
        const maodunCost = this.maodunCost[this.equipmentType][nextLevel] || 0;
        
        return {
            level: nextLevel,
            success: data.success,
            fail: data.fail,
            destroy: data.destroy,
            downgrade: data.downgrade,
            lucky: data.lucky,
            maodun: maodunCost
        };
    }
    
    performAmplify() {
        if (this.currentLevel >= 20) {
            this.addLog('已达到最高增幅等级+20！', 'success');
            return false;
        }
        
        const info = this.getCurrentAmplifyInfo();
        if (!info) return false;
        
        // 消耗资源
        this.totalMaodun += info.maodun;
        this.totalLucky += info.lucky;
        this.totalAttempts++;
        
        // 计算结果
        const random = Math.random() * 100;
        let result = '';
        let newLevel = this.currentLevel;
        
        if (random < info.success) {
            // 成功
            newLevel = this.currentLevel + 1;
            this.maxLevel = Math.max(this.maxLevel, newLevel);
            result = 'success';
            this.addLog(`增幅成功！+${this.currentLevel} → +${newLevel}`, 'success');
        } else if (random < info.success + info.fail) {
            // 失败
            newLevel = Math.max(0, this.currentLevel - info.downgrade);
            result = 'failure';
            if (info.downgrade > 0) {
                this.addLog(`增幅失败！+${this.currentLevel} → +${newLevel} (降级${info.downgrade})`, 'failure');
            } else {
                this.addLog(`增幅失败！等级保持 +${this.currentLevel}`, 'failure');
            }
        } else {
            // 破坏
            newLevel = 0;
            result = 'destroy';
            this.addLog(`装备破坏！+${this.currentLevel} → +0`, 'destroy');
        }
        
        this.currentLevel = newLevel;
        this.updateUI();
        
        return result;
    }
    
    async startAutoAmplify() {
        const targetLevel = parseInt(this.elements.targetLevel.value);
        
        if (this.currentLevel >= targetLevel) {
            this.addLog(`当前等级已达到或超过目标等级 +${targetLevel}`, 'success');
            return;
        }
        
        this.isAutoAmplifying = true;
        this.elements.autoAmplifyBtn.style.display = 'none';
        this.elements.stopAmplifyBtn.style.display = 'inline-block';
        this.elements.amplifyBtn.disabled = true;
        
        this.addLog(`开始自动增幅，目标等级: +${targetLevel}`, 'success');
        
        while (this.isAutoAmplifying && this.currentLevel < targetLevel && this.currentLevel < 20) {
            const result = this.performAmplify();
            
            // 添加短暂延迟以便观察过程
            await new Promise(resolve => setTimeout(resolve, 100));
        }
        
        if (this.currentLevel >= targetLevel) {
            this.addLog(`自动增幅完成！达到目标等级 +${targetLevel}`, 'success');
        } else if (this.currentLevel >= 20) {
            this.addLog('已达到最高增幅等级+20！', 'success');
        }
        
        this.stopAutoAmplify();
    }
    
    stopAutoAmplify() {
        this.isAutoAmplifying = false;
        this.elements.autoAmplifyBtn.style.display = 'inline-block';
        this.elements.stopAmplifyBtn.style.display = 'none';
        this.elements.amplifyBtn.disabled = false;
        
        if (this.isAutoAmplifying) {
            this.addLog('自动增幅已停止', 'failure');
        }
    }
    
    updateUI() {
        // 更新当前等级显示
        this.elements.currentLevel.textContent = this.currentLevel;
        
        // 更新装备类型
        this.equipmentType = this.elements.equipmentType.value;
        
        // 更新当前增幅信息
        const info = this.getCurrentAmplifyInfo();
        if (info) {
            // 快速信息显示
            this.elements.successRate.textContent = `${info.success}%`;
            this.elements.requiredMaodun.textContent = info.maodun;
            this.elements.requiredLucky.textContent = info.lucky;
            
            // 详细信息显示
            this.elements.detailSuccessRate.textContent = `${info.success}%`;
            this.elements.detailFailRate.textContent = `${info.fail}%`;
            this.elements.detailDestroyRate.textContent = `${info.destroy}%`;
            this.elements.detailDowngrade.textContent = info.downgrade;
            this.elements.detailMaodun.textContent = info.maodun;
            this.elements.detailLucky.textContent = info.lucky;
            
            // 计算单次消耗
            const maodunPrice = parseInt(this.elements.maodunPrice.value) || 500;
            const singleCost = info.maodun * maodunPrice;
            const singleRMB = (singleCost / 2000).toFixed(2);
            
            this.elements.detailSingleCost.textContent = singleCost.toLocaleString();
            this.elements.detailSingleRMB.textContent = singleRMB;
            
            this.elements.amplifyBtn.disabled = false;
        } else {
            // 已达最高等级
            this.elements.successRate.textContent = '已满级';
            this.elements.requiredMaodun.textContent = '0';
            this.elements.requiredLucky.textContent = '0';
            
            this.elements.detailSuccessRate.textContent = '0%';
            this.elements.detailFailRate.textContent = '0%';
            this.elements.detailDestroyRate.textContent = '0%';
            this.elements.detailDowngrade.textContent = '0';
            this.elements.detailMaodun.textContent = '0';
            this.elements.detailLucky.textContent = '0';
            this.elements.detailSingleCost.textContent = '0';
            this.elements.detailSingleRMB.textContent = '0';
            
            this.elements.amplifyBtn.disabled = true;
        }
        
        this.updateStatistics();
    }
    
    updateStatistics() {
        // 更新统计信息
        this.elements.totalMaodun.textContent = this.totalMaodun;
        this.elements.totalLucky.textContent = this.totalLucky;
        this.elements.maxLevel.textContent = `+${this.maxLevel}`;
        this.elements.totalAttempts.textContent = this.totalAttempts;
        
        // 计算价值
        const maodunPrice = parseInt(this.elements.maodunPrice.value) || 500;
        const totalTaila = this.totalMaodun * maodunPrice;
        const totalRMB = (totalTaila / 2000).toFixed(2);
        
        this.elements.totalTaila.textContent = totalTaila.toLocaleString();
        this.elements.totalRMB.textContent = totalRMB;
    }
    
    addLog(message, type = 'success') {
        const logEntry = document.createElement('div');
        logEntry.className = `log-entry ${type}`;
        logEntry.textContent = `[${new Date().toLocaleTimeString()}] ${message}`;
        
        this.elements.logContainer.appendChild(logEntry);
        this.elements.logContainer.scrollTop = this.elements.logContainer.scrollHeight;
        
        // 限制日志条数
        const logEntries = this.elements.logContainer.children;
        if (logEntries.length > 100) {
            this.elements.logContainer.removeChild(logEntries[0]);
        }
    }
    
    clearLog() {
        this.elements.logContainer.innerHTML = '';
        this.addLog('日志已清空', 'success');
    }
    
    resetAll() {
        if (confirm('确定要重置所有数据吗？这将清除当前的增幅等级和统计信息。')) {
            this.currentLevel = 0;
            this.maxLevel = 0;
            this.totalMaodun = 0;
            this.totalLucky = 0;
            this.totalAttempts = 0;
            this.stopAutoAmplify();
            
            this.updateUI();
            this.clearLog();
            this.addLog('所有数据已重置', 'success');
        }
    }
    
    // 保存数据到本地存储
    saveData() {
        const data = {
            currentLevel: this.currentLevel,
            maxLevel: this.maxLevel,
            totalMaodun: this.totalMaodun,
            totalLucky: this.totalLucky,
            totalAttempts: this.totalAttempts,
            equipmentType: this.equipmentType,
            weeklyMaodun: this.elements.weeklyMaodun.value,
            maodunPrice: this.elements.maodunPrice.value
        };
        localStorage.setItem('dnfAmplifyData', JSON.stringify(data));
    }
    
    // 从本地存储加载数据
    loadData() {
        const data = localStorage.getItem('dnfAmplifyData');
        if (data) {
            try {
                const parsed = JSON.parse(data);
                this.currentLevel = parsed.currentLevel || 0;
                this.maxLevel = parsed.maxLevel || 0;
                this.totalMaodun = parsed.totalMaodun || 0;
                this.totalLucky = parsed.totalLucky || 0;
                this.totalAttempts = parsed.totalAttempts || 0;
                this.equipmentType = parsed.equipmentType || 'weapon';
                
                if (parsed.weeklyMaodun) this.elements.weeklyMaodun.value = parsed.weeklyMaodun;
                if (parsed.maodunPrice) this.elements.maodunPrice.value = parsed.maodunPrice;
                if (parsed.equipmentType) this.elements.equipmentType.value = parsed.equipmentType;
                
                this.updateUI();
                this.addLog('数据已从本地存储加载', 'success');
            } catch (e) {
                console.error('加载数据失败:', e);
            }
        }
    }
    
    // 计算达到目标等级的预期消耗
    calculateExpectedCost(targetLevel) {
        let expectedMaodun = 0;
        let expectedLucky = 0;
        
        for (let level = this.currentLevel; level < targetLevel && level < 20; level++) {
            const nextLevel = level + 1;
            const data = this.amplifyData[nextLevel];
            const maodunCost = this.maodunCost[this.equipmentType][nextLevel] || 0;
            
            // 简化的期望计算（实际情况会更复杂，因为有降级）
            const successRate = data.success / 100;
            const expectedAttempts = 1 / successRate;
            
            expectedMaodun += maodunCost * expectedAttempts;
            expectedLucky += data.lucky * expectedAttempts;
        }
        
        return {
            maodun: Math.ceil(expectedMaodun),
            lucky: Math.ceil(expectedLucky)
        };
    }
    
    // 弹窗管理方法
    openModal(type) {
        if (type === 'settings') {
            this.elements.settingsModal.style.display = 'block';
        } else if (type === 'info') {
            this.elements.infoModal.style.display = 'block';
            // 更新详细信息
            this.updateUI();
        }
    }
    
    closeModal(type) {
        if (type === 'settings') {
            this.elements.settingsModal.style.display = 'none';
        } else if (type === 'info') {
            this.elements.infoModal.style.display = 'none';
        }
    }
    
    // 增强增幅方法，添加视觉反馈
    performAmplifyWithFeedback() {
        // 添加按钮动画
        this.elements.amplifyBtn.classList.add('amplifying');
        
        // 执行增幅
        const result = this.performAmplify();
        
        // 根据结果添加高亮效果
        setTimeout(() => {
            this.elements.amplifyBtn.classList.remove('amplifying');
            
            if (result === 'success') {
                this.elements.amplifyBtn.classList.add('success-highlight');
            } else if (result === 'failure') {
                this.elements.amplifyBtn.classList.add('failure-highlight');
            } else if (result === 'destroy') {
                this.elements.amplifyBtn.classList.add('destroy-highlight');
            }
            
            // 清除高亮效果
            setTimeout(() => {
                this.elements.amplifyBtn.classList.remove('success-highlight', 'failure-highlight', 'destroy-highlight');
            }, 1000);
        }, 300);
        
        return result;
    }
}

// 当页面加载完成时初始化模拟器
document.addEventListener('DOMContentLoaded', () => {
    const simulator = new DNFAmplificationSimulator();
    simulator.loadData();
    
    // 定期保存数据
    setInterval(() => {
        simulator.saveData();
    }, 10000); // 每10秒保存一次
    
    // 页面关闭前保存数据
    window.addEventListener('beforeunload', () => {
        simulator.saveData();
    });
    
    // 暴露到全局作用域以便调试
    window.simulator = simulator;
});
