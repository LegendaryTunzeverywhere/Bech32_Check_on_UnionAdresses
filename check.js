// Simple standalone address checker script
// This doesn't require any external Cosmos libraries

/**
 * Simple regex-based validator for Union addresses
 * This is less strict than a full Bech32 validation but serves as a basic check
 */
function validateBasicUnionAddress(address) {
    // Basic pattern check for Union addresses
    const unionPattern = /^union1[a-zA-Z0-9]{38,39}$/;
    
    console.log("\n===== SIMPLE ADDRESS CHECKER =====");
    console.log(`Checking address: ${address}`);
    
    if (!address) {
      console.log("❌ No address provided");
      return false;
    }
    
    if (!address.startsWith("union1")) {
      console.log("❌ Invalid prefix - Union addresses must start with 'union1'");
      return false;
    }
    
    if (address.length < 39 || address.length > 45) {
      console.log(`❌ Invalid length (${address.length}) - Union addresses are typically 40-45 characters`);
      return false;
    }
    
    if (!unionPattern.test(address)) {
      console.log("❌ Address contains invalid characters or format");
      return false;
    }
    
    console.log("✅ The address appears to be a valid Union address");
    console.log("Note: This is a basic format check only, not a full Bech32 validation");
    return true;
  }
  
  /**
   * Character frequency analysis to help diagnose issues
   */
  function analyzeCharacters(address) {
    console.log("\n----- Character Analysis -----");
    
    // Check for spaces or control characters
    if (/\s/.test(address)) {
      console.log("⚠️ Address contains whitespace characters");
    }
    
    // Check for non-alphanumeric characters
    const nonAlphanumeric = address.match(/[^a-zA-Z0-9]/g);
    if (nonAlphanumeric && nonAlphanumeric.length > 0) {
      console.log(`⚠️ Found ${nonAlphanumeric.length} non-alphanumeric characters: ${nonAlphanumeric.join(' ')}`);
    }
    
    // Visual representation
    console.log("\nAddress character by character:");
    console.log(address.split('').join('|'));
    console.log('0123456789'.repeat(5));
  }
  
  // Run validation on provided address
  const addressToCheck = process.argv[2] || "union1rcszmkmesydtnrdha0rdr9fmv9vp3vxpkh2pmx";
  validateBasicUnionAddress(addressToCheck);
  analyzeCharacters(addressToCheck);
  
  console.log("\nTo use: node check.js <your_union_address>");
  console.log("\nNOTE: For bridge transactions to work, please check that your address:");
  console.log("1. Starts with 'union1'");
  console.log("2. Contains only letters and numbers (no spaces or special characters)");
  console.log("3. Is between 39-45 characters long");