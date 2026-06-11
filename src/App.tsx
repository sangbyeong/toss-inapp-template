import appContent from './app.content';
import featuresConfig from '../toss.features.config';
import launchConfig from '../toss.launch.config';

const enabledPermissions = Object.entries(featuresConfig.permissions)
  .filter(([, enabled]) => enabled)
  .map(([name]) => name);

function App() {
  return (
    <main className="app-shell">
      <section className="hero-card">
        <p className="eyebrow">{launchConfig.displayName}</p>
        <h1>{appContent.heroTitle}</h1>
        <p className="subtitle">{appContent.heroSubtitle}</p>
        <a className="primary-link" href={appContent.primaryAction.href} target="_blank" rel="noreferrer">
          {appContent.primaryAction.label}
        </a>
      </section>

      <section className="info-grid" aria-label="시작 단계">
        {appContent.sections.map((section) => (
          <article className="info-card" key={section.title}>
            <h2>{section.title}</h2>
            <p>{section.description}</p>
          </article>
        ))}
      </section>

      <section className="status-card" aria-label="템플릿 설정 상태">
        <h2>현재 설정</h2>
        <dl>
          <div>
            <dt>appName</dt>
            <dd>{launchConfig.appName}</dd>
          </div>
          <div>
            <dt>WebView 타입</dt>
            <dd>{launchConfig.webViewType}</dd>
          </div>
          <div>
            <dt>켜진 권한</dt>
            <dd>{enabledPermissions.length > 0 ? enabledPermissions.join(', ') : '없음'}</dd>
          </div>
          <div>
            <dt>외부 API</dt>
            <dd>{featuresConfig.externalApi.enabled ? featuresConfig.externalApi.baseUrl : '꺼짐'}</dd>
          </div>
        </dl>
      </section>

      <p className="footer-note">{appContent.footerNote}</p>
    </main>
  );
}

export default App;
