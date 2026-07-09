# Editing website text (no coding needed)

All of the website's wording lives in a folder called **`text`**, with **one file
per page**:

```
src/text/home.json       ← the home (landing) page
src/text/about.json      ← the About page
src/text/programs.json   ← the Programs page
```

More pages will be added as separate files in this same `text` folder over time.
You never need to touch anything outside this folder — just open the file for the
page you want to change, edit the text, save, and the website updates itself
automatically.

---

## How to edit on GitHub (easiest way)

1. Go to the repository on **github.com**.
2. Open the folder for the page: click **`src`** → **`text`**, then the file you
   want (e.g. **`home.json`** or **`about.json`**).
3. Click the **pencil ✏️ icon** (top-right of the file) to edit.
4. Find the text you want to change. Each line looks like this:

   ```
   "title": "Find Your Program",
   ```

   Only change the words **inside the second pair of quotes** — the part after
   the colon. For example:

   ```
   "title": "Explore Our Programs",
   ```

5. Scroll to the bottom, add a short note like "update programs heading", and
   click **Commit changes**.
6. The website rebuilds and shows your new text in a couple of minutes.

---

## The 3 rules (important)

1. **Only change text inside quotes**, on the **right** of the colon.
   - ✅ `"badge": "Sydney's Best Tutoring",`  ← changed the value
   - ❌ `"badge": "Sydney's Best Tutoring",` — don't rename the label on the left
2. **Keep every `"` `,` `{` `}` exactly where it is.** If you delete a quote or a
   comma by accident, the page can break.
3. **Don't remove a whole line.** To empty something, leave `""` (two quotes with
   nothing between).

If a page looks broken after an edit, it's almost always a missing quote or
comma — just undo your change (GitHub keeps a history of every edit) and try
again.

---

## What's in each file

Each file is grouped into the sections of that page, top to bottom. For example
`home.json` has `hero`, `programs`, `testimonials`, `faq`, etc., and `about.json`
has `story`, `mission`, `stats`, `team`, `approach`, and so on. The label names
match what you see on the page, so they're easy to find.

The very first line of each file (`_README`) is a reminder note — you can ignore
it; it doesn't appear on the website.

---

## Changing the home page background video size

In `home.json`, inside the `hero` section, there are two settings that control how
the background video fits the banner:

```
"videoWidth": "1920",
"videoHeight": "1080"
```

These should match the **actual resolution of your video**. For a standard
widescreen video use `1920` × `1080`. If you swap in a video with a different
shape (for example a tall/portrait video at `1080` × `1920`), update these two
numbers to match and the banner will fit it correctly with no black bars.

---

## What is NOT in these files (by design)

Images, colours, links, page layout, and the legal pages (Terms/Privacy) are not
here — those are best changed by a developer. These files are purely for
**wording**.
