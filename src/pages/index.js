import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-black px-4">
      <h1 className="font-haas text-lg font-light tracking-tight text-white/90">
        UX 프로토타입
      </h1>
      <nav className="flex flex-col gap-3 sm:flex-row">
        <Link
          href="/ux1"
          className="rounded-full bg-white px-8 py-3 text-center text-sm font-medium text-[#383645] shadow-md hover:bg-white/95"
        >
          UX1
        </Link>
        <Link
          href="/ux2"
          className="rounded-full border border-white/25 bg-white/10 px-8 py-3 text-center text-sm font-medium text-white hover:bg-white/15"
        >
          UX2
        </Link>
      </nav>
    </div>
  );
}
