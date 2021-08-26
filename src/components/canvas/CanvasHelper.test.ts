/**
 * @jest-environment jsdom
 */
import CardDrawer from './CardDrawer';

describe('Testing Card Drawer Class:', () => {
  const cdInstance = new CardDrawer();

  test('CardDrawer default values populate correctly', () => {
    expect(cdInstance.scalar).toBe(1);
    expect(cdInstance.canvas.width).toBe(undefined);
    expect(cdInstance.canvas.height).toBe(undefined);
  });

  test('CardDrawer\'s card info values populate correctly', () => {
    const cardInfo = cdInstance.getCardInfo();
    expect(cardInfo.height).toBe(1125);
    expect(cardInfo.width).toBe(825);
  });

  test('getCardInfo returns a deep copy', () => {
    const cardInfo = cdInstance.getCardInfo();
    cardInfo.height = -1;
    cardInfo.width = -1;

    const newCardInfo = cdInstance.getCardInfo();
    expect(newCardInfo.height).toBe(1125);
    expect(newCardInfo.width).toBe(825);
  });

  test('updateCardSize updates card size', () => {
    cdInstance.updateCardSize(1234, 1234);
    const cardInfo = cdInstance.getCardInfo();
    expect(cardInfo.height).toBe(1234);
    expect(cardInfo.width).toBe(1234);
  });

  const canvas = document.createElement('canvas');
  test('updateCanvasSize makes CardDrawer adopt canvas size params', () => {
    const height = 100;
    const width = 100;
    canvas.height = height;
    canvas.width = width;

    cdInstance.updateCanvasSize(canvas);
    expect(cdInstance.canvas.height).toBe(height);
    expect(cdInstance.canvas.width).toBe(width);
  });

  const ctx = canvas.getContext('2d');
  test('drawCardBase adjusts scalar for cards that needed it but doesn\'t for cards that don\'t', () => {
    expect(Boolean(ctx)).not.toBe(false);
    if (!ctx) return;

    // Larger width
    cdInstance.updateCardSize(100, 10);
    cdInstance.drawCardBase(ctx);
    expect(cdInstance.scalar).not.toBe(1);

    // Reset to 1
    cdInstance.updateCardSize(10, 10);
    cdInstance.drawCardBase(ctx);
    expect(cdInstance.scalar).toBe(1);

    // Larger height
    cdInstance.updateCardSize(10, 100);
    cdInstance.drawCardBase(ctx);
    expect(cdInstance.scalar).not.toBe(1);
  });
});
