#!/bin/bash

# DNF手游增幅模拟器 - 快速启动脚本

echo "🚀 DNF手游增幅模拟器启动中..."
echo "=================================="

# 检查Python是否安装
if ! command -v python3 &> /dev/null; then
    echo "❌ 错误：未找到 python3"
    echo "请先安装 Python 3"
    exit 1
fi

# 检查必要文件
required_files=("index.html" "style.css" "script.js")
for file in "${required_files[@]}"; do
    if [ ! -f "$file" ]; then
        echo "❌ 错误：缺少文件 $file"
        exit 1
    fi
done

echo "✅ 文件检查完成"
echo "📡 启动服务器..."
echo ""
echo "💡 使用说明："
echo "   - 浏览器访问: http://localhost:8080"
echo "   - 手机访问: http://电脑IP:8080"
echo "   - 按 Ctrl+C 停止服务器"
echo ""
echo "🎮 准备开始DNF增幅模拟吧！"
echo "=================================="

# 启动Python HTTP服务器
python3 -m http.server 8080

