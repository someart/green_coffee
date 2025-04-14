import { useState } from 'react';

export function DraggableNav() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleDrag = (e: React.MouseEvent<HTMLDivElement>) => {
    const nav = e.currentTarget as HTMLElement; // Cast to HTMLElement
    const navStyle = window.getComputedStyle(nav);
    const navTop = parseInt(navStyle.top);
    const navHeight = parseInt(navStyle.height);
    const windHeight = window.innerHeight;

    nav.style.top = `${Math.min(Math.max(navTop + e.movementY, 1), windHeight - navHeight)}px`;
  };

  return (
    <nav className={`absolute top-20 right-0 w-20 h-80 flex items-center justify-center cursor-grab transition-transform ${isOpen ? 'open' : ''}`} onMouseMove={handleDrag}>
      <div className="nav-content flex flex-col items-center transform rotate-45">
        <div className="toggle-btn" onClick={toggleMenu}>
          <i className='bx bx-plus'></i>
        </div>
        {[...Array(5)].map((_, index) => (
          <span key={index} style={{ '--i': index + 1 } as React.CSSProperties}> {/* Type assertion for custom property */}
            <a href="#">
              <i className={`bx bxs-icon-${index + 1}`}></i>
            </a>
          </span>
        ))}
      </div>
      <style jsx>{`
        .nav-content span {
          position: absolute;
          transition: all 0.6s ease;
          opacity: 0;
        }
        .open .nav-content span {
          transform: rotate(calc(var(--i) * (360deg / 5))) translateY(120px);
          opacity: 1;
        }
      `}</style>
    </nav>
  );
}