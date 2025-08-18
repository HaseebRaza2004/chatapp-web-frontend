import AppShell from "@/components/ui/layouts/AppShell";

export default function Landing() {
    return (
        <AppShell>
            {/* Directly set head elements */}
            <title>ChatApp - Real-time Messaging</title>
            <meta name="description" content="Fast, secure and modern chat app built with React 19 and Vite." />
            <meta property="og:title" content="ChatApp - Real-time Messaging" />
            <meta property="og:description" content="Fast, secure and modern chat app built with React 19 and Vite." />
            <meta property="og:image" content="/assets/chatapp-preview.png" />

            <section className="flex flex-col items-center justify-center text-center py-20 px-6 md:px-12 bg-slate-100">
                <h2 className="text-3xl md:text-5xl font-bold mb-4">Welcome to ChatApp</h2>
                <p className="text-lg md:text-xl text-slate-600 max-w-2xl mb-6">
                    Experience real-time conversations with friends and groups. Secure, fast, and built for modern web.
                </p>
                <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                    Get Started
                </button>
            </section>
        </AppShell>
    )
};