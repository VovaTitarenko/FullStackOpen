const { test, describe, expect, beforeEach } = require('@playwright/test')

describe('Note App', () => {
    beforeEach(async ({ page }) => {
        await page.goto('/') // address is specified in playwright.config
    })

    test('front page can be opened', async ({ page }) => {
        const locator = await page.getByText('Notes')
        await expect(locator).toBeVisible()
        await expect(page.getByText('Note app, Department of Computer Science, University of Helsinki 2024')).toBeVisible()
    });

    test.only('login fails with wrong password', async ({ page }) => {
        await page.getByRole('button', { name: 'login' }).click()
        await page.getByTestId('username').fill('mluukkai')
        await page.getByTestId('password').fill('wrong')
        await page.getByRole('button', { name: 'login' }).click()
    
        await expect(page.getByText('Wrong credentials')).toBeVisible()
        await expect(page.getByText("You're now logged in")).not.toBeVisible()
    })

    test('user can log in', async ({ page }) => {
        await page.getByRole('button', { name: 'login' }).click();
        await page.getByTestId('username').fill('mluukkai')
        await page.getByTestId('password').fill('salainen')
        await page.getByRole('button', { name: 'login' }).click()
        await expect(page.getByText("You're now logged in")).toBeVisible()
    });

    describe('when logged in', () => {
        beforeEach(async ({ page }) => {
          await page.getByRole('button', { name: 'login' }).click()
          await page.getByTestId('username').fill('mluukkai')
          await page.getByTestId('password').fill('salainen')
          await page.getByRole('button', { name: 'login' }).click()
        })
    
        test('a new note can be created', async ({ page }) => {
          await page.getByRole('button', { name: 'create new note' }).click()
          await page.getByPlaceholder('Fill me...').fill('a note created by playwright')
          await page.getByRole('button', { name: 'Save' }).click()
          await expect(page.getByText('a note created by playwright')).toBeVisible()
        })
    }) 
})