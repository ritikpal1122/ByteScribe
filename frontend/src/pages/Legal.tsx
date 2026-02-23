import { useState } from 'react';
import { FileText, Shield } from 'lucide-react';

type Tab = 'terms' | 'privacy';

export default function Legal() {
  const [tab, setTab] = useState<Tab>('terms');

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-600 text-sm font-medium mb-6">
          <FileText className="w-4 h-4" />
          Legal
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-2">
          Terms & Privacy
        </h1>
        <p className="text-sm text-gray-500">Last updated: January 1, 2025</p>
      </div>

      {/* Tab switcher */}
      <div className="flex border-b border-gray-200 mb-8">
        <button
          onClick={() => setTab('terms')}
          className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
            tab === 'terms'
              ? 'text-blue-600 border-blue-600'
              : 'text-gray-500 border-transparent hover:text-gray-700'
          }`}
        >
          <FileText className="w-4 h-4" />
          Terms of Service
        </button>
        <button
          onClick={() => setTab('privacy')}
          className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
            tab === 'privacy'
              ? 'text-blue-600 border-blue-600'
              : 'text-gray-500 border-transparent hover:text-gray-700'
          }`}
        >
          <Shield className="w-4 h-4" />
          Privacy Policy
        </button>
      </div>

      {/* Content */}
      {tab === 'terms' ? <TermsContent /> : <PrivacyContent />}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Terms of Service                                                   */
/* ------------------------------------------------------------------ */

