# CRI$$ CRO$$ Currency Converter Project

This project is a currency converter web application that allows users to convert between different currencies. It utilizes the Open Exchange Rates API for currency conversion rates and the FlagsAPI for fetching country flags.

## Getting Started

To get started with this project, follow these steps:

1. Clone the repository to your local machine.
2. Obtain your own API key for the Open Exchange Rates API and replace the placeholder variable `apiKey` in `config.sample.js` with your actual API key.
3. Open the `index.html` file in a web browser to use the currency converter.

## Features

- Convert between different currencies.
- Select currencies from dropdown menus.
- Swap currencies with the click of a button.
- Display the exchange rate for the selected currencies.
- Supported currencies are dynamically fetched from the Open Exchange Rates API.
- Popular conversion buttons for quick access to common currency pairs.

## Usage

### Currency Conversion

1. Enter the amount you want to convert into the input box.
2. Select the currency you want to convert from in the "From" dropdown menu.
3. Select the currency you want to convert to in the "To" dropdown menu.
4. The converted amount will be displayed in the output box.

### Popular Conversions

- Click on any of the popular conversion buttons to automatically select the corresponding currencies and perform the conversion.

## Supported Currencies

The list of supported currencies is fetched dynamically from the Open Exchange Rates API. Country flags associated with each currency are displayed using the FlagsAPI.

## Inspiration

While on vacation abroad, I found it annoying that I had to constantly open up a browser tab to convert currencies. There were also no ad-free apps that could help me easily convert currencies, so I decided to tackle this problem on my own and create a currency converter for future trips.

