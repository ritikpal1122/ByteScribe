import enum


class UserRole(str, enum.Enum):
    USER = "user"
    MODERATOR = "moderator"
    ADMIN = "admin"


class ContentType(str, enum.Enum):
    ARTICLE = "article"
    QUESTION = "question"
    ANSWER = "answer"
    PROBLEM = "problem"
    NOTE = "note"
    INTERVIEW_EXPERIENCE = "interview_experience"


class VoteType(str, enum.Enum):
    UPVOTE = "upvote"
    DOWNVOTE = "downvote"


class Difficulty(str, enum.Enum):
    EASY = "easy"
    MEDIUM = "medium"
    HARD = "hard"


class Verdict(str, enum.Enum):
    ACCEPTED = "accepted"
    WRONG_ANSWER = "wrong_answer"
    TIME_LIMIT_EXCEEDED = "time_limit_exceeded"
    RUNTIME_ERROR = "runtime_error"
    COMPILATION_ERROR = "compilation_error"
    MEMORY_LIMIT_EXCEEDED = "memory_limit_exceeded"


class Language(str, enum.Enum):
    PYTHON = "python"
    JAVASCRIPT = "javascript"
    TYPESCRIPT = "typescript"
    JAVA = "java"
    CPP = "cpp"
    C = "c"
    GO = "go"
    RUST = "rust"


class NotePermission(str, enum.Enum):
    READ = "read"
    WRITE = "write"


class NoteVisibility(str, enum.Enum):
    PRIVATE = "private"
    PUBLIC = "public"
    SHARED = "shared"


class InterviewStatus(str, enum.Enum):
    ACTIVE = "active"
    COMPLETED = "completed"
    CANCELLED = "cancelled"


class PeerRoomStatus(str, enum.Enum):
    WAITING = "waiting"
    MATCHED = "matched"
    IN_PROGRESS = "in_progress"
    COMPLETED = "completed"


class NotificationType(str, enum.Enum):
    ANSWER = "answer"
    COMMENT = "comment"
    VOTE = "vote"
    BADGE = "badge"
    MENTION = "mention"
    SYSTEM = "system"
