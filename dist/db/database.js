"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runDb = exports.usersCollection = exports.postsCollection = exports.blogsCollection = exports.db = exports.client = void 0;
const mongodb_1 = require("mongodb");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const mongoUri = process.env.mongoURI || process.env.MONGO_URL;
if (!mongoUri) {
    throw new Error('! URL not found');
}
exports.client = new mongodb_1.MongoClient(mongoUri);
console.log(process.env.MONGO_URL);
exports.db = exports.client.db('blogPlatform');
exports.blogsCollection = exports.db.collection('blogs');
exports.postsCollection = exports.db.collection('posts');
exports.usersCollection = exports.db.collection('users');
function runDb() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Connect the client to the server
            yield exports.client.connect();
            // Establish and verify connection
            yield exports.client.db('blogPlatform').command({ ping: 1 });
            console.log("Connecting succesfully to mongo server");
        }
        catch (error) {
            console.log(`Can't connect to db`, error);
            // Ensures that the client will close when you finish/error
            yield exports.client.close();
        }
    });
}
exports.runDb = runDb;
