import { ViteConfig } from './script';
import { defineConfig, UserConfigFn } from 'vite';

export default defineConfig((...args) => {
    const resolvedConfig = (ViteConfig as UserConfigFn)(...args);

    return resolvedConfig;
});