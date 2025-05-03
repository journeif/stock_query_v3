# StackUp Stock Analytics

A modern React application for querying stock information and analyzing financial metrics.

## Features

- **Search Stocks**: Look up stocks by ticker symbol
- **Advanced Financial Metrics**: View calculated metrics including:
  - Current price and 52-week high/low
  - P/E ratio
  - Net Income Growth Rate (1-year)
  - PEG ratio (Price/Earnings to Growth)
  - Company industry and profile information
- **Favorites System**: Save and manage your favorite stocks
- **Industry Filtering**: Filter favorites by industry
- **Search & Filter**: Search functionality across your favorites
- **Error Handling**: Clean, user-friendly error messages
- **Responsive Design**: Works on mobile, tablet, and desktop

## Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/stackup.git
cd stackup
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with your API keys:
```
REACT_APP_FINNHUB_API_KEY=your_finnhub_api_key
REACT_APP_ALPHAVANTAGE_API_KEY=your_alphavantage_api_key
REACT_APP_SUPABASE_URL=your_supabase_url
REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Start the development server:
```bash
npm start
```

## Database Setup (Supabase)

1. Create a new project on [Supabase](https://supabase.io)
2. Create a new table called `favorites` with the following columns:

| Column Name | Type | Description |
|-------------|------|-------------|
| id | uuid | Primary key (default) |
| created_at | timestamp | Created timestamp (default) |
| symbol | text | Stock ticker symbol |
| company_name | text | Company name |
| price | float | Stock price |
| pe_ratio | float | Price to earnings ratio |
| eps | float | Earnings per share |
| net_income_growth | float | Net income growth percentage |
| peg_ratio | float | Price/Earnings to Growth ratio |
| industry | text | Company industry |
| high_52_week | float | 52-week high price |
| low_52_week | float | 52-week low price |

3. Get your Supabase URL and Anonymous Key from the project settings and add them to your `.env` file.

## API Keys

This project uses two financial APIs:

1. **Finnhub API**: Used for stock quotes and company profiles
   - Sign up at [Finnhub](https://finnhub.io/)

2. **Alpha Vantage API**: Used for comprehensive financial data
   - Sign up at [Alpha Vantage](https://www.alphavantage.co/)

## Tech Stack

- **Frontend**: React.js
- **State Management**: React Hooks (useState, useEffect)
- **API Calls**: Axios
- **Database**: Supabase
- **Styling**: Custom CSS

## Future Enhancements

- User authentication system
- Portfolio creation and tracking
- Stock comparison tool
- Historical price charts
- News integration
- More advanced financial metrics

## License

MIT
