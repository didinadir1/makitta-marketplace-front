export interface User {
  name: string;
  profilePictureUrl: string;
  // Add other user properties as needed (e.g., email, address)
}

export const mockUser: User = {
  name: 'John Doe',
  profilePictureUrl: 'https://via.placeholder.com/150/007bff/ffffff?text=JD', // Placeholder image
  // Add other mock data
};
