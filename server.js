// const express = require('express');
// const mongoose = require('mongoose');
// require("dotenv").config({ path: ".env" });
// const session = require("express-session");
// const MongoStore = require("connect-mongo");
// const cors = require('cors');
// const path = require('path');
// const methodOverride = require("method-override");
// const app = express();

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// app.use(cors({
//   origin: 'https://petportfoliosite.pages.dev',  // Your frontend domain
//   methods: ['POST', 'GET', 'DELETE', 'PUT'],
//   credentials: true,  // Allow credentials (cookies, authorization headers, etc.)
//   allowedHeaders: ['Content-Type', 'Authorization'], // Allow necessary headers
// }));

// // Use forms for put / delete
// app.use(methodOverride("_method"));

// // Setup Sessions - stored in MongoDB
// app.use(
//   session({
//     secret: "keyboard cat",
//     resave: false,
//     saveUninitialized: false,
//     store: MongoStore.create({ 
//       mongoUrl: process.env.MONGODB_URI,
//       ttl: 14 * 24 * 60 * 60 }),
//   })
// );

// const PORT = process.env.PORT;

// // MongoDB connection
// mongoose.connect(process.env.MONGODB_URI).then(() => {
//     console.log('MongoDB Connected');
// }).catch(err => {
//     console.error('MongoDB connection error:', err);
// });

// // 1. Define Schemas and Models


// const QuestionnaireResponseSchema = new mongoose.Schema({
//   // About Your Business
//   servicesOffered: [String],          // Answer to "What type of pet care services do you offer?"
//   businessName: String,               // Answer to "What is the name of your pet care business?"
//   uniqueSellingPoints: String,        // Answer to "What makes your pet care services unique compared to other local competitors?"

//   // Target Audience
//   idealClients: [String],             // Answer to "Who are your ideal clients?"
//   primaryPetsServed: [String],        // Answer to "What kind of pets do you primarily serve?"
//   targetAudienceDescription: String,  // **New Field**: "Describe your target audience or typical client"

//   // Website Goals
//   primaryWebsiteGoal: [String],       // Answer to "What is your primary goal for your website?"
//   secondaryWebsiteGoal: [String],     // Answer to "What is the secondary goal of your website?"

//   // New Field: Do you currently have a website?
//   haveExistingWebsite: Boolean,       // Answer to "Do you currently have a website?"

//   // New Field: What is your budget range for this project?
   
//   budgetRange: { 
//       type: String,
//       enum: ["<£1000", "£1000 - £2000", "£2000 - £5000", ">£5000"],
//       required: true
// }, // Answer to "What is your budget range for this project?"

//   // User Experience (UX)
//   desiredCustomerFeelings: [String],  // Answer to "How do you want your customers to feel when they visit your website?"
//   importantUserInteractions: [String],// Answer to "Which user interactions are most important for you?"

//   // Website Tone and Style
//   websiteStyle: [String],             // Answer to "What style do you envision for your website?"
//   preferredImagery: [String],         // Answer to "What type of imagery or themes would resonate best with your clients?"

//   // Website Features
//   mustHaveFeatures: [String],         // Answer to "What specific features are you interested in?"
//   needEcommerce: Boolean,             // Answer to "Do you need an eCommerce feature for selling pet-related products?"
//   includeBlogOrNewsletter: Boolean,   // Answer to "Would you like to include a blog or newsletter to share pet care tips and advice?"

//   // Content and Updates
//   websiteUpdateFrequency: [String],   // Answer to "How frequently do you plan to update your website?"
//   includePetResources: Boolean,       // Answer to "Would you like your clients to easily access pet-related resources or information on your site?"

//   // Call to Action (CTA)
//   desiredVisitorActions: [String],    // Answer to "What actions do you want visitors to take on your website?"
//   ctaPlacement: [String],             // Answer to "Where would you like the most important CTAs (call-to-action buttons) to be placed?"

//   // Competitor Insights
//   admiredCompetitorWebsites: String,  // Answer to "Are there any competitor websites that you admire?"

//   // Branding and Design Preferences
//   haveLogoAndBranding: Boolean,       // Answer to "Do you already have a logo and branding in place?"
//   preferredColorSchemes: [String],    // Answer to "What are your preferred color schemes?"

//   // Mobile Experience
//   mobileOptimizationImportance: String,// Answer to "How important is it for your website to work seamlessly on mobile devices?"

//   // Future Growth
//   anticipateServiceExpansion: Boolean,// Answer to "Do you anticipate expanding your services in the future?"
//   needWebsiteFlexibility: Boolean,    // Answer to "Would you like your website to have the flexibility to grow with your business?"

