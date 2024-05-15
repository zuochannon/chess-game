import { test, expect } from '@playwright/test';

let roomId: string | null = null;

test.describe('Chess App', () => {
  test('should log in as jane_doe and create a room', async ({ page }) => {
    // Log in as jane_doe
    await page.goto('/login');
    await page.fill('#username', 'jane_doe');
    await page.fill('#password', 'jane');
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL('/');

    // Create a room
    await page.goto('/createroom');
    await page.click('button:has-text("CREATE ROOM")');
    await page.waitForURL(/\/onlinePlay\/.+/, { timeout: 60000 });

    const url = page.url();
    roomId = url.split('/').pop();
    console.log('Created room ID:', roomId);
    expect(roomId).not.toBeNull();
  });

  test('should log in as bob_smith and join the room', async ({ page }) => {
    // Log in as bob_smith
    await page.goto('/login');
    await page.fill('#username', 'bob_smith');
    await page.fill('#password', 'bob');
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL('/');

    // Join the room
    if (roomId) {
      await page.goto('/joinroom');
      await page.fill('input[type="text"]', roomId);
      await page.click('button:has-text("Join Room")');
      await page.waitForURL(new RegExp(`/onlinePlay/${roomId}`), { timeout: 60000 });
      expect(page.url()).toContain(`/onlinePlay/${roomId}`);
    } else {
      throw new Error("Room ID is null");
    }
  });

  test('should create a room and make a move', async ({ page }) => {
    // Log in as jane_doe
    await page.goto('/login');
    await page.fill('#username', 'jane_doe');
    await page.fill('#password', 'jane');
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL('/');

    // Create a room
    await page.goto('/createroom');
    await page.click('button:has-text("CREATE ROOM")');
    await page.waitForURL(/\/onlinePlay\/.+/, { timeout: 60000 });

    const url = page.url();
    roomId = url.split('/').pop();
    console.log('Created room ID:', roomId);
    expect(roomId).not.toBeNull();

    // Make a move
    await page.waitForSelector('.chessboard', { timeout: 60000 });

    const piece = await page.$('.chess-piece[data-piece="wp"]');
    const targetSquare = await page.$('.chess-square[data-position="d4"]');

    if (piece && targetSquare) {
      const pieceBox = await piece.boundingBox();
      const targetBox = await targetSquare.boundingBox();

      if (pieceBox && targetBox) {
        await page.mouse.move(pieceBox.x + pieceBox.width / 2, pieceBox.y + pieceBox.height / 2);
        await page.mouse.down();
        await page.mouse.move(targetBox.x + targetBox.width / 2, targetBox.y + targetBox.height / 2);
        await page.mouse.up();
      }
    }

    // Validate the move
    const movedPiece = await page.$('.chess-square[data-position="d4"] .chess-piece[data-piece="wp"]');
    expect(movedPiece).not.toBeNull();
  });
});
