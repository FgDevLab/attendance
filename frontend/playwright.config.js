import { defineConfig, devices } from '@playwright/test'
import dotenv from 'dotenv'

dotenv.config()

export default defineConfig({
  testDir: './tests', 
  fullyParallel: true,
  forbidOnly: !!process.env.CI, 
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html', 

  use: {
    baseURL: `http://localhost:${process.env.VITE_PORT}`, 
    trace: 'on-first-retry', 
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  webServer: {
    command: `pnpm run dev`,  
    url: `http://localhost:${process.env.VITE_PORT}`,
    reuseExistingServer: !process.env.CI, 
    timeout: 120 * 1000,
  },
});
