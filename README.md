# QA Automation Assessment - react-nodejs-test-automation-challenge

> **Description**:  Demonstration of Playwright UI testing and Postman API automation skills with 1-2 minutes setup.


### Application Under Test
- **Frontend**: `https://task-manager-app-o78d.vercel.app/` (React)
- **API Endpoints**: `https://restful-booker.herokuapp.com/` (Nodejs)


## **Project Structure**
```
qa-automation-assessment/
├── .github/
│   └── workflows/
│       ├── playwright.yml         # UI test automation
│       └── postman.yml            # API test automation
├── fixtures/
│   └── fixtures.json              # Test data
├── objectRepository/
│   ├── loginPage.js               # Login page objects
│   ├── pageManager.js             # Page manager
│   └── taskPage.js                # Task/booking page objects
├── selectors/
│   └── taskManagerApp.js          # UI element selectors
├── tests/
│   └── test.spec.js               # Playwright test 
├── postman-collections/
│   ├── restful-booker-api.json    # API test 
│
├── API-Documentation.pdf          # Detailed API documentation    
├── playwright.config.js           # Playwright configuration
├── package.json
└── README.md
```

## What’s Included

**Playwright**
- **Automated Tests**: Written using [Playwright], tests common user flows such as Login , Create, Edit and Delete. File directory: `tests/test.spec.js`
- **Page Object Model**: Cleanly separated into `ObjectRepository/` for modular test logic.
- **Test Data Management**: Reusable test data maintained in `utils/fixtures.json` (general test data). UI element selectors organized in `selectors/eCommerceSelectors.ts` for better readability and maintainability.
- **GitHub Actions CI**: Configured in `.github/workflows/playwright.yml` to run tests on push and pull requests.

**Postman**
- **Automated Tests**: Written using [Postman], tests common user flows such as Login , Create, Edit and Delete. File directory: `postman-collection/restful-booker-api.json`
- **Collection Variables**: Dynamically stored collection variables for better reusability.
- **GitHub Actions CI**: Configured in `.github/workflows/postman.yml` to run tests on push and pull requests.


## How to Run Tests Locally

**Playwright**

1. Clone this repository:
```
   git clone `https://github.com/ChukaKenny/react-nodejs-test-automation-challenge.git`
   cd react-nodejs-test-automation-challenge 
```
   

2. Install dependencies:
   
   npm install
   

3. Run Playwright tests:
  
   npx playwright test
   

4. View the HTML report:
   
   npx playwright show-report


**Postman**

1. Clone this repository:
```
   git clone `https://github.com/ChukaKenny/react-nodejs-test-automation-challenge.git`
   cd react-nodejs-test-automation-challenge 
```
   

2. Install Newman and HTML Reporter globally:
   
    npm install -g newman newman-reporter-htmlextra

   

3. Run the Postman collection:
  
    newman run ./postman-collection/restful-booker-api.json --reporters cli,htmlextra --reporter-htmlextra-export newman-report.html

   

4. View the HTML report:
   
   start newman-report.html  # Windows
   open newman-report.html  # macOS



## CI Workflow

GitHub Actions will automatically run all Playwright and Postman tests on each push or pull request.



## **Assessment Overview**

| Component | Technology | Status | Coverage |
|-----------|------------|--------|----------|
| **UI Tests** | Playwright | Passing | Login, CRUD, Validation |
| **API Tests** | Postman/Newman | Passing | All endpoints, +/- scenarios |
| **CI/CD** | GitHub Actions | Automated | On push/PR |
| **Documentation** | Comprehensive | Complete | Test plans & reports |


**Time Investment**: Under 4 hours as requested  
**Focus**: Professional QA automation demonstration using industry best practices  
**Contact**: Available for technical discussion or demonstration