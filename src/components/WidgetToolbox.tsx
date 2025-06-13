import { useDrag } from 'react-dnd';
import { Button } from "./ui/button";
import { 
  Type, 
  Image, 
  Square, 
  MousePointer
} from "lucide-react";
import { WidgetType } from '@/types/widget';

interface WidgetToolItem {
  type: WidgetType;
  label: string;
  icon: React.ReactNode;
  defaultProperties: Record<string, any>;
}

const widgetTools: WidgetToolItem[] = [
  {
    type: 'text',
    label: 'Text',
    icon: <Type className="w-4 h-4 mr-2" />,
    defaultProperties: {
      text: 'Text Widget',
      fontSize: 16,
      color: '#000000',
    }
  },
  {
    type: 'image',
    label: 'Image',
    icon: <Image className="w-4 h-4 mr-2" />,
    defaultProperties: {
      src: 'https://images.unsplash.com/photo-1596276020587-8044fe049813?q=80&w=500&auto=format&fit=crop',
      alt: 'Image',
    }
  },
  {
    type: 'button',
    label: 'Button',
    icon: <MousePointer className="w-4 h-4 mr-2" />,
    defaultProperties: {
      text: 'Button',
      variant: 'default',
    }
  },
  {
    type: 'container',
    label: 'Container',
    icon: <Square className="w-4 h-4 mr-2" />,
    defaultProperties: {
      backgroundColor: '#f3f4f6',
      borderRadius: 8,
    }
  },
];

interface ToolItemProps {
  tool: WidgetToolItem;
}

function ToolItem({ tool }: ToolItemProps) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'WIDGET',
    item: { 
      type: tool.type,
      properties: tool.defaultProperties,
      size: { 
        width: tool.type === 'container' ? 300 : 200, 
        height: tool.type === 'container' ? 200 : 50 
      }
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`cursor-grab ${isDragging ? 'opacity-50' : ''}`}
    >
      <Button 
        variant="outline" 
        className="flex items-center justify-start w-full mb-2"
      >
        {tool.icon}
        {tool.label}
      </Button>
    </div>
  );
}

export function WidgetToolbox() {
  return (
    <div className="w-64 bg-white p-4 border-r border-gray-200 shadow-sm h-full">
      <h2 className="text-lg font-semibold mb-4">Widget Toolbox</h2>
      <div className="space-y-2">
        {widgetTools.map((tool) => (
          <ToolItem key={tool.type} tool={tool} />
        ))}
      </div>
    </div>
  );
}