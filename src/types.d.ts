// Element drawn onto the canvas's type
export type TextAlignOpt = 'left' | 'center' | 'right';
export type Drawable = {
  text: string
  textAlign: TextAlignOpt,
  fillStyle?: string,
  font?: string,
  position: {
    top: 'center' | 'none' | number,
    bottom: 'center' | 'none' | number,
    left: 'center' | 'none' | number,
    right: 'center' | 'none' | number,
  }
}

// Info that each card holds and prints
export type Card = {
  height: number | undefined,
  width: number | undefined,
  sides: {
    left: number | undefined,
    right: number | undefined,
    top: number | undefined,
    bottom: number | undefined,
  }
}

// Size for cards
export type Size = {
  height: number,
  width: number,
};

// Widget Info Types
export type DrawableProperty = 'text' | 'textAlign' | 'fillStyle' | 'font' | 'top' | 'bottom' | 'left' | 'right';
export type WInput = { 
  property: DrawableProperty,
  value: string, 
};