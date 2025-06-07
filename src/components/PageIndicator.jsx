import React from 'react';

export const PageIndicator = ({ section, scrollToSection }) => {
  return (
    <div className="fixed right-8 top-1/2 transform -translate-y-1/2 flex flex-col gap-4">
      {[0, 1, 2, 3].map(idx => (
        <button
          key={idx}
          className={`w-3 h-3 rounded-full transition-all duration-300 ${
            section === idx ? 'bg-indigo-600 scale-125' : 'bg-gray-400'
          }`}
          onClick={() => scrollToSection(idx)}
          aria-label={`跳转到第${idx + 1}部分`}
        />
      ))}
    </div>
  );
}; 