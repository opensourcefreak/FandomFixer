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

// Chromium compatability
let mBrowser;
if (typeof chrome !== "undefined") {
  mBrowser = chrome;
} else {
  mBrowser = browser;
}

// Block all requests not from these sites
// This is very effecitve at disabling trackers
const regexes = [
  /https?:\/.+fandom\.com\/.+/,
  /https?:\/\/static\.wikia\.nocookie\.net.+/,
  /https?:\/\/fonts\.gstatic\.com.+/,
  /https?:\/\/cdn\.cookielaw\.org.+/,
  /https?:\/\/.+wikimedia\.org.+/,
];

function isAllowedHost(host) {
  allowed = false;

  regexes.forEach((regex) => {
    if (regex.test(host)) {
      allowed = true;
    }
  });

  return allowed;
}

mBrowser.webRequest.onBeforeRequest.addListener(
  (requestDetails) => {
    if (!regexes[0].test(requestDetails.documentUrl)) return;

    if (!isAllowedHost(requestDetails.url))
      return {
        cancel: true,
      };
  },
  { urls: ["<all_urls>"] },
  ["blocking"],
);
