#!/usr/bin/env python
"""Development server runner for F&B Startup Navigator API."""

import uvicorn

if __name__ == "__main__":
    uvicorn.run(
        "src.backend.main:app",
        host="0.0.0.0",
        port=8080,
        reload=True,  # Auto-reload on code changes
        log_level="info"
    )

