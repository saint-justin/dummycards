// Element drawn onto the canvas's type
export type Drawable = {
  text: string
  textAlign: 'left' | 'center' | 'right',
  fillStyle: string,
  font: string,
  position: {
    top: 'center' | 'none' | number,
    bottom: 'center' | 'none' | number,
    left: 'center' | 'none' | number,
    right: 'center' | 'none' | number,
  }
}

type Card = {
  height: number | undefined,
  width: number | undefined,
  sides: {
    left: number | undefined,
    right: number | undefined,
    top: number | undefined,
    bottom: number | undefined,
  }
}