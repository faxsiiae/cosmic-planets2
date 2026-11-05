# COSMIC — Solar System Explorer

A responsive, lightweight astronomy experience with a dedicated NASA image for each of the eight planets, short facts, and an interactive quiz.

## Run locally

Open `index.html` in a browser. No build step or runtime dependencies are required. Fonts and NASA imagery load from their public CDNs.

## Planet image experience

- Each planet card uses a NASA image-library thumbnail and loads lazily as it approaches the viewport. The first hero image is prioritized; the larger planet image variant is only requested when a visitor opens a planet.
- Selecting a planet opens an accessible dialog on this site—there is no redirect. COSMIC requests the corresponding NASA Image and Video Library record from `https://images-api.nasa.gov/search?nasa_id=...`, then shows NASA's description, image ID, center, date, and credit where available.
- If NASA's API is unavailable, the dialog remains useful with the local planet facts and a clear offline message.
- NASA image credits are displayed in the detail panel. Images may be enhanced or composited and are not to scale.

## Quiz and accessibility

Five-question Solar System quiz with instant explanations, scoring, and retry. The site includes semantic navigation, keyboard-accessible buttons and dialog, meaningful image descriptions, reduced-motion support, and a responsive layout.

NASA imagery and NASA data are used for educational exploration; this page is not affiliated with or endorsed by NASA.
