/**
 * Fetches a list of random users from an external API and transforms them 
 * into the application's contact schema.
 * * Target API: https://randomuser.me/api/
 * * @returns {Promise<Array<Object>>} A promise that resolves to an array of formatted contact objects. 
 * Returns an empty array if the fetch fails.
 */
export const fetchRandomContacts = async () => {
  try {
    // Fetch 10 random users
    const response = await fetch('https://randomuser.me/api/?results=10&nat=us,gb');
    const data = await response.json();
    
    // Transform API data to our App's schema
    return data.results.map((user) => ({
      id: user.login.uuid,
      name: `${user.name.first} ${user.name.last}`,
      phone: user.phone,
      email: user.email,
      picture: user.picture.large,
      group: 'Friends', // Default group requirement
      isFavorite: false, 
    }));
  } catch (error) {
    console.error("Failed to fetch contacts:", error);
    return [];
  }
};