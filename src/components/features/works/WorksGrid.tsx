"use client";
import { useState } from "react";
import WorkModal from "./WorkModal";
import { WorkItem } from "@/lib/types";
import { workHelpers } from "@/dal/works";

interface WorksGridProps {
  works: WorkItem[];
  columns?: 3 | 5 | 6;
  showMore?: boolean;
  onMoreClick?: () => void;
  disableReveal?: boolean;
}

export default function WorksGrid({ works, columns = 3, showMore = false, onMoreClick, disableReveal = false }: WorksGridProps) {
  const [selectedWork, setSelectedWork] = useState<WorkItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleWorkClick = (work: WorkItem) => {
    setSelectedWork(work);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedWork(null);
  };

  const gridClass = columns === 6 ? 'works-grid-6' : columns === 5 ? 'works-grid-5' : 'works-grid-3';

  return (
    <>
      <div className={`works-grid ${gridClass}`}>
        {works.map((work) => (
          <div 
            key={work.id} 
            className={`work-card ${disableReveal ? 'is-visible' : ''}`}
            onClick={() => handleWorkClick(work)}
            {...(!disableReveal && { 'data-reveal': 'scale' })}
          >
            <div className="work-card-thumbnail">
              <img 
                src={workHelpers.getThumbnailUrl(work)} 
                alt={work.title}
                width={400}
                height={250}
                style={{ width: '100%', height: '200px', objectFit: 'cover' }}
              />
              <div className="work-card-overlay">
                <span className="material-symbols-outlined">visibility</span>
              </div>
            </div>
            <div className="work-card-content">
              <div className="work-card-meta">
                <span className="work-type">{workHelpers.getTypeString(work)}</span>
                <span className="work-year">{work.year}</span>
              </div>
              <h3 className="work-card-title">{work.title}</h3>
              <div className="work-card-tech">
                {workHelpers.getTechStackArray(work).slice(0, 3).map((tech, index) => (
                  <span key={index} className="tech-tag">
                    {tech}
                  </span>
                ))}
                {workHelpers.getTechStackArray(work).length > 3 && (
                  <span className="tech-tag more">+{workHelpers.getTechStackArray(work).length - 3}</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {showMore && onMoreClick && (
        <div className="works-more-section" style={{ textAlign: 'center', marginTop: '32px' }} data-reveal="fade-up">
          <button className="btn secondary more-btn" onClick={onMoreClick}>
            <span className="material-symbols-outlined">expand_more</span>
            More Works
          </button>
        </div>
      )}

      <WorkModal 
        work={selectedWork}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
}
