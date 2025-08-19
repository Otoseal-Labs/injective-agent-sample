# Injective Agent Sample

Proof of concept of **injective-agent-kit**

A sample AI assistant for the **Injective** blockchain, built with [injective-agent-kit](https://www.npmjs.com/package/@otoseal/injective-agent-kit) and Next.js.

## Features

- 🤖 AI assistant powered by LangChain
- 🌐 Interacts with Injective blockchain via `@otoseal/injective-agent-kit`

## Getting Started

First, prepare your environment variables:

```bash
# Copy the example env file
cp .env.example .env

# Then edit .env with your own keys and settings
```

Then install dependencies and start the app:

```bash
# Install dependencies
pnpm install

# Run app
pnpm dev
```

## Sample Prompts

You can try prompts like:

- Transfer 0.1 USDT on testnet to 0x3b46b495d95a23B3001D7C0D634fF46B20dcb04f
- Check my testnet delegation on validator: injvaloper1qvc6jej73armfs5fadn9lprx768f46d9up3p9h
- Please help me withdraw my staking reward on the above validator
