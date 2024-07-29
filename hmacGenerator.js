import * as crypto from 'crypto';

export class HMACGenerator {
    calculateHMAC(key, move) {
        const hmac = crypto.createHmac('sha256', key);
        hmac.update(move);
        return hmac.digest('hex');
    }
}
