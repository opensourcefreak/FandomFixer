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

// Removes the black bars around the background
// I can't rememeber how/why any of this works so just dont touch it please
// trust me, I've tried to clean it up
document.querySelectorAll(".main-container").forEach((e) => {
  e.style.margin = "0px";
  e.style.width = "100%";
});

document
  .querySelectorAll(".fandom-community-header__background")
  .forEach((e) => {
    e.style.width = "100%";
    e.style.paddingTop = "calc(var(--image-ratio)*100%)";
  });

// Fixes seach bar to not look retarded
let nodes = document.querySelectorAll(".search-container").forEach((node) => {
  node.style.margin = "0px";
  node.style.marginRight = "-0.8em"; // Stupidly big margin by default, i know this is hack
});
