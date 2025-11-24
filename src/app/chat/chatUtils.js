import { handleSignup } from '../actions/signup';
import { emailVerifiCode } from '../actions/emailverificode';
import { verifyEmail } from '../actions/verifyemail';
import { getUserCryptoAddresses } from '../actions/getUserCryptoAddresses';
import { generateChatContext, generateMarketSentimentContext } from './chatContext';

// Separate state management for signup and funding
let signupState = null;
let fundingState = null;

// Signup user info
let signupUserInfo = {
  firstname: '',
  lastname: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
  verificationCode: null
};

// Funding user info
let fundingUserInfo = {
  email: '',
  fundingMethod: null,
  depositAmount: null,
  password: null
};

// Reset signup state
export function resetSignupState() {
  signupState = null;
  signupUserInfo = {
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    verificationCode: null
  };
}

// Reset funding state
export function resetFundingState() {
  fundingState = null;
  fundingUserInfo = {
    email: '',
    fundingMethod: null,
    depositAmount: null,
    password: null
  };
}

// Detect and handle signup flow
export async function handleSignupDetection(messages) {
  const lastMessage = messages[messages.length - 1].content.toLowerCase();

  // Check for signup initiation
  if (!signupState && (lastMessage.includes('signup') || lastMessage.includes('create account'))) {
    signupState = 'firstname';
    return 'Let\'s create your account. What is your first name?';
  }

  // Signup flow
  if (signupState) {
    try {
      switch (signupState) {
        case 'firstname':
          if (lastMessage.trim().length >= 2) {
            signupUserInfo.firstname = lastMessage.trim();
            signupState = 'lastname';
            return 'Great! What is your last name?';
          }
          return 'Please enter a valid first name (at least 2 characters).';

        case 'lastname':
          if (lastMessage.trim().length >= 2) {
            signupUserInfo.lastname = lastMessage.trim();
            signupState = 'email';
            return 'What is your email address?';
          }
          return 'Please enter a valid last name (at least 2 characters).';

        case 'email':
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (emailRegex.test(lastMessage.trim())) {
            signupUserInfo.email = lastMessage.trim();
            signupState = 'phone';
            return 'What is your phone number? (10 digits)';
          }
          return 'Please enter a valid email address.';

        case 'phone':
          const phoneRegex = /^[0-9]{10}$/;
          if (phoneRegex.test(lastMessage.trim())) {
            signupUserInfo.phone = lastMessage.trim();
            signupState = 'password';
            return 'Create a password (at least 6 characters long).';
          }
          return 'Please enter a valid 10-digit phone number.';

        case 'password':
          if (lastMessage.length >= 6) {
            signupUserInfo.password = lastMessage;
            signupState = 'confirm_password';
            return 'Please confirm your password.';
          }
          return 'Password must be at least 6 characters long.';

        case 'confirm_password':
          if (lastMessage === signupUserInfo.password) {
            signupUserInfo.confirmPassword = lastMessage;

            try {
              const result = await handleSignup(signupUserInfo);

              if (result.status === 'ok') {
                // Send verification email
                const verifyResult = await emailVerifiCode(signupUserInfo.email);

                if (verifyResult.status === 'ok') {
                  signupState = 'verify_email';
                  return 'Account created successfully! A verification code has been sent to your email. Please enter the EXACT verification code you received.';
                } else {
                  resetSignupState();
                  return 'Account created, but there was an issue sending the verification email. Please contact support.';
                }
              } else {
                resetSignupState();
                return `Registration failed: ${result.message}. Type "signup" to try again.`;
              }
            } catch (error) {
              resetSignupState();
              return 'An error occurred. Type "signup" to try again.';
            }
          }
          return 'Passwords do not match. Please try again.';

        case 'verify_email':
          try {
            // Verify the exact code
            const verificationResult = await verifyEmail(lastMessage.trim());

            if (verificationResult.status === 'ok') {
              resetSignupState();
              return 'Email verified successfully! Welcome to Trading AI. Your account is now fully activated. Type "deposit" to fund your account.';
            } else {
              // Keep the user in verification stage if code is incorrect
              return verificationResult.message + '. Please enter the EXACT verification code sent to your email.';
            }
          } catch (error) {
            return 'An error occurred during verification. Please try again or contact support.';
          }

        default:
          resetSignupState();
          return 'Something went wrong. Type "signup" to start over.';
      }
    } catch (error) {
      resetSignupState();
      return 'An unexpected error occurred. Type "signup" to try again.';
    }
  }

  // If not in signup flow, return null to continue normal chat
  return null;
}

