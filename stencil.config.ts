import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'assignment',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements',
    },
    {
      type: 'docs-readme',
      footer: '*Built with love!*',
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
    },
  ],
};
