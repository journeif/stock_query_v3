// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Function to get all favorites
export const getFavorites = async () => {
  try {
    const { data, error } = await supabase
      .from('favorites')
      .select('*')
      .order('created_at', { ascending: false });
      
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching favorites:', error);
    return [];
  }
};

// Function to add a favorite
export const addFavorite = async (stock) => {
  try {
    const { data, error } = await supabase
      .from('favorites')
      .insert([
        {
          symbol: stock.symbol,
          company_name: stock.companyName,
          price: stock.price,
          pe_ratio: stock.peRatio,
          eps: stock.eps,
          net_income_growth: stock.netIncomeGrowthRate,
          peg_ratio: stock.pegRatio,
          industry: stock.industry,
          high_52_week: stock.high52Week,
          low_52_week: stock.low52Week
        }
      ]);
      
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error adding favorite:', error);
    return null;
  }
};

// Function to remove a favorite
export const removeFavorite = async (symbol) => {
  try {
    const { error } = await supabase
      .from('favorites')
      .delete()
      .eq('symbol', symbol);
      
    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error removing favorite:', error);
    return false;
  }
};