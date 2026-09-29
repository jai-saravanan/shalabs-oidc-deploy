const labCode = __LAB_CODE__;
const verification = __VERIFICATION__;
const commit = __COMMIT__;

function whereItRuns(host) {
  if (host.includes("s3-website")) return "Amazon S3 — deployed by GitHub Actions";
  if (host.includes("github.dev") || host.includes("app.github.dev")) return "GitHub Codespaces";
  if (host.startsWith("localhost") || host.startsWith("127.0.0.1")) return "your machine";
  return host;
}

export default function App() {
  const place = whereItRuns(window.location.host);

  return (
    <main className="page">
      <p className="eyebrow">ShaLabs project</p>
      <h1>Deployed from GitHub — no access keys</h1>
      <p className="lead">
        This site is built by GitHub Actions, which proves who it is to AWS with a short-lived OpenID Connect token
        and gets one-hour credentials for a single role. No access key is stored anywhere.
      </p>

      {labCode ? (
        <section className="card" aria-label="Your lab code">
          <div className="row">
            <span className="label">Lab code</span>
            <code className="value">{labCode}</code>
          </div>
          <div className="row">
            <span className="label">Verification</span>
            <code className="value strong">{verification}</code>
          </div>
          <p className="hint">Enter the verification value in ShaLabs to start the AWS part of the lab.</p>
        </section>
      ) : (
        <section className="card warn" role="alert">
          <p>
            No lab code yet. Copy <code>.env.example</code> to <code>.env</code>, put your code from ShaLabs after{" "}
            <code>VITE_LAB_CODE=</code>, and start the app again.
          </p>
        </section>
      )}

      <dl className="facts">
        <div>
          <dt>Running on</dt>
          <dd>{place}</dd>
        </div>
        {commit ? (
          <div>
            <dt>Built from commit</dt>
            <dd>
              <code>{commit}</code>
            </dd>
          </div>
        ) : null}
      </dl>
    </main>
  );
}
