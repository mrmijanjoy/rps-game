import * as crypto from 'crypto';

export class KeyGenerator {
    generateKey() {
        return crypto.randomBytes(32).toString('hex'); 
    }
}
