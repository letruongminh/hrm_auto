import { Then, When } from "@cucumber/cucumber";
import { CommonPage } from "../pages/common-page";
import { AdminSearchPage } from "../pages/admin-search-page";

When('I access the {string} menu', async function (menuName: string) {
    await new CommonPage(this.page).accessMenu(menuName);
});

When('I search for the user with by using {string} with {string}', async function (fieldName: string, fieldValue: string) { 
    await new AdminSearchPage(this.page).searchByField(fieldName, fieldValue);
});

When('I hit the search button', async function () {
    await new AdminSearchPage(this.page).hitSearchButton();
});

Then('I should see the user in the search results', async function () {
    await new AdminSearchPage(this.page).verifyAdminSearchResultsVisible();
});