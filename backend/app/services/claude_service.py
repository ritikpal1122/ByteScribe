"""Claude AI service — mock interviews, study plans, solution explanations."""

from __future__ import annotations

import json
import logging
from typing import Optional

from app.config import get_settings

settings = get_settings()
logger = logging.getLogger(__name__)


class ClaudeService:
    """Wraps calls to the Anthropic API for AI-powered features.

    Falls back to stub responses when ``ANTHROPIC_API_KEY`` is not set.
    """

    def __init__(self, api_key: str = settings.ANTHROPIC_API_KEY) -> None:
        self.api_key = api_key
        self.client = None
        if api_key:
            try:
                from anthropic import AsyncAnthropic
                self.client = AsyncAnthropic(api_key=api_key)
            except ImportError:
                logger.warning("anthropic SDK not installed — AI features will use stubs")

    @property
    def _is_live(self) -> bool:
        return self.client is not None

    # ------------------------------------------------------------------
    # Mock interview
    # ------------------------------------------------------------------

    async def mock_interview_message(
        self,
        messages: list[dict],
        topic: str,
    ) -> str:
        """Generate the next interviewer message for a mock interview."""

        if not self._is_live:
            return (
                f"[AI Stub] This is a placeholder interviewer response for topic: {topic}. "
                "Set ANTHROPIC_API_KEY to enable real responses."
            )

        system_prompt = (
            f"You are an expert technical interviewer conducting a mock interview.\n"
            f"Topic: {topic}\n\n"
            "Guidelines:\n"
            "- Ask one clear question at a time\n"
            "- Follow up on the candidate's answers with probing questions\n"
            "- Provide hints if the candidate is stuck (but not full answers)\n"
            "- Evaluate their approach, not just the final answer\n"
            "- Be encouraging but honest about areas for improvement\n"
            "- Keep responses concise (2-4 paragraphs max)"
        )

        try:
            response = await self.client.messages.create(
                model="claude-sonnet-4-20250514",
                max_tokens=1024,
                system=system_prompt,
                messages=messages,
            )
            return response.content[0].text
        except Exception as e:
            logger.error(f"Anthropic API error in mock_interview_message: {e}")
            return f"[AI Error] Could not generate response. Please try again."

    # ------------------------------------------------------------------
    # Study plan generation
    # ------------------------------------------------------------------

    async def generate_study_plan(
        self,
        params: dict,
    ) -> list[dict]:
        """Generate study-plan items using AI."""

        target = params.get("target_role", "Software Engineer")
        company = params.get("target_company", "")
        weeks = params.get("duration_weeks", 4)
        topics = params.get("topics", [])

        if not self._is_live:
            return [
                {
                    "title": f"Week {w} - Study Plan Item",
                    "description": f"[AI Stub] Placeholder study item for {target}",
                    "day_number": (w - 1) * 7 + 1,
                }
                for w in range(1, weeks + 1)
            ]

        system_prompt = (
            "You are an expert career coach and DSA tutor. Generate a structured study plan.\n"
            "Return a JSON array of objects, each with:\n"
            '  - "title": short title for the study item\n'
            '  - "description": 2-3 sentence description of what to study/practice\n'
            '  - "day_number": which day (1-based) this item falls on\n'
            '  - "content_type": one of "topic", "practice", "review", "mock_interview"\n'
            "Return ONLY the JSON array, no other text."
        )

        user_msg = (
            f"Create a {weeks}-week study plan for someone preparing for a "
            f"{target} role"
            + (f" at {company}" if company else "")
            + ".\n"
        )
        if topics:
            user_msg += f"Focus areas: {', '.join(topics)}\n"
        user_msg += (
            f"Total days: {weeks * 7}. Include a mix of learning, "
            "practice problems, review sessions, and mock interviews."
        )

        try:
            response = await self.client.messages.create(
                model="claude-sonnet-4-20250514",
                max_tokens=4096,
                system=system_prompt,
                messages=[{"role": "user", "content": user_msg}],
            )
            text = response.content[0].text.strip()
            # Extract JSON from response
            if text.startswith("["):
                return json.loads(text)
            # Try to find JSON array in the response
            start = text.find("[")
            end = text.rfind("]") + 1
            if start >= 0 and end > start:
                return json.loads(text[start:end])
            logger.warning("Could not parse AI study plan response as JSON")
        except Exception as e:
            logger.error(f"Anthropic API error in generate_study_plan: {e}")

        # Fallback
        return [
            {
                "title": f"Week {w} - Study Plan Item",
                "description": f"Study item for {target}",
                "day_number": (w - 1) * 7 + 1,
            }
            for w in range(1, weeks + 1)
        ]

    # ------------------------------------------------------------------
    # Code review (AI analysis)
    # ------------------------------------------------------------------

    async def review_code(
        self,
        problem: dict,
        code: str,
        language: str,
        verdict: str,
    ) -> dict:
        """Analyze a submission and return structured review JSON."""

        title = problem.get("title", "Unknown Problem")

        if not self._is_live:
            return {
                "time_complexity": "O(n)",
                "space_complexity": "O(1)",
                "overall_rating": 7,
                "summary": f"[AI Stub] Review for '{title}' in {language}. Set ANTHROPIC_API_KEY to enable real reviews.",
                "strengths": [
                    "Code compiles and produces correct output",
                    "Readable variable naming",
                ],
                "improvements": [
                    "Consider edge cases for empty input",
                    "Could optimize with a hash map approach",
                ],
            }

        system_prompt = (
            "You are an expert code reviewer. Analyze the given submission and return "
            "a JSON object with exactly these keys:\n"
            '  - "time_complexity": string (e.g. "O(n log n)")\n'
            '  - "space_complexity": string (e.g. "O(n)")\n'
            '  - "overall_rating": integer 1-10\n'
            '  - "summary": 2-3 sentence summary of the solution\n'
            '  - "strengths": array of 2-3 strings (what the code does well)\n'
            '  - "improvements": array of 2-3 strings (specific actionable improvements)\n'
            "Return ONLY the JSON object, no other text."
        )

        user_msg = (
            f"Problem: {title}\n"
            f"Difficulty: {problem.get('difficulty', 'unknown')}\n"
            f"Description: {problem.get('description', '')}\n"
            f"Verdict: {verdict}\n\n"
            f"Language: {language}\n"
            f"Code:\n```\n{code}\n```"
        )

        try:
            response = await self.client.messages.create(
                model="claude-sonnet-4-20250514",
                max_tokens=1024,
                system=system_prompt,
                messages=[{"role": "user", "content": user_msg}],
            )
            text = response.content[0].text.strip()
            # Extract JSON from response
            if text.startswith("{"):
                return json.loads(text)
            start = text.find("{")
            end = text.rfind("}") + 1
            if start >= 0 and end > start:
                return json.loads(text[start:end])
            logger.warning("Could not parse AI review response as JSON")
        except Exception as e:
            logger.error(f"Anthropic API error in review_code: {e}")

        # Fallback
        return {
            "time_complexity": "Unknown",
            "space_complexity": "Unknown",
            "overall_rating": 5,
            "summary": f"Could not generate review for '{title}'.",
            "strengths": ["Code submitted successfully"],
            "improvements": ["Try again later for AI-powered review"],
        }

    # ------------------------------------------------------------------
    # Roadmap step chat (AI study buddy)
    # ------------------------------------------------------------------

    async def roadmap_step_chat(
        self,
        messages: list[dict],
        step_title: str,
        step_description: str,
        roadmap_title: str,
        step_position: str = "",
        user_progress: str = "",
    ) -> str:
        """Chat with an AI study buddy about a specific roadmap step."""

        if not self._is_live:
            return (
                f"[AI Stub] Study buddy response for step: {step_title} "
                f"in roadmap: {roadmap_title}. "
                "Set ANTHROPIC_API_KEY to enable real responses."
            )

        system_prompt = (
            f"You are an expert study buddy helping a learner work through a learning roadmap.\n"
            f"Roadmap: {roadmap_title}\n"
            f"Current step: {step_title}\n"
            f"Step description: {step_description}\n"
        )
        if step_position:
            system_prompt += f"Position in roadmap: {step_position}\n"
        if user_progress:
            system_prompt += f"User progress: {user_progress}\n"
        system_prompt += (
            "\nGuidelines:\n"
            "- Explain concepts clearly and concisely\n"
            "- Use examples and analogies when helpful\n"
            "- Quiz the learner to test understanding\n"
            "- Suggest practice exercises or resources\n"
            "- Be encouraging and supportive\n"
            "- Keep responses focused on this specific topic\n"
            "- Use markdown formatting for clarity"
        )

        try:
            response = await self.client.messages.create(
                model="claude-sonnet-4-20250514",
                max_tokens=1024,
                system=system_prompt,
                messages=messages,
            )
            return response.content[0].text
        except Exception as e:
            logger.error(f"Anthropic API error in roadmap_step_chat: {e}")
            return "[AI Error] Could not generate response. Please try again."

    # ------------------------------------------------------------------
    # Solution explanation (AI tutor)
    # ------------------------------------------------------------------

    async def explain_solution(
        self,
        problem: dict,
        code: str,
        *,
        language: Optional[str] = None,
    ) -> str:
        """Explain a user's solution to a coding problem."""

        title = problem.get("title", "Unknown Problem")

        if not self._is_live:
            return (
                f"[AI Stub] Explanation for solution to '{title}' "
                f"in {language or 'unknown language'}. "
                "Set ANTHROPIC_API_KEY to enable real AI tutoring."
            )

        system_prompt = (
            "You are an expert programming tutor. Explain the given code solution "
            "step-by-step. Include:\n"
            "1. Overall approach and algorithm used\n"
            "2. Time and space complexity analysis\n"
            "3. Key insights and why this approach works\n"
            "4. Potential improvements or alternative approaches\n"
            "Be clear and educational. Use markdown formatting."
        )

        user_msg = (
            f"Problem: {title}\n"
            f"Difficulty: {problem.get('difficulty', 'unknown')}\n"
            f"Description: {problem.get('description', '')}\n\n"
            f"Language: {language or 'unknown'}\n"
            f"Code:\n```\n{code}\n```"
        )

        try:
            response = await self.client.messages.create(
                model="claude-sonnet-4-20250514",
                max_tokens=2048,
                system=system_prompt,
                messages=[{"role": "user", "content": user_msg}],
            )
            return response.content[0].text
        except Exception as e:
            logger.error(f"Anthropic API error in explain_solution: {e}")
            return f"[AI Error] Could not generate explanation. Please try again."


# ---------------------------------------------------------------------------
# Module-level singleton
# ---------------------------------------------------------------------------

_claude_service: Optional[ClaudeService] = None


def get_claude() -> ClaudeService:
    """Return the module-level :class:`ClaudeService` singleton."""
    global _claude_service
    if _claude_service is None:
        _claude_service = ClaudeService()
    return _claude_service
