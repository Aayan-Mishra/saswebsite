# Editing website text (no coding needed)

All of the website's wording lives in **one file** you can edit in the browser:

```
src/content/site.json
```

You never need to touch any other file. Change the text in there, save, and the
website updates itself automatically.

---

## How to edit it on GitHub (easiest way)

1. Go to the repository on **github.com**.
2. Open the file: click the folders **`src`** → **`content`** → **`site.json`**.
3. Click the **pencil ✏️ icon** (top-right of the file) to edit.
4. Find the text you want to change. Each line looks like this:

   ```
   "title": "Find Your Program",
   ```

   Only change the words **inside the second pair of quotes** — the part after
   the colon. So you could change it to:

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
   - ❌ `"heading": "Sydney's Best Tutoring",` ← don't rename the label on the left
2. **Keep every `"` `,` `{` `}` exactly where it is.** If you delete a quote or
   a comma by accident, the page can break.
3. **Don't remove the whole line.** To "empty" something, leave `""` (two quotes
   with nothing between).

If something looks broken after an edit, it's almost always a missing quote or
comma — just undo your change (GitHub keeps a history of every edit) and try
again.

---

## What's editable right now

The file currently contains all the **home page** text, grouped by section:

| Section in the file | Where it shows on the site |
|---|---|
| `hero` | The big banner at the very top |
| `trustStats` | The 4 stat boxes (students, satisfaction, etc.) |
| `programs` | The "Find Your Program" cards |
| `howItWorks` | The 4-step "How It Works" row |
| `whyChooseUs` | The dark "Why Families Choose…" section |
| `testimonials` | The parent/student reviews |
| `faq` | The "Got Questions?" questions and answers |
| `finalCta` | The orange "Ready to Launch…" banner at the bottom |

More pages (About, Contact, Programs, etc.) can be added to this same file on
request, so eventually all site text is editable from here.

---

## What is NOT in this file (by design)

Images, colours, links, page layout, and the legal pages (Terms/Privacy) are not
here — those are best changed by a developer. This file is purely for **wording**.
