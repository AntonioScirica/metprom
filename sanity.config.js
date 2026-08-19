'use client'

import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {presentationTool} from 'sanity/presentation'
import {schemaTypes} from './sanity/schemaTypes'
import {structure} from './sanity/structure'
import {resolve, previewUrl} from './sanity/presentation'

export default defineConfig({
  name: 'default',
  title: 'РИММАКС',

  projectId: 'mu0z0clp',
  dataset: 'production',

  basePath: '/studio',

  plugins: [
    structureTool({structure}),
    presentationTool({resolve, previewUrl}),
  ],

  releases: {enabled: false},

  tools: (prev) => prev.filter((tool) => ['structure', 'presentation'].includes(tool.name)),

  schema: {
    types: schemaTypes,
  },
})