function TermsContent() {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Acceptance of Terms</h2>
        <p className="text-sm text-gray-600 leading-relaxed">
          By accessing or using LearnText ("the Platform"), you agree to be bound by these Terms of
          Service. If you do not agree to these terms, please do not use the Platform. We reserve
          the right to update these terms at any time, and continued use constitutes acceptance of
          any modifications.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Account Registration</h2>
        <p className="text-sm text-gray-600 leading-relaxed">
          To access certain features, you must create an account. You are responsible for
          maintaining the confidentiality of your account credentials and for all activities that
          occur under your account. You must provide accurate and complete information during
          registration and keep your profile up to date.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Acceptable Use</h2>
        <p className="text-sm text-gray-600 leading-relaxed mb-3">
          You agree not to use the Platform to:
        </p>
        <ul className="list-disc list-inside text-sm text-gray-600 space-y-1.5 ml-2">
          <li>Violate any applicable laws or regulations</li>
          <li>Share copyrighted content without authorization</li>
          <li>Attempt to gain unauthorized access to other accounts or systems</li>
          <li>Harass, abuse, or harm other users</li>
          <li>Distribute malware, spam, or other harmful content</li>
          <li>Use automated tools to scrape or overload the Platform</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Intellectual Property</h2>
        <p className="text-sm text-gray-600 leading-relaxed">
          All content provided on the Platform — including roadmaps, problems, documentation,
          articles, and UI components — is owned by LearnText or its content contributors. You may
          use Platform content for personal learning purposes but may not redistribute, sell, or
          commercially exploit it without explicit permission.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-3">5. User-Generated Content</h2>
        <p className="text-sm text-gray-600 leading-relaxed">
          When you submit content (notes, articles, comments, code), you retain ownership but grant
          LearnText a non-exclusive, worldwide license to display and distribute that content on the
          Platform. You are responsible for ensuring your submitted content does not infringe on
          third-party rights.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Code Execution</h2>
        <p className="text-sm text-gray-600 leading-relaxed">
          The Platform provides sandboxed code execution for learning purposes. You agree not to
          use this feature to execute malicious code, perform denial-of-service attacks, or attempt
          to break out of the sandbox environment. Abuse of the code execution service may result in
          account suspension.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Limitation of Liability</h2>
        <p className="text-sm text-gray-600 leading-relaxed">
          The Platform is provided "as is" without warranties of any kind. LearnText is not liable
          for any indirect, incidental, or consequential damages arising from your use of the
          Platform. We do not guarantee uninterrupted access or the accuracy of all content.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-3">8. Termination</h2>
        <p className="text-sm text-gray-600 leading-relaxed">
          We may suspend or terminate your account at any time for violation of these terms. You may
          delete your account at any time through your account settings. Upon termination, your
          right to access the Platform ceases immediately.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-3">9. Contact</h2>
        <p className="text-sm text-gray-600 leading-relaxed">
          If you have questions about these terms, contact us at{' '}
          <a href="mailto:legal@learntext.dev" className="text-blue-600 hover:underline">
            legal@learntext.dev
          </a>.
        </p>
      </section>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Privacy Policy                                                     */
/* ------------------------------------------------------------------ */

function PrivacyContent() {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Information We Collect</h2>
        <p className="text-sm text-gray-600 leading-relaxed mb-3">
          We collect information you provide directly to us, including:
        </p>
        <ul className="list-disc list-inside text-sm text-gray-600 space-y-1.5 ml-2">
          <li><strong>Account data:</strong> Name, email address, username, and password hash</li>
          <li><strong>Profile data:</strong> Bio, avatar, social links, and preferences</li>
          <li><strong>Learning data:</strong> Progress on roadmaps, problem submissions, notes, and study analytics</li>
          <li><strong>Usage data:</strong> Pages visited, features used, time spent, and interaction patterns</li>
          <li><strong>Device data:</strong> Browser type, operating system, and IP address</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-3">2. How We Use Your Information</h2>
        <p className="text-sm text-gray-600 leading-relaxed mb-3">
          We use the information we collect to:
        </p>
        <ul className="list-disc list-inside text-sm text-gray-600 space-y-1.5 ml-2">
          <li>Provide, maintain, and improve the Platform</li>
          <li>Track your learning progress and provide personalized recommendations</li>
          <li>Power spaced repetition and study plan features</li>
          <li>Send you updates, notifications, and educational content</li>
          <li>Analyze usage patterns to improve user experience</li>
          <li>Prevent fraud and ensure platform security</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Code Execution & Sandboxing</h2>
        <p className="text-sm text-gray-600 leading-relaxed">
          Code you submit for execution runs in isolated, containerized environments (Docker/Piston).
          Submitted code is not permanently stored and is deleted after execution completes. We do
          not analyze the content of your code submissions beyond what is necessary for execution.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-3">4. AI Features</h2>
        <p className="text-sm text-gray-600 leading-relaxed">
          When you use AI-powered features (mock interviews, study chat, code explanations), your
          prompts and responses are processed by third-party AI providers. We do not use your
          personal learning data to train AI models. Conversations with AI features may be stored
          temporarily to provide context within your session.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Data Sharing</h2>
        <p className="text-sm text-gray-600 leading-relaxed mb-3">
          We do not sell your personal information. We may share data with:
        </p>
        <ul className="list-disc list-inside text-sm text-gray-600 space-y-1.5 ml-2">
          <li><strong>Service providers:</strong> Hosting, analytics, and email delivery services</li>
          <li><strong>AI providers:</strong> For AI-powered features (prompts only, no personal data)</li>
          <li><strong>Legal requirements:</strong> When required by law or to protect our rights</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Data Security</h2>
        <p className="text-sm text-gray-600 leading-relaxed">
          We implement industry-standard security measures including encrypted connections (HTTPS),
          hashed passwords (bcrypt), JWT-based authentication with refresh token rotation, and
          regular security audits. However, no system is 100% secure, and we cannot guarantee
          absolute security.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Your Rights</h2>
        <p className="text-sm text-gray-600 leading-relaxed mb-3">
          You have the right to:
        </p>
        <ul className="list-disc list-inside text-sm text-gray-600 space-y-1.5 ml-2">
          <li>Access and download your personal data</li>
          <li>Correct inaccurate information in your profile</li>
          <li>Delete your account and associated data</li>
          <li>Opt out of non-essential communications</li>
          <li>Request information about how your data is processed</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-3">8. Cookies</h2>
        <p className="text-sm text-gray-600 leading-relaxed">
          We use essential cookies for authentication and session management. We may also use
          analytics cookies to understand how users interact with the Platform. You can control
          cookie preferences through your browser settings.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-3">9. Children's Privacy</h2>
        <p className="text-sm text-gray-600 leading-relaxed">
          The Platform is not intended for children under 13. We do not knowingly collect personal
          information from children. If you believe a child has provided us with personal data,
          please contact us so we can take appropriate action.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-3">10. Contact</h2>
        <p className="text-sm text-gray-600 leading-relaxed">
          For privacy-related questions or data requests, contact us at{' '}
          <a href="mailto:privacy@learntext.dev" className="text-blue-600 hover:underline">
            privacy@learntext.dev
          </a>.
        </p>
      </section>
    </div>
  );
}
