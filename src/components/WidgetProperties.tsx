import { useState, useEffect } from "react";
import { Widget } from "@/types/widget";
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";

interface WidgetPropertiesProps {
  selectedWidget: Widget | null;
  onUpdate: (widget: Widget) => void;
  onDelete: (id: string) => void;
}

export function WidgetProperties({ 
  selectedWidget, 
  onUpdate, 
  onDelete 
}: WidgetPropertiesProps) {
  const [properties, setProperties] = useState<Record<string, any>>({});

  useEffect(() => {
    if (selectedWidget) {
      setProperties(selectedWidget.properties);
    } else {
      setProperties({});
    }
  }, [selectedWidget]);

  if (!selectedWidget) {
    return (
      <div className="w-64 bg-white p-4 border-l border-gray-200 shadow-sm h-full">
        <h2 className="text-lg font-semibold mb-4">Properties</h2>
        <p className="text-gray-500 text-sm">Select a widget to edit properties</p>
      </div>
    );
  }

  const handlePropertyChange = (key: string, value: any) => {
    const updatedProperties = {
      ...properties,
      [key]: value,
    };
    
    setProperties(updatedProperties);
    
    onUpdate({
      ...selectedWidget,
      properties: updatedProperties,
    });
  };

  const handleDeleteWidget = () => {
    onDelete(selectedWidget.id);
  };

  return (
    <div className="w-64 bg-white p-4 border-l border-gray-200 shadow-sm h-full overflow-y-auto">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Properties</h2>
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-red-500 hover:text-red-700"
          onClick={handleDeleteWidget}
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
      
      <div className="space-y-4">
        <div>
          <h3 className="font-medium mb-2">Position</h3>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-xs text-gray-500">X</label>
              <input
                type="number"
                value={selectedWidget.position.x}
                onChange={(e) => 
                  onUpdate({
                    ...selectedWidget,
                    position: {
                      ...selectedWidget.position,
                      x: parseInt(e.target.value) || 0,
                    },
                  })
                }
                className="w-full border border-gray-300 rounded px-2 py-1"
              />
            </div>
            <div>
              <label className="text-xs text-gray-500">Y</label>
              <input
                type="number"
                value={selectedWidget.position.y}
                onChange={(e) => 
                  onUpdate({
                    ...selectedWidget,
                    position: {
                      ...selectedWidget.position,
                      y: parseInt(e.target.value) || 0,
                    },
                  })
                }
                className="w-full border border-gray-300 rounded px-2 py-1"
              />
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="font-medium mb-2">Size</h3>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-xs text-gray-500">Width</label>
              <input
                type="number"
                value={selectedWidget.size.width}
                onChange={(e) => 
                  onUpdate({
                    ...selectedWidget,
                    size: {
                      ...selectedWidget.size,
                      width: parseInt(e.target.value) || 100,
                    },
                  })
                }
                className="w-full border border-gray-300 rounded px-2 py-1"
              />
            </div>
            <div>
              <label className="text-xs text-gray-500">Height</label>
              <input
                type="number"
                value={selectedWidget.size.height}
                onChange={(e) => 
                  onUpdate({
                    ...selectedWidget,
                    size: {
                      ...selectedWidget.size,
                      height: parseInt(e.target.value) || 50,
                    },
                  })
                }
                className="w-full border border-gray-300 rounded px-2 py-1"
              />
            </div>
          </div>
        </div>
        
        {selectedWidget.type === 'text' && (
          <>
            <div>
              <label className="text-xs text-gray-500">Text</label>
              <input
                type="text"
                value={properties.text}
                onChange={(e) => handlePropertyChange('text', e.target.value)}
                className="w-full border border-gray-300 rounded px-2 py-1"
              />
            </div>
            <div>
              <label className="text-xs text-gray-500">Font Size</label>
              <input
                type="number"
                value={properties.fontSize}
                onChange={(e) => handlePropertyChange('fontSize', parseInt(e.target.value) || 16)}
                className="w-full border border-gray-300 rounded px-2 py-1"
              />
            </div>
            <div>
              <label className="text-xs text-gray-500">Color</label>
              <div className="flex">
                <input
                  type="color"
                  value={properties.color}
                  onChange={(e) => handlePropertyChange('color', e.target.value)}
                  className="w-10 h-10 border border-gray-300 rounded p-0"
                />
                <input
                  type="text"
                  value={properties.color}
                  onChange={(e) => handlePropertyChange('color', e.target.value)}
                  className="w-full border border-gray-300 rounded px-2 py-1 ml-2"
                />
              </div>
            </div>
          </>
        )}

        {selectedWidget.type === 'image' && (
          <>
            <div>
              <label className="text-xs text-gray-500">Image URL</label>
              <input
                type="text"
                value={properties.src}
                onChange={(e) => handlePropertyChange('src', e.target.value)}
                className="w-full border border-gray-300 rounded px-2 py-1"
              />
            </div>
            <div>
              <label className="text-xs text-gray-500">Alt Text</label>
              <input
                type="text"
                value={properties.alt}
                onChange={(e) => handlePropertyChange('alt', e.target.value)}
                className="w-full border border-gray-300 rounded px-2 py-1"
              />
            </div>
          </>
        )}

        {selectedWidget.type === 'button' && (
          <>
            <div>
              <label className="text-xs text-gray-500">Button Text</label>
              <input
                type="text"
                value={properties.text}
                onChange={(e) => handlePropertyChange('text', e.target.value)}
                className="w-full border border-gray-300 rounded px-2 py-1"
              />
            </div>
            <div>
              <label className="text-xs text-gray-500">Button Style</label>
              <select
                value={properties.variant}
                onChange={(e) => handlePropertyChange('variant', e.target.value)}
                className="w-full border border-gray-300 rounded px-2 py-1"
              >
                <option value="default">Default</option>
                <option value="outline">Outline</option>
                <option value="secondary">Secondary</option>
              </select>
            </div>
          </>
        )}

        {selectedWidget.type === 'container' && (
          <>
            <div>
              <label className="text-xs text-gray-500">Background Color</label>
              <div className="flex">
                <input
                  type="color"
                  value={properties.backgroundColor}
                  onChange={(e) => handlePropertyChange('backgroundColor', e.target.value)}
                  className="w-10 h-10 border border-gray-300 rounded p-0"
                />
                <input
                  type="text"
                  value={properties.backgroundColor}
                  onChange={(e) => handlePropertyChange('backgroundColor', e.target.value)}
                  className="w-full border border-gray-300 rounded px-2 py-1 ml-2"
                />
              </div>
            </div>
            <div>
              <label className="text-xs text-gray-500">Border Radius</label>
              <input
                type="number"
                value={properties.borderRadius}
                onChange={(e) => handlePropertyChange('borderRadius', parseInt(e.target.value) || 0)}
                className="w-full border border-gray-300 rounded px-2 py-1"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}