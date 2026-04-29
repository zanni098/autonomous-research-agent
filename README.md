# Autonomous Research Agent

A planning, search, reflection, and synthesis loop for cited research reports.

This repository is part of Asad Jehan Zeb's AI workflow engineering portfolio for freelance AI automation roles, especially the Mindrift AI Workflow Engineer track. It is designed to show how an LLM product can be structured as a repeatable workflow instead of a one-off chat prompt.

## Live demo

After GitHub Pages is enabled for this repository, the demo is available at:

`https://zanni098.github.io/autonomous-research-agent/`

The hosted demo runs as a browser-safe simulation so it can be reviewed without private API keys. The architecture is ready to connect to real providers by adding the environment variables shown in `.env.example`.

## What it demonstrates

- Research workflow that decomposes questions, searches, reads sources, reflects on evidence gaps, and produces cited reports.
- Clear prompt-chain stages that can be tested and improved independently.
- Structured outputs that are suitable for downstream automation.
- A production-facing UI that explains the workflow by letting a reviewer run the pipeline.
- Documentation written for a client, hiring manager, or technical reviewer.

## Workflow

1. Plan sub-questions
2. Search with Tavily or Serper
3. Extract page content
4. Score source relevance
5. Reflect on missing evidence
6. Synthesize a cited report

## Why this matters for Mindrift

Shows tool-use planning, web search integration, retrieval discipline, reflection loops, and citation-aware synthesis.

Mindrift's Tendem-style work depends on reliable multi-step automations: data comes in messy, gets enriched, passes through prompt frameworks, returns structured artifacts, and improves through evaluation. This project is intentionally built around that pattern.

## Tech stack

- TypeScript
- Search API adapter
- HTML extraction
- Reflection loop
- Citation renderer

## Architecture

```text
Question -> planner -> search adapter -> reader -> evidence table -> reflection gate -> report writer
```

## Local development

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Environment

Copy `.env.example` to `.env.local` if you want to connect live APIs. The public demo does not require these values.

## Deployment

This repo includes `.github/workflows/pages.yml`. On every push to `main`, GitHub Actions builds the Vite app and deploys `dist/` to GitHub Pages.

If Pages is not active yet:

1. Open repository settings.
2. Go to Pages.
3. Set source to GitHub Actions.
4. Re-run the `Deploy GitHub Pages` workflow.

## About Asad

Asad Jehan Zeb is a project manager and developer from Mardan, Pakistan. He led E-study card from idea to product, generating roughly $50,000 in revenue through government education digitalization work, and is building Mjord, an agentic AI installation service for non-technical users.

This project exists to make that AI workflow experience visible in public GitHub form.
