# Deploy a website to S3 from GitHub — no access keys

The starter repository for the ShaLabs project of the same name. A small
React site that GitHub Actions builds and uploads to an Amazon S3 bucket,
proving who it is to AWS with OpenID Connect instead of stored keys.

## 1. Run it first

1. Make your own repository from this template: **Use this template** →
   **Create a new repository** (ShaLabs' **Create my repository** button opens
   that page already filled in). Keep the name `shalabs-oidc-deploy` and keep
   it **Public**. Actions is already on in a repository made from a template.
2. Open your repository in **Codespaces** (Code → Codespaces → Create
   codespace on main), or clone it and use Node 22.
3. Copy `.env.example` to `.env` and put your lab code from ShaLabs after
   `VITE_LAB_CODE=`.
4. Run:

   ```bash
   npm install
   npm run dev
   ```

5. Open the page. It shows your **Lab code**: the same code your deploy
   carries at the end.

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
