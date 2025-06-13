export type WidgetType = 'text' | 'image' | 'button' | 'container';

export interface WidgetBase {
  id: string;
  type: WidgetType;
  position: {
    x: number;
    y: number;
  };
  size: {
    width: number;
    height: number;
  };
  properties: Record<string, any>;
}

export interface TextWidget extends WidgetBase {
  type: 'text';
  properties: {
    text: string;
    fontSize: number;
    color: string;
  };
}

export interface ImageWidget extends WidgetBase {
  type: 'image';
  properties: {
    src: string;
    alt: string;
  };
}

export interface ButtonWidget extends WidgetBase {
  type: 'button';
  properties: {
    text: string;
    variant: 'default' | 'outline' | 'secondary';
  };
}

export interface ContainerWidget extends WidgetBase {
  type: 'container';
  properties: {
    backgroundColor: string;
    borderRadius: number;
  };
  children: Widget[];
}

export type Widget = TextWidget | ImageWidget | ButtonWidget | ContainerWidget;