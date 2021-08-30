/**
 * @jest-environment jsdom
 */
import * as _ from 'lodash';
import CardDrawer from '../CardDrawer';
import { Drawable } from '../types';

describe('Testing Card Drawer Class:', () => {
  const cdInstance = new CardDrawer();
  const canvas = document.createElement('canvas');
  canvas.height = 100;
  canvas.width = 100;
  const ctx = canvas.getContext('2d');

  describe('Initialization:', () => {
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
  });

  describe('Internal Variable Adjustment:', () => {
    test('getCardInfo returns a deep copy', () => {
      const instanceCopy = _.cloneDeep(cdInstance);
      const cardInfo = instanceCopy.getCardInfo();
      cardInfo.height = -1;
      cardInfo.width = -1;

      const newCardInfo = instanceCopy.getCardInfo();
      expect(newCardInfo.height).toBe(1125);
      expect(newCardInfo.width).toBe(825);
    });

    test('updateCardSize updates card size', () => {
      const instanceCopy = _.cloneDeep(cdInstance);
      instanceCopy.updateCardSize(1234, 1234);
      const cardInfo = instanceCopy.getCardInfo();
      expect(cardInfo.height).toBe(1234);
      expect(cardInfo.width).toBe(1234);
    });

    test('updateCardSize doesn\'t allow negative inputs', () => {
      const instanceCopy = _.cloneDeep(cdInstance);
      expect(() => instanceCopy.updateCardSize(-1, -1)).toThrowError();
    });

    test('updateCanvasSize upholds minimum canvas size 1x1', () => {
      const instanceCopy = _.cloneDeep(cdInstance);
      const smallCanvas = document.createElement('canvas');
      smallCanvas.width = 0;
      smallCanvas.height = 0;
      expect(() => instanceCopy.updateCanvasSize(smallCanvas)).toThrowError();
    });

    test('updateCanvasSize makes CardDrawer change canvas size with valid sizes', () => {
      const instanceCopy = _.cloneDeep(cdInstance);
      const height = 100;
      const width = 100;
      canvas.height = height;
      canvas.width = width;

      instanceCopy.updateCanvasSize(canvas);
      expect(instanceCopy.canvas.height).toBe(height);
      expect(instanceCopy.canvas.width).toBe(width);
    });
  });

  describe('Side Effect Functions:', () => {
    expect(Boolean(ctx)).not.toBe(false);
    if (!ctx) return;

    test('drawCardBase adjusts scalar for cards as needed', () => {
      const instanceCopy = _.cloneDeep(cdInstance);
      instanceCopy.updateCanvasSize(canvas);

      // Larger width
      instanceCopy.updateCardSize(100, 10);
      instanceCopy.drawCardBase(ctx);
      expect(instanceCopy.scalar).not.toBe(1);

      // Reset to 1
      instanceCopy.updateCardSize(10, 10);
      instanceCopy.drawCardBase(ctx);
      expect(instanceCopy.scalar).toBe(1);

      // Larger height
      instanceCopy.updateCardSize(10, 100);
      instanceCopy.drawCardBase(ctx);
      expect(instanceCopy.scalar).not.toBe(1);
    });

    test('drawCardBase errors out if invalid card info is given', () => {
      const instanceCopy = _.cloneDeep(cdInstance);
      instanceCopy.card.height = undefined;
      instanceCopy.card.width = undefined;
      expect(() => instanceCopy.drawCardBase(ctx))
        .toThrowError('ERROR: Tried to draw card base with missing card size values');
    });

    test('drawCardBase errors out if invalid canvas info is given', () => {
      const instanceCopy = _.cloneDeep(cdInstance);
      instanceCopy.canvas.height = undefined;
      instanceCopy.canvas.width = undefined;
      expect(() => instanceCopy.drawCardBase(ctx))
        .toThrowError('ERROR: Tried to draw card base with missing canvas size values');
    });

    const drawables: Drawable[] = [];
    const drawable: Drawable = {
      text: 'testing_drawable',
      textAlign: 'center',
      fillStyle: '#000000',
      position: {
        top: 'center',
        left: 'center',
        right: 'none',
        bottom: 'none',
      },
    };

    // Get canvas and card sized before testing card instances
    drawables.push(_.cloneDeep(drawable));
    drawable.position.left = 10;
    drawable.position.top = 20;
    drawables.push(_.cloneDeep(drawable));

    test('drawCardComponents errors out with invalid card or canvas dimensions', () => {
      // Set up one instance to test with copies
      const instanceCopy = _.cloneDeep(cdInstance);
      instanceCopy.updateCanvasSize(canvas);
      instanceCopy.updateCardSize(10, 10);
      instanceCopy.drawCardBase(ctx);

      const instanceCopy1 = _.cloneDeep(instanceCopy);
      instanceCopy1.card.height = undefined;
      expect(() => instanceCopy1.drawCardComponents(ctx, drawables))
        .toThrowError('ERROR: Tried to draw card components with invalid card measures');

      const instanceCopy2 = _.cloneDeep(instanceCopy);
      instanceCopy2.card.width = undefined;
      expect(() => instanceCopy2.drawCardComponents(ctx, drawables))
        .toThrowError('ERROR: Tried to draw card components with invalid card measures');

      const instanceCopy3 = _.cloneDeep(instanceCopy);
      instanceCopy3.card.height = -1;
      expect(() => instanceCopy3.drawCardComponents(ctx, drawables))
        .toThrowError('ERROR: Tried to draw card components with invalid card measures');

      const instanceCopy4 = _.cloneDeep(instanceCopy);
      instanceCopy4.card.width = -1;
      expect(() => instanceCopy4.drawCardComponents(ctx, drawables))
        .toThrowError('ERROR: Tried to draw card components with invalid card measures');
    });

    test('drawCardComponents errors out with invalid card side dimensions', () => {
      // Set up one instance to test with copies
      const instanceCopy = _.cloneDeep(cdInstance);
      instanceCopy.updateCanvasSize(canvas);
      instanceCopy.updateCardSize(10, 10);
      instanceCopy.drawCardBase(ctx);

      const instanceCopy1 = _.cloneDeep(instanceCopy);
      instanceCopy1.card.sides.left = undefined;
      expect(() => instanceCopy1.drawCardComponents(ctx, drawables))
        .toThrowError('ERROR: Tried to draw card components with invalid card sides');

      const instanceCopy2 = _.cloneDeep(instanceCopy);
      instanceCopy2.card.sides.right = undefined;
      expect(() => instanceCopy2.drawCardComponents(ctx, drawables))
        .toThrowError('ERROR: Tried to draw card components with invalid card sides');

      const instanceCopy3 = _.cloneDeep(instanceCopy);
      instanceCopy3.card.sides.top = undefined;
      expect(() => instanceCopy3.drawCardComponents(ctx, drawables))
        .toThrowError('ERROR: Tried to draw card components with invalid card sides');

      const instanceCopy4 = _.cloneDeep(instanceCopy);
      instanceCopy4.card.sides.bottom = undefined;
      expect(() => instanceCopy4.drawCardComponents(ctx, drawables))
        .toThrowError('ERROR: Tried to draw card components with invalid card sides');
    });

    test('drawCardComponents errors out with invalid card side dimensions', () => {
      // Set up one instance to test with copies
      const instanceCopy = _.cloneDeep(cdInstance);
      instanceCopy.updateCanvasSize(canvas);
      instanceCopy.updateCardSize(10, 10);
      instanceCopy.drawCardBase(ctx);

      const instanceCopy1 = _.cloneDeep(instanceCopy);
      instanceCopy1.canvas.height = undefined;
      expect(() => instanceCopy1.drawCardComponents(ctx, drawables))
        .toThrowError('ERROR: Tried to draw card components with invalid canvas measures');

      const instanceCopy2 = _.cloneDeep(instanceCopy);
      instanceCopy2.canvas.height = -1;
      expect(() => instanceCopy2.drawCardComponents(ctx, drawables))
        .toThrowError('ERROR: Tried to draw card components with invalid canvas measures');

      const instanceCopy3 = _.cloneDeep(instanceCopy);
      instanceCopy3.canvas.width = undefined;
      expect(() => instanceCopy3.drawCardComponents(ctx, drawables))
        .toThrowError('ERROR: Tried to draw card components with invalid canvas measures');

      const instanceCopy4 = _.cloneDeep(instanceCopy);
      instanceCopy4.canvas.width = -1;
      expect(() => instanceCopy4.drawCardComponents(ctx, drawables))
        .toThrowError('ERROR: Tried to draw card components with invalid canvas measures');
    });
  });
});
