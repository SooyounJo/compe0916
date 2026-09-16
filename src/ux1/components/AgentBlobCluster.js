import Image from "next/image";

/** 3번: 기존 중앙 닷 뒤에 감싸는 쉘·할로 (닷은 AgentDotsContinuity) */
export function AgentBlobShell({ active = true }) {
  return (
    <div className="relative flex h-[clamp(72px,18vw,96px)] w-[clamp(72px,18vw,96px)] items-center justify-center">
      <div
        className={`pointer-events-none absolute inset-0 flex items-center justify-center ${
          active ? "agent-blob-squeeze" : ""
        }`}
      >
        <Image
          src="/figma/agent-blob-shell.svg"
          alt=""
          width={260}
          height={260}
          className="h-full w-full drop-shadow-[0_0_40px_rgba(255,255,255,0.28)]"
        />
      </div>
      <div
        className={`pointer-events-none absolute inset-[-4%] rounded-full bg-[radial-gradient(circle,rgba(255,145,145,0.38),transparent_62%)] transition-opacity duration-[900ms] ease-out ${
          active ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}

export default function AgentBlobShellDefault(props) {
  return <AgentBlobShell {...props} />;
}
