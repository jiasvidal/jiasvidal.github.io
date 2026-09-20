# Jias Vidal portfolio

A personal portfolio built with HTML, CSS, and JavaScript for GitHub Pages. All assets are included; no installation or build is required.

## Update your existing live site

1. Extract `jias-vidal-portfolio.zip` on your computer.
2. Open [your GitHub repository](https://github.com/jiasvidal/jiasvidal.github.io).
3. Choose **Add file → Upload files**.
4. Drag **everything inside the extracted folder**, including the entire `assets` folder, onto GitHub. Upload the extracted contents, not the ZIP or the outer folder. Uploading files with the same names updates those files.
5. Enter `Update portfolio with resume, photo, and contact links` as the commit message and click **Commit changes**.
6. Wait for publishing to complete, then visit [your portfolio](https://jiasvidal.github.io/). Use **Ctrl + Shift + R** if you see the older version. Check the repository's **Actions** tab if publishing fails.

Your existing GitHub Pages settings can stay as they are. This version uses one complete stylesheet, `portfolio.css`, with a versioned link so older cached styles are not reused. Upload `index.html`, `portfolio.css`, and the new portrait together. Old `styles.css`, `refinements.css`, and `jias-vidal.jpg` files already on GitHub are unused by this version and do not affect it.

## What is personalized

- Profile photo, Alpharetta location, LinkedIn profile, GitHub profile, and public email.
- Current Fiserv role and completed Multiverse Digital Business Accelerator apprenticeship.
- A focused website with Fiserv and apprenticeship experience; earlier roles remain in the original résumé.
- Data Analytics degree in progress, with 65 completed credit hours as supplied in the résumé.
- Data, automation, cybersecurity, and IT training from the supplied résumé, plus the previously confirmed IBM/Coursera SQL course.
- Power Automate savings of approximately **3–5 hours per week**, confirmed by Jias for this update.
- UiPath Seasonal Hold savings of **347+ hours annually, projected**.
- The original uploaded one-page résumé, with its formatting and content unchanged.

SQL is described as coursework and UiPath as training. The Google Analytics certification is listed without an unverified renewal or expiration date. The future Power Automate demo remains a clearly marked placeholder.

## Preview on your computer

Double-click `index.html` in the extracted folder. Check the layout in a normal browser window and a narrow window. All content and assets work offline. External profile links require an internet connection.

## Publish a new GitHub Pages site

1. Sign in to GitHub and create a public repository named `YOUR-USERNAME.github.io`.
2. Upload the extracted website contents to the repository root, keeping `index.html` directly in the root.
3. Commit the files, then open **Settings → Pages**.
4. Choose **Deploy from a branch**, select **main** and **/(root)**, and save.
5. Open the website URL shown by GitHub. Publishing can take up to 10 minutes.

These steps follow [GitHub's Pages quickstart](https://docs.github.com/en/pages/quickstart) and [publishing-source instructions](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

## Change contact links later

Edit the quoted values in `site-config.js` for LinkedIn, GitHub, and public email. Profile URLs must begin with `https://`. The contact links are also present in `index.html` for visitors with JavaScript disabled; update those matching links when changing a profile. Replace the PDF if résumé contact details change; `resume.html` opens that PDF.

## Add the future Power Automate demo

1. Create a public demo page, form, or demonstration video using sample data.
2. In `site-config.js`, find `demo` and replace the empty `url` value with the public `https://` URL.
3. Update `title` and `description` to describe the actual completed demo.
4. Save and reload the site. “Demo link coming soon” becomes an **Open project demo** link.
5. Upload the changed file to GitHub and commit it.

The portfolio does not execute a Power Automate flow. It provides a place to link to a demonstration when ready. Do not add credentials or private flow addresses to the public files.

## Files

| File | Purpose |
| --- | --- |
| `index.html` | Main portfolio |
| `portfolio.css` | All typography, spacing, layout, and responsive styles |
| `site-config.js` | Contact and future demo settings |
| `script.js` | Mobile menu and configured links |
| `resume.html` | Opens the original résumé PDF |
| `assets/jias-vidal-resume.pdf` | Original uploaded one-page résumé |
| `assets/jias-vidal-portrait.png` | New supplied professional portrait |
| `assets/favicon.svg` | Browser tab icon |

To replace the PDF or photograph, keep the same filename. To edit career details, update the portfolio and replace the PDF with your preferred revised résumé.

## Verification

Checked HTML structure, local files, section anchors, JavaScript syntax, and ZIP integrity. Menu and demo-link behavior were checked separately. The original PDF was visually reviewed and its unchanged copy verified by matching file hashes. The local browser preview was blocked by the browser policy, so the website has not had a browser-based visual review.
