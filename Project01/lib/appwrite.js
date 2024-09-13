import { Account, Client, ID, Avatars, Databases } from 'react-native-appwrite';

export const config = {
    endpoint: 'http://192.168.1.225/v1',  // Your local Appwrite endpoint
    platform: 'com.jsm.pokemon',          // Your platform identifier
    projectId: '66e28d760036659412bc',    // Project ID
    databaseId: '66e28fd9002637a645fc',   // Database ID
    userCollectionId: '66e28fec000a547a843e',  // User collection ID
    pokemonCollectionId: '66e2900b001ee49bef4b',  // Pokemon collection ID
    storageId: '66e2915400018ef0616a'     // Storage ID
};


const testNetworkConnection = async () => {
    try {
        const response = await fetch('http://192.168.1.225/v1'); // Replace with your Appwrite endpoint
        if (response.ok) {
            console.log('Network connection successful:', response.status);
        } else {
            console.error('Failed to connect to Appwrite:', response.status, response.statusText);
        }
    } catch (error) {
        console.error('Network request failed:', error.message);
    }
};

// Call the test function
testNetworkConnection();

// Initialize Appwrite Client
const client = new Client();
client
    .setEndpoint(config.endpoint)  // Set the Appwrite endpoint
    .setProject(config.projectId)  // Set the project ID
    .setPlatform(config.platform); // Set the platform

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

// Function to create a new user
export const createUser = async (email, password, username) => {
    try {
        // Generate a valid unique userId and log it
        const userId = ID.unique();
        console.log('Generated User ID:', userId);

        // Create a new user account
        const newAccount = await account.create(
            userId,  
            email,
            password,
            username
        );
        

        
        const avatarUrl = avatars.getInitials(username);

        await signIn(email, password);
        
        const newUser = await databases.createDocument(
            config.databaseId,
            config.userCollectionId,
            ID.unique(),  // Generate a unique document ID
            {
                accountId: newAccount.$id,  // Store account ID in the document
                email,
                username,
                avatar: avatarUrl
            }
        );
        console.log('New user document created:', newUser);

        return newUser;

    } catch (error) {
        // Enhanced logging to see exactly where the error occurs
        console.error('Error during user creation process:', error);
        throw new Error(error.message || 'User creation failed');
    }
};



export async function signIn(email, password) {


    try {
        // Use email and password for signing in
        const session = await account.createSession(email, password);  
        console.log('Session created:', session);
        return session;
    } catch (error) {
        console.error('Error during sign-in:', error.message);
        throw new Error(error.message || 'Sign in failed');
    }

}
