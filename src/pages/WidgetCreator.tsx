import { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Widget } from "@/types/widget";
import { WidgetToolbox } from "@/components/WidgetToolbox";
import { Canvas } from "@/components/Canvas";
import { WidgetProperties } from "@/components/WidgetProperties";
import { Button } from "@/components/ui/button";
import { Save, Download, Upload, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function WidgetCreator() {
  const [widgets, setWidgets] = useState<Widget[]>([]);
  const [selectedWidgetId, setSelectedWidgetId] = useState<string | null>(null);
  const { toast } = useToast();

  const selectedWidget = widgets.find(w => w.id === selectedWidgetId) || null;

  const handleWidgetUpdate = (updatedWidget: Widget) => {
    setWidgets(widgets.map(w => 
      w.id === updatedWidget.id ? updatedWidget : w
    ));
  };

  const handleWidgetDelete = (id: string) => {
    setWidgets(widgets.filter(w => w.id !== id));
    if (selectedWidgetId === id) {
      setSelectedWidgetId(null);
    }
  };

  const handleSave = () => {
    localStorage.setItem('widgetCreator', JSON.stringify(widgets));
    toast({
      title: "Project Saved",
      description: "Your widget layout has been saved to local storage.",
    });
  };

  const handleClear = () => {
    if (confirm("Are you sure you want to clear all widgets?")) {
      setWidgets([]);
      setSelectedWidgetId(null);
      toast({
        title: "Canvas Cleared",
        description: "All widgets have been removed from the canvas.",
      });
    }
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(widgets, null, 2);
    const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`;
    
    const exportFileDefaultName = `widget-layout-${new Date().toISOString().slice(0, 10)}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    toast({
      title: "Export Successful",
      description: "Your widget layout has been exported as JSON.",
    });
  };

  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    
    input.onchange = (e: Event) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
      
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const importedWidgets = JSON.parse(event.target?.result as string);
          setWidgets(importedWidgets);
          setSelectedWidgetId(null);
          
          toast({
            title: "Import Successful",
            description: `Imported ${importedWidgets.length} widgets.`,
          });
        } catch (error) {
          toast({
            title: "Import Failed",
            description: "The selected file is not a valid widget layout.",
            variant: "destructive",
          });
        }
      };
      reader.readAsText(file);
    };
    
    input.click();
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex flex-col h-screen">
        <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
          <h1 className="text-xl font-bold">Widget Creator</h1>
          <div className="flex items-center space-x-2">
            <Button size="sm" variant="outline" onClick={handleImport}>
              <Upload className="w-4 h-4 mr-2" />
              Import
            </Button>
            <Button size="sm" variant="outline" onClick={handleExport}>
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button size="sm" variant="outline" onClick={handleClear}>
              <Trash2 className="w-4 h-4 mr-2" />
              Clear
            </Button>
            <Button size="sm" onClick={handleSave}>
              <Save className="w-4 h-4 mr-2" />
              Save
            </Button>
          </div>
        </header>
        
        <div className="flex flex-1 overflow-hidden">
          <WidgetToolbox />
          
          <Canvas
            widgets={widgets}
            setWidgets={setWidgets}
            selectedWidgetId={selectedWidgetId}
            setSelectedWidgetId={setSelectedWidgetId}
          />
          
          <WidgetProperties 
            selectedWidget={selectedWidget} 
            onUpdate={handleWidgetUpdate}
            onDelete={handleWidgetDelete}
          />
        </div>
      </div>
    </DndProvider>
  );
}