const { test, expect, request } = require('@playwright/test');
const { POManager } = require('../PageObjects/POManager');

const BASE_URL = 'https://eventhub.rahulshettyacademy.com';
const API_URL = `${BASE_URL}/api`;

// Dummy users
const YAHOO_USER = {
	email: 'yahoo_dummy@example.com',
	password: 'YahooPass123!'
};
const GMAIL_USER = {
	email: 'gmail_dummy@example.com',
	password: 'GmailPass123!'
};

test('Assignment 3: Booking access control', async ({ browser, request }) => {
	// Step 1: Login as Yahoo user via API
	const loginRes = await request.post(`${API_URL}/auth/login`, {
		data: {
			email: YAHOO_USER.email,
			password: YAHOO_USER.password
		}
	});
	expect(loginRes.ok()).toBeTruthy();
	const loginJson = await loginRes.json();
	const yahooToken = loginJson.token;

	// Step 2: Fetch events via API
	const eventsRes = await request.get(`${API_URL}/events`, {
		headers: {
			Authorization: `Bearer ${yahooToken}`
		}
	});
	expect(eventsRes.ok()).toBeTruthy();
	const eventsJson = await eventsRes.json();
	const eventId = eventsJson.data[0].id;

	// Step 3: Create a booking as Yahoo user
	const bookingPayload = {
		eventId,
		customerName: 'Yahoo User',
		customerEmail: YAHOO_USER.email,
		customerPhone: '1234567890',
		quantity: 1
	};
	const bookingRes = await request.post(`${API_URL}/bookings`, {
		headers: {
			Authorization: `Bearer ${yahooToken}`
		},
		data: bookingPayload
	});
	expect(bookingRes.ok()).toBeTruthy();
	const bookingJson = await bookingRes.json();
	const yahooBookingId = bookingJson.data.id;

	// Step 4: Login as Gmail user via browser UI
	const context = await browser.newContext();
	const page = await context.newPage();
	const poManager = new POManager(page);
	await page.goto(`${BASE_URL}/client/#/auth/login`);
	await poManager.getLoginPage().validLogin(GMAIL_USER.email, GMAIL_USER.password);

	// Step 5: Navigate to Yahoo's booking URL as Gmail user
	await page.goto(`${BASE_URL}/bookings/${yahooBookingId}`, { waitUntil: 'networkidle' });

	// Step 6: Validate Access Denied
	await expect(page.locator('text=Access Denied')).toBeVisible();
	await expect(page.locator('text=You are not authorized to view this booking')).toBeVisible();
});
