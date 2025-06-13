import { useState, useRef } from "react";
import { useDrop } from "react-dnd";
import { Widget } from "@/types/widget";
import { generateId } from "@/lib/utils";
import { WidgetRenderer } from "./WidgetRenderer";
import { useToast } from "@/hooks/use-toast";

interface CanvasProps {
  widgets: Widget[];
  setWidgets: React.Dispatch<React.SetStateAction<Widget[]>>;
  selectedWidgetId: string | null;
  setSelectedWidgetId: React.Dispatch<React.SetStateAction<string | null>>;
}

export function Canvas({ 
  widgets, 
  setWidgets, 
  selectedWidgetId, 
  setSelectedWidgetId 
}: CanvasProps) {
  const [isDragging, setIsDragging] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'WIDGET',
    drop: (item: any, monitor) => {
      const canvasRect = canvasRef.current?.getBoundingClientRect();
      if (!canvasRect) return;

      const dropOffset = monitor.getClientOffset();
      if (!dropOffset) return;

      // Calculate drop position relative to canvas
      const x = dropOffset.x - canvasRect.left;
      const y = dropOffset.y - canvasRect.top;

      addWidget(item.type, item.properties, item.size, { x, y });
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const addWidget = (
    type: Widget['type'], 
    properties: Widget['properties'], 
    size: Widget['size'],
    position: Widget['position']
  ) => {
    const newWidget: Widget = {
      id: generateId(),
      type,
      position,
      size,
      properties,
      ...(type === 'container' ? { children: [] } : {})
    } as Widget;

    setWidgets((prev) => [...prev, newWidget]);
    setSelectedWidgetId(newWidget.id);
    
    toast({
      title: "Widget Added",
      description: `New ${type} widget has been added to the canvas.`,
      duration: 2000,
    });
  };

  const updateWidget = (updatedWidget: Widget) => {
    setWidgets((prevWidgets) =>
      prevWidgets.map((widget) =>
        widget.id === updatedWidget.id ? updatedWidget : widget
      )
    );
  };

  const deleteWidget = (id: string) => {
    setWidgets((prevWidgets) => prevWidgets.filter((widget) => widget.id !== id));
    if (selectedWidgetId === id) {
      setSelectedWidgetId(null);
    }
    
    toast({
      title: "Widget Deleted",
      description: "The widget has been removed from the canvas.",
      duration: 2000,
    });
  };

  const handleWidgetSelect = (id: string) => {
    setSelectedWidgetId(id);
  };

  const handleWidgetDrag = (id: string, dx: number, dy: number) => {
    setWidgets((prevWidgets) =>
      prevWidgets.map((widget) => {
        if (widget.id === id) {
          return {
            ...widget,
            position: {
              x: widget.position.x + dx,
              y: widget.position.y + dy,
            },
          };
        }
        return widget;
      })
    );
  };

  return (
    <div
      ref={(node) => {
        drop(node);
        if (node) canvasRef.current = node;
      }}
      className={`flex-1 relative bg-gray-100 overflow-auto min-h-[calc(100vh-64px)] ${
        isOver ? "bg-blue-50" : ""
      }`}
    >
      {widgets.length === 0 && !isOver && (
        <div className="absolute inset-0 flex items-center justify-center text-gray-400">
          Drag and drop widgets here to start building
        </div>
      )}

      {widgets.map((widget) => (
        <WidgetRenderer
          key={widget.id}
          widget={widget}
          isSelected={selectedWidgetId === widget.id}
          onSelect={handleWidgetSelect}
          onDrag={handleWidgetDrag}
          onUpdate={updateWidget}
          onDelete={deleteWidget}
        />
      ))}
    </div>
  );
}