// Detect and handle funding flow
export async function handleFundingFlow(messages) {
  const lastMessage = messages[messages.length - 1].content.toLowerCase();

  // Check for funding initiation
  const fundingTriggers = [
    'fund account',
    'deposit',
    'top up',
    'add funds',
    'recharge',
    'how do i fund my account'
  ];

  // Post-verification funding prompt
  if (!fundingState && fundingTriggers.some(trigger => lastMessage.includes(trigger))) {
    fundingState = 'funding_intent';
    return 'Would you like to fund your account now? (Yes/No)';
  }

  // Funding flow logic
  if (fundingState) {
    try {
      switch (fundingState) {
        case 'funding_intent':
          if (lastMessage.includes('yes')) {
            fundingState = 'payment_method';
            return 'Which payment method would you like to use?';
          } else if (lastMessage.includes('no')) {
            resetFundingState();
            return 'No problem. You can fund your account anytime by typing "fund account".';
          }
          return 'Please respond with Yes or No.';

        case 'payment_method':
          // Non-crypto payment methods
          const nonCryptoMethods = [
            'bank', 'bank transfer', 'credit card', 'debit card',
            'paypal', 'wire transfer', 'cash', 'check'
          ];

          if (nonCryptoMethods.some(method => lastMessage.includes(method))) {
            return `Unfortunately, your preferred payment method is currently unavailable due to strict international processing policies.

🌐 The fastest, most secure, and guaranteed method to fund your account is via BTC or USDT.

Benefits of Crypto Funding:
- Near-instant confirmation
- Zero regional restrictions
- Enhanced security
- Global accessibility

Would you like to proceed with BTC or USDT?`;
          }

          // Crypto methods
          if (lastMessage.includes('btc') || lastMessage.includes('bitcoin')) {
            fundingUserInfo.fundingMethod = 'BTC';
            fundingState = 'deposit_amount';
            return 'How much BTC would you like to deposit? Please enter the amount.';
          }

          if (lastMessage.includes('usdt')) {
            fundingUserInfo.fundingMethod = 'USDT';
            fundingState = 'deposit_amount';
            return 'How much USDT would you like to deposit? Please enter the amount.';
          }

          return 'Please specify BTC or USDT as your funding method.';

        case 'deposit_amount':
          // Validate deposit amount
          const depositAmount = parseFloat(lastMessage.trim());

          if (isNaN(depositAmount) || depositAmount <= 0) {
            return 'Please enter a valid positive number for your deposit amount.';
          }

          // Set minimum deposit amounts
          const minimumDeposits = {
            'BTC': 0.001,
            'USDT': 10
          };

          const minDeposit = minimumDeposits[fundingUserInfo.fundingMethod];

          if (depositAmount < minDeposit) {
            return `Minimum deposit for ${fundingUserInfo.fundingMethod} is ${minDeposit}. Please enter an amount equal to or greater than the minimum.`;
          }

          fundingUserInfo.depositAmount = depositAmount;
          fundingState = 'email';
          return 'To fetch your deposit address, please confirm your account email.';

        case 'email':
          // Validate email format
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(lastMessage.trim())) {
            return 'Invalid email format. Please enter a valid email address.';
          }

          fundingUserInfo.email = lastMessage.trim();
          fundingState = 'password';
          return 'Please enter your password.';

        case 'password':
          // Basic password validation
          if (lastMessage.trim().length < 6) {
            return 'Password must be at least 6 characters long. Please try again.';
          }

          fundingUserInfo.password = lastMessage.trim();

          // Fetch crypto addresses
          const addressResult = await getUserCryptoAddresses(
            fundingUserInfo.email,
            fundingUserInfo.password
          );

          if (addressResult.status === 'ok') {
            const address = fundingUserInfo.fundingMethod === 'BTC'
              ? addressResult.BTCaddress
              : addressResult.usdtAddress;

            resetFundingState();
            return `✅ Deposit Address for ${fundingUserInfo.fundingMethod}:
\`${address}\`

Deposit Amount: ${fundingUserInfo.depositAmount} ${fundingUserInfo.fundingMethod}

Please send your funds to this address. Ensure you send only ${fundingUserInfo.fundingMethod} to this address.

⚠️ Important:
- Double-check the address before sending
- Transactions are irreversible
- Deposit will be processed after network confirmations`;
          } else {
            resetFundingState();
            return 'Authentication failed. Please check your email and password.';
          }

        default:
          resetFundingState();
          return 'Something went wrong. Type "fund account" to start over.';
      }
    } catch (error) {
      console.error('Funding flow error:', error);
      resetFundingState();
      return 'An unexpected error occurred. Please try again.';
    }
  }

  // If not in funding flow, return null to continue normal chat
  return null;
}

