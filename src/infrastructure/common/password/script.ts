import { BcryptService } from "../../../infrastructure/services/bcrypt/bcrypt.service";

async function encryptPassword() {
  const bcryptService = new BcryptService();
  
  const dummyPassword = 'password123';
  
  const hashedPassword = await bcryptService.hash(dummyPassword);
  
  console.log('Contraseña cifrada:', hashedPassword);
}

encryptPassword();
