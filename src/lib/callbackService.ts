import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';

interface CallbackFormData {
  name: string;
  email: string;
  phone: string;
  datetime: string;
  source: string;
}

export const submitCallbackRequest = async (formData: CallbackFormData): Promise<string> => {
  try {
    const dataToSubmit = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      datetime: formData.datetime,
      source: formData.source,
      createdAt: serverTimestamp(),
      formattedDate: new Date().toISOString(),
      status: 'pending'
    };
    
    console.log('Submitting callback request:', dataToSubmit);
    
    const docRef = await addDoc(collection(db, "callback_requests"), dataToSubmit);
    console.log("Callback request saved with ID:", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error saving callback request:", error);
    throw error;
  }
};

// Additional utility function for form validation
export const validateCallbackForm = (formData: Partial<CallbackFormData>): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!formData.name?.trim()) {
    errors.push('Name is required');
  } else if (formData.name.trim().length < 2) {
    errors.push('Name must be at least 2 characters long');
  }

  if (!formData.email?.trim()) {
    errors.push('Email is required');
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      errors.push('Please enter a valid email address');
    }
  }

  if (!formData.phone?.trim()) {
    errors.push('Phone number is required');
  } else {
    // Basic phone validation (adjust regex as needed)
    const phoneRegex = /^[\+]?[\d\s\-\(\)]{10,}$/;
    if (!phoneRegex.test(formData.phone.trim())) {
      errors.push('Please enter a valid phone number');
    }
  }

  if (!formData.datetime) {
    errors.push('Please select a date and time');
  } else {
    const selectedDate = new Date(formData.datetime);
    const now = new Date();
    if (selectedDate <= now) {
      errors.push('Please select a future date and time');
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

// Utility function to format datetime for display
export const formatCallbackDateTime = (datetime: string): string => {
  try {
    const date = new Date(datetime);
    return date.toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  } catch (error) {
    console.error('Error formatting datetime:', error);
    return datetime;
  }
};
