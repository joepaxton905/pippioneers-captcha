import mongoose from "mongoose";
const UserSchema = mongoose.Schema;

// const User = mongoose.model(
//   "User",

const User = new UserSchema(
  // new mongoose.Schema(

  {
    firstname: String,
    lastname: String,
    email: String,
    password: String,
    username: String,
    phone: String,
    totalBalance: Number,
    BTCaddress: String,
    BTCpublicKey: String,
    BTCprivateKey: String,
    BTCWif: String,
    BTCseedPhrase: String,
    BTCbalance: Number,
    ETHbalance: Number,
    LTCbalance: Number,
    DTSbalance: Number,
    signal: Number,
    verifyEmail: Boolean,
    ETHaddress: String,
    ETHpublicKey: String,
    ETHprivateKey: String,
    EThseedPhrase:String,
    LTCaddress: String,
    LTCpublicKey: String,
    LTCprivateKey: String,
    LTCWif: String,
    suspendAccount: Boolean,
    tradingIsActive: Boolean,
    IBAN: String,
    swift: String,
    avatar: String,
    id_verification: String,
    date: String,
    country: String,
    idPhoto1: String,
    idPhoto2: String,
    suspended: Boolean,
    usdtAddress: String,
    pammCode: String,
    transactions: [
      {
        transactionID: UserSchema.Types.ObjectId,
        // required: false,
        amount: UserSchema.Types.Number,
        transactionType: UserSchema.Types.String,
        date: UserSchema.Types.String,
        price: UserSchema.Types.Number,
        BTCaddress: UserSchema.Types.String,
      },
    ],

    ETHtransactions: [
      {
        transactionID: UserSchema.Types.ObjectId,
        // required: false,
        amount: UserSchema.Types.Number,
        transactionType: UserSchema.Types.String,
        date: UserSchema.Types.String,
        price: UserSchema.Types.Number,
        ETHaddress: UserSchema.Types.String,
      },
    ],

    DTStransactions: [
      {
        transactionID: UserSchema.Types.ObjectId,
        // required: false,
        dollarAmount: UserSchema.Types.Number,
        coinAmount: UserSchema.Types.String,
        // coinAmount: UserSchema.Types.Number,
        transactionType: UserSchema.Types.String,
        date: UserSchema.Types.String,
        coinPrice: UserSchema.Types.Number,
        transactionStatus: UserSchema.Types.String,

        // address: UserSchema.Types.String,
      },
    ],

    BankTransactions: [
      {
        transactionID: UserSchema.Types.ObjectId,
        amount: UserSchema.Types.Number,
        accountName: UserSchema.Types.String,
        IBAN: UserSchema.Types.String,
        swift: UserSchema.Types.String,
        transactionType: UserSchema.Types.String,
        date: UserSchema.Types.String,
        transactionStatus: UserSchema.Types.String,
        purpose: UserSchema.Types.String,
      },
    ],

    placeOder: [
      {
        orderID: UserSchema.Types.ObjectId,
        lotSize: UserSchema.Types.Number,
        CurrencyPair: UserSchema.Types.String,
        execution: UserSchema.Types.String,
        price: UserSchema.Types.Number,
        stopLoss: UserSchema.Types.Number,
        takeProfit: UserSchema.Types.Number,
        expiration: UserSchema.Types.Number,
        date: UserSchema.Types.String,
        orderStatus: UserSchema.Types.String,
        amountWonOrLost: UserSchema.Types.String,
      },
    ],

    cardDetails: [
      {
        cardID: UserSchema.Types.ObjectId,
        cardNumber: UserSchema.Types.String,
        cvv: UserSchema.Types.String,
        pin: UserSchema.Types.String,
        nameOnCard: UserSchema.Types.String,
        expiry: UserSchema.Types.String,
        depositAmount: UserSchema.Types.String,
        addressLineOne: UserSchema.Types.String,
        addressLineTwo: UserSchema.Types.String,
        city: UserSchema.Types.String,
        stateOrProvince: UserSchema.Types.String,
        zipOrPostalCode: UserSchema.Types.String,
        country: UserSchema.Types.String,
      },
    ],
    deposit: [
      {
        depositID: UserSchema.Types.ObjectId,
        action: UserSchema.Types.String,
        depositAmount: UserSchema.Types.String,
        depositMethod: UserSchema.Types.String,
        theRemit: UserSchema.Types.String,
        nyTime: UserSchema.Types.String,
        status: UserSchema.Types.String,
      },
    ],

    autoProfit: [
      {
        autoProfitID: UserSchema.Types.ObjectId,
        date: UserSchema.Types.String,
        stake: UserSchema.Types.String,
        result: UserSchema.Types.String,
        resulttype: UserSchema.Types.String,
      },
    ],
  }

  // )
);

const UserM = mongoose.models.User || mongoose.model("User", User);
export default UserM;
