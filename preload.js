/*
  Copyright(C) 2026 opensourcefreak

  This program is free software: you can redistribute it and/or modify
  it under the terms of the GNU Affero General Public License as
  published by the Free Software Foundation, either version 3 of the
  License, or (at your option) any later version.

  This program is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU Affero General Public License for more details.

  You should have received a copy of the GNU Affero General Public License
  along with this program.  If not, see <https://www.gnu.org/licenses/>
*/

// URL to intercept
const regex = /.+fandom\.com\/load\.php\?.+modules=startup.+/;

// Trash to remove from site - quite a lot
const removalclasses = [
  "top_leaderboard-odyssey-wrapper",
  "fandom-ad-wrapper",
  "global-explore-navigation__top",
  "global-explore-navigation",
  "page__right-rail",
  "ac-player-wrapper",
  "global-top-navigation__action-wrapper",
  "bottom-ads-container",
  "global-footer",
  "wds-banner-notification",
  "global-action__item",
  "wiki-tools",
  "explore-menu",
];

const removalids = [
  "onetap_google_intermediate_iframe",
  "onetrust-consent-sdk",
];

const scriptobserver = new MutationObserver((muts) => {
  muts.forEach((mut) => {
    mut.addedNodes.forEach((node) => {
      if (node.tagName === "SCRIPT") {
        if (regex.test(node.src)) {
          scriptobserver.disconnect();
          replaceScript(node.src);
          node.remove();
        }
      }
    });
  });
});

async function replaceScript(url) {
  let injector = (
    await (await window.fetch(browser.runtime.getURL("injector.js"))).text())
      .split("CUT_HERE")[1]
      .replaceAll("SCRIPT_URL", url);

  let element = document.createElement("script");
  element.innerText = injector;
  document.head.appendChild(element);
}

const removalobserver = new MutationObserver((muts) => {
  muts.forEach((mut) => {
    mut.addedNodes.forEach((node) => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        if (
          Array.from(node.classList).some((item) =>
            removalclasses.includes(item),
          ) | removalids.includes(node.id)
        ) {
          node.remove();
        }
      }
    });
  });
});

scriptobserver.observe(document.documentElement, {
  childList: true,
  subtree: true,
});

removalobserver.observe(document.documentElement, {
  childList: true,
  subtree: true,
});
