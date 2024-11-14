


// server.js
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config({ path: '.env' });
const session = require('express-session');
const MongoStore = require('connect-mongo');
const cors = require('cors');
const path = require('path');
const methodOverride = require('method-override');
const rateLimit = require('express-rate-limit');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: 'https://petportfoliosite.pages.dev', // Your frontend domain
    methods: ['POST', 'GET', 'DELETE', 'PUT'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// Use forms for put / delete
app.use(methodOverride('_method'));

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
});
app.use(limiter);

// Setup Sessions - stored in MongoDB
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'defaultSecret',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
      ttl: 14 * 24 * 60 * 60,
    }),
  })
);

const PORT = process.env.PORT || 5000;

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('MongoDB Connected');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

// Mongoose Schema and Model
const QuestionnaireResponseSchema = new mongoose.Schema(
  {
    servicesOffered: [String],
    businessName: String,
    uniqueSellingPoints: String,
    idealClients: [String],
    primaryPetsServed: [String],
    targetAudienceDescription: String,
    primaryWebsiteGoal: [String],
    secondaryWebsiteGoal: [String],
    haveExistingWebsite: Boolean,
    budgetRange: String,
    desiredCustomerFeelings: [String],
    importantUserInteractions: [String],
    websiteStyle: [String],
    preferredImagery: [String],
    mustHaveFeatures: [String],
    needEcommerce: Boolean,
    includeBlogOrNewsletter: Boolean,
    websiteUpdateFrequency: [String],
    includePetResources: Boolean,
    desiredVisitorActions: [String],
    ctaPlacement: [String],
    admiredCompetitorWebsites: String,
    haveLogoAndBranding: Boolean,
    preferredColorSchemes: [String],
    mobileOptimizationImportance: String,
    anticipateServiceExpansion: Boolean,
    needWebsiteFlexibility: Boolean,
    interestedInSEO: Boolean,
    interestedInAnalytics: Boolean,
    email: {
      type: String,
      required: true,
    },
    phone: String,
    agreeToCommunications: Boolean,
  },
  { timestamps: true }
);

const QuestionnaireResponse = mongoose.model(
  'QuestionnaireResponse',
  QuestionnaireResponseSchema
);



const WebsiteQuestionnaireResponseSchema = new mongoose.Schema(
  {
    servicesOffered: {
      type: [String],
      required: true,
    },
    businessName: {
      type: String,
      required: true,
    },
    uniqueSellingPoints: {
      type: String,
      required: true,
    },
    idealClients: {
      type: [String],
      required: true,
    },
    targetAudienceDescription: {
      type: String,
      required: true,
    },
    primaryWebsiteGoal: {
      type: [String],
      required: true,
    },
    secondaryWebsiteGoal: {
      type: [String],
    },
    haveExistingWebsite: {
      type: Boolean,
      required: true,
    },
    budgetRange: {
      type: String,
      required: true,
    },
    desiredCustomerFeelings: {
      type: [String],
    },
    importantUserInteractions: {
      type: [String],
    },
    websiteStyle: {
      type: [String],
    },
    preferredImagery: {
      type: [String],
    },
    mustHaveFeatures: {
      type: [String],
    },
    needEcommerce: {
      type: Boolean,
    },
    includeBlogOrNewsletter: {
      type: Boolean,
    },
    websiteUpdateFrequency: {
      type: [String],
    },
    desiredVisitorActions: {
      type: [String],
    },
    ctaPlacement: {
      type: [String],
    },
    admiredCompetitorWebsites: {
      type: String,
    },
    haveLogoAndBranding: {
      type: Boolean,
    },
    preferredColorSchemes: {
      type: [String],
    },
    mobileOptimizationImportance: {
      type: String,
    },
    anticipateServiceExpansion: {
      type: Boolean,
    },
    needWebsiteFlexibility: {
      type: Boolean,
    },
    interestedInSEO: {
      type: Boolean,
    },
    interestedInAnalytics: {
      type: Boolean,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },
    agreeToCommunications: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

const WebsiteQuestionnaireResponse = mongoose.model(
  'WenbsiteQuestionnaireResponse',
  WebsiteQuestionnaireResponseSchema
);



// Controller to create a new questionnaire response
const createQuestionnaireResponse = async (req, res) => {

   console.log('Request body:', req.body); // Log request data
  try {
    const data = req.body;

    // Validate required fields
    if (!data.email || !data.budgetRange) {
      return res
        .status(400)
        .json({ success: false, message: 'Email and budget range are required.' });
    }

    const newResponse = new QuestionnaireResponse(data);

    await newResponse.save();

    res.status(200).json({ success: true, message: 'Questionnaire submitted successfully!' });
  } catch (error) {
    console.error('Error Saving Questionnaire Response:', error);
    res.status(500).json({ success: false, message: 'Error submitting questionnaire!' });
  }
};

const createWebsiteQuestionnaireResponse = async (req, res) => {

   console.log('Request body:', req.body); // Log request data
  try {
    const data = req.body;

    // Validate required fields
    if (!data.email || !data.budgetRange) {
      return res
        .status(400)
        .json({ success: false, message: 'Email and budget range are required.' });
    }

    const newResponse = new WebsiteQuestionnaireResponse(data);

    await newResponse.save();

    res.status(200).json({ success: true, message: 'Website Questionnaire submitted successfully!' });
  } catch (error) {
    console.error('Error Saving Questionnaire Response:', error);
    res.status(500).json({ success: false, message: 'Error submitting questionnaire!' });
  }
};

// Routes
app.post('/questionnaire/create', createQuestionnaireResponse);

app.post('/websitequestionaire/create', createWebsiteQuestionnaireResponse)

app.get('/questionnaire/getall', async (req, res) => {
  try {
    const responses = await QuestionnaireResponse.find().sort({ createdAt: -1 });
    res.status(200).json(responses);
  } catch (error) {
    console.error('Error retrieving questionnaire responses:', error);
    res
      .status(500)
      .json({ success: false, message: 'Error retrieving questionnaire responses' });
  }
});

app.delete('/questionnaire/delete/:id', async (req, res) => {
  try {
    const responseId = req.params.id;
    const result = await QuestionnaireResponse.findByIdAndDelete(responseId);
    if (!result) {
      return res.status(404).json({ success: false, message: 'Questionnaire response not found' });
    }
    res
      .status(200)
      .json({ success: true, message: 'Questionnaire response deleted successfully' });
  } catch (error) {
    console.error('Error deleting questionnaire response:', error);
    res.status(500).json({ success: false, message: 'Error deleting questionnaire response' });
  }
});

// Basic route for testing
app.get('/', (req, res) => {
  res.json('Welcome to The Questionnaire API server!');
});

// Static files (if needed)
app.use(express.static(path.join(__dirname, 'dist')));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
});

// Server startup
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
