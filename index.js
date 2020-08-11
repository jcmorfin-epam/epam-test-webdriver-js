const {Builder, By, Key, util} = require("selenium-webdriver");
var assert = require('assert');

async function epamTest(){
    var driver = await new Builder().forBrowser("firefox").build();
    await driver.get("https://www.epam.com/");
    
    await driver.findElement(By.linkText("CONTACT US")).click();
    
    var currentTitle = await driver.getTitle();

    console.log("Current Title="+currentTitle);
    await assert.strictEqual(currentTitle, 'Learn more about EPAM and Contact Us | EPAM');

    await (await driver.findElement(By.className('button__content'))).click();
    
    await driver.findElement(By.name('user_first_name')).sendKeys("Test Name");
    await driver.findElement(By.name('user_last_name')).sendKeys("Test Lans Name");
    await driver.findElement(By.name('user_email')).sendKeys("test@email.com");
    await driver.findElement(By.name('user_phone')).sendKeys("3344556677");
    await driver.findElement(By.name('user_country')).click();
    await (await driver.findElement(By.css('input[class="select2-search__field"]'))).sendKeys('Mexico', Key.ENTER);
    await driver.findElement(By.xpath('//select[@name="user_city"]//following-sibling::span[@dir="ltr"]')).click();
    await (await driver.findElement(By.css('input[class="select2-search__field"]'))).sendKeys('Guadalajara', Key.ENTER);
    await driver.sleep(1000);
    await driver.findElement(By.name('user_comment')).sendKeys('Comments');

    //await driver.findElement(By.xpath('//select[@name="user_comment_how_hear_about"]//following-sibling::span')).click();

    await (await driver.findElement(By.css('label[for="new_form_gdprConsent"]'))).click();

    await driver.executeScript('document.querySelector(\'select[name="user_comment_how_hear_about"]\').value="Partner"');
    
    await (await driver.findElement(By.css('[type="submit"]'))).click();

}

epamTest();