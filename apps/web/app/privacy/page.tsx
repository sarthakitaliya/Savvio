import Head from "next/head";

export default function PrivacyPage() {
  return (
    <>
      <Head>
        <title>Privacy Policy | Savvio</title>
        <meta
          name="description"
          content="Privacy Policy for Savvio Chrome Extension and Website"
        />
      </Head>
      <main className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center text-indigo-700 mb-8">Privacy Policy</h1>
        <p className="text-center text-gray-500 mb-12">Effective date: 14/07/2025</p>

        <div className="space-y-8 text-gray-700 dark:text-gray-300">
          <div>
            <h2 className="text-2xl font-semibold text-blue-600 mb-2">Information We Collect</h2>
            <ul className="list-disc list-inside space-y-1">
              <li>URLs and page titles you choose to save via the extension</li>
              <li>User preferences and settings</li>
              <li>Diagnostic and usage data to improve the Service</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-blue-600 mb-2">How We Use Your Information</h2>
            <ul className="list-disc list-inside space-y-1">
              <li>To provide and improve our Service</li>
              <li>To save your bookmarks and notes</li>
              <li>To communicate with you about updates or support</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-blue-600 mb-2">Data Storage and Security</h2>
            <p>Your data is stored securely. We do not sell or share your personal information with third parties except as required by law.</p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-blue-600 mb-2">Third-Party Services</h2>
            <p>Our Service may contain links to other websites. We are not responsible for their privacy practices.</p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-blue-600 mb-2">Changes to This Policy</h2>
            <p>We may update our Privacy Policy from time to time. Changes will be posted on this page.</p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-blue-600 mb-2">Contact Us</h2>
            <p>If you have any questions, contact us at <a href="mailto:support@savvio.com" className="text-indigo-600 hover:underline">support@savvio.com</a>.</p>
          </div>
        </div>
      </main>
    </>
  );
}