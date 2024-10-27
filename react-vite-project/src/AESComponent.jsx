import React, { useState } from 'react';
import { encrypt, decrypt } from './utils/Aes'; // Adjust the import path as necessary

const AESComponent = () => {
    const [inputText, setInputText] = useState('');
    const [encryptedText, setEncryptedText] = useState('');
    const [ciphertext, setCiphertext] = useState('');
    const [decryptedText, setDecryptedText] = useState('');

    const handleEncrypt = async () => {
        const encrypted = await encrypt(inputText);
        setEncryptedText(encrypted);
    };

    const handleDecrypt = async () => {
        const decrypted = await decrypt(ciphertext);
        setDecryptedText(decrypted);
    };

    return (
        <div style={{ padding: '20px', maxWidth: '400px', margin: 'auto' }}>
            <h2>AES Encryption/Decryption</h2>
            <div style={{ marginBottom: '20px' }}>
                <h4>Encrypt</h4>
                <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Text to encrypt"
                    style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
                />
                <button onClick={handleEncrypt} style={{ padding: '10px', width: '100%' }}>
                    Encrypt
                </button>
                {encryptedText && (
                    <div style={{ marginTop: '10px' }}>
                        <strong>Encrypted Text:</strong> {encryptedText}
                    </div>
                )}
            </div>
            <div>
                <h4>Decrypt</h4>
                <input
                    type="text"
                    value={ciphertext}
                    onChange={(e) => setCiphertext(e.target.value)}
                    placeholder="Encrypted text to decrypt"
                    style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
                />
                <button onClick={handleDecrypt} style={{ padding: '10px', width: '100%' }}>
                    Decrypt
                </button>
                {decryptedText && (
                    <div style={{ marginTop: '10px' }}>
                        <strong>Decrypted Text:</strong> {decryptedText}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AESComponent;
