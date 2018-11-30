const rp = require("request-promise");
const cheerio = require("cheerio");
const url = "https://www.modulargrid.net/e/noise-engineering-ataraxic-iteritas";
const fs = require("fs");

rp(url)
  .then(function(html) {
    const $ = cheerio.load(html);
    module.name = $("h1", html).text();
    module.brand = $("h2 a span", html).text();
    module.subheading = $(".lead", html).text();
    module.description = $("#module-details > p:nth-child(2)", html).text();
    module.pos12v = $("#module-details > ul > li:nth-child(1)", html).text();
    module.neg12v = $("#module-details > ul > li:nth-child(2)", html).text();
    module.pos5v = $("#module-details > ul > li:nth-child(3)", html).text();
    module.depth = $("#module-details > ul > li:nth-child(4)", html).text();
    module.price = $("#module-details > span", html).text();
    module.hp = $("#module-details > div.module-tags > span", html).text();
    module.tag2 = $("div.module-tags > a:nth-child(2)", html).text();
    module.tag3 = $("div.module-tags > a:nth-child(3)", html).text();
    module.tag4 = $("div.module-tags > a:nth-child(4)", html).text();
    module.inRacks = $("#related-racks > p > strong:nth-child(1)", html).text();
    return module;
  })
  .then(function(module) {
    const content = JSON.stringify(module);
    fs.writeFile("test.json", content, "utf8", function(err) {
      if (err) {
        return console.log(err + "inside error");
      }

      console.log("The file was saved!");
    });
  })
  .catch(function(err) {
    //handle error
    console.log("Oops, error");
  });

//module.exports = moduleParse;
