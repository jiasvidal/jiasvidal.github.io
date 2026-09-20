# Jias Vidal portfolio

A static personal portfolio ready for GitHub Pages. It uses HTML, CSS, and a small amount of JavaScript. No build step or paid service is required.

## Preview on your computer

Extract the ZIP first, then double-click `index.html` to open it in your browser. The whole site works without an installation, internet connection, or build step. The résumé area includes a one-page PDF download and an online reading version.

## Publish with GitHub Pages

1. Sign in to [GitHub](https://github.com/) and create a new **public** repository. A repository named `YOUR-USERNAME.github.io` gives you a site at `https://YOUR-USERNAME.github.io/`. Any other repository name gives you a site at `https://YOUR-USERNAME.github.io/REPOSITORY-NAME/`.
2. Open the repository and choose **Add file → Upload files**.
3. Upload the **extracted contents** of this folder, including every HTML, CSS, and JavaScript file and the entire `assets` folder. Do not upload the ZIP itself. Keep `index.html` at the repository root, not inside an extra folder.
4. Commit the uploaded files.
5. Go to **Settings → Pages**. Under **Build and deployment**, choose **Deploy from a branch**, then select **main** and **/(root)**. Save.
6. Wait for GitHub to publish the site, then open the URL shown on the Pages settings screen. Publishing can take up to 10 minutes.

If you make edits later, upload the changed files and commit them. GitHub Pages will publish the updated version.

These steps follow [GitHub's Pages quickstart](https://docs.github.com/en/pages/quickstart) and [publishing-source instructions](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

## Add your contact links

Open `site-config.js` in a plain-text editor and put your confirmed values between the empty quotation marks:

```js
linkedin: "https://www.linkedin.com/in/YOUR-PROFILE/",
github: "https://github.com/YOUR-USERNAME",
email: "YOUR-PUBLIC-EMAIL",
```

Leave any unknown value empty. Empty values display honest placeholders; valid values become working links automatically. Profile links must begin with `https://`. Nothing is sent or stored by the site, and no contact form is connected. If JavaScript is disabled, the page content and résumé still work; contact links remain placeholders.

## Add your future Power Automate demo

1. Create a public demo or demonstration video using sample data, and copy its public `https://` URL.
2. In `site-config.js`, find the `demo` object. Replace `url: ""` with `url: "YOUR-PUBLIC-DEMO-URL"`.
3. Update the `title` and `description` in the same object to describe what the completed demo actually does.
4. Save the file and reload the portfolio. The “Demo link coming soon” placeholder becomes an **Open project demo** link automatically.
5. Upload the updated `site-config.js` to your GitHub repository and commit the change.

The demo card is a placeholder until you add a link. This portfolio does not trigger or execute a Power Automate flow. Link to a demo page, form, or video you choose to share publicly. Do not put credentials or private flow addresses in the website files.

## Update the résumé and career details

The downloadable résumé is `assets/jias-vidal-resume.pdf`. Replace it with a revised PDF using the same filename to keep the download button working. Update `resume.html` and `index.html` as well when career details change. The PDF is a summary based only on the provided facts; no email, phone number, profile URL, graduation date, or earlier employment has been invented.

The UiPath savings remain **projected**. SQL is described as completed coursework, and the degree remains **in progress**. No UiPath certification is claimed. Add certificate links or additional qualifications only when confirmed.

## Files

| File | Purpose |
| --- | --- |
| `index.html` | Main portfolio page |
| `styles.css` | Layout and visual style |
| `refinements.css` | Hero, results panel, and responsive refinements |
| `site-config.js` | Contact links and future Power Automate demo settings |
| `script.js` | Mobile menu, configured links, and footer year |
| `resume.html` | Online and printable résumé summary |
| `assets/jias-vidal-resume.pdf` | One-page downloadable résumé |
| `assets/favicon.svg` | Browser tab icon |

No external fonts, third-party scripts, trackers, or installations are required. All file paths are relative, so the site works with either a username repository or a project repository.

## If something does not load

- **404 page:** Check that `index.html` is at the repository root and Pages is set to the correct branch and `/(root)`.
- **Page has no styling:** Upload both CSS files and keep their names unchanged.
- **PDF does not open:** Make sure the `assets` folder contains `jias-vidal-resume.pdf`.
- **Changes are not visible:** Wait for publication to finish, then refresh the page. Check the repository's **Actions** tab if publishing fails.

## Verification

The package was checked for missing local links and section anchors, JavaScript syntax, menu and configuration behavior, and résumé page count and content. The PDF was rendered and visually reviewed. Browser-based visual inspection of the website was blocked by the local preview policy; open `index.html` to review the desktop and narrow-window layouts before publishing.
