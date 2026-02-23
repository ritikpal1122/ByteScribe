"""Piston service — executes code against the Piston API."""

from __future__ import annotations

from typing import Optional

import httpx

from app.config import get_settings

settings = get_settings()


# ---------------------------------------------------------------------------
# Language configuration
# ---------------------------------------------------------------------------

LANGUAGE_MAP: dict[str, dict] = {
    "python": {"language": "python", "version": "3.10.0"},
    "javascript": {"language": "javascript", "version": "18.15.0"},
    "typescript": {"language": "typescript", "version": "5.0.3"},
    "java": {"language": "java", "version": "15.0.2"},
    "cpp": {"language": "c++", "version": "10.2.0"},
    "c": {"language": "c", "version": "10.2.0"},
    "go": {"language": "go", "version": "1.16.2"},
    "rust": {"language": "rust", "version": "1.68.2"},
}


class PistonService:
    """Async client for the Piston code execution engine."""

    def __init__(self, base_url: str = settings.PISTON_URL) -> None:
        self.base_url = base_url.rstrip("/")

    async def execute(
        self,
        language: str,
        code: str,
        stdin: str = "",
    ) -> dict:
        """Execute *code* in the given *language* via the Piston API.

        Parameters
        ----------
        language
            Key in :data:`LANGUAGE_MAP` (e.g. ``"python"``, ``"cpp"``).
        code
            Source code to execute.
        stdin
            Standard input to feed to the process.

        Returns
        -------
        dict
            ``{"stdout": str, "stderr": str, "exit_code": int}``
        """

        lang_config = LANGUAGE_MAP.get(language)
        if lang_config is None:
            return {
                "stdout": "",
                "stderr": f"Unsupported language: {language}",
                "exit_code": 1,
            }

        payload = {
            "language": lang_config["language"],
            "version": lang_config["version"],
            "files": [{"name": f"main.{_extension(language)}", "content": code}],
            "stdin": stdin,
            "compile_timeout": 10000,
            "run_timeout": 10000,
            "compile_memory_limit": -1,
            "run_memory_limit": -1,
        }

        try:
            async with httpx.AsyncClient(timeout=30.0) as client:
                resp = await client.post(
                    f"{self.base_url}/api/v2/execute",
                    json=payload,
                )
                resp.raise_for_status()
                data = resp.json()
        except httpx.HTTPError as exc:
            return {
                "stdout": "",
                "stderr": f"Code execution service error: {exc}",
                "exit_code": 1,
            }

        run = data.get("run", {})
        compile_result = data.get("compile", {})

        # If compilation failed, return compile errors
        if compile_result and compile_result.get("code", 0) != 0:
            return {
                "stdout": compile_result.get("stdout", ""),
                "stderr": compile_result.get("stderr", ""),
                "exit_code": compile_result.get("code", 1),
            }

        return {
            "stdout": run.get("stdout", ""),
            "stderr": run.get("stderr", ""),
            "exit_code": run.get("code", 0),
        }


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------


def _extension(language: str) -> str:
    """Return the file extension for a language key."""
    return {
        "python": "py",
        "javascript": "js",
        "typescript": "ts",
        "java": "java",
        "cpp": "cpp",
        "c": "c",
        "go": "go",
        "rust": "rs",
    }.get(language, "txt")


# ---------------------------------------------------------------------------
# Module-level singleton
# ---------------------------------------------------------------------------

_piston_service: Optional[PistonService] = None


def get_piston() -> PistonService:
    """Return the module-level :class:`PistonService` singleton."""
    global _piston_service
    if _piston_service is None:
        _piston_service = PistonService()
    return _piston_service
