# Myco Multirepo Lab — Frontend Dashboard

Single Page Application (React + Vite) displaying operational status for the distributed lab.

## Architecture & Relationships

This service interacts across repositories:
- Telemetry data is queried from [myco-multirepo-lab-backend](https://github.com/vvkmj/myco-multirepo-lab-backend).
- Container deployment and ingress routing are declared in [myco-multirepo-lab-k8s](https://github.com/vvkmj/myco-multirepo-lab-k8s).

## Local Development & Build

```bash
# Install dependencies
npm install

# Run locally
npm run dev

# Build production bundle
npm run build
```
