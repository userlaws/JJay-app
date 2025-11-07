// Simple image storage utility for development
// In production, you'd use services like AWS S3, Cloudinary, or Firebase Storage

export interface ImageUploadResult {
  url: string;
  success: boolean;
  error?: string;
}

// Mock image storage - in production, this would upload to a real service
export async function uploadImage(
  imageUri: string
): Promise<ImageUploadResult> {
  try {
    // Simulate upload delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // For development, we'll use a placeholder service
    // In production, you'd upload to your backend/storage service
    const mockUrl = `https://picsum.photos/seed/${Date.now()}/400/300`;

    return {
      url: mockUrl,
      success: true,
    };
  } catch (error) {
    return {
      url: '',
      success: false,
      error: error instanceof Error ? error.message : 'Upload failed',
    };
  }
}

// Generate a unique image URL for new listings
export function generateImageUrl(seed: string = 'new'): string {
  return `https://picsum.photos/seed/${seed}-${Date.now()}/400/300`;
}

// More accurate placeholder images for different categories
export function getCategoryImage(category: string): string {
  const categorySeeds = {
    Textbooks: 'book-study',
    Electronics: 'laptop-tech',
    Dorm: 'room-furniture',
    Services: 'service-help',
    Free: 'free-gift',
  };

  const seed =
    categorySeeds[category as keyof typeof categorySeeds] || 'marketplace';
  return `https://picsum.photos/seed/${seed}/400/300`;
}

// In production, you would implement:
// 1. Image compression before upload
// 2. Multiple image support
// 3. Image resizing for different sizes (thumbnail, full-size)
// 4. Progress tracking for uploads
// 5. Error handling and retry logic
// 6. Integration with your backend API
