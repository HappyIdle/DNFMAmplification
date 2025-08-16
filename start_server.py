#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
DNF手游增幅模拟器 - 本地服务器启动脚本
"""

import http.server
import socketserver
import webbrowser
import os
import sys
from pathlib import Path

def start_server():
    # 设置端口
    PORT = 8080
    
    # 确保在正确的目录中
    script_dir = Path(__file__).parent
    os.chdir(script_dir)
    
    # 检查必要文件是否存在
    required_files = ['index.html', 'style.css', 'script.js']
    missing_files = [f for f in required_files if not Path(f).exists()]
    
    if missing_files:
        print(f"❌ 错误：缺少必要文件: {', '.join(missing_files)}")
        input("按回车键退出...")
        return
    
    # 创建HTTP服务器
    handler = http.server.SimpleHTTPRequestHandler
    
    try:
        with socketserver.TCPServer(("", PORT), handler) as httpd:
            server_url = f"http://localhost:{PORT}"
            
            print("🚀 DNF手游增幅模拟器服务器启动中...")
            print("=" * 50)
            print(f"📡 服务器地址: {server_url}")
            print(f"📁 服务目录: {script_dir}")
            print("=" * 50)
            print("💡 使用说明:")
            print("   - 在浏览器中访问上述地址")
            print("   - 手机用户可通过局域网IP访问")
            print("   - 按 Ctrl+C 停止服务器")
            print("=" * 50)
            
            # 自动打开浏览器
            try:
                print("🌐 正在打开浏览器...")
                webbrowser.open(server_url)
            except Exception as e:
                print(f"⚠️  无法自动打开浏览器: {e}")
                print(f"请手动访问: {server_url}")
            
            print(f"\n✅ 服务器运行在端口 {PORT}")
            print("🎮 开始享受DNF增幅模拟吧！")
            print("\n📱 手机访问提示:")
            print("   1. 确保手机和电脑在同一WiFi网络")
            print("   2. 查看电脑IP地址（如：192.168.1.100）")
            print(f"   3. 手机浏览器访问：http://电脑IP:{PORT}")
            print("\n" + "=" * 50)
            
            # 启动服务器
            httpd.serve_forever()
            
    except OSError as e:
        if e.errno == 48:  # Address already in use
            print(f"❌ 端口 {PORT} 已被占用！")
            print("💡 解决方案:")
            print("   1. 关闭其他占用该端口的程序")
            print("   2. 或等待几分钟后重试")
            print("   3. 或修改 PORT 变量使用其他端口")
        else:
            print(f"❌ 启动服务器失败: {e}")
        
        input("\n按回车键退出...")
        
    except KeyboardInterrupt:
        print("\n\n🛑 服务器已停止")
        print("👋 感谢使用DNF增幅模拟器！")

if __name__ == "__main__":
    try:
        start_server()
    except Exception as e:
        print(f"❌ 程序异常: {e}")
        input("按回车键退出...")

