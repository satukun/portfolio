"use client";
import { useEffect } from "react";
import Image from "next/image";
import { WorkItem } from "@/lib/types";
import { workHelpers } from "@/dal/works";

interface WorkModalProps {
  work: WorkItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function WorkModal({ work, isOpen, onClose }: WorkModalProps) {
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

  if (!isOpen || !work) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close modal">
          <span className="material-symbols-outlined">close</span>
        </button>
        
        <div className="modal-body">
          <div className="work-thumbnail">
            <Image 
              src={workHelpers.getThumbnailUrl(work)} 
              alt={work.title}
              width={600}
              height={400}
              style={{ width: '100%', height: '300px', objectFit: 'cover', borderRadius: '8px' }}
            />
          </div>
          
          <div className="work-info">
            <div className="work-meta">
              <span className="work-category">{work.category}</span>
              <span className="work-year">{work.year}</span>
            </div>
            
            <h2 className="work-title">{work.title}</h2>
            
            <div className="work-description">
              <h3>概要</h3>
              <p>{work.description}</p>
            </div>
            
            <div className="work-tech-stack">
              <h3>技術スタック</h3>
              <div className="tech-chips">
                {workHelpers.getTechStackArray(work).map((tech, index) => (
                  <span key={index} className="tech-chip">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
