/** 등장/퇴장: opacity + blur (1s) */
export default function BlurFade({
  show,
  opacity = 1,
  children,
  className = "",
  style,
  ...rest
}) {
  return (
    <div
      className={`ui-blur-fade ${
        show ? "ui-blur-fade--visible" : "ui-blur-fade--hidden"
      } ${className}`}
      style={{
        ...style,
        ...(show ? { "--blur-fade-opacity": opacity } : {}),
      }}
      aria-hidden={!show}
      {...rest}
    >
      {children}
    </div>
  );
}
