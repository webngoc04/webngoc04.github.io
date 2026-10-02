# Security Policy & Cryptographic Integrity Standard

## 1. Exclusive Modification & Deployment Authority (Chính sách Quản trị Độc quyền)

This repository is an official, sovereign technical publication authored and maintained exclusively by **KeiChan** (`webngoc04`).

* **Direct Commit & Deployment Limit:** Only `webngoc04` / `KeiChan` is authorized to commit, approve, or auto-deploy code to GitHub Pages.
* **External Pull Requests & Forks:** All unauthorized external pull requests and automated fork deployments are strictly rejected at the CI/CD pipeline level by `.github/workflows/security-guard.yml` and `.github/workflows/deploy.yml`.
* **Zero Supply-Chain Tampering:** Third-party contributors cannot apply or push unverified changes to the production branch.

---

## 2. Immutable Build-Time Cryptographic Seal (Mã Băm Bất Biến Khi Biên Dịch)

To protect readers and developers from supply-chain injection, watering-hole attacks, and malicious script substitutions:

1. **Pre-Build Hashing:** During the automated compilation process (`npm run prebuild`), all downloadable forensic scripts and tools (including `codex_audit.py`, `install.ps1`, `CodexKeyTool.sh`, etc.) are hashed using **cryptographic SHA-256** directly from their static source files.
2. **Immutable Seal Manifest:** Hashes are permanently sealed into `src/lib/checksums.json` at build time.
3. **Client-Side Anti-Tamper Verification:** 
   * When a developer clicks to download any code block, the browser verifies the code against the build-time cryptographic seal.
   * If any script injection (XSS) or in-transit alteration modifies even a single character, the checksum fails, the download is immediately **LOCKED**, and a security alarm is raised.
4. **Manual Verification:** Developers can independently verify any downloaded file using standard Linux/UNIX utilities:
   ```bash
   sha256sum <downloaded_file>
   ```

---

## 3. Reporting Security Issues

If you discover a security vulnerability or anomalous behavior:
* Do not open public issues.
* Contact KeiChan directly through verified GPG/SSH authenticated channels.
