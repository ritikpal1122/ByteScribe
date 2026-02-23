import { Users, LogIn, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { UserAvatar } from '@/components/common/UserAvatar';
import type { PeerRoom } from '@/types/interview';

interface PeerMatchingCardProps {
  room: PeerRoom;
  onJoin?: (roomId: string) => void;
  className?: string;
}

const DIFFICULTY_STYLES = {
  easy: 'bg-emerald-100 text-emerald-700',
  medium: 'bg-amber-100 text-amber-700',
  hard: 'bg-red-100 text-red-700',
} as const;

const STATUS_STYLES = {
  waiting: {
    bg: 'bg-blue-100',
    text: 'text-blue-700',
    label: 'Waiting',
  },
  in_progress: {
    bg: 'bg-amber-100',
    text: 'text-amber-700',
    label: 'In Progress',
  },
  completed: {
    bg: 'bg-gray-100',
    text: 'text-gray-600',
    label: 'Completed',
  },
} as const;

export function PeerMatchingCard({ room, onJoin, className }: PeerMatchingCardProps) {
  const statusStyle = STATUS_STYLES[room.status];
  const isFull = room.participants.length >= room.max_participants;
  const canJoin = room.status === 'waiting' && !isFull;

  return (
    <div
      className={cn(
        'rounded-xl border border-gray-200 bg-white p-5 transition-shadow hover:shadow-md',
        className
      )}
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-lg font-semibold text-gray-900">
            {room.name}
          </h3>
          <p className="mt-0.5 text-sm text-gray-500">
            {room.topic}
          </p>
        </div>
        <span
          className={cn(
            'ml-3 shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium',
            statusStyle.bg,
            statusStyle.text
          )}
        >
          {statusStyle.label}
        </span>
      </div>

      {/* Badges */}
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span
          className={cn(
            'rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize',
            DIFFICULTY_STYLES[room.difficulty]
          )}
        >
          {room.difficulty}
        </span>

        <span className="flex items-center gap-1 text-xs text-gray-500">
          <Users className="h-3.5 w-3.5" />
          {room.participants.length}/{room.max_participants}
        </span>

        {room.status === 'waiting' && (
          <span className="flex items-center gap-1 text-xs text-gray-500">
            <Clock className="h-3.5 w-3.5" />
            Waiting for players
          </span>
        )}
      </div>

      {/* Host and participants */}
      <div className="mt-4">
        <p className="mb-2 text-xs font-medium text-gray-500">
          Host & Participants
        </p>
        <div className="flex items-center gap-2">
          {/* Host avatar (with ring) */}
          <div className="relative" title={`Host: ${room.host.full_name}`}>
            <UserAvatar
              src={room.host.avatar_url}
              name={room.host.full_name}
              size="sm"
            />
            <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white bg-blue-500" />
          </div>

          {/* Other participants */}
          {room.participants
            .filter((p) => p.id !== room.host.id)
            .map((participant) => (
              <div key={participant.id} title={participant.full_name}>
                <UserAvatar
                  src={participant.avatar_url}
                  name={participant.full_name}
                  size="sm"
                />
              </div>
            ))}

          {/* Empty slots */}
          {Array.from({
            length: Math.max(0, room.max_participants - room.participants.length),
          }).map((_, i) => (
            <div
              key={`empty-${i}`}
              className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-dashed border-gray-300"
            >
              <Users className="h-3.5 w-3.5 text-gray-400" />
            </div>
          ))}
        </div>
      </div>

      {/* Join button */}
      <div className="mt-4">
        <button
          type="button"
          onClick={() => onJoin?.(room.id)}
          disabled={!canJoin || !onJoin}
          className={cn(
            'inline-flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors',
            canJoin
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'cursor-not-allowed bg-gray-100 text-gray-400'
          )}
        >
          <LogIn className="h-4 w-4" />
          {isFull ? 'Room Full' : room.status !== 'waiting' ? 'Not Available' : 'Join Room'}
        </button>
      </div>
    </div>
  );
}
