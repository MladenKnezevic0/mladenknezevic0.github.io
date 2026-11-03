/* ------------------------------------------------------------------
   EDIT THIS FILE TO UPDATE YOUR SITE. You don't need to touch anything else.

   To add new work:
   1. Put your video or image in the "media" folder (videos under 25 MB).
   2. Copy one of the projects below and change the details.
   3. Upload the site again.
------------------------------------------------------------------- */
window.PORTFOLIO = {
  // Your name or brand. Leave empty to show "Roblox UI Design" instead.
  name: "Mladen",

  role: "Roblox UI Designer",
  status: "Open for commissions",

  // Each item is one line of the big headline.
  headline: ["Game UI", "players want", "to click."],

  intro: "I design and animate Roblox interfaces, from shops to crafting benches, so your game feels finished from the very first click. Everything here was made for real client games.",

  // Your Discord username. The contact section stays hidden until this is filled in.
  discord: "nightydev.",

  // Optional extra links, for example: { label: "Roblox", url: "https://www.roblox.com/users/..." }
  links: [],

  // Which parts of your videos play in the opening showreel (times in seconds).
  reel: [
    { video: "media/work-01.mp4", poster: "media/work-01-poster.jpg", start: 5.5, end: 16 },
    { video: "media/work-02.mp4", poster: "media/work-02-poster.jpg", start: 3, end: 16 },
  ],

  // Words in the moving band between projects.
  marquee: ["Shops", "Crafting", "Class select", "Seasonal themes", "Menus", "Motion"],

  projects: [
    {
      title: "Seasonal Shops",
      label: "Client project",
      description: "A shop that changes with the season, with an animated switch from a Halloween storefront to a snow-covered Christmas one.",
      tags: ["Shop", "Seasonal themes", "Animated transitions"],
      video: "media/work-01.mp4",
      poster: "media/work-01-poster.jpg",
      // The two colours the page shifts to while this project is on screen.
      colors: ["#5b2bc4", "#f0741a"],
      // Photos. size can be: "third", "half", "wide" (or "a7" and "a5" for an uneven pair).
      photos: [
        { src: "media/still-halloween-shop.jpg", alt: "Halloween shop frame with pumpkins and a ghost", size: "third" },
        { src: "media/still-christmas-featured.jpg", alt: "Christmas shop featured offers with a Mega Gift card", size: "third" },
        { src: "media/still-christmas-items.jpg", alt: "Christmas shop item cards with candy cane currency packs", size: "third" },
      ],
    },
    {
      title: "Fossil Crafting & Classes",
      label: "Client project",
      description: "A desert-themed class select and crafting bench, with locked tiers that make progression easy to read at a glance.",
      tags: ["Class select", "Crafting", "Progression"],
      video: "media/work-02.mp4",
      poster: "media/work-02-poster.jpg",
      colors: ["#b8742c", "#128f88"],
      photos: [
        { src: "media/still-class-select.jpg", alt: "Class select screen with a class grid and starter tools panel", size: "a7" },
        { src: "media/still-crafting.jpg", alt: "Crafting menu with a recipe grid and crafting bench details", size: "a5" },
      ],
    },
  ],
};
