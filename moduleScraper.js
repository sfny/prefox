const puppeteer = require("puppeteer");
const cheerio = require("cheerio");
const moduleParse = require("./moduleParse");
const url =
  "https://www.modulargrid.net/e/modules/find?SearchName=&SearchVendor=213&SearchFunction=&SearchSecondaryfunction=&SearchTe=&SearchTemethod=max&SearchBuildtype=&SearchLifecycle=&SearchSet=&SearchMarketplace=&SearchIsmodeled=0&SearchShowothers=0&SearchShow1u=0&order=newest&direction=asc";
modules = [];
puppeteer
  .launch()
  .then(function(browser) {
    return browser.newPage();
  })
  .then(function(page) {
    return page.goto(url).then(function() {
      return page.content();
    });
  })
  .then(function(html) {
    const $ = cheerio.load(html);
    const m = "modules";
    $(".box-module a").each(function(i, el) {
      link = $(el).attr("href");
      slink = link.toString();
      if (slink.includes(m) == false) {
        console.log(slink);
        modules.push(slink);
      } else {
      }
    });
  })
  .catch(function(err) {
    //handle error
    console.log("somthing wrong");
  });