//   // SEO and Analytics
//   interestedInSEO: Boolean,           // Answer to "Are you interested in optimizing your website for search engines (SEO) to reach more clients?"
//   interestedInAnalytics: Boolean,     // Answer to "Would you like to track visitor behavior and engagement using analytics?"

//   // **New Fields**
//   email: {
//     type: String,
//     required: true,
//     validate: {
//       validator: function(v) {
//         // Simple email validation regex
//         return /^\S+@\S+\.\S+$/.test(v);
//       },
//       message: props => `${props.value} is not a valid email address!`
//     }
//   },                                  // Answer to "Email"
//   phone: String,                      // Answer to "Phone Number"
//   agreeToCommunications: Boolean,     // Answer to "By checking this box you agree to future communications"
  
// }, { timestamps: true });

// const QuestionnaireResponse = mongoose.model('QuestionnaireResponse', QuestionnaireResponseSchema);

// // Controller to create a new questionnaire response
// const createQuestionnaireResponse = async (req, res) => {
//   try {
//     const {
//       // About Your Business
//       servicesOffered,
//       businessName,
//       uniqueSellingPoints,

//       // Target Audience
//       idealClients,
//       primaryPetsServed,
//       targetAudienceDescription,

//       // Website Goals
//       primaryWebsiteGoal,
//       secondaryWebsiteGoal,

//       // New Field: Do you currently have a website?
//       haveExistingWebsite,

//       // New Field: What is your budget range for this project?
//       budgetRange,

//       // User Experience (UX)
//       desiredCustomerFeelings,
//       importantUserInteractions,

//       // Website Tone and Style
//       websiteStyle,
//       preferredImagery,

//       // Website Features
//       mustHaveFeatures,
//       needEcommerce,
//       includeBlogOrNewsletter,

//       // Content and Updates
//       websiteUpdateFrequency,
//       includePetResources,

//       // Call to Action (CTA)
//       desiredVisitorActions,
//       ctaPlacement,

//       // Competitor Insights
//       admiredCompetitorWebsites,

//       // Branding and Design Preferences
//       haveLogoAndBranding,
//       preferredColorSchemes,

//       // Mobile Experience
//       mobileOptimizationImportance,

//       // Future Growth
//       anticipateServiceExpansion,
//       needWebsiteFlexibility,

//       // SEO and Analytics
//       interestedInSEO,
//       interestedInAnalytics,

//       // Contact Information
//       email,
//       phone,
//       agreeToCommunications,
//     } = req.body;

//     // Create a new QuestionnaireResponse document
//     const newResponse = new QuestionnaireResponse({
//       servicesOffered,
//       businessName,
//       uniqueSellingPoints,
//       idealClients,
//       primaryPetsServed,
//       targetAudienceDescription,
//       primaryWebsiteGoal,
//       secondaryWebsiteGoal,
//       haveExistingWebsite,
//       budgetRange,
//       desiredCustomerFeelings,
//       importantUserInteractions,
//       websiteStyle,
//       preferredImagery,
//       mustHaveFeatures,
//       needEcommerce,
//       includeBlogOrNewsletter,
//       websiteUpdateFrequency,
//       includePetResources,
//       desiredVisitorActions,
//       ctaPlacement,
//       admiredCompetitorWebsites,
//       haveLogoAndBranding,
//       preferredColorSchemes,
//       mobileOptimizationImportance,
//       anticipateServiceExpansion,
//       needWebsiteFlexibility,
//       interestedInSEO,
//       interestedInAnalytics,
//       email,
//       phone,
//       agreeToCommunications: agreeToCommunications === 'Yes', // Converts 'Yes' to true, 'No' to false,
//     });

//     await newResponse.save();

//     res.status(200).json({ success: true, message: 'Questionnaire submitted successfully!' });
//   } catch (error) {
//     console.error('Error Saving Questionnaire Response:', error);
//     res.status(500).json({ success: false, message: 'Error submitting questionnaire!' });
//   }
// };

// // Controller to retrieve all questionnaire responses
// const getQuestionnaireResponses = async (req, res) => {
//   try {
//     const responses = await QuestionnaireResponse.find().sort({ createdAt: -1 });
//     console.log('Questionnaire Responses from MongoDB:', responses);
//     res.status(200).json(responses);
//   } catch (error) {
//     console.error('Error retrieving questionnaire responses:', error);
//     res.status(500).json({ success: false, message: 'Error retrieving questionnaire responses' });
//   }
// };

// // Controller to delete a specific questionnaire response by ID
// const deleteQuestionnaireResponse = async (req, res) => {
//   try {
//     console.log('Delete request received for ID:', req.params.id);
//     const responseId = req.params.id;
//     const result = await QuestionnaireResponse.findByIdAndDelete(responseId);

