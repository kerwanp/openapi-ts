import { writeFileSync } from 'node:fs';

import { describe, expect, it, vi } from 'vitest';

import { setConfig } from '../../config';
import { writeServices } from '../services';
import { mockTemplates } from './mocks';
import { openApi } from './models';

vi.mock('node:fs');

describe('writeServices', () => {
    it('writes to filesystem', async () => {
        setConfig({
            client: 'fetch',
            debug: false,
            dryRun: false,
            enums: false,
            exportCore: true,
            exportModels: true,
            exportServices: true,
            format: false,
            input: '',
            lint: false,
            operationId: true,
            output: '',
            postfixServices: 'Service',
            schemas: true,
            serviceResponse: 'body',
            useDateType: false,
            useOptions: false,
        });

        const client: Parameters<typeof writeServices>[2] = {
            enumNames: [],
            models: [],
            server: 'http://localhost:8080',
            services: [
                {
                    $refs: [],
                    imports: [],
                    name: 'User',
                    operations: [],
                },
            ],
            version: 'v1',
        };

        await writeServices(openApi, '/', client, mockTemplates);

        expect(writeFileSync).toHaveBeenCalled();
    });
});
