"use client";
import { useEffect, useState } from "react";
import WorksGrid from "./WorksGrid";
import { WorkItem, FilterType } from "@/lib/types";

interface WorksSlidePanelProps {
  isOpen: boolean;
  onClose: () => void;
  works: WorkItem[];
}

export default function WorksSlidePanel({ isOpen, onClose, works }: WorksSlidePanelProps) {
  const [activeFilter, setActiveFilter] = useState<FilterType>("All");

  // パネルが開かれた時にフィルターをリセット
  useEffect(() => {
    if (isOpen) {
      setActiveFilter("All");
    }
  }, [isOpen]);
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  // フィルタリングされた作品リスト
  const filteredWorks = activeFilter === "All" 
    ? works 
    : works.filter(work => work.type === activeFilter);

  // フィルタボタンのハンドラ
  const handleFilterChange = (filter: FilterType) => {
    setActiveFilter(filter);
  };

  // 各フィルターのカウント数を計算
  const getFilterCount = (filter: FilterType) => {
    if (filter === "All") return works.length;
    return works.filter(work => work.type === filter).length;
  };

  return (
    <>
      <div className={`slide-panel-overlay ${isOpen ? 'open' : ''}`} onClick={onClose}>
        <div className={`slide-panel ${isOpen ? 'open' : ''}`} onClick={(e) => e.stopPropagation()}>
          <div className="slide-panel-header">
            <h2>All Works</h2>
            <button className="slide-panel-close" onClick={onClose} aria-label="Close panel">
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
          
          <div className="slide-panel-content">
            <div className="filter-buttons">
              {(["All", "Webアプリ", "Webサイト"] as FilterType[]).map((filter) => (
                <button
                  key={filter}
                  className={`filter-btn ${activeFilter === filter ? 'active' : ''}`}
                  onClick={() => handleFilterChange(filter)}
                >
                  {filter} ({getFilterCount(filter)})
                </button>
              ))}
            </div>
            {filteredWorks.length > 0 ? (
              <WorksGrid works={filteredWorks} columns={5} disableReveal={true} />
            ) : (
              <div className="no-works-message">
                <p>選択したフィルターに該当する案件がありません。</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
