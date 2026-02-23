import { useState } from 'react';
import {
  Settings as SettingsIcon,
  User,
  Lock,
  Github,
  Mail,
  Globe,
  Bell,
  Palette,
  Save,
  Eye,
  EyeOff,
  ExternalLink,
  CheckCircle2,
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Settings page                                                      */
/* ------------------------------------------------------------------ */

export default function Settings() {
  const [tab, setTab] = useState<'profile' | 'password' | 'connections' | 'notifications'>('profile');

  /* Profile state */
  const [name, setName] = useState('John Doe');
  const [username, setUsername] = useState('johndoe');
  const [email, setEmail] = useState('john@example.com');
  const [bio, setBio] = useState('Full-stack developer learning DSA.');
  const [website, setWebsite] = useState('');

  /* Password state */
  const [currentPw, setCurrentPw] = useState('');
  const [newPw, setNewPw] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const [showPw, setShowPw] = useState(false);

  /* Connection state */
  const [githubConnected, setGithubConnected] = useState(false);

  const tabs = [
    { id: 'profile' as const, label: 'Profile', icon: User },
    { id: 'password' as const, label: 'Password', icon: Lock },
    { id: 'connections' as const, label: 'Connections', icon: Github },
    { id: 'notifications' as const, label: 'Notifications', icon: Bell },
  ];

  return (
    <div className="min-h-screen text-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-10">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <SettingsIcon className="w-7 h-7 text-blue-400" />
          <h1 className="text-3xl font-bold tracking-tight">Account Settings</h1>
        </div>

        <div className="flex gap-8">
          {/* Sidebar tabs */}
          <nav className="w-48 shrink-0 space-y-1">
            {tabs.map((t) => {
              const Icon = t.icon;
              return (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    tab === t.id
                      ? 'bg-gray-100 text-gray-900'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {t.label}
                </button>
              );
            })}
          </nav>

          {/* Content */}
          <div className="flex-1">
            {/* ---- Profile ---- */}
            {tab === 'profile' && (
              <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-5">
                <h2 className="text-lg font-semibold mb-1">Edit Profile</h2>
                <p className="text-sm text-gray-500 mb-4">Update your personal information.</p>

                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center text-2xl font-bold text-blue-400">
                    {name.charAt(0)}
                  </div>
                  <button className="px-3 py-1.5 rounded-lg bg-gray-100 text-sm text-gray-700 hover:bg-gray-200 transition-colors">
                    Change Avatar
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1.5">Full Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-gray-50 border border-gray-300 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1.5">Username</label>
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-gray-50 border border-gray-300 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    />
                  </div>
                </div>

                <div>
                  <label className="flex items-center gap-1.5 text-sm font-medium text-gray-400 mb-1.5">
                    <Mail className="w-3.5 h-3.5" /> Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-gray-50 border border-gray-300 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1.5">Bio</label>
                  <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 rounded-lg bg-gray-50 border border-gray-300 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-none"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-1.5 text-sm font-medium text-gray-400 mb-1.5">
                    <Globe className="w-3.5 h-3.5" /> Website
                  </label>
                  <input
                    type="url"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    placeholder="https://yoursite.com"
                    className="w-full px-3 py-2 rounded-lg bg-gray-50 border border-gray-300 text-sm text-gray-800 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  />
                </div>

                <div className="pt-4 flex justify-end">
                  <button className="flex items-center gap-2 px-5 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-500 transition-colors">
                    <Save className="w-4 h-4" />
                    Save Changes
                  </button>
                </div>
              </div>
            )}

            {/* ---- Password ---- */}
            {tab === 'password' && (
              <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-5">
                <h2 className="text-lg font-semibold mb-1">Change Password</h2>
                <p className="text-sm text-gray-500 mb-4">Update your password to keep your account secure.</p>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1.5">Current Password</label>
                  <div className="relative">
                    <input
                      type={showPw ? 'text' : 'password'}
                      value={currentPw}
                      onChange={(e) => setCurrentPw(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-gray-50 border border-gray-300 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/50 pr-10"
                    />
                    <button
                      onClick={() => setShowPw(!showPw)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1.5">New Password</label>
                  <input
                    type="password"
                    value={newPw}
                    onChange={(e) => setNewPw(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-gray-50 border border-gray-300 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1.5">Confirm New Password</label>
                  <input
                    type="password"
                    value={confirmPw}
                    onChange={(e) => setConfirmPw(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-gray-50 border border-gray-300 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  />
                </div>

                <div className="pt-4 flex justify-end">
                  <button className="flex items-center gap-2 px-5 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-500 transition-colors">
                    <Lock className="w-4 h-4" />
                    Update Password
                  </button>
                </div>
              </div>
            )}

            {/* ---- Connections ---- */}
            {tab === 'connections' && (
              <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-5">
                <h2 className="text-lg font-semibold mb-1">Connected Accounts</h2>
                <p className="text-sm text-gray-500 mb-4">Link your accounts for quick sign-in and profile enrichment.</p>

                <div className="space-y-3">
                  {/* GitHub */}
                  <div className="flex items-center justify-between p-4 rounded-lg border border-gray-200 bg-gray-50/30">
                    <div className="flex items-center gap-3">
                      <Github className="w-6 h-6 text-gray-700" />
                      <div>
                        <p className="text-sm font-medium text-gray-800">GitHub</p>
                        <p className="text-xs text-gray-500">
                          {githubConnected ? 'Connected as @johndoe' : 'Not connected'}
                        </p>
                      </div>
                    </div>
                    {githubConnected ? (
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <button
                          onClick={() => setGithubConnected(false)}
                          className="text-xs text-red-400 hover:text-red-300 transition-colors"
                        >
                          Disconnect
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setGithubConnected(true)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-200 text-sm text-gray-800 hover:bg-gray-300 transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        Connect
                      </button>
                    )}
                  </div>

                  {/* Google */}
                  <div className="flex items-center justify-between p-4 rounded-lg border border-gray-200 bg-gray-50/30">
                    <div className="flex items-center gap-3">
                      <Mail className="w-6 h-6 text-gray-700" />
                      <div>
                        <p className="text-sm font-medium text-gray-800">Google</p>
                        <p className="text-xs text-gray-500">Not connected</p>
                      </div>
                    </div>
                    <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-200 text-sm text-gray-800 hover:bg-gray-300 transition-colors">
                      <ExternalLink className="w-3.5 h-3.5" />
                      Connect
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ---- Notifications ---- */}
            {tab === 'notifications' && (
              <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-5">
                <h2 className="text-lg font-semibold mb-1">Notification Preferences</h2>
                <p className="text-sm text-gray-500 mb-4">Choose what you want to be notified about.</p>

                {[
                  { label: 'New replies to my questions', description: 'Get notified when someone answers your question', default: true },
                  { label: 'Problem of the day', description: 'Daily coding challenge reminder', default: true },
                  { label: 'Study plan reminders', description: 'Reminders to follow your study schedule', default: false },
                  { label: 'Weekly progress report', description: 'Summary of your weekly activity', default: true },
                  { label: 'New followers', description: 'When someone follows your profile', default: false },
                ].map((pref) => (
                  <div key={pref.label} className="flex items-center justify-between py-3 border-b border-gray-200 last:border-0">
                    <div>
                      <p className="text-sm font-medium text-gray-800">{pref.label}</p>
                      <p className="text-xs text-gray-500">{pref.description}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked={pref.default} className="sr-only peer" />
                      <div className="w-9 h-5 bg-gray-200 peer-focus:ring-2 peer-focus:ring-blue-500/50 rounded-full peer peer-checked:bg-blue-600 transition-colors after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-full" />
                    </label>
                  </div>
                ))}

                <div className="pt-4 flex justify-end">
                  <button className="flex items-center gap-2 px-5 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-500 transition-colors">
                    <Save className="w-4 h-4" />
                    Save Preferences
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
