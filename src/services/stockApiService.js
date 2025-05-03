// src/services/stockApiService.js
import axios from 'axios';

const finnhubApiKey = 'd0ajaahr01qm3l9lssagd0ajaahr01qm3l9lssb0';
const alphaVantageApiKey = 'YBXTO9WSBHARQ0E8T';

export const fetchStockData = async (symbol) => {
  if (!symbol) {
    throw new Error('Please enter a stock ticker symbol.');
  }

  try {
    // Fetch basic stock quote from Finnhub
    const quoteResponse = await axios.get(
      `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${finnhubApiKey}`
    );
    
    // Fetch company profile data from Finnhub
    const profileResponse = await axios.get(
      `https://finnhub.io/api/v1/stock/profile2?symbol=${symbol}&token=${finnhubApiKey}`
    );
    
    // Alpha Vantage Overview for P/E ratio and other fundamentals
    const alphaOverviewResponse = await axios.get(
      `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=${alphaVantageApiKey}`
    );
    
    // Alpha Vantage Annual Income Statements for Net Income data (last 2 years)
    const alphaIncomeResponse = await axios.get(
      `https://www.alphavantage.co/query?function=INCOME_STATEMENT&symbol=${symbol}&apikey=${alphaVantageApiKey}`
    );
    
    // Check if we have valid data
    if (quoteResponse.data && quoteResponse.data.c !== 0) {
      // Extract current price from Finnhub
      const currentPrice = quoteResponse.data.c;
      
      // Extract company profile info
      const profile = profileResponse.data || {};
      
      // Extract Alpha Vantage data
      const overviewData = alphaOverviewResponse.data || {};
      const incomeStatements = alphaIncomeResponse.data?.annualReports || [];
      
      // Get P/E ratio directly from Alpha Vantage
      const peRatio = parseFloat(overviewData.PERatio) || null;
      
      // Calculate 1-year Net Income Growth Rate
      let netIncomeGrowthRate = null;
      if (incomeStatements.length >= 2) {
        const newestNetIncome = parseFloat(incomeStatements[0].netIncome);
        const previousNetIncome = parseFloat(incomeStatements[1].netIncome);
        
        if (previousNetIncome && previousNetIncome !== 0) {
          netIncomeGrowthRate = ((newestNetIncome - previousNetIncome) / Math.abs(previousNetIncome)) * 100;
        }
      }
      
      // Calculate Growth over P/E (PEG ratio)
      let pegRatio = null;
      if (peRatio !== null && netIncomeGrowthRate !== null && netIncomeGrowthRate > 0) {
        pegRatio = peRatio / netIncomeGrowthRate;
      }
      
      return {
        symbol,
        price: currentPrice,
        companyName: profile.name || overviewData.Name || symbol,
        industry: profile.finnhubIndustry || overviewData.Industry || 'N/A',
        peRatio: peRatio !== null ? peRatio.toFixed(2) : 'N/A',
        eps: overviewData.EPS || 'N/A',
        high52Week: profile.high52Week || 'N/A',
        low52Week: profile.low52Week || 'N/A',
        netIncomeGrowthRate: netIncomeGrowthRate !== null ? netIncomeGrowthRate.toFixed(2) + '%' : 'N/A',
        pegRatio: pegRatio !== null ? pegRatio.toFixed(2) : 'N/A',
        description: overviewData.Description || profile.description || 'No description available'
      };
    } else {
      throw new Error('No data found for this ticker symbol.');
    }
  } catch (error) {
    console.error('Error fetching stock data:', error);
    throw new Error(
      error.response?.status === 429
        ? 'API rate limit exceeded. Please try again later.'
        : 'Error fetching stock data. Please check the ticker symbol and try again.'
    );
  }
};