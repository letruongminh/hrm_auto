import { Then, When } from "@cucumber/cucumber";
import { CommonPage } from "../pages/common-page";
import { AdminSearchPage } from "../pages/admin-search-page";

When('I access the {string} menu', async function (menuName: string) {
    await new CommonPage(this.page).accessMenu(menuName);
});

When('I search for the user with {string}', async function (username: string) {
    await new AdminSearchPage(this.page).searchByUsername(username);
});

Then('I should see the user in the search results', async function () {
    await new AdminSearchPage(this.page).verifyAdminSearchResultsVisible();
});