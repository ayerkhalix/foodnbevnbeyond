---
version: alpha
name: Food N Bev & Beyond
description: A warm Palawan restaurant collection with olive accents, honest photography, and direct paths to menus.
colors:
  primary: '#596438'
  primary-hover: '#424d29'
  background: '#f5f3eb'
  foreground: '#292e24'
  paper: '#fffef9'
  sage: '#e7e9dc'
  olive-light: '#d8dfba'
  muted: '#62665b'
  border: '#d9dccf'
  overlay: '#1c2119e8'
typography:
  display:
    fontFamily: 'Cormorant Garamond, Georgia, serif'
  body:
    fontFamily: 'DM Sans, sans-serif'
rounded:
  control: '0.25rem'
  dialog: '0.5rem'
  scrollbar: '10px'
  photo-edge: '2px'
  hero-corner: '42px'
  hero-corner-mobile: '30px'
spacing:
  page-max: '80rem'
  section-gap: '6rem'
components:
  button-primary:
    backgroundColor: '{colors.primary}'
    textColor: '{colors.paper}'
    rounded: '{rounded.control}'
    height: '50px'
  button-primary-hover:
    backgroundColor: '{colors.primary-hover}'
    textColor: '{colors.paper}'
  navigation:
    backgroundColor: '{colors.background}'
    textColor: '{colors.foreground}'
  navigation-divider:
    backgroundColor: '{colors.border}'
    height: '1px'
  quiet-surface:
    backgroundColor: '{colors.sage}'
    textColor: '{colors.foreground}'
  supporting-copy:
    textColor: '{colors.muted}'
  footer:
    backgroundColor: '{colors.foreground}'
    textColor: '{colors.olive-light}'
  restaurant-logo:
    width: '76px'
    height: '62px'
  restaurant-entry:
    textColor: '{colors.foreground}'
  menu-viewer:
    backgroundColor: '{colors.paper}'
    textColor: '{colors.foreground}'
  menu-backdrop:
    backgroundColor: '{colors.overlay}'
---

# Food N Bev & Beyond design

## Overview

The user selected a warm, natural Palawan direction and requested olive green in place of orange, background-free uniform logos, and a less generic landing page. Preserve the established Cormorant Garamond / DM Sans pairing, business names, restaurant information, and real photos.

This is a brand and restaurant discovery site, not an administration app. Visitors choose among four El Nido restaurants, browse supplied menu pages, and contact a restaurant. English UI; preserve Filipino names. No invented opening hours, addresses, reviews, or booking confirmations.

The visual reference is a table beside woven walls and palms at Sa Kurbada. The first viewport uses that supplied restaurant photograph, a direct introduction, and restaurant/menu links. Avoid stock travel slogans, decorative numbered sections, repeated feature cards, and tiny uppercase navigation.

## Colors

Runtime CSS is canonical (Model B). This document mirrors accepted values. All new components consume semantic Tailwind or CSS variables.

| Document token | Runtime owner in app/globals.css          | Consumers                   |
| -------------- | ----------------------------------------- | --------------------------- |
| primary        | --olive → --color-olive / --color-primary | Buttons, links, focus       |
| primary-hover  | --olive-dark                              | Hover, link text            |
| background     | --background → --color-sand               | Page and header             |
| foreground     | --foreground → --color-ink                | Text and footer             |
| paper          | --paper                                   | Buttons, menu image surface |
| sage           | --sage                                    | Quiet hover surfaces        |
| olive-light    | --olive-light                             | Text on dark surfaces       |
| muted          | --muted-foreground                        | Body supporting text        |
| border         | --border                                  | Dividers and controls       |
| overlay        | --overlay                                 | Menu viewer backdrop        |

Use white/paper text on olive; never dark ink on the primary button. Olive-light is for dark backgrounds. Logo colors remain individual brand colors. Light-only theme is intentional: no partial automatic dark theme. Forced-colors uses system focus and scrollbars.

## Typography

Cormorant Garamond 500–600 carries headings; DM Sans carries body and controls. The existing next/font setup owns font loading and CSS variables. Headlines cap at 5.8rem, use tracking no tighter than -.035em, and scale down to mobile. Body is 15–17px with 1.75–1.8 line-height. Utility text remains readable; sentence case is preferred.

## Layout

Max width 80rem. Horizontal gutters are 40px on desktop, 24px on tablet, and 16–24px on phones. The hero is a text/photo pair from 768px and a vertical composition below it. Restaurant entries use two columns, then one on phones. The restaurant index uses four columns, then two below 640px, with a name beside each logo on phones. Menus and contacts use compact directory rows. Fixed media geometry reserves space for photos and menu images. The document owns page scrolling.

## Elevation & Depth

Use surface color, spacing, and occasional hairlines. No glass navigation or decorative card shadows. The header is opaque and sticky. Photos retain their actual colors. The menu dialog uses the browser top layer and a dark backdrop.

## Shapes

Small 4px corners on actions and photos. The hero photograph has a single soft lower corner. Circular small arrow controls carry navigation. Restaurant logos have transparent backgrounds and a consistent shared contain frame; never stretch artwork.

## Components

### States and actions

Shared `.button-primary`, `.button-light`, `.button-outline`, `.text-link`, and `.icon-control` classes own action styles. Actions use native links and buttons with visible hover and focus states. Primary touch targets are at least 44px. Unavailable viewer controls use the native disabled state.

### Navigation

`SitePage` provides the shared header, main landmark, and footer. Restaurants, Menus, Our story, and Contact are visible at every width. Below 640px the links sit in a dedicated row under the wordmark. The current route or section is underlined. The header scrolls with the page in short landscape viewports. Skip links target `#content`.

### Logos

`PlaceLogo` displays the supplied transparent assets from `public/logos/transparent`. Each logo retains its brand color and aspect ratio in the frame used by that surface. Directory logos sit alongside their restaurant name. `CompanyLogo` pairs the transparent mark with the site wordmark.

### Menu viewer

The full menu page offers a first-page shortcut and numbered thumbnails. The native dialog opens at the selected page and fills the phone screen within its safe areas. Escape and Close restore focus to the trigger. The footer holds paging controls, a live page count, and a zoom toggle. Zoom enlarges the current image in a scrollable area. Selecting another page resets the zoom. The original image remains available from the header and the load error state.

### Content

Restaurant/contact data comes from lib/places.ts. Do not present a locally toggled form as a delivered message. Contact uses existing phone, email, and social links. Dish photos in legacy menu data are generic reused assets; do not add claims that they depict each listed dish.

### Iconography and motion

Use consistent Lucide strokes and hide decorative icons from assistive technology. The hero starts with Sa Kurbada and rotates every six seconds on desktop with a hover-capable pointer. On phones and touch-only devices, visitors can browse with the arrows or start playback. Manual selection stops playback. Hover, keyboard focus, hidden tabs, and scrolling offscreen temporarily pause it. Reduced-motion users start with playback off and can still change photos. The caption links to the pictured restaurant. The hero frame reserves its dimensions, and scrollbars, focus, caret, and selection use palette tokens.

## Do's and Don'ts

- Do keep real restaurant photos and readable menu actions prominent.
- Do reuse the shared header, logo, restaurant collection, and viewer.
- Do preserve all existing restaurant and menu URLs.
- Don't reintroduce orange as a UI accent or white rectangles behind logos.
- Don't invent business details or successful submissions.
