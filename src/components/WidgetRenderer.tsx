import { useRef } from "react";
import { useDrag } from "react-dnd";
import { Widget } from "@/types/widget";
import { Button } from "./ui/button";

interface WidgetRendererProps {
  widget: Widget;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onDrag: (id: string, dx: number, dy: number) => void;
  onUpdate: (widget: Widget) => void;
  onDelete: (id: string) => void;
}

export function WidgetRenderer({
  widget,
  isSelected,
  onSelect,
  onDrag,
  onUpdate,
  onDelete,
}: WidgetRendererProps) {
  const { id, type, position, size, properties } = widget;
  const dragRef = useRef<HTMLDivElement>(null);
  const initialPosition = useRef({ x: 0, y: 0 });

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'MOVE_WIDGET',
    item: { id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const handleMouseDown = (e: React.MouseEvent) => {
    onSelect(id);
    
    if (e.target === dragRef.current) {
      initialPosition.current = {
        x: e.clientX,
        y: e.clientY,
      };

      const handleMouseMove = (moveEvent: MouseEvent) => {
        const dx = moveEvent.clientX - initialPosition.current.x;
        const dy = moveEvent.clientY - initialPosition.current.y;
        
        onDrag(id, dx, dy);
        
        initialPosition.current = {
          x: moveEvent.clientX,
          y: moveEvent.clientY,
        };
      };

      const handleMouseUp = () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
  };

  const renderContent = () => {
    switch (type) {
      case 'text':
        return (
          <div 
            style={{ 
              fontSize: `${properties.fontSize}px`,
              color: properties.color,
            }}
          >
            {properties.text}
          </div>
        );
      
      case 'image':
        return (
          <img 
            src={properties.src}
            alt={properties.alt}
            className="w-full h-full object-contain"
          />
        );
      
      case 'button':
        return (
          <Button variant={properties.variant as any}>
            {properties.text}
          </Button>
        );
      
      case 'container':
        return (
          <div 
            className="w-full h-full"
            style={{ 
              backgroundColor: properties.backgroundColor,
              borderRadius: `${properties.borderRadius}px`,
            }}
          >
            {/* Container contents would go here */}
          </div>
        );
      
      default:
        return <div>Unknown widget type</div>;
    }
  };

  return (
    <div
      ref={(node) => {
        drag(node);
        dragRef.current = node;
      }}
      className={`absolute cursor-move ${
        isSelected ? 'ring-2 ring-blue-500' : ''
      } ${isDragging ? 'opacity-50' : ''}`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: `${size.width}px`,
        height: `${size.height}px`,
      }}
      onClick={() => onSelect(id)}
      onMouseDown={handleMouseDown}
    >
      <div className="w-full h-full flex items-center justify-center">
        {renderContent()}
      </div>
      
      {isSelected && (
        <>
          {/* Resize handle - bottom right */}
          <div
            className="absolute bottom-0 right-0 w-3 h-3 bg-blue-500 cursor-se-resize"
            onMouseDown={(e) => {
              e.stopPropagation();
              
              const startX = e.clientX;
              const startY = e.clientY;
              const startWidth = size.width;
              const startHeight = size.height;
              
              const handleMouseMove = (moveEvent: MouseEvent) => {
                const newWidth = startWidth + (moveEvent.clientX - startX);
                const newHeight = startHeight + (moveEvent.clientY - startY);
                
                onUpdate({
                  ...widget,
                  size: {
                    width: Math.max(50, newWidth),
                    height: Math.max(30, newHeight),
                  },
                });
              };
              
              const handleMouseUp = () => {
                document.removeEventListener('mousemove', handleMouseMove);
                document.removeEventListener('mouseup', handleMouseUp);
              };
              
              document.addEventListener('mousemove', handleMouseMove);
              document.addEventListener('mouseup', handleMouseUp);
            }}
          />
        </>
      )}
    </div>
  );
}