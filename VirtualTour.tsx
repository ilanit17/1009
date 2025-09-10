import React, { useState, useEffect, useRef } from 'react';
import { ChevronRight, ChevronLeft, X, Play, Pause, RotateCcw } from 'lucide-react';

export interface TourStep {
  id: string;
  title: string;
  description: string;
  targetSelector?: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  action?: () => void;
  skipable?: boolean;
}

interface VirtualTourProps {
  steps: TourStep[];
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
}

const VirtualTour: React.FC<VirtualTourProps> = ({ steps, isOpen, onClose, onComplete }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [highlightedElement, setHighlightedElement] = useState<HTMLElement | null>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const currentStep = steps[currentStepIndex];

  // Auto-play functionality
  useEffect(() => {
    if (!isPlaying || !isOpen) return;

    const interval = setInterval(() => {
      if (currentStepIndex < steps.length - 1) {
        setCurrentStepIndex(prev => prev + 1);
      } else {
        setIsPlaying(false);
        onComplete();
      }
    }, 4000); // 4 seconds per step

    return () => clearInterval(interval);
  }, [isPlaying, currentStepIndex, steps.length, onComplete, isOpen]);

  // Highlight target element
  useEffect(() => {
    if (!currentStep?.targetSelector || !isOpen) {
      setHighlightedElement(null);
      return;
    }

    const element = document.querySelector(currentStep.targetSelector) as HTMLElement;
    if (element) {
      setHighlightedElement(element);
      
      // Scroll element into view
      element.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center',
        inline: 'center'
      });
    } else {
      setHighlightedElement(null);
    }
  }, [currentStep, isOpen]);

  // Position tooltip
  useEffect(() => {
    if (!highlightedElement || !tooltipRef.current) return;

    const elementRect = highlightedElement.getBoundingClientRect();
    const tooltip = tooltipRef.current;
    const position = currentStep.position || 'bottom';

    let top = 0;
    let left = 0;

    switch (position) {
      case 'top':
        top = elementRect.top - tooltip.offsetHeight - 10;
        left = elementRect.left + (elementRect.width - tooltip.offsetWidth) / 2;
        break;
      case 'bottom':
        top = elementRect.bottom + 10;
        left = elementRect.left + (elementRect.width - tooltip.offsetWidth) / 2;
        break;
      case 'left':
        top = elementRect.top + (elementRect.height - tooltip.offsetHeight) / 2;
        left = elementRect.left - tooltip.offsetWidth - 10;
        break;
      case 'right':
        top = elementRect.top + (elementRect.height - tooltip.offsetHeight) / 2;
        left = elementRect.right + 10;
        break;
    }

    // Ensure tooltip stays within viewport
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    if (left < 10) left = 10;
    if (left + tooltip.offsetWidth > viewportWidth - 10) {
      left = viewportWidth - tooltip.offsetWidth - 10;
    }
    if (top < 10) top = 10;
    if (top + tooltip.offsetHeight > viewportHeight - 10) {
      top = viewportHeight - tooltip.offsetHeight - 10;
    }

    tooltip.style.top = `${top}px`;
    tooltip.style.left = `${left}px`;
  }, [highlightedElement, currentStep]);

  const handleNext = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    } else {
      onComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
    }
  };

  const handleStepClick = () => {
    if (currentStep.action) {
      currentStep.action();
    }
    handleNext();
  };

  const handleRestart = () => {
    setCurrentStepIndex(0);
    setIsPlaying(false);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        ref={overlayRef}
        className="fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300"
        onClick={currentStep.skipable ? onClose : undefined}
      >
        {/* Highlighted element */}
        {highlightedElement && (
          <div
            className="absolute border-4 border-blue-500 rounded-lg shadow-lg pointer-events-none"
            style={{
              top: highlightedElement.offsetTop - 4,
              left: highlightedElement.offsetLeft - 4,
              width: highlightedElement.offsetWidth + 8,
              height: highlightedElement.offsetHeight + 8,
              zIndex: 51,
            }}
          />
        )}
      </div>

      {/* Tooltip */}
      <div
        ref={tooltipRef}
        className="fixed bg-white rounded-lg shadow-xl p-6 max-w-sm z-52 border border-gray-200"
        style={{ zIndex: 52 }}
      >
        {/* Progress indicator */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
              {currentStepIndex + 1}
            </div>
            <span className="text-sm text-gray-500">
              שלב {currentStepIndex + 1} מתוך {steps.length}
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="mb-6">
          <h3 className="text-lg font-bold text-gray-800 mb-2">
            {currentStep.title}
          </h3>
          <p className="text-gray-600 leading-relaxed">
            {currentStep.description}
          </p>
        </div>

        {/* Progress bar */}
        <div className="mb-6">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStepIndex + 1) / steps.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex items-center space-x-1 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span className="text-sm">{isPlaying ? 'השהה' : 'הפעל'}</span>
            </button>
            <button
              onClick={handleRestart}
              className="flex items-center space-x-1 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span className="text-sm">התחל מחדש</span>
            </button>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrevious}
              disabled={currentStepIndex === 0}
              className="flex items-center space-x-1 px-3 py-2 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
              <span className="text-sm">הקודם</span>
            </button>
            <button
              onClick={currentStep.action ? handleStepClick : handleNext}
              className="flex items-center space-x-1 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
            >
              <span className="text-sm">
                {currentStepIndex === steps.length - 1 ? 'סיום' : 'הבא'}
              </span>
              {currentStepIndex < steps.length - 1 && <ChevronLeft className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Skip option */}
        {currentStep.skipable && (
          <div className="mt-4 text-center">
            <button
              onClick={onClose}
              className="text-sm text-gray-500 hover:text-gray-700 underline"
            >
              דלג על הסיור
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default VirtualTour;
