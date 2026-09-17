const BAR_DELAYS = ["0s", "0.12s", "0.05s", "0.18s", "0.08s"];

export default function VoiceRecorder({ active, compact = false, fill = false }) {
  const sizeClass = fill
    ? "h-full w-full"
    : compact
      ? "h-[7.37cqw] w-[7.37cqw]"
      : "h-[clamp(72px,18vw,96px)] w-[clamp(72px,18vw,96px)]";

  return (
    <div
      className={`flex items-center justify-center ${sizeClass}`}
      aria-label={active ? "음성 인식 중" : undefined}
    >
      <svg
        viewBox="0 0 138 138"
        className="h-full w-full text-white"
        fill="currentColor"
      >
        <path
          className={`voice-bar origin-center ${active ? "voice-bar-active" : ""}`}
          style={{ animationDelay: BAR_DELAYS[0] }}
          d="M127.132 64.1855V73.8133C127.132 76.9166 124.619 79.4294 121.516 79.4294C118.414 79.4294 115.899 76.9166 115.899 73.8133V64.1855C115.899 61.0834 118.414 58.5689 121.516 58.5689C124.619 58.5689 127.13 61.0834 127.132 64.1855Z"
        />
        <path
          className={`voice-bar origin-center ${active ? "voice-bar-active" : ""}`}
          style={{ animationDelay: BAR_DELAYS[1] }}
          d="M37.4917 30.4876C40.5933 30.4876 43.1078 33.0021 43.1078 36.1025V101.895C43.1078 104.998 40.595 107.514 37.4917 107.514C34.3902 107.514 31.8757 105 31.8757 101.896V36.1025C31.8757 33.0021 34.3902 30.4876 37.4917 30.4876Z"
        />
        <path
          className={`voice-bar origin-center ${active ? "voice-bar-active" : ""}`}
          style={{ animationDelay: BAR_DELAYS[2] }}
          d="M79.5035 13.6396C82.6051 13.6396 85.1195 16.1541 85.1195 19.2556V118.743C85.1195 121.844 82.6068 124.36 79.5035 124.36C76.4014 124.36 73.8869 121.846 73.8869 118.744V19.2556C73.8869 16.1541 76.4031 13.6396 79.5035 13.6396Z"
        />
        <path
          className={`voice-bar origin-center ${active ? "voice-bar-active" : ""}`}
          style={{ animationDelay: BAR_DELAYS[3] }}
          d="M16.4841 58.5707C19.5862 58.5707 22.099 61.0834 22.1007 64.1855V73.8133C22.1007 76.9149 19.5862 79.4294 16.4841 79.4294C13.3826 79.4294 10.8681 76.9149 10.8681 73.8133V64.1855C10.8698 61.0834 13.3826 58.5707 16.4841 58.5707Z"
        />
        <path
          className={`voice-bar origin-center ${active ? "voice-bar-active" : ""}`}
          style={{ animationDelay: BAR_DELAYS[4] }}
          d="M58.4976 47.3375C61.5992 47.3375 64.1136 49.8519 64.1136 52.9535V85.0448C64.1136 88.1481 61.6009 90.6626 58.4976 90.6626C55.3955 90.6626 52.881 88.1498 52.881 85.0465V52.9535C52.881 49.8519 55.3955 47.3375 58.4976 47.3375ZM100.509 47.338C103.613 47.338 106.125 49.8525 106.125 52.9529V85.0442C106.125 88.1458 103.613 90.662 100.509 90.662C97.4079 90.662 94.8934 88.1475 94.8934 85.046V52.9529C94.8946 49.8525 97.409 47.338 100.509 47.338Z"
        />
      </svg>
    </div>
  );
}