//     console.log('Questionnaire Response Deleted:', result);
//     if (!result) {
//       return res.status(404).json({ success: false, message: 'Questionnaire response not found' });
//     }
//     res.status(200).json({ success: true, message: 'Questionnaire response deleted successfully' });
//   } catch (error) {
//     console.error('Error deleting questionnaire response:', error);
//     res.status(500).json({ success: false, message: 'Error deleting questionnaire response' });
//   }
// };



// app.post('/questionnaire/create', createQuestionnaireResponse);
// app.get('/questionnaire/getall', getQuestionnaireResponses);
// app.delete('/questionnaire/delete/:id', deleteQuestionnaireResponse);


// app.get('/', (req, res) => {
//   res.json('Welcome to The Questionaire API server!');
// });


// app.use(express.static(path.join(__dirname, 'dist')));

// app.get('*', (req, res) => {
//   res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
// });

// // 6. Server Startup

// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });



// server.js
const express = require('express');
const mongoose = require('mongoose');
require("dotenv").config({ path: ".env" });
const session = require("express-session");
const MongoStore = require("connect-mongo");
const cors = require('cors');
const path = require('path');
const methodOverride = require("method-override");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: 'https://petportfoliosite.pages.dev',  // Your frontend domain
  methods: ['POST', 'GET', 'DELETE', 'PUT'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(methodOverride("_method"));

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ 
      mongoUrl: process.env.MONGODB_URI,
      ttl: 14 * 24 * 60 * 60,
    }),
  })
);

const PORT = process.env.PORT;

mongoose.connect(process.env.MONGODB_URI).then(() => {
  console.log('MongoDB Connected');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

const QuestionnaireResponseSchema = new mongoose.Schema({
  servicesOffered: [String],
  businessName: String,
  uniqueSellingPoints: String,
  idealClients: [String],
  primaryPetsServed: [String],
  targetAudienceDescription: String,
  primaryWebsiteGoal: [String],
  secondaryWebsiteGoal: [String],
  haveExistingWebsite: Boolean,
  budgetRange: { 
    type: String,
    enum: ["<£1000", "£1000 - £2000", "£2000 - £5000", ">£5000"],
    required: true,
  },
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
    validate: {
      validator: function(v) {
        return /^\S+@\S+\.\S+$/.test(v);
      },
      message: props => `${props.value} is not a valid email address!`
    }
  },
  phone: String,
  agreeToCommunications: Boolean,
}, { timestamps: true });

const QuestionnaireResponse = mongoose.model('QuestionnaireResponse', QuestionnaireResponseSchema);

const createQuestionnaireResponse = async (req, res) => {
  try {
    const { email, budgetRange } = req.body;
    if (!email || !budgetRange) {
      return res.status(400).json({ success: false, message: 'Email and budget range are required.' });
    }

    const newResponse = new QuestionnaireResponse({
      ...req.body,
      agreeToCommunications: req.body.agreeToCommunications === 'Yes',
    });

    await newResponse.save();
    res.status(200).json({ success: true, message: 'Questionnaire submitted successfully!' });
  } catch (error) {
    console.error('Error Saving Questionnaire Response:', error);
    res.status(500).json({ success: false, message: 'Error submitting questionnaire!' });
  }
};

const getQuestionnaireResponses = async (req, res) => {
  try {
    const responses = await QuestionnaireResponse.find().sort({ createdAt: -1 });
    res.status(200).json(responses);
  } catch (error) {
    console.error('Error retrieving questionnaire responses:', error);
    res.status(500).json({ success: false, message: 'Error retrieving questionnaire responses' });
  }
};

const deleteQuestionnaireResponse = async (req, res) => {
  try {
    const responseId = req.params.id;
    const result = await QuestionnaireResponse.findByIdAndDelete(responseId);
    if (!result) {
      return res.status(404).json({ success: false, message: 'Questionnaire response not found' });
    }
    res.status(200).json({ success: true, message: 'Questionnaire response deleted successfully' });
  } catch (error) {
    console.error('Error deleting questionnaire response:', error);
    res.status(500).json({ success: false, message: 'Error deleting questionnaire response' });
  }
};

app.post('/questionnaire/create', createQuestionnaireResponse);
app.get('/questionnaire/getall', getQuestionnaireResponses);
app.delete('/questionnaire/delete/:id', deleteQuestionnaireResponse);

app.get('/', (req, res) => {
  res.json('Welcome to The Questionnaire API server!');
});

app.use(express.static(path.join(__dirname, 'dist')));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
