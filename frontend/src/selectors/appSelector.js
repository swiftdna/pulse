const currencyMapping = {
	'USD': '$',
	'EUR': '€',
	'GBP': '£',
	'INR': '₹'
};

export const selectAlertFlag = (state) => state.app.alert;
export const selectToastFlag = (state) => state.app.toast;
export const selectAlertMessage = (state) => state.app.alertMessage;
export const selectAlertType = (state) => state.app.alertType;
export const selectIsLoggedIn = (state) => state.app.isLoggedIn;
export const selectUser = (state) => state.app.user;
export const selectFarm = (state) => state.app.farm;
export const selectCountries = (state) => state.app.countries;
export const selectCurrency = (state) => state.app.currency && currencyMapping[state.app.currency] ? currencyMapping[state.app.currency] : state.app.currency;
export const selectRedirectionPath = (state) => state.app.redirectionPath;