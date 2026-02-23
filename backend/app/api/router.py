from fastapi import APIRouter

from app.api.v1 import (
    articles,
    auth,
    bookmarks,
    code_reviews,
    comments,
    companies,
    contests,
    dsa_sheets,
    gamification,
    interviews,
    language_docs,
    notes,
    notifications,
    problems,
    questions,
    roadmaps,
    roadmap_steps,
    search,
    spaced_repetition,
    study_plans,
    tags,
    users,
)

api_router = APIRouter()

api_router.include_router(auth.router, prefix="/auth", tags=["Auth"])
api_router.include_router(users.router, prefix="/users", tags=["Users"])
api_router.include_router(articles.router, prefix="/articles", tags=["Articles"])
api_router.include_router(questions.router, prefix="/questions", tags=["Questions"])
api_router.include_router(notes.router, prefix="/notes", tags=["Notes"])
api_router.include_router(roadmaps.router, prefix="/roadmaps", tags=["Roadmaps"])
api_router.include_router(roadmap_steps.router, prefix="/roadmaps", tags=["Roadmap Steps"])
api_router.include_router(problems.router, prefix="/problems", tags=["Problems"])
api_router.include_router(companies.router, prefix="/companies", tags=["Companies"])
api_router.include_router(interviews.router, prefix="/interviews", tags=["Interviews"])
api_router.include_router(study_plans.router, prefix="/study-plans", tags=["Study Plans"])
api_router.include_router(gamification.router, prefix="/gamification", tags=["Gamification"])
api_router.include_router(tags.router, prefix="/tags", tags=["Tags"])
api_router.include_router(comments.router, prefix="/comments", tags=["Comments"])
api_router.include_router(bookmarks.router, prefix="/bookmarks", tags=["Bookmarks"])
api_router.include_router(dsa_sheets.router, prefix="/dsa-sheets", tags=["DSA Sheets"])
api_router.include_router(search.router, prefix="/search", tags=["Search"])
api_router.include_router(notifications.router, prefix="/notifications", tags=["Notifications"])
api_router.include_router(contests.router, prefix="/contests", tags=["Contests"])
api_router.include_router(spaced_repetition.router, prefix="/spaced-repetition", tags=["Spaced Repetition"])
api_router.include_router(code_reviews.router, prefix="/code-reviews", tags=["Code Reviews"])
api_router.include_router(language_docs.router, prefix="/language-docs", tags=["Language Docs"])
