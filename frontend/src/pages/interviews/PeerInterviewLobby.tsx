import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users2,
  Plus,
  Search,
  Clock,
  ArrowRight,
  Wifi,
  Globe,
  Loader2,
} from 'lucide-react';
import { usePeerRooms, useJoinPeerRoom } from '@/hooks/useInterviews';
import { useDebounce } from '@/hooks/useDebounce';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { EmptyState } from '@/components/common/EmptyState';
import type { PeerRoom } from '@/types';

/* ------------------------------------------------------------------ */
/*  Difficulty badge                                                   */
/* ------------------------------------------------------------------ */

const diffColor: Record<string, string> = {
  easy: 'text-emerald-400 bg-emerald-400/10',
  medium: 'text-amber-400 bg-amber-400/10',
  hard: 'text-red-400 bg-red-400/10',
};

/* ------------------------------------------------------------------ */
/*  PeerMatchingCard                                                   */
/* ------------------------------------------------------------------ */

function PeerMatchingCard({
  room,
  onJoin,
  isJoining,
}: {
  room: PeerRoom;
  onJoin: (roomId: string) => void;
  isJoining: boolean;
}) {
  const isFull = room.participants.length >= room.max_participants;

  return (
    <div className={`bg-white border rounded-xl p-5 transition-all ${
      isFull ? 'border-gray-200 opacity-60' : 'border-gray-200 hover:border-gray-300'
    }`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${room.status === 'waiting' ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
          <span className="text-xs text-gray-500">{room.status === 'waiting' ? 'Waiting for partner' : 'In progress'}</span>
        </div>
        <span className="text-xs text-gray-600">
          {new Date(room.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>

      <h3 className="font-semibold text-gray-900 mb-2">{room.topic}</h3>

      <div className="flex items-center gap-2 mb-4 flex-wrap">
        <span className={`px-2 py-0.5 rounded-full text-xs font-semibold capitalize ${diffColor[room.difficulty]}`}>
          {room.difficulty}
        </span>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <Users2 className="w-3.5 h-3.5" />
            {room.participants.length}/{room.max_participants}
          </span>
          <span>Host: {room.host.username}</span>
        </div>

        {!isFull && (
          <button
            onClick={() => onJoin(room.id)}
            disabled={isJoining}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-medium hover:bg-blue-500 disabled:opacity-50 transition-colors"
          >
            {isJoining ? <Loader2 className="w-3 h-3 animate-spin" /> : 'Join'}
            <ArrowRight className="w-3 h-3" />
          </button>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  PeerInterviewLobby page                                            */
/* ------------------------------------------------------------------ */

export default function PeerInterviewLobby() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 300);

  const { data, isLoading, isError, refetch } = usePeerRooms();
  const joinRoom = useJoinPeerRoom();

  const handleJoin = (roomId: string) => {
    joinRoom.mutate(roomId, {
      onSuccess: () => navigate(`/interviews/peer/${roomId}`),
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <LoadingSpinner size="lg" text="Loading rooms..." />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-20 text-gray-500">
        Failed to load rooms.{' '}
        <button onClick={() => refetch()} className="text-blue-600 hover:underline">
          Retry
        </button>
      </div>
    );
  }

  const rooms = data?.items ?? [];
  const filtered = debouncedSearch
    ? rooms.filter((r) =>
        r.topic.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        r.host.username.toLowerCase().includes(debouncedSearch.toLowerCase()),
      )
    : rooms;

  const waitingCount = rooms.filter((r) => r.status === 'waiting').length;

  return (
    <div className="min-h-screen text-gray-900">
      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <Users2 className="w-7 h-7 text-blue-400" />
            <h1 className="text-3xl font-bold tracking-tight">Peer Interview Lobby</h1>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-500 transition-colors">
            <Plus className="w-4 h-4" />
            Create Room
          </button>
        </div>

        <p className="text-gray-500 mb-6">
          Practice interviews with peers in real-time.{' '}
          <span className="text-emerald-400 font-medium">{waitingCount} rooms</span> waiting for a partner.
        </p>

        {/* Online indicator */}
        <div className="flex items-center gap-2 mb-6 text-xs text-gray-500">
          <Wifi className="w-3.5 h-3.5 text-emerald-400" />
          <span>{rooms.length} active rooms</span>
        </div>

        {/* Search */}
        <div className="relative mb-8 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search rooms by topic or host..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2.5 rounded-lg bg-white border border-gray-200 text-sm text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          />
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <EmptyState
            icon={Users2}
            title="No rooms found"
            description="No rooms match your search. Try creating a new one!"
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((room) => (
              <PeerMatchingCard
                key={room.id}
                room={room}
                onJoin={handleJoin}
                isJoining={joinRoom.isPending}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
