# Deploy a website to S3 from GitHub — no access keys

The starter repository for the ShaLabs project of the same name. A small
React site that GitHub Actions builds and uploads to an Amazon S3 bucket,
proving who it is to AWS with OpenID Connect instead of stored keys.

## 1. Run it first

1. **Fork** this repository (keep the name `shalabs-oidc-deploy`).
2. In your fork, open **Actions** and choose **I understand my workflows, go
   ahead and enable them** — a fork starts with Actions off.
3. Open the fork in **Codespaces** (Code → Codespaces → Create codespace), or
   clone it and use Node 22.
4. Copy `.env.example` to `.env` and put your lab code from ShaLabs after
   `VITE_LAB_CODE=`.
5. Run:

   ```bash
   npm install
   npm run dev
   ```

6. Open the page. Enter the **Verification** value it shows in ShaLabs.

The verification value is a learning check, not a secret: `verification.js`
shows exactly how it is made.

## 2. Deploy it

After you have registered GitHub as an identity provider in AWS, created your
bucket and your deploy role (the ShaLabs steps walk you through it), set three
repository **variables** under Settings → Secrets and variables → Actions →
Variables:

| Variable | Value |
|---|---|
| `AWS_ROLE_ARN` | your deploy role's ARN |
| `BUCKET` | your bucket's name |
| `LAB_CODE` | your lab code |

Then Actions → **Deploy to S3** → **Run workflow**. The log shows the job
assuming your role with OIDC, then uploading the site. Open the address the
last step prints: the same page as on your machine, with the same code.

None of the three values is a secret, and no secret is needed: the job asks
GitHub for a short-lived token (`permissions: id-token: write`) and AWS trades
it for credentials that last 15 minutes.
