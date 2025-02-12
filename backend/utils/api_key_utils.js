import crypto from "crypto";

const ENCRYPTION_SECRET = process.env.ENCRYPTION_SECRET;

function encrypt(key) {
    const cipher = crypto.createCipher('aes-256-ctr', ENCRYPTION_SECRET);
    let encrypted = cipher.update(key, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
}

function decrypt(key) {
    const decipher = crypto.createDecipher('aes-256-ctr', ENCRYPTION_SECRET);
    let decrypted = decipher.update(key, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}
