# GW2 Pathing Traditional Chinese Translation Project

This repository tracks licensing and permissions for a planned non-commercial
Traditional Chinese (`zh-TW`) localization of Guild Wars 2 marker packs used by
Blish HUD Pathing.

No unlicensed marker-pack content is stored or distributed here.

## Current status

- 46 packs are tracked from the Pathing community repository audit dated
  2026-07-17.
- 10 packs have an explicit license that permits derivative works, subject to
  their individual license conditions.
- 8 packs have project-specific written permission for free, non-commercial
  `zh-TW` translation and redistribution: [fast] TacO Markers for its current
  and future versions, Tekkit's All-In-One for its current version, Aixxel's
  HP train guides for current and future versions, and Apo's Boss Markers for
  current and future versions (excluding `Assets/icons/madge.png`), plus
  ReActif EN and FR for all versions created by ReActif, and both of Lady
  Elyssa's packs for current and future versions.
- 28 packs still require an explicit license or sufficiently clear written
  permission before a translated version can be published.
- All 26 GitHub rights-holder groups were contacted on 2026-07-17, covering 32
  packs that lacked an explicit license.
- The remaining 2 entries without permission belong to 2 external contact
  groups and require manual Discord, Reddit, email, or in-game delivery.

The machine-readable record is in [`permissions.yml`](permissions.yml). Contact
targets and message templates are documented in [`TARGETS.md`](TARGETS.md) and
[`CONTACT_TEMPLATES.md`](CONTACT_TEMPLATES.md).

## Planned localization scope

The first version will only translate user-facing text such as:

- category `displayname` values;
- marker `info` text;
- user-facing `copy-message` text.

Routes, coordinates, icons, images, scripts, and gameplay behavior will not be
modified. Files required for a translated package to function would still need
to be redistributed, so permission must cover both the textual adaptation and
public redistribution of those necessary files.

## Permission policy

Non-commercial use does not replace the need for a license or permission.
Translation and redistribution will start only when one of these is available:

1. an explicit public license that permits derivative works and redistribution
   and applies to the marker-pack content; or
2. a clear written permission from the rights holder covering the planned
   `zh-TW` translation and public redistribution.

Ambiguous approval, silence, or a repository being public is not treated as
permission. Third-party content not controlled by the author remains excluded
unless its own terms permit the intended use.

Discord permissions are recorded under [`evidence/discord`](evidence/discord/)
with a transcript, timestamp, message link, screenshot, and screenshot hash.
Private Discord links are treated only as supporting metadata because other
readers may not be able to open them.

## Status values

- `licensed`: a public license permitting the planned work was found.
- `pending`: permission has been requested or still needs to be requested.
- `permission_granted`: the author granted sufficiently specific permission.
- `declined`: the author declined the request.
- `no_response`: no answer after one follow-up and 30 days.
- `third_party_blocked`: required content cannot be redistributed under the
  available terms.

## Release rules

- Every translated pack will be released separately.
- The original author and source will be prominently credited.
- The translated fields and other changes will be documented.
- The exact upstream version or commit will be pinned before work starts.
- The applicable license or permission evidence will be included in the
  release package.
- No translated package will be sold, paywalled, or used commercially by this
  project.

This repository is a permission and risk-management record, not legal advice.
