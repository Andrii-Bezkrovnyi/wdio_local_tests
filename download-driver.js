import { detectBrowserPlatform, install } from '@puppeteer/browsers';
import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

// Alternative to __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function downloadChromeDriver() {
    try {
        console.log('Detecting the installed Chrome version...');

        // Retrieve the Chrome version from the Windows Registry
        const registryCommand = 'reg query "HKEY_CURRENT_USER\\Software\\Google\\Chrome\\BLBeacon" /v version';
        const stdout = execSync(registryCommand).toString();
        const match = stdout.match(/version\s+REG_SZ\s+([\d.]+)/);

        if (!match) {
            throw new Error('Could not find the installed Chrome version in the Windows Registry.');
        }

        const chromeVersion = match[1];
        console.log(`Found Chrome version: ${chromeVersion}`);

        const platform = detectBrowserPlatform();
        if (!platform.startsWith('win')) {
            throw new Error('This script is intended for Windows OS only.');
        }

        const outputDir = path.resolve(__dirname);

        console.log(`Starting to download ChromeDriver ZIP archive into the project root...`);

        // Use the install function to fetch the driver
        const result = await install({
            browser: 'chromedriver',
            buildId: chromeVersion,
            platform: platform,
            cacheDir: outputDir, // The archive will be saved here
            unpack: false        // CRITICAL: Do not extract the archive to avoid Windows Defender flags
        });

        console.log('\nSuccess!');
        console.log(`Archive has been saved.`);

    } catch (error) {
        console.error('\nAn error occurred during download:');
        if (error.message.includes('404')) {
            console.error('A matching ChromeDriver version was not found for your specific Chrome build.');
            console.error('Please update Google Chrome to the latest stable version and try again.');
        } else {
            console.error(error.message);
        }
    }
}

downloadChromeDriver();
