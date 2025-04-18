import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: "linear-gradient(to bottom, #4facfe, #00f2fe)" }}>
      {/* Header Bar */}
      <header className="bg-white shadow-md py-4 px-8">
        <h1 className="text-2xl font-bold text-gray-800">Welcome</h1>
      </header>

      {/* Main Page Area */}
      <main className="flex-grow flex items-center justify-center">
        <Link
          href="/discovery"
          className="text-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg shadow-md transition"
        >
          Go to Agent Discovery
        </Link>
      </main>
    </div>
  );
}
