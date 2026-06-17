# cPanel CI/CD Pipeline Documentation

This project uses **GitHub Actions** to automate the deployment process. Every time changes are pushed to the `main` branch, the pipeline will automatically build the Next.js static site and deploy it directly to your cPanel hosting using Rsync over SSH.

## Workflow Overview

The deployment workflow is located at `.github/workflows/deploy.yml`. When triggered, it performs the following steps automatically:
1. **Checkout:** Pulls your latest code.
2. **Setup:** Installs Node.js (v20) and your project dependencies (`npm ci` / `npm install`).
3. **Build:** Runs `npm run build` to generate your statically exported Next.js app in the `out` directory.
4. **Deploy:** Securely transfers the `out` directory contents to the `public_html/test` directory (or wherever configured) on your cPanel server using Rsync over SSH.

---

## 🔒 Setup Instructions

For the pipeline to authenticate with your cPanel server securely, you must configure **SSH Keys** and add them to your **GitHub Secrets**.

### Step 1: Generate an SSH Key Pair
Generate a new SSH key pair locally (or on your cPanel terminal) without a passphrase.
```bash
ssh-keygen -t rsa -b 4096 -C "github-actions-deploy"
```
*(Leave the passphrase empty when prompted by pressing Enter twice.)*

### Step 2: Authorize the Key on cPanel
You need to add the **public key** (`id_rsa.pub`) to your cPanel server to authorize access.
1. Run `cat ~/.ssh/id_rsa.pub` to view your public key.
2. Log in to your cPanel dashboard.
3. Go to **SSH Access** -> **Manage SSH Keys**.
4. Click **Import Key** and paste the public key into the "Public Key" box.
5. Click **Import**, then click **Manage** next to the imported key and click **Authorize**.

*(Alternatively, use `ssh-copy-id -p <PORT> <USERNAME>@<HOST>` from your terminal.)*

### Step 3: Configure GitHub Secrets
The GitHub Actions workflow requires several environment variables to connect to your server. 

Go to your GitHub Repository -> **Settings** -> **Secrets and variables** -> **Actions** and create the following **New repository secrets**:

| Secret Name | Description / Example |
| --- | --- |
| `CPANEL_HOST` | Your cPanel server hostname or IP address (e.g., `yourdomain.com`). |
| `CPANEL_PORT` | The SSH port for your cPanel server (usually `21098` or `22`). |
| `CPANEL_USERNAME` | Your cPanel login username. |
| `CPANEL_SSH_KEY` | The exact contents of your **Private Key** (e.g., `~/.ssh/id_rsa`). |

> **Note on `CPANEL_SSH_KEY`:** Run `cat ~/.ssh/id_rsa` and copy the entire output, including the `-----BEGIN OPENSSH PRIVATE KEY-----` and `-----END OPENSSH PRIVATE KEY-----` lines.

---

## Modifying the Deployment Target

If you need to change the folder where the website is deployed (for instance, changing from `public_html/test` to the root `public_html/`), edit the last line in `.github/workflows/deploy.yml`:

```yaml
rsync -avz --delete -e "ssh -p ${{ secrets.CPANEL_PORT }} -i ~/.ssh/cpanel_key" out/ ${{ secrets.CPANEL_USERNAME }}@${{ secrets.CPANEL_HOST }}:public_html/
```

## Rollbacks and Failure Handling

- **Atomic Builds:** If `npm run build` fails (e.g., due to a TypeScript error), the deployment stops immediately. Your live site will not be affected.
- **Rollbacks:** Since Rsync relies on the state of the GitHub repository, reverting to a previous version is as simple as reverting the commit on GitHub and pushing it. The pipeline will run again and sync the older, stable build to your server.
