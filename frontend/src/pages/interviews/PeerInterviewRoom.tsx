import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Users2,
  Mic,
  MicOff,
  Video,
  VideoOff,
  MessageSquare,
  Clock,
  Square,
  Send,
  User,
} from 'lucide-react';
import { useJoinPeerRoom } from '@/hooks/useInterviews';

// TODO: Integrate WebSocket for real-time code sync and chat

/* ------------------------------------------------------------------ */
/*  PeerInterviewRoom page                                             */
/* ------------------------------------------------------------------ */

export default function PeerInterviewRoom() {
  const { code: roomCode } = useParams<{ code: string }>();
  const joinPeerRoom = useJoinPeerRoom();

  // Join room on mount
  useEffect(() => {
    if (roomCode) {
      joinPeerRoom.mutate(roomCode);
    }
  }, [roomCode]); // eslint-disable-line react-hooks/exhaustive-deps

  const [code, setCode] = useState(`function twoSum(nums, target) {
    const map = new Map();
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (map.has(complement)) {
            return [map.get(complement), i];
        }
        map.set(nums[i], i);
    }
    return [];
}`);

  const [chatMessages, setChatMessages] = useState<{ id: string; user: string; text: string }[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [micOn, setMicOn] = useState(true);
  const [videoOn, setVideoOn] = useState(true);
  const [showChat, setShowChat] = useState(true);
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setElapsed((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, []);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, '0')}`;
  };

  const handleSendChat = () => {
    if (!chatInput.trim()) return;
    setChatMessages([...chatMessages, { id: String(chatMessages.length + 1), user: 'You', text: chatInput.trim() }]);
    setChatInput('');
  };

  return (
    <div className="h-screen bg-gray-50 text-gray-900 flex flex-col overflow-hidden">
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-gray-200 bg-white shrink-0">
        <div className="flex items-center gap-3">
          <Users2 className="w-5 h-5 text-blue-400" />
          <span className="font-semibold text-sm">Peer Interview Room</span>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-sm text-gray-400">
            <Clock className="w-4 h-4" />
            <span className="font-mono">{formatTime(elapsed)}</span>
          </div>
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-600/20 border border-red-500/30 text-red-400 text-xs font-medium hover:bg-red-600/30 transition-colors">
            <Square className="w-3.5 h-3.5" />
            Leave Room
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Code editor area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="px-4 py-2 border-b border-gray-200 bg-gray-50 text-xs text-gray-500">
            Collaborative Code Editor - JavaScript
          </div>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            spellCheck={false}
            className="flex-1 w-full resize-none bg-white text-gray-800 font-mono text-sm p-4 focus:outline-none leading-relaxed"
          />
        </div>

        {/* Right panel: video + chat */}
        <div className="w-80 flex flex-col border-l border-gray-200 shrink-0">
          {/* Video area */}
          <div className="h-48 bg-white border-b border-gray-200 p-3 space-y-2 shrink-0">
            <div className="h-[calc(50%-4px)] bg-gray-100 rounded-lg flex items-center justify-center relative">
              <User className="w-8 h-8 text-gray-600" />
              <span className="absolute bottom-1.5 left-2 text-[10px] text-gray-500 bg-white/80 px-1.5 py-0.5 rounded">Peer</span>
            </div>
            <div className="h-[calc(50%-4px)] bg-gray-50 rounded-lg flex items-center justify-center relative">
              <User className="w-6 h-6 text-gray-400" />
              <span className="absolute bottom-1.5 left-2 text-[10px] text-gray-500 bg-white/80 px-1.5 py-0.5 rounded">You</span>
            </div>
          </div>

          {/* Media controls */}
          <div className="flex items-center justify-center gap-2 py-2 border-b border-gray-200 bg-gray-50">
            <button
              onClick={() => setMicOn(!micOn)}
              className={`p-2 rounded-lg transition-colors ${micOn ? 'bg-gray-100 text-gray-700' : 'bg-red-600/20 text-red-400'}`}
            >
              {micOn ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setVideoOn(!videoOn)}
              className={`p-2 rounded-lg transition-colors ${videoOn ? 'bg-gray-100 text-gray-700' : 'bg-red-600/20 text-red-400'}`}
            >
              {videoOn ? <Video className="w-4 h-4" /> : <VideoOff className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setShowChat(!showChat)}
              className={`p-2 rounded-lg transition-colors ${showChat ? 'bg-blue-600/20 text-blue-400' : 'bg-gray-100 text-gray-700'}`}
            >
              <MessageSquare className="w-4 h-4" />
            </button>
          </div>

          {/* Chat area */}
          {showChat && (
            <div className="flex-1 flex flex-col overflow-hidden">
              <div className="flex-1 overflow-y-auto p-3 space-y-2">
                {chatMessages.map((msg) => (
                  <div key={msg.id}>
                    <span className={`text-xs font-medium ${msg.user === 'You' ? 'text-blue-400' : 'text-emerald-400'}`}>
                      {msg.user}
                    </span>
                    <p className="text-xs text-gray-400 leading-relaxed">{msg.text}</p>
                  </div>
                ))}
              </div>
              <div className="p-2 border-t border-gray-200">
                <div className="flex gap-1.5">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') handleSendChat(); }}
                    placeholder="Type a message..."
                    className="flex-1 px-3 py-1.5 rounded-lg bg-gray-100 border border-gray-300 text-xs text-gray-800 placeholder-gray-400 focus:outline-none"
                  />
                  <button
                    onClick={handleSendChat}
                    className="p-1.5 rounded-lg bg-blue-600 text-white hover:bg-blue-500 transition-colors"
                  >
                    <Send className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
