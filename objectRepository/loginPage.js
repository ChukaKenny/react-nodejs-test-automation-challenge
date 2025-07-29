/**
 * Login Page Object for Task Manager App
 * This module defines the login page actions and assertions for the Task Manager application.
 */

const { expect } = require('@playwright/test');
const fixtures = require('../utils/fixtures.json');
const selectors = require('../selectors/taskManagerApp');

class loginPage {

 constructor(page) {
  this.page = page;
  this.usernameField = page.getByTestId(selectors.login.usernameInput);
  this.passwordField = page.getByTestId(selectors.login.passwordInput);
  this.loginButton = page.getByTestId(selectors.login.loginButton);
  this.welcomeMessageLocator = page.getByTestId(selectors.login.welcomeMessage);
 }

 /*
 *Logs in to the Task Manager application.
 * This method navigates to the login page & fills in the username and password
 */
 async login(){ 
  await this.page.goto("https://task-manager-app-o78d.vercel.app/")
  await this.usernameField.fill(fixtures.login.username);
  await this.passwordField.fill(fixtures.login.password);
  await this.loginButton.click();
  await this.page.waitForLoadState()
  await this.welcomeMessageLocator.waitFor() 
 }

 /**
  * Asserts that the login was successful by checking the welcome message.
  * This method verifies that the welcome message is displayed correctly after login.
  */
 async assertThatLoginWasSuccessful() {
    await expect(this.welcomeMessageLocator).toHaveText(new RegExp(fixtures.login.welcomeText, 'i'));
 }

}

module.exports = {loginPage}