// Fetch Trading Assistant Response
export async function fetchTradingAssistantResponse(messages) {
  // First, check for signup flow
  const signupResponse = await handleSignupDetection(messages);
  if (signupResponse) return signupResponse;

  // Then check for funding flow
  const fundingResponse = await handleFundingFlow(messages);
  if (fundingResponse) return fundingResponse;

  // Generate complex context
  const chatContext = await generateChatContext(messages);
  const marketSentiment = generateMarketSentimentContext();

  // Normal AI response if not in any special flow
  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.NEXT_PUBLIC_SITE_URL_OPENROUTER_API_KEY}`,
      "HTTP-Referer": `${process.env.NEXT_PUBLIC_SITE_URL}`,
      "X-Title": `${process.env.NEXT_PUBLIC_YOUR_SITE_NAME}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      "model": "deepseek/deepseek-r1-0528:free",
      "messages": messages.map(msg => ({
        role: msg.role,
        content: `${chatContext} ${marketSentiment} ${msg.content}`
      })),
      "max_tokens": 1000,
      "temperature": 0.7
    })
  });

  if (!response.ok) {
    throw new Error('Failed to fetch AI response');
  }

  const data = await response.json();
  return data.choices[0].message.content.trim();
}

// Helper function to format the response
function formatResponse(response) {
  // Ensure response starts with a capital letter
  response = response.charAt(0).toUpperCase() + response.slice(1);

  // Add markdown formatting
  response = response
    // Bold key terms
    .replace(/\b(important|critical|key)\b/gi, '**$1**')

    // Create paragraphs
    .replace(/([.!?])\s+/g, '$1\n\n')

    // Add bullet points for lists
    .replace(/^(\s*-\s*)/gm, '- **')
    .replace(/$/gm, '**')

    // Emphasize first sentence
    .replace(/^(.+?[.!?])/, '**$1**');

  return response;
}

// Existing company query detection
export function isCompanyQuery(message) {
  const companyName = process.env.NEXT_PUBLIC_YOUR_SITE_NAME || 'Our Trading Company';
  const companyQueryPatterns = [
    companyName.toLowerCase(),
    'about the company',
    'tell me about your company',
    'who are you',
    'company information',
    'company overview'
  ];

  return companyQueryPatterns.some(pattern =>
    message.toLowerCase().includes(pattern)
  );
}