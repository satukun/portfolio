"use client";
import { useEffect } from "react";

export default function SmoothScroll() {
  useEffect(() => {
    // アクティブなセクションを追跡する
    const updateActiveSection = () => {
      const sections = ['profile', 'works', 'posts', 'contact'];
      const headerHeight = 80;
      
      let activeSection = '';
      
      sections.forEach(sectionId => {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= headerHeight + 100 && rect.bottom >= headerHeight + 100) {
            activeSection = sectionId;
          }
        }
      });
      
      // ナビリンクのアクティブ状態を更新
      document.querySelectorAll('.nav a').forEach(link => {
        const href = link.getAttribute('href');
        if (href?.substring(1) === activeSection) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
    };

    // スクロール時にアクティブセクションを更新
    window.addEventListener('scroll', updateActiveSection, { passive: true });
    updateActiveSection(); // 初期実行
    // アンカーリンクのスムーズスクロール処理
    const handleAnchorClick = (e: Event) => {
      const target = e.target as HTMLAnchorElement;
      
      // アンカーリンクかどうかチェック
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        
        const href = target.getAttribute('href');
        if (!href) return;
        
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          // ヘッダーの高さを考慮したオフセット
          const headerHeight = 80; // ヘッダーの高さ
          const targetPosition = targetElement.offsetTop - headerHeight;
          
          // スムーズスクロール実行
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
          
          // URLを更新（履歴に追加）
          window.history.pushState(null, '', href);
        }
      }
    };

    // イベントリスナーを追加
    document.addEventListener('click', handleAnchorClick);

    // ページ読み込み時にURLにハッシュがある場合の処理
    const hash = window.location.hash;
    if (hash) {
      setTimeout(() => {
        const targetElement = document.getElementById(hash.substring(1));
        if (targetElement) {
          const headerHeight = 80;
          const targetPosition = targetElement.offsetTop - headerHeight;
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      }, 100); // 少し遅延させてページが完全に読み込まれるのを待つ
    }

    // クリーンアップ
    return () => {
      document.removeEventListener('click', handleAnchorClick);
      window.removeEventListener('scroll', updateActiveSection);
    };
  }, []);

  return null;
}
