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

// This file is just a massive hack

(async () => {
  try {
    // HACK HACK HACK
    // Manifest v3 made me do this and i hate it
    let url = document.getElementById("injector").classList;
    const response = await fetch(url);
    const result = await response.text();
    
    eval(
      result.replaceAll(
        "name=split.name,version=split.version;",
        'name=split.name,version=split.version; if(module.includes("ext.fandom.ArticleComments.js")){let getpatchedfn = Function("return " + script.toString().replace("(r.isAnon?createAnnonymousComments:createComments)", "createComments"));script = getpatchedfn();}',
      ),
    );
  } catch (error) {
    console.error(error.message);
  }
})();
