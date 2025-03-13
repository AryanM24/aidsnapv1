// lib/emergencyContacts.ts

// Define the type for emergency contacts
export type EmergencyContact = {
    id: string;
    name: string;
    number: string;
    description: string;
  };
  
  // Default emergency contacts data
  const defaultEmergencyContacts: EmergencyContact[] = [
    {
      id: '1',
      name: 'American Red Cross Emergency Hotline',
      number: '+1-800-733-2767',
      description: ''
    },
    {
      id: '2',
      name: 'Poison Control Center',
      number: '+1-800-222-1222',
      description: ''
    },
    {
      id: '3',
      name: 'Suicide/Crisis Prevention Hotline',
      number: '# 988',
      description: ''
    },
    {
      id: '4',
      name: 'FEMA Disaster Assistance Hotline',
      number: '+1-800-621-3362',
      description: ''
    }
  ];
  
  // In a real Next.js application, you might want to use a more sophisticated
  // state management solution like React Context, Redux, Zustand, or Jotai
  // This is a simple implementation for demonstration purposes
  let emergencyContacts = [...defaultEmergencyContacts];
  
  // Function to get all emergency contacts
  export const getEmergencyContacts = (): EmergencyContact[] => {
    return [...emergencyContacts];
  };
  
  // Function to add a new emergency contact
  export const addEmergencyContact = (contact: Omit<EmergencyContact, 'id'>): EmergencyContact => {
    const newContact = {
      ...contact,
      id: Date.now().toString() // Simple way to generate a unique ID
    };
    
    emergencyContacts = [...emergencyContacts, newContact];
    return newContact;
  };
  
  // Function to update an existing emergency contact
  export const updateEmergencyContact = (id: string, updates: Partial<Omit<EmergencyContact, 'id'>>): EmergencyContact | null => {
    const contactIndex = emergencyContacts.findIndex(contact => contact.id === id);
    
    if (contactIndex === -1) {
      return null;
    }
    
    const updatedContact = {
      ...emergencyContacts[contactIndex],
      ...updates
    };
    
    emergencyContacts = [
      ...emergencyContacts.slice(0, contactIndex),
      updatedContact,
      ...emergencyContacts.slice(contactIndex + 1)
    ];
    
    return updatedContact;
  };
  
  // Function to delete an emergency contact
  export const deleteEmergencyContact = (id: string): boolean => {
    const initialLength = emergencyContacts.length;
    emergencyContacts = emergencyContacts.filter(contact => contact.id !== id);
    
    return emergencyContacts.length !== initialLength;
  };
  
  // Function to reset to default contacts
  export const resetEmergencyContacts = (): void => {
    emergencyContacts = [...defaultEmergencyContacts];
  };
  
  // Export the default contacts for initial state
  export { defaultEmergencyContacts };