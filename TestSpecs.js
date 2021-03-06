'use strict';

var assert = require('assert'),
    test = require('selenium-webdriver/testing'),
    selenium = require('selenium-webdriver');


test.describe('ToDo MVC', function() {
    this.timeout(15000);
    var driver;
    test.before(function() {
        driver = new selenium.Builder().withCapabilities(selenium.Capabilities.chrome()).build();
    });

    var todo_item_one = 'to do item one';

    test.it('ToDo MVC ', function(){

        selenium.promise.consume(function*() {
            yield driver.get('http://todomvc.com/examples/angularjs/#/');
            yield driver.wait(selenium.until.elementLocated(selenium.By.id('new-todo')), 3000);
            yield driver.findElement(selenium.By.id('new-todo')).sendKeys(todo_item_one);
            yield driver.findElement(selenium.By.id('todo-form')).submit();
            yield driver.findElement(selenium.By.css("#todo-list > li > div > label")).getText().then(function (value) {
                assert.equal(value, todo_item_one);
            });
        });

        test.after(function() {
            driver.quit();
        });
    });
});
