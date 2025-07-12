// প্রয়োজনীয় লাইব্রেরিগুলো ইম্পোর্ট করা
const express = require('express');
const axios = require('axios');
const cors = require('cors');

// Express অ্যাপ তৈরি করা
const app = express();

// Render যে পোর্ট নম্বর দেবে, সেটি ব্যবহার করা, অথবা ডিফল্ট হিসেবে 3000 ব্যবহার করা
const PORT = process.env.PORT || 3000;

// CORS (Cross-Origin Resource Sharing) চালু করা
app.use(cors());

// আমাদের প্রধান প্রক্সি রুট তৈরি করা
app.get('/proxy', async (req, res) => {
  // ব্যবহারকারীর পাঠানো টার্গেট URL-টি গ্রহণ করা
  const targetUrl = req.query.url;

  // যদি কোনো URL না দেওয়া হয়, তাহলে এরর মেসেজ পাঠানো
  if (!targetUrl) {
    return res.status(400).send({ error: 'A target URL must be provided as a query parameter.' });
  }

  try {
    // Axios ব্যবহার করে টার্গেট URL-টিতে একটি GET অনুরোধ পাঠানো
    const response = await axios.get(targetUrl, {
      headers: {
        // বিনান্সের জন্য প্রয়োজনীয় হেডার এখানেও যোগ করা যেতে পারে, যদি প্রয়োজন হয়
        'Content-Type': 'application/json'
      }
    });
    
    // বিনান্স থেকে পাওয়া ডেটাটি ব্যবহারকারীকে ফেরত পাঠানো
    res.status(200).json(response.data);

  } catch (error) {
    // যদি কোনো এরর হয়, তাহলে সেই এররটি বিস্তারিতভাবে পাঠানো
    console.error('Proxy Error:', error.message);
    res.status(error.response ? error.response.status : 500).send({ 
      error: 'Failed to fetch data from the target URL.',
      details: error.message 
    });
  }
});

// সার্ভার চালু করা এবং নির্দিষ্ট পোর্টে অনুরোধের জন্য অপেক্ষা করা
app.listen(PORT, () => {
  console.log(`Proxy server is running on port ${PORT}`);
});
