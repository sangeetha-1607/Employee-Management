// Response/format.js

// Function to format a success response
export const formatSuccessResponse = (data) => {
    return {
      success: true,
      data,
    };
  };
  
  // Function to format an error response
  export const formatErrorResponse = (message) => {
    return {
      success: false,
      error: message,
    };
  };
  