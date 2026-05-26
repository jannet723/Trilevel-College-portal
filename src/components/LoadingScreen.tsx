interface LoadingScreenProps {
  message?: string;
  fullScreen?: boolean;
}

const LoadingScreen = ({
  message = 'Preparing your portal',
  fullScreen = true,
}: LoadingScreenProps) => (
  <div
    className={fullScreen ? 'app-loading-screen' : 'app-loading-screen app-loading-screen--inline'}
    role="status"
    aria-live="polite"
    aria-busy="true"
    aria-label={message}
  >
    <div className="app-loading-screen__grain" aria-hidden />
    <div className="app-loading-screen__content">
      <div className="app-loading-orbit" aria-hidden>
        <svg className="app-loading-orbit__arc app-loading-orbit__arc--a" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r="52" fill="none" strokeWidth="1.5" />
        </svg>
        <svg className="app-loading-orbit__arc app-loading-orbit__arc--b" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r="44" fill="none" strokeWidth="1" />
        </svg>
        <div className="app-loading-orbit__core">
          <img
            src="/logo.png"
            alt=""
            width={44}
            height={44}
            className="app-loading-orbit__logo"
            decoding="async"
          />
        </div>
      </div>

      <p className="app-loading-screen__label home-brand-serif">{message}</p>
      <div className="app-loading-dots" aria-hidden>
        <span />
        <span />
        <span />
      </div>
    </div>
  </div>
);

export default LoadingScreen;
